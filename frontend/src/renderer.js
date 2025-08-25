// Funciones para comunicarse con el backend
const API_BASE = 'http://localhost:5000';

async function testConnection() {
    try {
        const response = await fetch(`${API_BASE}/test`);
        const data = await response.json();
        console.log('Conexión exitosa:', data);
        return data;
    } catch (error) {
        console.error('Error de conexión:', error);
        return null;
    }
}

async function validateMatrix(matrix) {
    try {
        const response = await fetch(`${API_BASE}/validate-matrix`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ matrix })
        });
        return await response.json();
    } catch (error) {
        console.error('Error validando matriz:', error);
        return { valid: false, error: error.message };
    }
}

async function getMatrixInfo(matrix) {
    try {
        const response = await fetch(`${API_BASE}/matrix-info`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ matrix })
        });
        return await response.json();
    } catch (error) {
        console.error('Error obteniendo info de matriz:', error);
        return { success: false, error: error.message };
    }
}

async function addMatrices(matrixA, matrixB) {
    try {
        const response = await fetch(`${API_BASE}/add-matrices`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ 
                matrix_a: matrixA,
                matrix_b: matrixB 
            })
        });
        return await response.json();
    } catch (error) {
        console.error('Error sumando matrices:', error);
        return { success: false, error: error.message };
    }
}

async function subtractMatrices(matrixA, matrixB) {
    try {
        const response = await fetch(`${API_BASE}/subtract-matrices`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ 
                matrix_a: matrixA,
                matrix_b: matrixB 
            })
        });
        return await response.json();
    } catch (error) {
        console.error('Error restando matrices:', error);
        return { success: false, error: error.message };
    }
}

async function multiplyMatrices(matrixA, matrixB) {
    try {
        const response = await fetch(`${API_BASE}/multiply-matrices`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ 
                matrix_a: matrixA,
                matrix_b: matrixB 
            })
        });
        return await response.json();
    } catch (error) {
        console.error('Error multiplicando matrices:', error);
        return { success: false, error: error.message };
    }
}

async function transposeMatrix(matrix) {
    try {
        const response = await fetch(`${API_BASE}/transpose-matrix`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ matrix })
        });
        return await response.json();
    } catch (error) {
        console.error('Error transponiendo matriz:', error);
        return { success: false, error: error.message };
    }
}

async function determinantMatrix(matrix) {
    try {
        const response = await fetch(`${API_BASE}/determinant-matrix`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ matrix })
        });
        return await response.json();
    } catch (error) {
        console.error('Error calculando determinante:', error);
        return { success: false, error: error.message };
    }
}

async function getMatrixProperties(matrix) {
    try {
        const response = await fetch(`${API_BASE}/matrix-properties`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ matrix })
        });
        return await response.json();
    } catch (error) {
        console.error('Error obteniendo propiedades:', error);
        return { success: false, error: error.message };
    }
}

// Test inicial cuando carga la página
window.addEventListener('DOMContentLoaded', async () => {
    console.log('Aplicación cargada');
    const connection = await testConnection();
    if (connection) {
        console.log('✅ Backend conectado correctamente');
    } else {
        console.log('❌ No se pudo conectar con el backend');
    }
});