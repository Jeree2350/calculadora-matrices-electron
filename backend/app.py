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

@app.route('/matrix-info', methods=['POST'])
def matrix_info():
    data = request.get_json()
    matrix = data.get('matrix', [])
    result = calculator.matrix_info(matrix)
    return jsonify(result)

@app.route('/add-matrices', methods=['POST'])
def add_matrices():
    data = request.get_json()
    matrix_a = data.get('matrix_a', [])
    matrix_b = data.get('matrix_b', [])
    
    result = calculator.add_matrices(matrix_a, matrix_b)
    return jsonify(result)

@app.route('/subtract-matrices', methods=['POST'])
def subtract_matrices():
    data = request.get_json()
    matrix_a = data.get('matrix_a', [])
    matrix_b = data.get('matrix_b', [])
    
    result = calculator.subtract_matrices(matrix_a, matrix_b)
    return jsonify(result)

@app.route('/multiply-matrices', methods=['POST'])
def multiply_matrices():
    data = request.get_json()
    matrix_a = data.get('matrix_a', [])
    matrix_b = data.get('matrix_b', [])
    
    result = calculator.multiply_matrices(matrix_a, matrix_b)
    return jsonify(result)

@app.route('/transpose-matrix', methods=['POST'])
def transpose_matrix():
    data = request.get_json()
    matrix = data.get('matrix', [])

    result = calculator.transpose_matrix(matrix)
    return jsonify(result)

@app.route('/determinant-matrix', methods=['POST'])
def determinant_matrix():
    data = request.get_json()
    matrix = data.get('matrix', [])
    
    result = calculator.determinant_matrix(matrix)
    return jsonify(result)

@app.route('/matrix-properties', methods=['POST'])
def matrix_properties():
    data = request.get_json()
    matrix = data.get('matrix', [])
    
    result = calculator.matrix_properties(matrix)
    return jsonify(result)

@app.errorhandler(404)
def not_found(error):
    return jsonify({"error": "Endpoint no encontrado"}), 404

@app.errorhandler(400)
def bad_request(error):
    return jsonify({"error": "Solicitud inválida"}), 400

@app.errorhandler(500)
def internal_error(error):
    return jsonify({"error": "Error interno del servidor"}), 500

if __name__ == '__main__':
    app.run(debug=True, port=5000)