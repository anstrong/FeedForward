from faker import Faker
from pymongo import MongoClient
import random
import string

# Using Faker to generate dummy data
def generate_dummy_data(fake):
    username = fake.user_name()
    password = ''.join(random.choices(string.ascii_letters + string.digits, k=8)) # 8 characters, letters and numbers, no spaces
    body = fake.text()
    sender = fake.user_name()
    recipient = fake.user_name()
    valence = random.radint(1, 5) # adjust range as needed

    return {
        "username": username,
        "password": password,
        "body": body,
        "sender": sender,
        "recipient": recipient,
        "valence": valence
    }

# Inserting dummy data in MongoDB Atlas
def insert_data(num_of_records):
    fake = Faker()

    client = MongoClient("mongodb+srv://admin:admin@feedforwarddb.d3pydak.mongodb.net/?retryWrites=true&w=majority")
    db = client # database name
    clientcollection1 = db[entries] # collection names
    clientcollection2 = db[users] 

    for _ in range(num_of_records): # _ is not going to be used in within the loop
        data = generate_dummy_data(fake)
        collection1.insert_one(data)
        collection2.insert_one(data)

if __name__ = "__main__": # checks if script is main entry point
    num_of_records = 1000
    insert_dummy_data(num_of_records)

