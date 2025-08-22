document.addEventListener('DOMContentLoaded', () => {
    const testBtn = document.getElementById('test-btn');
    const matrixTestBtn = document.getElementById('matrix-test-btn');
    const sumBtn = document.getElementById('sum-btn');
    const resultDiv = document.getElementById('test-result');
    const matrixResultDiv = document.getElementById('matrix-result');
    const sumResultDiv = document.getElementById('sum-result');
    const statusDiv = document.getElementById('connection-status');
    
    // Test inicial de conexión
    testInitialConnection();
    
    // Eventos de botones
    testBtn.addEventListener('click', async () => {
        const result = await testConnection();
        showResult(result, resultDiv, result ? 'green' : 'red');
    });
    
    matrixTestBtn.addEventListener('click', async () => {
        const exampleMatrix = [[1, 2], [3, 4]];
        const result = await validateMatrix(exampleMatrix);
        showMatrixResult(result, matrixResultDiv);
    });

    sumBtn.addEventListener('click', async () => {
        // Obtener valores de las matrices desde los inputs
        const matrixA = getMatrixFromInputs('a');
        const matrixB = getMatrixFromInputs('b');
        
        console.log('Matriz A:', matrixA);
        console.log('Matriz B:', matrixB);
        
        const result = await addMatrices(matrixA, matrixB);
        showSumResult(result, sumResultDiv);
    });
    
    function getMatrixFromInputs(prefix) {
        return [
            [
                parseFloat(document.getElementById(`${prefix}11`).value) || 0,
                parseFloat(document.getElementById(`${prefix}12`).value) || 0
            ],
            [
                parseFloat(document.getElementById(`${prefix}21`).value) || 0,
                parseFloat(document.getElementById(`${prefix}22`).value) || 0
            ]
        ];
    }
    
    function showSumResult(result, container) {
        if (result.success) {
            const matrix = result.result;
            container.className = 'mt-6 p-4 rounded bg-green-50 border border-green-200';
            container.innerHTML = `
                <h3 class="text-lg font-semibold text-green-800 mb-3">✅ Resultado de la suma:</h3>
                <div class="bg-white p-4 rounded border inline-block">
                    <div class="grid grid-cols-2 gap-2 text-center">
                        <div class="w-16 h-16 border flex items-center justify-center font-mono text-lg">${matrix[0][0]}</div>
                        <div class="w-16 h-16 border flex items-center justify-center font-mono text-lg">${matrix[0][1]}</div>
                        <div class="w-16 h-16 border flex items-center justify-center font-mono text-lg">${matrix[1][0]}</div>
                        <div class="w-16 h-16 border flex items-center justify-center font-mono text-lg">${matrix[1][1]}</div>
                    </div>
                </div>
            `;
        } else {
            container.className = 'mt-6 p-4 rounded bg-red-50 border border-red-200';
            container.innerHTML = `
                <h3 class="text-lg font-semibold text-red-800">❌ Error:</h3>
                <p class="text-red-600">${result.error}</p>
            `;
        }
        container.classList.remove('hidden');
    }
    
    async function testInitialConnection() {
        console.log('Iniciando test de conexión...');
        const result = await testConnection();
        if (result) {
            statusDiv.innerHTML = '✅ <span class="text-green-600 font-semibold">Backend conectado correctamente</span>';
        } else {
            statusDiv.innerHTML = '❌ <span class="text-red-600 font-semibold">Backend desconectado - Verifica que Flask esté ejecutándose</span>';
        }
    }
    
    function showResult(result, container, color) {
        const bgColor = color === 'green' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800';
        const icon = color === 'green' ? '✅' : '❌';
        
        if (result && result.message) {
            container.className = `mt-4 p-3 rounded ${bgColor}`;
            container.textContent = `${icon} ${result.message}`;
        } else {
            container.className = 'mt-4 p-3 rounded bg-red-100 text-red-800';
            container.textContent = '❌ Error de conexión con el backend';
        }
        container.classList.remove('hidden');
    }
    
    function showMatrixResult(result, container) {
        if (result.valid) {
            container.className = 'mt-4 p-3 rounded bg-green-100 text-green-800';
            container.innerHTML = `✅ Matriz válida<br>
                                 <strong>Dimensiones:</strong> ${result.shape[0]}x${result.shape[1]}<br>
                                 <strong>Elementos:</strong> ${result.size}`;
        } else {
            container.className = 'mt-4 p-3 rounded bg-red-100 text-red-800';
            container.textContent = `❌ Error: ${result.error}`;
        }
        container.classList.remove('hidden');
    }
});