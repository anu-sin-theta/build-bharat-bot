from transformers import DistilBertTokenizerFast, DistilBertForSequenceClassification
from torch.utils.data import Dataset, DataLoader
import torch
import pandas as pd

df = pd.read_csv('data.csv')

tokenizer = DistilBertTokenizerFast.from_pretrained('distilbert-base-uncased')
model = DistilBertForSequenceClassification.from_pretrained('distilbert-base-uncased', num_labels=len(df['Intent'].unique()))
df['input_response'] = df['input'] + ' ' + df['Responses']
inputs = tokenizer(df['input_response'].tolist(), truncation=True, padding=True, return_tensors='pt')
labels, unique_intents = pd.factorize(df['Intent'])
label_to_id = dict(zip(unique_intents, range(len(unique_intents))))
labels = torch.tensor(df['Intent'].apply(lambda x: label_to_id[x] if pd.notna(x) else x).fillna(-1).tolist()).to(torch.long)

class ChatbotDataset(Dataset):
    def __init__(self, encodings, labels):
        self.encodings = encodings
        self.labels = labels
    def __getitem__(self, idx):
        item = {key: val[idx].clone().detach() for key, val in self.encodings.items()}
        item['labels'] = self.labels[idx].clone().detach()
        return item

    def __len__(self):
        return len(self.labels)

dataset = ChatbotDataset(inputs, labels)

# Fine-tune model
device = torch.device('cpu')
model.to(device)
data_loader = DataLoader(dataset, batch_size=16, shuffle=True)

optimizer = torch.optim.AdamW(model.parameters(), lr=1e-5)
loss_fct = torch.nn.CrossEntropyLoss()  # Use CrossEntropyLoss for multi-class classification
for epoch in range(50):
    for batch in data_loader:
        optimizer.zero_grad()
        input_ids = batch['input_ids'].to(device)
        attention_mask = batch['attention_mask'].to(device)
        labels = batch['labels'].to(device)
        outputs = model(input_ids, attention_mask=attention_mask)
        loss = loss_fct(outputs.logits, labels)
        loss.backward()
        optimizer.step()

model.save_pretrained('./fine_tuned_model')