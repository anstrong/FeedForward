import numpy as np
import pandas as pd
import csv
from spacy.tokenizer import Tokenizer
from spacy.lang.en import English
from sklearn.preprocessing import MultiLabelBinarizer

nlp = English()
tokenizer = nlp.tokenizer
mlb = MultiLabelBinarizer(sparse_output=True)

train_df = pd.read_csv('employee_review_dataset_kaggle_five_categories.csv')
#test_df = pd.read_csv('EmployeeComplaints.csv')
#dummy_df = pd.read_csv()

def examine_df(df):
    print('\n')
    print(df.shape)
    print(df.describe())
    print(df[:5])
    print(df.dtypes)

#examine_df(train_df)
#examine_df(test_df)

#train_docs = train_df['feedback']
#train_labels = train_df['nine_box_category']
#test_docs = test_df['Report']
#train_labels.to_csv('train_labels.csv', index=False)

def tokenize(s):
    #print(s)
    text = tokenizer(s)
    return [t.text for t in text]

def tokenize_all(strs, to_remove=['\t', '\n', '\r', "", " "]):
    tokenized = []
    for s in strs:
        try:
            doc = tokenize(s.strip())
            tokens = [w for w in doc if w.isalpha()]
            #print(tokens)
            tokenized.append(tokens)
        except:
            pass
    return tokenized

def vectorize(docs):
    #print(docs)
    tokenized = tokenize_all(docs)
    #print(tokenized)
    df = pd.DataFrame.sparse.from_spmatrix(
        mlb.fit_transform(tokenized),
        index=docs.index[:len(tokenized)],
        columns=mlb.classes_)
    print(df[:10])
    return df

def vectorize_and_save(docs, filename):
    vecs = vectorize(docs)
    vecs.to_csv(filename, quoting=csv.QUOTE_NONE, escapechar='\\', index=False)

#vectorize_and_save(train_docs, 'train_vectors.csv')
#print(test_docs)
#vectorize_and_save(test_docs, 'feedback_vectors.csv')

def preprocess_csv(in_file, col, out_file, verbose=True):
    df = pd.read_csv(in_file)
    if verbose:
        examine_df(df)
    docs = df[col]
    vectorize_and_save(docs, out_file)

#preprocess_csv('employee_review_dataset_kaggle_five_categories.csv', 'feedback', 'train_vectors.csv')
