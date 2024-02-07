from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics.pairwise import cosine_similarity
import pandas as pd
from Firedb import write_object, retrieve_data
import time
#  just for testing, in real-life implementation this data will be fetched from the websites databases.
min_price = 15000
max_price = 20000
user_price = 0
name = "samsung"
seller = "alpha-retail"
seller_contact = "testuser@gmail.com"
user = "Anubhav"
number = "1234567890"
stock = 10
date = "12/2/2024"
days = 7
id = 88989
df = pd.read_csv('data.csv')

df['input'] = df['input'].str.lower()
# format the responses
# df['Responses'] = df['Responses'].apply(lambda x: x.format( delivery_date = date,user=user, min_price=min_price, max_price=max_price, user_price=user_price, name=name, seller=seller, seller_contact=seller_contact, number=number, stock=stock, date=date, days=days))

vectorizer = TfidfVectorizer()

X_train = vectorizer.fit_transform(df['input'])





def bol(s, message):
    full_message = s + message
    for c in full_message:
        print(c, end='', flush=True)
        time.sleep(0.05)
    print()

def classify_input(user_input):
    keywords_responses = {
        'track': 'Of course! Once your order has been shipped, we will provide you with a tracking number.',
        'cancel': 'If your order has not been shipped yet, we can cancel it for you.',
        'customer service': 'Please reach out to our customer support team, and they will assist you.',
        'place order': 'Sure, you can place your order on our website.',
        'negotiate': 'Sure, what price are you offering?'
    }

    for keyword, response in keywords_responses.items():
        if keyword in user_input.lower():
            return response

    user_input_transformed = vectorizer.transform([user_input])
    similarity_scores = cosine_similarity(user_input_transformed, X_train)
    most_similar_index = similarity_scores.argmax()

    if similarity_scores[0, most_similar_index] < 0.5:
        return 'Sorry, can you make it more clear!'
    response = df.loc[most_similar_index, 'Responses']
    formatted_response = response.format(user=user, min_price=min_price, max_price=max_price, user_price=user_price,
                                         name=name, seller=seller, seller_contact=seller_contact, number=number,
                                         stock=stock, delivery_date=date)
    plain_response = formatted_response[2:-1]
    return plain_response


def negotiate_price(user_price, min_price=min_price, max_price=max_price, user=user, number=number, stock=stock,
                    date=date):
    target_price = max_price

    if user_price >= target_price:
        return 'Great! Your price is valid and I\'ll add you to the offering list.'
    elif user_price >= min_price:
        return f'The price you offered is acceptable, but could you consider increasing it to {target_price}?'
    else:
        return 'The price you offered is a bit low. Could you please increase it?'


while True:
    user_input = input(f'{user}: ')
    if user_input.lower() == 'bye':
        bol('Negobot: Bye!')
        break
    else:
        res = classify_input(user_input)
        bol('Negobot:', res)
    if user_input.lower() == 'negotiate':
        user_price = int(input(f'{user} ,Negotiate mode'))
        bol('Negobot:', negotiate_price(user_price))
        pass
    if res == "Sure, what price are you offering?" or res == "The price you offered is a bit low. Could you please increase it?" or res == "sure whats your price range?" or res == "This product is available with negotiation feature":
        user_price = int(input('Please tell me the price you want to offer: '))
        if user_price >= min_price and user_price <= max_price:
            bol("Negobot:",
                  f"Your preferable price {user_price} has been sent to the seller, you'll be notified when eller will accept your offered price")
        else:
            bol("Negobot: This is too low for the product, kindly enter a valid", "price")
        bol("Negobot: ", "Nevermind, you may like these products in your range")
        pp = retrieve_data(user_price)
        # pname =  pp[0]
        bol("Negobot:", pp)

    pass
    if res == "Sure! do you wish to be in the negotiation list of this product?":
        user_input = input(f'{user}: ')
        if user_input.lower() == 'yes':
            pp = retrieve_data(user_price)
            write_object(id, pp, user_price)
            bol("Negobot: You have been added to the negotiation list", "we will get back to you soon")
        pass
