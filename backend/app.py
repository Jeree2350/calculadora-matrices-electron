from flask import Flask, jsonify, request
from flask_cors import CORS
from matrix_operations import MatrixCalculator
from logger_config import logger
import traceback

app = Flask(__name__)
CORS(app)

calculator = MatrixCalculator()

# Middleware para logging de solicitudes
@app.before_request
def log_request_info():
    logger.info(f"Request: {request.method} {request.url}")
    if request.method == 'POST' and request.is_json:
        logger.info(f"Request data keys: {list(request.get_json().keys()) if request.get_json() else 'None'}")


# Manejo global de errores
@app.errorhandler(Exception)
def handle_exception(e): 
    logger.error(f"Unhandled Exception: {str(e)}")
    logger.error(traceback.format_exc())
    return jsonify({
        "success": False,
        "error": "Error interno del servidor",
        "message": "Ocurrió un error inesperado. Por favor, inténtelo de nuevo más tarde."
    }), 500


# Endpoints existentes
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

@app.route('/matrix_inverse', methods=['POST'])
def matrix_inverse():
    data = request.get_json()
    matrix = data.get('matrix', [])
    
    result = calculator.matrix_inverse(matrix)
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

@app.route('/api-info', methods=['GET'])
def api_info():
    endpoints = {
        'basic_operations': [
            'POST /add-matrices - Suma de dos matrices',
            'POST /subtract-matrices - Resta de dos matrices',
            'POST /multiply-matrices - Multiplicación de dos matrices'
        ],
        'single_matrix_operations': [
            'POST /transpose-matrix - Transposición de una matriz',
            'POST /determinant-matrix - Cálculo del determinante de una matriz',
            'POST /matrix_inverse - Cálculo de la inversa de una matriz',
            'POST /matrix-info - Información básica de una matriz',
            'POST /matrix-properties - Propiedades avanzadas de una matriz'
        ],
        'utility': [
            'POST /validate-matrix - Validación de una matriz',
            'GET /test - Endpoint de prueba para verificar que el backend funciona'
        ]
    }

    return jsonify({
        "api_name": "Calculadora de Matrices API",
        "version": "1.0.0",
        "description": "API para realizar operaciones y análisis de matrices.",
        "endpoints": endpoints,
        "total_endpoints": sum(len(group) for group in endpoints.values())
    })

if __name__ == '__main__':
    app.run(debug=True, port=5000)