import numpy as np

class MatrixCalculator:
    
    @staticmethod
    def add_matrices(matrix_a, matrix_b):
        """Suma de dos matrices"""
        try:
            a = np.array(matrix_a)
            b = np.array(matrix_b)
            
            if a.shape != b.shape:
                raise ValueError("Las matrices deben tener las mismas dimensiones")
            
            result = a + b
            return {
                "success": True,
                "result": result.tolist(),
                "operation": "suma"
            }
        except Exception as e:
            return {
                "success": False,
                "error": str(e)
            }
    
    @staticmethod
    def validate_matrix(matrix):
        """Validar que la matriz sea válida"""
        try:
            np_matrix = np.array(matrix)
            return {
                "valid": True,
                "shape": np_matrix.shape,
                "size": np_matrix.size
            }
        except Exception as e:
            return {
                "valid": False,
                "error": str(e)
            }