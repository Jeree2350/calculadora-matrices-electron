document.addEventListener('DOMContentLoaded', () => {
    // Elementos existentes
    const testBtn = document.getElementById('test-btn');
    const matrixTestBtn = document.getElementById('matrix-test-btn');
    const sumBtn = document.getElementById('sum-btn');
    const subtractBtn = document.getElementById('subtract-btn');
    const multiplyBtn = document.getElementById('multiply-btn');
    
    // Nuevos elementos para operaciones con una matriz
    const transposeBtn = document.getElementById('transpose-btn');
    const determinantBtn = document.getElementById('determinant-btn');
    const propertiesBtn = document.getElementById('properties-btn');
    
    // Contenedores de resultados
    const resultDiv = document.getElementById('test-result');
    const matrixResultDiv = document.getElementById('matrix-result');
    const operationResultDiv = document.getElementById('operation-result');
    const singleOperationResultDiv = document.getElementById('single-operation-result');
    const operatorDisplay = document.getElementById('operator-display');
    const statusDiv = document.getElementById('connection-status');
    
    // Test inicial de conexión
    testInitialConnection();
    
    // Eventos existentes
    testBtn.addEventListener('click', async () => {
        const result = await testConnection();
        showResult(result, resultDiv, result ? 'green' : 'red');
    });
    
    matrixTestBtn.addEventListener('click', async () => {
        const exampleMatrix = [[1, 2], [3, 4]];
        const result = await validateMatrix(exampleMatrix);
        showMatrixResult(result, matrixResultDiv);
    });

    // Operaciones con dos matrices
    sumBtn.addEventListener('click', async () => {
        updateOperatorDisplay('+', 'blue');
        await performTwoMatrixOperation('suma');
    });

    subtractBtn.addEventListener('click', async () => {
        updateOperatorDisplay('-', 'red');
        await performTwoMatrixOperation('resta');
    });

    multiplyBtn.addEventListener('click', async () => {
        updateOperatorDisplay('×', 'purple');
        await performTwoMatrixOperation('multiplicación');
    });

    // Operaciones con una matriz
    transposeBtn.addEventListener('click', async () => {
        const matrix = getSingleMatrixFromInputs();
        const result = await transposeMatrix(matrix);
        showSingleOperationResult(result, 'transpuesta');
    });

    determinantBtn.addEventListener('click', async () => {
        const matrix = getSingleMatrixFromInputs();
        const result = await determinantMatrix(matrix);
        showDeterminantResult(result);
    });

    propertiesBtn.addEventListener('click', async () => {
        const matrix = getSingleMatrixFromInputs();
        const result = await getMatrixProperties(matrix);
        showPropertiesResult(result);
    });
    
    function updateOperatorDisplay(symbol, color) {
        operatorDisplay.textContent = symbol;
        operatorDisplay.className = `text-3xl font-bold text-${color}-500`;
    }
    
    async function performTwoMatrixOperation(operation) {
        showLoading(operationResultDiv);
        
        const matrixA = getMatrixFromInputs('a');
        const matrixB = getMatrixFromInputs('b');
        
        console.log(`Realizando ${operation}:`, { matrixA, matrixB });
        
        // Validar matrices primero
        const validationA = await validateMatrix(matrixA);
        const validationB = await validateMatrix(matrixB);
        
        if (!validationA.valid) {
            showError(operationResultDiv, `Error en Matriz A: ${validationA.error}`);
            return;
        }
        
        if (!validationB.valid) {
            showError(operationResultDiv, `Error en Matriz B: ${validationB.error}`);
            return;
        }
        
        // Realizar operación
        let result;
        switch(operation) {
            case 'suma':
                result = await addMatrices(matrixA, matrixB);
                break;
            case 'resta':
                result = await subtractMatrices(matrixA, matrixB);
                break;
            case 'multiplicación':
                result = await multiplyMatrices(matrixA, matrixB);
                break;
        }
        
        showOperationResult(result, operationResultDiv);
    }
    
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

    function getSingleMatrixFromInputs() {
        return [
            [
                parseFloat(document.getElementById('single11').value) || 0,
                parseFloat(document.getElementById('single12').value) || 0
            ],
            [
                parseFloat(document.getElementById('single21').value) || 0,
                parseFloat(document.getElementById('single22').value) || 0
            ]
        ];
    }
    
    function showSingleOperationResult(result, operationType) {
        if (result.success) {
            const matrix = result.result;
            singleOperationResultDiv.className = 'min-h-32 p-4 bg-teal-50 rounded border border-teal-200';
            singleOperationResultDiv.innerHTML = `
                <h4 class="font-semibold text-teal-800 mb-3">✅ ${operationType.charAt(0).toUpperCase() + operationType.slice(1)}</h4>
                <div class="bg-white p-3 rounded border inline-block">
                    <div class="grid grid-cols-2 gap-2">
                        <div class="w-16 h-12 border flex items-center justify-center font-mono text-sm">
                            ${formatNumber(matrix[0][0])}
                        </div>
                        <div class="w-16 h-12 border flex items-center justify-center font-mono text-sm">
                            ${formatNumber(matrix[0][1])}
                        </div>
                        <div class="w-16 h-12 border flex items-center justify-center font-mono text-sm">
                            ${formatNumber(matrix[1][0])}
                        </div>
                        <div class="w-16 h-12 border flex items-center justify-center font-mono text-sm">
                            ${formatNumber(matrix[1][1])}
                        </div>
                    </div>
                </div>
                <p class="text-sm text-teal-600 mt-2">
                    ${result.dimensions_input} → ${result.dimensions_result}
                </p>
            `;
        } else {
            showSingleError(result.error);
        }
    }

    function showDeterminantResult(result) {
        if (result.success) {
            singleOperationResultDiv.className = 'min-h-32 p-4 bg-orange-50 rounded border border-orange-200';
            singleOperationResultDiv.innerHTML = `
                <h4 class="font-semibold text-orange-800 mb-3">📊 Determinante</h4>
                <div class="bg-white p-4 rounded border text-center">
                    <div class="text-3xl font-mono font-bold text-orange-600 mb-2">
                        ${formatNumber(result.result)}
                    </div>
                    <p class="text-sm text-orange-600">
                        Matriz ${result.dimensions}
                    </p>
                    ${result.is_singular ? 
                        '<p class="text-xs text-red-500 mt-2">⚠️ Matriz singular (det ≈ 0)</p>' : 
                        '<p class="text-xs text-green-600 mt-2">✅ Matriz no singular</p>'
                    }
                </div>
            `;
        } else {
            showSingleError(result.error);
        }
    }

    function showPropertiesResult(result) {
        if (result.success) {
            singleOperationResultDiv.className = 'min-h-32 p-4 bg-indigo-50 rounded border border-indigo-200 text-sm';
            
            let propertiesHTML = `
                <h4 class="font-semibold text-indigo-800 mb-3">🔎 Propiedades de la Matriz</h4>
                <div class="grid grid-cols-2 gap-4">
                    <div>
                        <p><strong>Dimensiones:</strong> ${result.dimensions}</p>
                        <p><strong>Elementos:</strong> ${result.size}</p>
                        <p><strong>Min/Max:</strong> 
                            ${formatNumber(result.min_value)} / ${formatNumber(result.max_value)}
                        </p>
                        <p><strong>Media:</strong> ${formatNumber(result.mean)}</p>
                    </div>
                    <div>
                        <p><strong>Cuadrada:</strong> ${result.is_square ? '✅ Sí' : '❌ No'}</p>
                        <p><strong>Contiene ceros:</strong> ${result.contains_zeros ? '✅ Sí' : '❌ No'}</p>
                        <p><strong>Todos positivos:</strong> ${result.all_positive ? '✅ Sí' : '❌ No'}</p>
                        <p><strong>Todos negativos:</strong> ${result.all_negative ? '✅ Sí' : '❌ No'}</p>
            `;

            // Propiedades adicionales para matrices cuadradas
            if (result.is_square && result.determinant !== undefined) {
                propertiesHTML += `
                    </div>
                </div>
                <div class="mt-4 pt-4 border-t border-indigo-200">
                    <h5 class="font-semibold text-indigo-700 mb-2">Propiedades Adicionales (Matriz Cuadrada):</h5>
                    <div class="grid grid-cols-2 gap-4">
                        <div>
                            <p><strong>Determinante:</strong> ${formatNumber(result.determinant)}</p>
                            <p><strong>Traza:</strong> ${formatNumber(result.trace)}</p>
                            <p><strong>Singular:</strong> ${result.is_singular ? '✅ Sí' : '❌ No'}</p>
                        </div>
                        <div>
                            <p><strong>Diagonal:</strong> ${result.is_diagonal ? '✅ Sí' : '❌ No'}</p>
                            <p><strong>Identidad:</strong> ${result.is_identity ? '✅ Sí' : '❌ No'}</p>
                            <p><strong>Simétrica:</strong> ${result.is_symmetric ? '✅ Sí' : '❌ No'}</p>
                        </div>
                    </div>
                </div>
                `;
            } else {
                propertiesHTML += '</div></div>';
            }

            singleOperationResultDiv.innerHTML = propertiesHTML;
        } else {
            showSingleError(result.error);
        }
    }

    function showSingleError(errorMessage) {
        singleOperationResultDiv.className = 'min-h-32 p-4 bg-red-50 rounded border border-red-200';
        singleOperationResultDiv.innerHTML = `
            <h4 class="font-semibold text-red-800 mb-2">❌ Error</h4>
            <p class="text-red-600 text-sm">${errorMessage}</p>
        `;
    }
    
    // Funciones auxiliares existentes...
    function showLoading(container) {
        container.className = 'mt-6 p-4 rounded bg-blue-50 border border-blue-200';
        container.innerHTML = `
            <div class="flex items-center justify-center">
                <div class="animate-spin rounded-full h-6 w-6 border-b-2 border-blue-600 mr-3"></div>
                <span class="text-blue-600">Calculando...</span>
            </div>
        `;
        container.classList.remove('hidden');
    }
    
    function showError(container, errorMessage) {
        container.className = 'mt-6 p-4 rounded bg-red-50 border border-red-200';
        container.innerHTML = `
            <h3 class="text-lg font-semibold text-red-800 mb-2">❌ Error</h3>
            <p class="text-red-600">${errorMessage}</p>
        `;
        container.classList.remove('hidden');
    }
    
    function showOperationResult(result, container) {
        if (result.success) {
            const matrix = result.result;
            const operationName = result.operation.charAt(0).toUpperCase() + result.operation.slice(1);
            let color = 'blue';
            
            if (result.operation === 'resta') color = 'red';
            else if (result.operation === 'multiplicación') color = 'purple';
            
            container.className = `mt-6 p-4 rounded bg-${color}-50 border border-${color}-200`;
            container.innerHTML = `
                <div class="flex items-start justify-between mb-4">
                    <h3 class="text-lg font-semibold text-${color}-800">✅ ${operationName}</h3>
                    <span class="text-sm text-${color}-600 bg-${color}-100 px-2 py-1 rounded">
                        ${result.dimensions_result || result.dimensions}
                    </span>
                </div>
                <div class="flex items-center space-x-4">
                    <div class="bg-white p-4 rounded border shadow-sm">
                        <div class="text-sm text-gray-500 mb-2 text-center">Resultado</div>
                        <div class="grid grid-cols-2 gap-2">
                            <div class="w-20 h-16 border-2 border-${color}-200 flex items-center justify-center font-mono text-lg bg-${color}-25">
                                ${formatNumber(matrix[0][0])}
                            </div>
                            <div class="w-20 h-16 border-2 border-${color}-200 flex items-center justify-center font-mono text-lg bg-${color}-25">
                                ${formatNumber(matrix[0][1])}
                            </div>
                            <div class="w-20 h-16 border-2 border-${color}-200 flex items-center justify-center font-mono text-lg bg-${color}-25">
                                ${formatNumber(matrix[1][0])}
                            </div>
                            <div class="w-20 h-16 border-2 border-${color}-200 flex items-center justify-center font-mono text-lg bg-${color}-25">
                                ${formatNumber(matrix[1][1])}
                            </div>
                        </div>
                    </div>
                    <div class="text-${color}-600">
                        <p class="text-sm"><strong>Operación:</strong> ${operationName}</p>
                        <p class="text-sm"><strong>Entrada:</strong> ${result.dimensions_input || result.dimensions}</p>
                        <p class="text-sm"><strong>Resultado:</strong> ${result.dimensions_result || result.dimensions}</p>
                        <p class="text-sm"><strong>Estado:</strong> Completada exitosamente</p>
                    </div>
                </div>
            `;
        } else {
            container.className = 'mt-6 p-4 rounded bg-red-50 border border-red-200';
            container.innerHTML = `
                <h3 class="text-lg font-semibold text-red-800 mb-2">❌ Error en la ${result.operation}</h3>
                <p class="text-red-600">${result.error}</p>
                <div class="mt-3 p-3 bg-red-100 rounded text-sm text-red-700">
                    <strong>Consejo:</strong> ${getOperationTip(result.operation)}
                </div>
            `;
        }
        container.classList.remove('hidden');
    }

    function getOperationTip(operation) {
        const tips = {
            'suma': 'Verifica que ambas matrices tengan las mismas dimensiones.',
            'resta': 'Verifica que ambas matrices tengan las mismas dimensiones.',
            'multiplicación': 'Para A × B, el número de columnas de A debe ser igual al número de filas de B.',
            'determinante': 'El determinante solo se puede calcular para matrices cuadradas.',
            'transpuesta': 'La transpuesta se puede calcular para cualquier matriz.'
        };
        return tips[operation] || 'Verifica que los datos de entrada sean válidos.';
    }
    
    function formatNumber(num) {
    return (typeof num === 'number' && !isNaN(num)) ? parseFloat(num.toFixed(3)).toString() : '—';
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
            const warnings = [];
            if (result.contains_nan) warnings.push("Contiene valores NaN");
            if (result.contains_inf) warnings.push("Contiene valores infinitos");
            
            container.className = 'mt-4 p-3 rounded bg-green-100 text-green-800';
            container.innerHTML = `
                ✅ Matriz válida<br>
                <strong>Dimensiones:</strong> ${result.dimensions}<br>
                <strong>Elementos:</strong> ${result.size}
                ${warnings.length > 0 ? `<br><span class="text-yellow-600">⚠️ ${warnings.join(', ')}</span>` : ''}
            `;
        } else {
            container.className = 'mt-4 p-3 rounded bg-red-100 text-red-800';
            container.textContent = `❌ Error: ${result.error}`;
        }
        container.classList.remove('hidden');
    }
});