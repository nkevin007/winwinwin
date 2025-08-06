<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>WinWinWin: Limit Visualizer + Calculator</title>
    <!-- The script tag below assumes your main JavaScript logic is in a file named `script.js` or directly embedded -->
    <!-- For this example, I'm embedding the JS directly for a self-contained file. -->
    <!-- If you prefer a separate script.js, remove the <script> block at the end and link it here. -->
    <link rel="stylesheet" href="style.css">
</head>
<body>
    <div class="container">
        <h1>📈 WinWinWin: Limit Visualizer</h1>
        
        <div class="math-help">
            <h3>📚 Mathematical Functions & Examples:</h3>
            <div class="math-examples">
                <div><strong>Basic:</strong> x^2, 2*x+1</div>
                <div><strong>Exponential:</strong> e^x, 2^x</div>
                <div><strong>Logarithmic:</strong> ln(x), log(x)</div>
                <div><strong>Trigonometric:</strong> sin(x), cos(x)</div>
                <div><strong>Square Root:</strong> sqrt(x)</div>
                <div><strong>Absolute:</strong> abs(x)</div>
                <div><strong>Constants:</strong> pi, e</div>
                <div><strong>Complex:</strong> (x^2-1)/(x-1)</div>
            </div>
        </div>

        <div class="two-column">
            <div>
                <h2>📈 Function Limits & Graphing</h2>
                <div class="input-group">
                    <label for="functionInput">Enter function f(x):</label>
                    <input type="text" id="functionInput" placeholder="e.g., sin(x)/x, ln(x), e^x, x^2" value="sin(x)/x">
                    
                    <div class="function-buttons">
                        <button onclick="insertFunction('sin(x)')">sin(x)</button>
                        <button onclick="insertFunction('cos(x)')">cos(x)</button>
                        <button onclick="insertFunction('tan(x)')">tan(x)</button>
                        <button onclick="insertFunction('ln(x)')">ln(x)</button>
                        <button onclick="insertFunction('log(x)')">log(x)</button>
                        <button onclick="insertFunction('e^x')">e^x</button>
                        <button onclick="insertFunction('x^2')">x²</button>
                        <button onclick="insertFunction('sqrt(x)')">√x</button>
                        <button onclick="insertFunction('abs(x)')">|x|</button>
                        <button onclick="insertFunction('1/x')">1/x</button>
                        <button onclick="insertFunction('pi')">π</button>
                        <button onclick="insertFunction('e')">e</button>
                    </div>
                </div>

                <div class="input-group">
                    <label for="approachesInput">x approaches:</label>
                    <input type="number" id="approachesInput" placeholder="e.g., 0" step="any" value="0">
                </div>

                <button id="calculateBtn">📊 Generate Table & Graph</button>
                
                <div class="graph-controls">
                    <label for="xMin">X Min:</label>
                    <input type="number" id="xMin" step="any">
                    
                    <label for="xMax">X Max:</label>
                    <input type="number" id="xMax" step="any">
                    
                    <label for="yMin">Y Min:</label>
                    <input type="number" id="yMin" step="any">
                    
                    <label for="yMax">Y Max:</label>
                    <input type="number" id="yMax" step="any">
                    
                    <button id="resetZoom">🔄 Reset Zoom</button>
                    <button id="clearAll">🗑️ Clear All</button>
                </div>
            </div>

            <div>
                <h2>🧮 Scientific Calculator</h2>
                <div class="calc-section">
                    <label for="calcInput">Enter mathematical expression:</label>
                    <input type="text" id="calcInput" placeholder="e.g., sin(pi/2), ln(e), 2^3, sqrt(16)" value="">
                    
                    <div class="function-buttons">
                        <button onclick="insertCalcFunction('sin(')">sin</button>
                        <button onclick="insertCalcFunction('cos(')">cos</button>
                        <button onclick="insertCalcFunction('tan(')">tan</button>
                        <button onclick="insertCalcFunction('asin(')">asin</button>
                        <button onclick="insertCalcFunction('acos(')">acos</button>
                        <button onclick="insertCalcFunction('atan(')">atan</button>
                        <button onclick="insertCalcFunction('ln(')">ln</button>
                        <button onclick="insertCalcFunction('log(')">log</button>
                        <button onclick="insertCalcFunction('exp(')">exp</button>
                        <button onclick="insertCalcFunction('sqrt(')">√</button>
                        <button onclick="insertCalcFunction('abs(')">|x|</button>
                        <button onclick="insertCalcFunction('^')">^</button>
                        <button onclick="insertCalcFunction('pi')">π</button>
                        <button onclick="insertCalcFunction('e')">e</button>
                        <button onclick="insertCalcFunction('(')">(</button>
                        <button onclick="insertCalcFunction(')')">)</button>
                    </div>
                    
                    <button id="evalCalc">= Calculate</button>
                    <div id="calcOutput">
                        <span class="calc-placeholder">Enter an expression above...</span>
                    </div>
                </div>
            </div>
        </div>

        <div class="canvas-wrapper">
            <canvas id="graphCanvas"></canvas>
        </div>

        <div id="tableContainer"></div>
    </div>

    <script type="module">
        import { create, all } from 'https://cdn.jsdelivr.net/npm/mathjs@11.11.0/+esm';

        const math = create(all);

        // DOM elements
        const fInput = document.getElementById('functionInput');
        const xApproach = document.getElementById('approachesInput');
        const calculateBtn = document.getElementById('calculateBtn');
        const tableContainer = document.getElementById('tableContainer');
        const calcInput = document.getElementById('calcInput');
        const evalCalc = document.getElementById('evalCalc');
        const calcOutput = document.getElementById('calcOutput');
        const xMinInput = document.getElementById('xMin');
        const xMaxInput = document.getElementById('xMax');
        const yMinInput = document.getElementById('yMin');
        const yMaxInput = document.getElementById('yMax');
        const resetZoomBtn = document.getElementById('resetZoom');
        const clearAllBtn = document.getElementById('clearAll');

        // Canvas and rendering
        let canvas = document.getElementById('graphCanvas');
        let ctx = canvas.getContext('2d');
        let currentFunction = '';
        let currentApproach = 0;
        let canvasWidth = 0;
        let canvasHeight = 0;
        let graphBounds = { xMin: -10, xMax: 10, yMin: -10, yMax: 10 };

        // Mathematical result types
        const ResultType = {
            FINITE: 'finite',
            UNDEFINED: 'undefined',
            MATH_ERROR: 'math_error',
            SYNTAX_ERROR: 'syntax_error',
            DOMAIN_ERROR: 'domain_error',
            COMPLEX: 'complex'
        };

        // Function insertion helpers
        window.insertFunction = function(func) {
            const input = fInput;
            const cursorPos = input.selectionStart;
            const textBefore = input.value.substring(0, cursorPos);
            const textAfter = input.value.substring(input.selectionEnd);
            
            input.value = textBefore + func + textAfter;
            input.focus();
            input.setSelectionRange(cursorPos + func.length, cursorPos + func.length);
            validateFunctionInput();
        };

        window.insertCalcFunction = function(func) {
            const input = calcInput;
            const cursorPos = input.selectionStart;
            const textBefore = input.value.substring(0, cursorPos);
            const textAfter = input.value.substring(input.selectionEnd);
            
            input.value = textBefore + func + textAfter;
            input.focus();
            input.setSelectionRange(cursorPos + func.length, cursorPos + func.length);
            evaluateScientificCalc();
        };

        // Enhanced mathematical evaluation with comprehensive error handling
        function evaluateMathExpression(expression, variables = {}) {
            try {
                // Simplified pre-processing for common mathematical notations
                let processedExpr = expression
                    // Handle exponents (Math.js also accepts '^', but '**' is explicit)
                    .replace(/\^/g, '**')
                    // Ensure parentheses around exponents for clarity, e.g., x**(2)
                    .replace(/(\d+|\w+|\))\*\*(\d+|\w+|\()/g, '($1)**($2)')
                    
                    // Handle 'e^x' as exp(x) for user convenience
                    .replace(/e\^/g, 'exp(')
                    
                    // Handle absolute value |x| to abs(x) for user convenience
                    .replace(/\|([^|]+)\|/g, 'abs($1)')
                    
                    // Handle unicode pi character
                    .replace(/π/g, 'pi')

                    // Handle implicit multiplication (e.g., 2x -> 2*x, (x+1)(x-1) -> (x+1)*(x-1))
                    .replace(/(\d)([a-zA-Z\(])/g, '$1*$2')
                    .replace(/\)(\d)/g, ')*$1')
                    .replace(/\)\(/g, ')*(');
                
                const expr = math.parse(processedExpr);
                const code = expr.compile();
                const result = code.evaluate({ 
                    ...variables, 
                    // Explicitly map common functions and constants to Math.js equivalents
                    // Math.js 'all' includes these, but explicit mapping can prevent conflicts
                    e: Math.E, 
                    pi: Math.PI,
                    exp: Math.exp, // e^x
                    log: Math.log, // Natural logarithm (ln)
                    log10: Math.log10, // Base 10 logarithm
                    log2: Math.log2, // Base 2 logarithm
                    sin: Math.sin,
                    cos: Math.cos,
                    tan: Math.tan,
                    asin: Math.asin,
                    acos: Math.acos,
                    atan: Math.atan,
                    sinh: Math.sinh,
                    cosh: Math.cosh,
                    tanh: Math.tanh,
                    sqrt: Math.sqrt,
                    cbrt: Math.cbrt, // Cube root
                    abs: Math.abs
                });
                
                return analyzeResult(result, expression, variables);
            } catch (error) {
                // Log the full error for debugging purposes
                console.error("Math evaluation error for expression:", expression, "variables:", variables, "Error:", error);
                return handleMathError(error, expression, variables);
            }
        }

        // Analyze mathematical results and categorize them
        function analyzeResult(result, expression, variables) {
            // Handle complex numbers
            if (typeof result === 'object' && result.re !== undefined) {
                if (Math.abs(result.im) < 1e-10) {
                    // If imaginary part is negligible, treat as real number
                    return analyzeResult(result.re, expression, variables);
                }
                return {
                    type: ResultType.COMPLEX,
                    value: result,
                    display: `${result.re.toFixed(3)} + ${result.im.toFixed(3)}i`
                };
            }
            
            // Handle arrays/matrices (though less common in simple graphing)
            if (Array.isArray(result)) {
                return {
                    type: ResultType.FINITE,
                    value: result,
                    display: result.toString()
                };
            }
            
            // Handle numbers
            if (typeof result === 'number') {
                if (isNaN(result)) {
                    return {
                        type: ResultType.UNDEFINED,
                        value: NaN,
                        display: 'Undefined'
                    };
                }
                
                // All infinities are "Undefined" like common calculators
                if (!isFinite(result)) {
                    return {
                        type: ResultType.UNDEFINED,
                        value: NaN,
                        display: 'Undefined'
                    };
                }
                
                // Finite number
                return {
                    type: ResultType.FINITE,
                    value: result,
                    display: formatNumber(result)
                };
            }
            
            // Handle other types (e.g., boolean, string if Math.js returns them)
            return {
                type: ResultType.FINITE,
                value: result,
                display: result.toString()
            };
        }

        // Handle mathematical errors
        function handleMathError(error, expression, variables) {
            const errorMsg = error.message.toLowerCase();
            
            // Specific error checks for better categorization
            if (errorMsg.includes('division by zero') || errorMsg.includes('divide by zero')) {
                return {
                    type: ResultType.UNDEFINED,
                    value: NaN,
                    display: 'Undefined'
                };
            }
            
            // Domain errors (e.g., sqrt of negative, asin/acos outside [-1, 1])
            if (errorMsg.includes('sqrt') || errorMsg.includes('asin') || errorMsg.includes('acos') || errorMsg.includes('domain error')) {
                return {
                    type: ResultType.MATH_ERROR,
                    value: NaN,
                    display: 'Math Error'
                };
            }
            
            // Logarithm errors (e.g., log of non-positive number)
            if (errorMsg.includes('log') && (errorMsg.includes('non-positive') || errorMsg.includes('domain'))) {
                return {
                    type: ResultType.MATH_ERROR,
                    value: NaN,
                    display: 'Math Error'
                };
            }
            
            // Syntax errors (parsing issues)
            if (errorMsg.includes('syntax') || errorMsg.includes('unexpected') || errorMsg.includes('parse')) {
                return {
                    type: ResultType.SYNTAX_ERROR,
                    value: NaN,
                    display: 'Syntax Error'
                };
            }
            
            // Generic fallback error
            return {
                type: ResultType.UNDEFINED, // Using UNDEFINED as a general "couldn't compute"
                value: NaN,
                display: 'Error'
            };
        }

        // Smart number formatting for display
        function formatNumber(num) {
            if (!isFinite(num)) return num.toString();
            
            const absNum = Math.abs(num);
            
            // Use scientific notation for very small or very large numbers
            if ((absNum < 1e-4 && absNum !== 0) || absNum >= 1e6) {
                return num.toExponential(3); // 3 decimal places in exponent
            }
            
            // For numbers between 0.0001 and 1, show more precision
            if (absNum < 1) {
                return num.toFixed(6).replace(/\.?0+$/, ''); // Max 6 decimal places, remove trailing zeros
            }
            
            // For numbers between 1 and 100, show 3 decimal places
            if (absNum < 100) {
                return num.toFixed(3).replace(/\.?0+$/, ''); // Max 3 decimal places, remove trailing zeros
            }
            
            // For larger integers, show 1 decimal place if needed
            return num.toFixed(1).replace(/\.0$/, ''); // 1 decimal place, remove .0 if integer
        }

        // Function evaluation for graphing (returns null if not finite)
        function evaluateFunction(fnString, xValue) {
            const result = evaluateMathExpression(fnString, { x: xValue });
            
            switch (result.type) {
                case ResultType.FINITE:
                    // Prevent plotting extremely large values that would distort the graph
                    if (Math.abs(result.value) > 1e10) return null;
                    return result.value;
                
                default:
                    return null; // Don't plot non-finite, error, or complex results
            }
        }

        // Canvas setup for high-DPI displays
        function setupCanvas() {
            const container = canvas.parentElement;
            const rect = container.getBoundingClientRect();
            
            const dpr = window.devicePixelRatio || 1; // Get device pixel ratio
            
            canvasWidth = rect.width;
            canvasHeight = rect.height;
            
            canvas.width = canvasWidth * dpr;
            canvas.height = canvasHeight * dpr;
            
            ctx.scale(dpr, dpr); // Scale context to match device pixel ratio
            
            ctx.textBaseline = 'middle';
            ctx.imageSmoothingEnabled = true;
            ctx.imageSmoothingQuality = 'high';
        }

        // Generate points for graphing, handling discontinuities
        function generatePoints(fnString, xMin, xMax, numPoints = 1000) {
            const points = [];
            const step = (xMax - xMin) / numPoints;
            
            let lastY = null;
            
            for (let i = 0; i <= numPoints; i++) {
                const x = xMin + i * step;
                const y = evaluateFunction(fnString, x);
                
                if (y !== null) {
                    // Detect large jumps (discontinuities) to prevent drawing lines across them
                    if (lastY !== null && Math.abs(y - lastY) > (Math.abs(lastY) * 10 + 100)) {
                        points.push(null); // Insert null to break the line
                    }
                    
                    points.push({ x, y });
                    lastY = y;
                } else {
                    // If current point is null, and previous wasn't, break the line
                    if (points.length > 0 && points[points.length - 1] !== null) {
                        points.push(null);
                    }
                    lastY = null;
                }
            }
            
            return points;
        }

        // Find initial graph bounds based on function behavior around approach point
        function findGraphBounds(fnString, approach) {
            const testRange = 5; // Initial range to sample around the approach point
            let xMin = approach - testRange;
            let xMax = approach + testRange;
            
            // Override with user-defined min/max if provided
            if (xMinInput.value !== '') xMin = parseFloat(xMinInput.value);
            if (xMaxInput.value !== '') xMax = parseFloat(xMaxInput.value);
            
            const samplePoints = [];
            // Sample points across the x-range to determine a reasonable y-range
            for (let x = xMin; x <= xMax; x += (xMax - xMin) / 200) {
                const y = evaluateFunction(fnString, x);
                if (y !== null && Math.abs(y) < 1e6) { // Exclude very large values from auto-scaling
                    samplePoints.push(y);
                }
            }
            
            let yMin, yMax;
            if (samplePoints.length > 0) {
                yMin = Math.min(...samplePoints);
                yMax = Math.max(...samplePoints);
                
                const yRange = yMax - yMin;
                // Add padding to y-axis for better visualization
                const yPadding = Math.max(yRange * 0.1, 0.1); // Ensure minimum padding
                yMin -= yPadding;
                yMax += yPadding;
            } else {
                // Default y-bounds if no valid points are found
                yMin = -10;
                yMax = 10;
            }
            
            // Override with user-defined y-min/max if provided
            if (yMinInput.value !== '') yMin = parseFloat(yMinInput.value);
            if (yMaxInput.value !== '') yMax = parseFloat(yMaxInput.value);
            
            return { xMin, xMax, yMin, yMax };
        }

        // Convert mathematical coordinates to canvas coordinates
        function mathToCanvas(x, y, bounds) {
            const canvasX = ((x - bounds.xMin) / (bounds.xMax - bounds.xMin)) * canvasWidth;
            const canvasY = canvasHeight - ((y - bounds.yMin) / (bounds.yMax - bounds.yMin)) * canvasHeight;
            return { x: canvasX, y: canvasY };
        }

        // Convert canvas coordinates to mathematical coordinates (for future interactivity)
        function canvasToMath(canvasX, canvasY, bounds) {
            const x = (canvasX / canvasWidth) * (bounds.xMax - bounds.xMin) + bounds.xMin;
            const y = ((canvasHeight - canvasY) / canvasHeight) * (bounds.yMax - bounds.yMin) + bounds.yMin;
            return { x, y };
        }

        // Main function to draw the graph (grid, axes, function)
        function drawGraph() {
            ctx.clearRect(0, 0, canvasWidth, canvasHeight); // Clear canvas
            
            drawGrid(graphBounds);
            drawAxes(graphBounds);
            
            if (currentFunction) {
                const points = generatePoints(currentFunction, graphBounds.xMin, graphBounds.xMax);
                drawFunction(points, graphBounds);
            }
        }

        // Draw the grid lines on the canvas
        function drawGrid(bounds) {
            const xRange = bounds.xMax - bounds.xMin;
            const yRange = bounds.yMax - bounds.yMin;
            // Calculate appropriate step for grid lines based on range and canvas size
            const xStep = calculateStep(xRange, canvasWidth / 100); 
            const yStep = calculateStep(yRange, canvasHeight / 100);
            
            ctx.strokeStyle = '#e5e7eb'; // Light gray for grid
            ctx.lineWidth = 1;
            
            // Vertical grid lines
            for (let x = Math.ceil(bounds.xMin / xStep) * xStep; x <= bounds.xMax; x += xStep) {
                const { x: cx } = mathToCanvas(x, 0, bounds);
                ctx.beginPath();
                ctx.moveTo(cx, 0);
                ctx.lineTo(cx, canvasHeight);
                ctx.stroke();
            }
            
            // Horizontal grid lines
            for (let y = Math.ceil(bounds.yMin / yStep) * yStep; y <= bounds.yMax; y += yStep) {
                const { y: cy } = mathToCanvas(0, y, bounds);
                ctx.beginPath();
                ctx.moveTo(0, cy);
                ctx.lineTo(canvasWidth, cy);
                ctx.stroke();
            }
        }

        // Draw the X and Y axes and their labels
        function drawAxes(bounds) {
            ctx.strokeStyle = '#6b7280'; // Darker gray for axes
            ctx.lineWidth = 2;

            const { x: xOrigin, y: yOrigin } = mathToCanvas(0, 0, bounds);

            // X-axis
            ctx.beginPath();
            ctx.moveTo(0, yOrigin);
            ctx.lineTo(canvasWidth, yOrigin);
            ctx.stroke();

            // Y-axis
            ctx.beginPath();
            ctx.moveTo(xOrigin, 0);
            ctx.lineTo(xOrigin, canvasHeight);
            ctx.stroke();

            ctx.fillStyle = '#374151'; // Dark text for labels
            ctx.font = '12px Segoe UI';

            // X-axis labels
            const xRange = bounds.xMax - bounds.xMin;
            const xStep = calculateStep(xRange, canvasWidth / 100);
            for (let x = Math.ceil(bounds.xMin / xStep) * xStep; x <= bounds.xMax; x += xStep) {
                const { x: cx, y: cy } = mathToCanvas(x, 0, bounds);
                if (Math.abs(x) > 1e-6) { // Avoid labeling zero twice (for x and y axes)
                    ctx.fillText(formatNumber(x), cx, cy > canvasHeight - 15 ? canvasHeight - 15 : cy + 15);
                }
            }

            // Y-axis labels
            const yRange = bounds.yMax - bounds.yMin;
            const yStep = calculateStep(yRange, canvasHeight / 100);
            for (let y = Math.ceil(bounds.yMin / yStep) * yStep; y <= bounds.yMax; y += yStep) {
                const { x: cx, y: cy } = mathToCanvas(0, y, bounds);
                if (Math.abs(y) > 1e-6) { // Avoid labeling zero twice
                    ctx.fillText(formatNumber(y), cx > canvasWidth - 40 ? canvasWidth - 40 : cx + 5, cy);
                }
            }
        }

        // Helper to calculate optimal step for grid lines and labels
        function calculateStep(range, targetTicks) {
            const magnitude = Math.pow(10, Math.floor(Math.log10(range / targetTicks)));
            const potentialSteps = [1, 2, 5]; // Common nice numbers for steps
            let bestStep = 1;

            for (const step of potentialSteps) {
                if (range / (magnitude * step) > targetTicks / 2) {
                    bestStep = step;
                }
            }
            return bestStep * magnitude;
        }

        // Draw the function line on the canvas
        function drawFunction(points, bounds) {
            ctx.strokeStyle = '#ef4444'; // Red for the function line
            ctx.lineWidth = 3;
            
            ctx.beginPath();
            let first = true; // Flag to handle discontinuities
            
            for (let i = 0; i < points.length; i++) {
                const p = points[i];
                if (p === null) { // If a discontinuity (null point) is encountered
                    if (!first) {
                        ctx.stroke(); // Draw the segment up to this point
                        ctx.closePath();
                    }
                    ctx.beginPath(); // Start a new path for the next segment
                    first = true;
                    continue;
                }
                
                const { x, y } = mathToCanvas(p.x, p.y, bounds);
                
                // Only draw points within a slightly extended canvas view to avoid clipping issues
                if (x >= -10 && x <= canvasWidth + 10 && y >= -10 && y <= canvasHeight + 10) {
                    if (first) {
                        ctx.moveTo(x, y); // Move to the first point of a segment
                        first = false;
                    } else {
                        ctx.lineTo(x, y); // Draw line to the next point
                    }
                } else if (!first) {
                    // If point is outside view and a segment was being drawn, close and stroke it
                    ctx.stroke();
                    ctx.closePath();
                    ctx.beginPath();
                    first = true;
                }
            }
            
            ctx.stroke(); // Draw any remaining segment
        }

        // Generate and populate the limit table
        function generateTable(fnString, approach) {
            tableContainer.innerHTML = '<h2>📝 Limit Table</h2>';
            const table = document.createElement('table');
            table.innerHTML = `
                <thead>
                    <tr>
                        <th>x</th>
                        <th>f(x)</th>
                    </tr>
                </thead>
                <tbody></tbody>
            `;
            const tbody = table.querySelector('tbody');
            
            // Define steps to approach the limit from left and right
            const steps = [1, 0.1, 0.01, 0.001, 0.0001, 0.00001, 0.000001];
            
            // Points to the left of the limit
            for (const step of steps) {
                const x = approach - step;
                const result = evaluateMathExpression(fnString, { x });
                const row = createTableRow(x, result, approach);
                tbody.appendChild(row);
            }
            
            // Point at the limit itself (highlighted)
            const atLimitResult = evaluateMathExpression(fnString, { x: approach });
            const atLimitRow = createTableRow(approach, atLimitResult, approach);
            atLimitRow.classList.add('highlight-row');
            tbody.appendChild(atLimitRow);
            
            // Points to the right of the limit
            for (const step of steps) {
                const x = approach + step;
                const result = evaluateMathExpression(fnString, { x });
                const row = createTableRow(x, result, approach);
                tbody.appendChild(row);
            }
            
            tableContainer.appendChild(table);
        }
        
        // Helper to create a table row for a given x and f(x) result
        function createTableRow(x, result, approach) {
            const tr = document.createElement('tr');
            
            const xTd = document.createElement('td');
            xTd.textContent = formatNumber(x);
            tr.appendChild(xTd);
            
            const yTd = document.createElement('td');
            yTd.textContent = result.display;
            yTd.classList.add(result.type + '-cell');
            
            // Add result type span for non-error/undefined values
            if (!(result.type === ResultType.UNDEFINED || result.type === ResultType.MATH_ERROR || result.type === ResultType.SYNTAX_ERROR || result.type === ResultType.DOMAIN_ERROR)) {
                const typeSpan = document.createElement('span');
                typeSpan.classList.add('result-type', result.type);
                typeSpan.textContent = result.type.replace('_', ' '); // Format type string for display
                yTd.prepend(typeSpan, ' '); // Prepend the type span to the value
            }
            
            tr.appendChild(yTd);
            return tr;
        }

        // Handle the main "Generate Table & Graph" button click
        function handleCalculate() {
            currentFunction = fInput.value;
            currentApproach = parseFloat(xApproach.value) || 0;

            if (!currentFunction) {
                displayMessageBox('Please enter a function f(x).', 'error');
                fInput.focus();
                return;
            }
            
            graphBounds = findGraphBounds(currentFunction, currentApproach);
            updateControlInputs();
            generateTable(currentFunction, currentApproach);
            drawGraph();
        }

        // Handle "Reset Zoom" button click
        function handleResetZoom() {
            const defaultBounds = { xMin: -10, xMax: 10, yMin: -10, yMax: 10 };
            graphBounds = defaultBounds;
            xMinInput.value = '';
            xMaxInput.value = '';
            yMinInput.value = '';
            yMaxInput.value = '';
            drawGraph();
        }

        // Handle "Clear All" button click
        function handleClearAll() {
            fInput.value = '';
            xApproach.value = '';
            calcInput.value = '';
            calcOutput.innerHTML = '<span class="calc-placeholder">Enter an expression above...</span>';
            tableContainer.innerHTML = '';
            currentFunction = '';
            handleResetZoom();
        }

        // Update the min/max input fields with current graph bounds
        function updateControlInputs() {
            xMinInput.value = graphBounds.xMin.toFixed(2);
            xMaxInput.value = graphBounds.xMax.toFixed(2);
            yMinInput.value = graphBounds.yMin.toFixed(2);
            yMaxInput.value = graphBounds.yMax.toFixed(2);
        }

        // Validate function input in real-time
        function validateFunctionInput() {
            const fn = fInput.value;
            if (!fn) {
                fInput.classList.remove('invalid', 'valid');
                return;
            }
            // Test with a non-zero value to avoid division by zero for simple checks
            const testValue = 1; 
            const result = evaluateMathExpression(fn, { x: testValue });
            
            if (result.type === ResultType.SYNTAX_ERROR) {
                fInput.classList.add('invalid');
                fInput.classList.remove('valid');
            } else {
                fInput.classList.add('valid');
                fInput.classList.remove('invalid');
            }
        }

        // Evaluate scientific calculator expression
        function evaluateScientificCalc() {
            const expression = calcInput.value;
            const result = evaluateMathExpression(expression);
            
            calcOutput.innerHTML = ''; // Clear previous output
            
            // Apply appropriate styling based on result type
            if (result.type === ResultType.SYNTAX_ERROR || result.type === ResultType.UNDEFINED || result.type === ResultType.MATH_ERROR || result.type === ResultType.DOMAIN_ERROR) {
                calcOutput.innerHTML = `<span class="calc-error">${result.display}</span>`;
                calcOutput.classList.add('calculator-error');
                // Briefly flash error background
                setTimeout(() => calcOutput.classList.remove('calculator-error'), 300);
            } else if (result.type === ResultType.COMPLEX) {
                calcOutput.innerHTML = `<span class="calc-complex">${result.display}</span>`;
            } else {
                const typeSpan = document.createElement('span');
                typeSpan.classList.add('result-type', result.type);
                typeSpan.textContent = result.type.replace('_', ' ');
                calcOutput.appendChild(typeSpan);
                
                const valueSpan = document.createElement('span');
                valueSpan.classList.add('calc-success');
                valueSpan.textContent = ` ${result.display}`;
                calcOutput.appendChild(valueSpan);
            }
        }

        // Custom Message Box (replaces native alert() for better UI)
        function displayMessageBox(message, type) {
            const messageBox = document.createElement('div');
            messageBox.classList.add('message-box', type);
            messageBox.textContent = message;
            document.body.appendChild(messageBox);
            
            setTimeout(() => {
                messageBox.remove(); // Remove message after 3 seconds
            }, 3000); 
        }

        // Add CSS for the custom message box dynamically
        const style = document.createElement('style');
        style.textContent = `
            .message-box {
                position: fixed;
                top: 20px;
                left: 50%;
                transform: translateX(-50%);
                padding: 15px 25px;
                border-radius: 8px;
                font-weight: bold;
                z-index: 10000;
                box-shadow: 0 4px 12px rgba(0,0,0,0.15);
                opacity: 0;
                animation: fadeInOut 3s forwards;
            }
            .message-box.error {
                background-color: #fef2f2;
                color: #dc2626;
                border: 1px solid #fecaca;
            }
            .message-box.success {
                background-color: #dcfce7;
                color: #166534;
                border: 1px solid #bbf7d0;
            }
            @keyframes fadeInOut {
                0% { opacity: 0; transform: translateX(-50%) translateY(-20px); }
                10% { opacity: 1; transform: translateX(-50%) translateY(0); }
                90% { opacity: 1; transform: translateX(-50%) translateY(0); }
                100% { opacity: 0; transform: translateX(-50%) translateY(-20px); }
            }
        `;
        document.head.appendChild(style);

        // Event Listeners for UI interactions
        calculateBtn.addEventListener('click', handleCalculate);
        resetZoomBtn.addEventListener('click', handleResetZoom);
        clearAllBtn.addEventListener('click', handleClearAll);
        evalCalc.addEventListener('click', evaluateScientificCalc);
        
        fInput.addEventListener('input', validateFunctionInput); // Real-time validation for function input
        calcInput.addEventListener('keydown', (e) => {
            if (e.key === 'Enter') evaluateScientificCalc(); // Evaluate scientific calc on Enter key
        });
        
        // Handle window resize to redraw graph
        window.addEventListener('resize', () => {
            setupCanvas();
            drawGraph();
        });
        
        // Initial setup - Graph a default function on page load
        window.addEventListener('DOMContentLoaded', () => {
            setupCanvas();
            handleCalculate(); // Automatically graph the default function
        });
    </script>
</body>
</html>
