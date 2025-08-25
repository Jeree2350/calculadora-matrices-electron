import numpy as np

class MatrixCalculator:
    
    @staticmethod
    def add_matrices(matrix_a, matrix_b):
        """Suma de dos matrices"""
        try:
            a = np.array(matrix_a, dtype=float)
            b = np.array(matrix_b, dtype=float)
            
            if a.shape != b.shape:
                raise ValueError(f"Las matrices deben tener las mismas dimensiones. A: {a.shape}, B: {b.shape}")
            
            result = a + b
            return {
                "success": True,
                "result": result.tolist(),
                "operation": "suma",
                "dimensions": f"{a.shape[0]}x{a.shape[1]}"
            }
        except Exception as e:
            return {
                "success": False,
                "error": str(e),
                "operation": "suma"
            }
    
    @staticmethod
    def subtract_matrices(matrix_a, matrix_b):
        """Resta de dos matrices"""
        try:
            a = np.array(matrix_a, dtype=float)
            b = np.array(matrix_b, dtype=float)
            
            if a.shape != b.shape:
                raise ValueError(f"Las matrices deben tener las mismas dimensiones. A: {a.shape}, B: {b.shape}")
            
            result = a - b
            return {
                "success": True,
                "result": result.tolist(),
                "operation": "resta",
                "dimensions": f"{a.shape[0]}x{a.shape[1]}"
            }
        except Exception as e:
            return {
                "success": False,
                "error": str(e),
                "operation": "resta"
            }
    
    @staticmethod
    def validate_matrix(matrix):
        """Validar que la matriz sea válida"""
        try:
            if not matrix or not isinstance(matrix, list):
                raise ValueError("La matriz debe ser una lista no vacía")
            
            # Verificar que sea una lista de listas
            if not all(isinstance(row, list) for row in matrix):
                raise ValueError("La matriz debe ser una lista de listas")
            
            # Verificar que todas las filas tengan la misma longitud
            row_lengths = [len(row) for row in matrix]
            if len(set(row_lengths)) > 1:
                raise ValueError("Todas las filas deben tener la misma longitud")
            
            # Verificar que no esté vacía
            if len(matrix) == 0 or len(matrix[0]) == 0:
                raise ValueError("La matriz no puede estar vacía")
            
            # Convertir a numpy para validaciones adicionales
            np_matrix = np.array(matrix, dtype=float)
            
            return {
                "valid": True,
                "shape": np_matrix.shape,
                "size": np_matrix.size,
                "dimensions": f"{np_matrix.shape[0]}x{np_matrix.shape[1]}",
                "contains_nan": bool(np.isnan(np_matrix).any()),
                "contains_inf": bool(np.isinf(np_matrix).any())
            }
        except Exception as e:
            return {
                "valid": False,
                "error": str(e)
            }
    
    @staticmethod
    def matrix_info(matrix):
        """Obtener información detallada de una matriz"""
        try:
            np_matrix = np.array(matrix, dtype=float)
            return {
                "success": True,
                "shape": np_matrix.shape,
                "size": np_matrix.size,
                "dimensions": f"{np_matrix.shape[0]}x{np_matrix.shape[1]}",
                "min_value": float(np.min(np_matrix)),
                "max_value": float(np.max(np_matrix)),
                "is_square": np_matrix.shape[0] == np_matrix.shape[1],
                "contains_zeros": bool((np_matrix == 0).any()),
                "all_positive": bool((np_matrix > 0).all()),
                "all_negative": bool((np_matrix < 0).all())
            }
        except Exception as e:
            return {
                "success": False,
                "error": str(e)
            }
    
    @staticmethod
    def multiply_matrices(matrix_a, matrix_b):
        """Multiplicación de dos matrices"""
        try:
            a = np.array(matrix_a, dtype=float)
            b = np.array(matrix_b, dtype=float)

            # verificar que se pueden multiplicar ( Columnas de A == Filas de B )

            if a.shape[1] != b.shape[0]:
                raise ValueError(f"No se pueden multiplicar: A({a.shape[0]}x{a.shape[1]}) × B({b.shape[0]}x{b.shape[1]}). "
                                 f"Las columnas de A ({a.shape[1]}) deben ser iguales a las filas de B ({b.shape[0]}).")
            
            result = np.dot(a, b)
            return {
                "success": True,
                "result": result.tolist(),
                "operation": "multiplicación",
                "dimensions_input": f"{a.shape[0]}x{a.shape[1]} × {b.shape[0]}x{b.shape[1]}",
                "dimensions_result": f"{result.shape[0]}x{result.shape[1]}"
            }
        except Exception as e:
            return {
                "success": False,
                "error": str(e),
                "operation": "multiplicación"
            }
        
    @staticmethod
    def transpose_matrix(matrix):
        """Transponer una matriz"""
        try:
            np_matrix = np.array(matrix, dtype=float)
            result = np_matrix.T
            return {
                "success": True,
                "result": result.tolist(),
                "operation": "transpuesta",
                "dimensions_input": f"{np_matrix.shape[0]}x{np_matrix.shape[1]}",
                "dimensions_result": f"{result.shape[0]}x{result.shape[1]}"
            }
        except Exception as e:
            return {
                "success": False,
                "error": str(e),
                "operation": "transpuesta"
            }
    
    @staticmethod
    def determinant_matrix(matrix):
        """Calcular el determinante de una matriz"""
        try:
            np_matrix = np.array(matrix, dtype=float)

            # Verificar que sea cuadrada
            if np_matrix.shape[0] != np_matrix.shape[1]:
                raise ValueError(f"La matriz debe ser cuadrada. Dimensiones actuales: {np_matrix.shape[0]}x{np_matrix.shape[1]}")
            
            det = np.linalg.det(np_matrix)
            return {
                "success": True,
                "result": float(det),
                "operation": "determinante",
                "dimensions": f"{np_matrix.shape[0]}x{np_matrix.shape[1]}",
                "is_singular": bool(abs(det) < 1e-10)  # Practicamente cero
            }
        except Exception as e:
            return {
                "success": False,
                "error": str(e),
                "operation": "determinante"
            }
    @staticmethod
    def matrix_properties(matrix):
        """Propiedades avanzadas de una matriz"""
        try:
            np_matrix = np.array(matrix, dtype=float)
            if np_matrix.size == 0:
                raise ValueError("La matriz no puede estar vacía")

            is_square = np_matrix.shape[0] == np_matrix.shape[1]

            properties = {
                "success": True,
                "shape": np_matrix.shape,
                "dimensions": f"{np_matrix.shape[0]}x{np_matrix.shape[1]}",
                "is_square": bool(is_square),
                "size": int(np_matrix.size),
                "min_value": float(np.min(np_matrix)),
                "max_value": float(np.max(np_matrix)),
                "mean": float(np.mean(np_matrix)),
                "contains_zeros": bool((np_matrix == 0).any()),
                "all_positive": bool((np_matrix > 0).all()),
                "all_negative": bool((np_matrix < 0).all()),
            }

            if is_square:
                try:
                    det = np.linalg.det(np_matrix)
                    properties.update({
                        "determinant": float(det),
                        "is_singular": bool(abs(det) < 1e-10),
                        "trace": float(np.trace(np_matrix)),
                        "is_diagonal": bool(np.allclose(np_matrix, np.diag(np.diagonal(np_matrix)))),
                        "is_identity": bool(np.allclose(np_matrix, np.eye(np_matrix.shape[0]))),
                        "is_symmetric": bool(np.allclose(np_matrix, np_matrix.T)),
                    })
                except Exception as e:
                    properties.update({
                        "determinant": None,
                        "is_singular": None,
                        "trace": None,
                        "is_diagonal": None,
                        "is_identity": None,
                        "is_symmetric": None
                    })

            return properties
        except Exception as e:
            return {
                "success": False,
                "error": str(e)
            }
