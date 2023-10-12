import numpy as np
import pandas as pd
import pickle
from data import tokenize
import csv

def predict(model_file, obs):
    model = pickle.load(open(model_file, 'rb'))
    doc = tokenize(obs)
    #print(doc)
    x = pd.DataFrame([[f, int(f in doc)] for f in model.feature_names_in_]).set_index(0).T
    #print(x)
    pred = model.predict(x)[0]
    #print(pred)
    return int(pred)

def map_file(filename, obs_col_name, val_col_name, fn):
    with open(filename, newline='') as csvfile:
        reader = csv.reader(csvfile, delimiter=',', quotechar='`')
        header = next(reader)

        val_col = header.index(val_col_name)
        obs_col = header.index(obs_col_name)
        #print(val_col, obs_col)
        entries = [row for row in reader]
        #print(entries[:5])

    new_entries = []
    for entry in entries:
        try:
            entry[val_col] = fn(entry[obs_col])
            new_entries.append(entry)
        except IndexError:
            pass

    with open(filename, 'w') as csvfile:
        csvwriter = csv.writer(csvfile)
        csvwriter.writerow(header)
        csvwriter.writerows(entries)

map_file('../data/entries_data.csv', 'body', 'valence', lambda obs: predict('mnb_classifier.pkl', obs))


#predict('mnb_classifier.pkl', "I love how you always support my ideas.")
