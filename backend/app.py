from flask import Flask, jsonify, request
from flask_cors import CORS
from matrix_operations import MatrixCalculator

app = Flask(__name__)
CORS(app)

calculator = MatrixCalculator()

@app.route('/test', methods=['GET'])
def test():
    return jsonify({"message": "Backend funcionando correctamente!"})

@app.route('/validate-matrix', methods=['POST'])
def validate_matrix():
    data = request.get_json()
    matrix = data.get('matrix', [])
    result = calculator.validate_matrix(matrix)
    return jsonify(result)

@app.route('/add-matrices', methods=['POST'])
def add_matrices():
    data = request.get_json()
    matrix_a = data.get('matrix_a', [])
    matrix_b = data.get('matrix_b', [])
    
    result = calculator.add_matrices(matrix_a, matrix_b)
    return jsonify(result)

if __name__ == '__main__':
    app.run(debug=True, port=5000)