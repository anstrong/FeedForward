import numpy as np
import pandas as pd
import matplotlib.pyplot as plt
from sklearn.naive_bayes import MultinomialNB
from sklearn.model_selection import train_test_split
from sklearn.metrics import ConfusionMatrixDisplay, precision_score, recall_score, f1_score
import pickle
import csv

def load_data(vec_file, label_file):
    X = pd.read_csv(vec_file, delimiter=",", quoting=csv.QUOTE_NONE, encoding='utf-8')
    y = pd.read_csv(label_file)
    print(y.shape)
    print(X.shape)
    return train_test_split(X, y, test_size=0.2, random_state=42)

def train_model(model_class, X_train, y_train, seed=True, filename="model.pkl"):
    if seed:
        model = model_class(random_state=42)
    else:
        model = model_class()

    model.fit(X_train, y_train.values.ravel())
    pickle.dump(model, open(filename, "wb"))
    return model

def evaluate_model(model, X_test, y_test, averaging=None, figname="accuracy.png"):
    y_pred = model.predict(X_test)
    ConfusionMatrixDisplay.from_predictions(y_test, y_pred)
    plt.savefig(figname)

    print_metric = lambda name, fn : print(f'{name}: {round(fn(y_test, y_pred, average=averaging), 4)}')
    print_metric('Precision', precision_score)
    print_metric('Recall', recall_score)
    print_metric('F1', f1_score)

def build_model():
    X_train, X_test, y_train, y_test = load_data('train_vectors.csv', 'train_labels.csv')
    mnb = train_model(MultinomialNB, X_train, y_train, seed=False, filename="mnb_classifier.pkl")
    evaluate_model(mnb, X_test, y_test, "weighted")

build_model()
