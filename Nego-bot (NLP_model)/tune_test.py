from transformers import DistilBertTokenizerFast, DistilBertForSequenceClassification
import torch

tokenizer = DistilBertTokenizerFast.from_pretrained('distilbert-base-uncased')
model = DistilBertForSequenceClassification.from_pretrained('./fine_tuned_model')
while True:
    input_text = input("ask me anything")
    inputs = tokenizer(input_text, truncation=True, padding=True, return_tensors='pt')

    outputs = model(**inputs)

    predictions = torch.nn.functional.softmax(outputs.logits, dim=-1)

    predicted_class = torch.argmax(predictions).item()

    print(f"The predicted class is: {predicted_class}")

   #working