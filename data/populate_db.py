from faker import Faker
from pymongo import MongoClient # pip install pymongo first
import random
import string
import csv # added


# Using Faker to generate dummy user and entries data
def generate_user_data(fake):
    username = fake.user_name()
    password = ''.join(random.choices(string.ascii_letters + string.digits, k=8))
    is_manager = random.choice([True, False])

    if is_manager:
        direct_reports = []
    else:
        direct_reports = [] # empty list if user is not a manager

    return {
        "username": username,
        "password": password,
        "is_manager": is_manager,
        "direct_reports": direct_reports
    }

def generate_entry_data(fake):
    body = fake.text()
    sender = fake.user_name()
    recipient = fake.user_name()
    valence = random.randint(1, 5) # adjust range as needed 

    return {
        "body": body,
        "sender": sender,
        "recipient": recipient,
        "valence": valence
    }

#generate direct reports for users
def generate_direct_reports(users):
    for user in users:
        if user["is_manager"]:
            num_of_reports = random.randint(0, len(users) - 2) # there cannot be more direct reports than users
            user["direct_reports"] = random.sample(users, num_of_reports)


# Inserting dummy users and entries data into the CSV file
def save_users_to_csv(users, csv_filename):
    with open(csv_filename, mode="w", newline="") as csv_file:
        fieldnames = list(users[0].keys())
        csv_writer = csv.DictWriter(csv_file, fieldnames=fieldnames)

        csv_writer.writeheader()
        for user in users:
            csv_writer.writerow(user)
     
def save_entries_to_csv(entries, csv_filename):
    with open(csv_filename, mode="w", newline="") as csv_file:
        fieldnames = list(entries[0].keys())
        csv_writer = csv.DictWriter(csv_file, fieldnames=fieldnames)

        csv_writer.writeheader()
        for entry in entries:
            csv_writer.writerow(entry) 


if __name__ == "__main__": # checks if script is main entry point
    num_of_users = 5
    num_of_entries = 5

    users = [] #list of users
    entries = [] #list of entries
    fake = Faker()

    #generate user data
    for _ in range(num_of_users):
        user_data = generate_user_data(fake)
        users.append(user_data)

    #generate entry data
    for _ in range(num_of_entries):
        entry_data = generate_entry_data(fake)
        entries.append(entry_data) 

    #generate direct reports for users
    generate_direct_reports(users)

    #save to CSV files
    save_users_to_csv(users, "users_data.csv")
    save_entries_to_csv(entries, "entries_data.csv")
        




    # num_of_records = 1 # change as needed
    # csv_filename = "dummy_data.csv"
    # save_to_csv(num_of_records, csv_filename)



# def save_to_csv(num_of_records, csv_filename):
#     fake = Faker()

#     dummy_data = [] # list that holds the dummy data

#     for _ in range(num_of_records):
#         data = generate_dummy_data(fake)
#         dummy_data.append(data)

#     # write into CSV file
#     with open(csv_filename, mode="w", newline="") as csv_file:
#         fieldnames = list(dummy_data[0].keys())
#         csv_writer = csv.DictWriter(csv_file, fieldnames=fieldnames)

#         csv_writer.writeheader()
#         for data in dummy_data:
#             csv_writer.writerow(data)







# Inserting dummy data in MongoDB Atlas
#def insert_data(num_of_records):
#   fake = Faker()

#    client = MongoClient("mongodb+srv://admin:admin@feedforwarddb.d3pydak.mongodb.net/?retryWrites=true&w=majority")
#    db = client # database name
#    clientcollection1 = db[entries] # collection names
#    clientcollection2 = db[users] 

#    for _ in range(num_of_records): # _ is not going to be used in within the loop
#        data = generate_dummy_data(fake)
#        collection1.insert_one(data)
#        collection2.insert_one(data)

#if __name__ == "__main__": # checks if script is main entry point
#    num_of_records = 1000
#    insert_dummy_data(num_of_records)



# connect entries and users collection, so user data in entries matches up with users