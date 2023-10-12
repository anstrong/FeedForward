import numpy as np
import pandas as pd
import pickle
from data import tokenize

def predict(model_file, obs):
    model = pickle.load(open(model_file, 'rb'))
    doc = tokenize(obs)
    #print(doc)
    x = pd.DataFrame([[f, int(f in doc)] for f in model.feature_names_in_]).set_index(0).T
    #print(x)
    pred = model.predict(x)[0]
    #print(pred)
    return pred

predict('mnb_classifier.pkl', "I love how you always support my ideas.")
