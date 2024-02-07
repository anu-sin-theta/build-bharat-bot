import firebase_admin
from firebase_admin import credentials
from firebase_admin import db
import smtplib
from email.message import EmailMessage

cred = credentials.Certificate("nego-bot-firebase-adminsdk-8polq-61041123c6.json")

firebase_admin.initialize_app(cred, {
    'databaseURL': 'https://nego-bot-default-rtdb.asia-southeast1.firebasedatabase.app/'

})


products = {
    'Product1': {
        'name': 'Shoes',
        'seller': 'Nike',
        'stock': 10,
        'price': 1000,
        'min_price': 900,
        'max_price': 1200,
        'seller_contact': 'nike.com/contact'
    },
    'Product2': {
        'name': 'T-Shirt',
        'seller': 'Adidas',
        'stock': 20,
        'price': 500,
        'min_price': 400,
        'max_price': 600,
        'seller_contact': 'adidas.com/contact'
    },
}
global ref
ref = db.reference('Products')
ref.set(products)

def write_object(id, Product, Price):
    ref1 = db.reference('Intrested_costumers')
    ref1.set({
        "Name": id,
        "Product": Product,
        "Price": 19000

    })
    send_email(id, Product, Price)


def send_email(customer_id, product, price):
    gmail_user = "atcsedintercom@gmail.com"
    gmail_pwd = "kucu kfwv cspf vmph"
    receiver = ['audiq4456@gmail.com']  # must be a list

    mail_content = EmailMessage()

    # Mail metadata
    mail_content['Subject'] = "User interested in your supplies! "
    mail_content['From'] = gmail_user
    mail_content['To'] = receiver

    mail_content.set_content(f'''<!DOCTYPE html>
    <html>
    <head>
        <style>
            body {{
                background-color: #2196F3;
                font-family: Arial, sans-serif;
                text-align: center;
                background: linear-gradient(to bottom, purple, #2196F3);
                background-size: cover;
                background-repeat: no-repeat;
                background-attachment: fixed;
                height: 100vh;
                margin: 0;
                display: flex;
                flex-direction: column;
                justify-content: center;
                align-items: center;
            }}

            h1 {{
                color: #333333;
                padding-top: 40px;
                font-size: 50px;
            }}

            .card {{
                background-color: blue;
                width: 300px;
                border-radius: 10px;
                padding: 20px;
                box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.5);
            }}

            .button {{
                background-color: #2196F3;
                color: white;
                padding: 10px 20px;
                border: none;
                border-radius: 5px;
                text-decoration: none;
                margin-top: 20px;
                display: inline-block;
                font-size: 16px;
            }}

            .button:hover {{
                background-color: #1976D2;
            }}
        </style>
    </head>
    <body>
        <h1>Seller connect | Nego bot</h1>

        <div class="card">
            <h2>Message</h2>
            <p> Hey, users are showing interest in your products, A user with ID {customer_id} wants to negotiate with an item named {product} with a price of {price}. </p>
        </div>

        <a class="button" href="hack2skill.com">The Negobot</a>

        <div class="card">
            <h3>Your connected customer companion.</h3>
            <p>Developed for Build for Bharat by team Tensor Minds.</p>
        </div>
    </body>
    </html>''', subtype='html')



    with smtplib.SMTP_SSL('smtp.gmail.com') as mail_account:
        mail_account.login(user=gmail_user, password=gmail_pwd)
        mail_account.send_message(mail_content)



def retrieve_data(price):
    ref = db.reference('Products')
    all_products = ref.get()

    if all_products is not None:
        for product_id, product_details in all_products.items():
            if product_details['price'] == price:
                return product_details['name'], product_details['price'], product_details['stock']

    return "Amm, looks like we dont have your requested item, we'll get back to you when our stocks are refilled"

