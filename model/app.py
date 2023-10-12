from flask import Flask, request, jsonify
from predict import predict

# run: flask run

app = Flask(__name__)

@app.route('/<model_name>/predict', methods=['GET', 'POST'])
def get_prediction(model_name):
    obs = request.get_json()
    pred = predict(f'{model_name}.pkl', obs)
    print(f"call complete: {obs} ({pred})")
    return { "valence": pred }

if __name__ == 'main':
    app.run(port=5000, debug=True)
