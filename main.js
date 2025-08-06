<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Advanced Graphing Calculator</title>
    <style>
        /* Your CSS from the Canvas is embedded here for a self-contained, working example. */
        /* It is fully compatible and does not require changes. */
        body {
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
            margin: 0;
            padding: 20px;
            background-color: #f8fafc;
            color: #1f2937;
            line-height: 1.6;
        }

        .container {
            max-width: 1000px; /* Changed from 1200px to 1000px in the user's provided CSS */
            margin: auto;
            background: #ffffff;
            padding: 30px;
            border-radius: 12px;
            box-shadow: 0 10px 25px rgba(0,0,0,0.1);
        }

        h1 {
            color: #1f2937;
            text-align: center;
            margin-bottom: 30px;
            font-size: 2.2em;
        }

        h2 {
            color: #374151;
            margin-top: 40px;
            margin-bottom: 15px;
            border-bottom: 2px solid #e5e7eb;
            padding-bottom: 10px;
        }

        .input-group {
            margin-bottom: 30px;
        }

        label {
            display: block;
            margin-top: 15px;
            margin-bottom: 5px;
            font-weight: 600;
            color: #374151;
        }

        input, button {
            width: 100%;
            margin: 8px 0;
            padding: 12px;
            font-size: 16px;
            border: 2px solid #d1d5db;
            border-radius: 8px;
            transition: border-color 0.2s, box-shadow 0.2s;
            box-sizing: border-box;
        }

        input:focus {
            outline: none;
            border-color: #3b82f6;
            box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
        }

        button {
            background-color: #3b82f6;
            color: white;
            cursor: pointer;
            font-weight: 600;
            border: 2px solid #3b82f6;
        }

        button:hover {
            background-color: #2563eb;
            border-color: #2563eb;
            transform: translateY(-1px);
        }

        button:active {
            transform: translateY(0);
        }

        .function-buttons {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(80px, 1fr));
            gap: 8px;
            margin-top: 10px;
        }

        .function-buttons button {
            padding: 8px 4px;
            font-size: 12px;
            background-color: #6b7280;
            border-color: #6b7280;
            margin: 0;
        }

        .function-buttons button:hover {
            background-color: #4b5563;
            border-color: #4b5563;
        }

        .math-help {
            background-color: #f0f9ff;
            border: 1px solid #bfdbfe;
            border-radius: 8px;
            padding: 15px;
            margin-bottom: 20px;
            font-size: 14px;
        }

        .math-help h3 {
            color: #1e40af;
            margin-top: 0;
            font-size: 16px;
        }

        .math-examples {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
            gap: 10px;
            font-family: 'Monaco', 'Courier New', monospace;
        }

        .graph-controls {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(120px, 1fr));
            gap: 10px;
            margin-bottom: 20px;
            padding: 20px;
            background-color: #f9fafb;
            border-radius: 8px;
            border: 1px solid #e5e7eb;
        }

        .graph-controls label {
            margin-top: 0;
            font-size: 14px;
        }

        .graph-controls input,
        .graph-controls button {
            margin: 5px 0;
            padding: 8px;
            font-size: 14px;
        }

        #resetZoom, #clearAll { /* Added #clearAll selector here */
            grid-column: span 2; /* Changed from 1 / -1 to span 2 for consistency with two-column layout */
            background-color: #6b7280;
            border-color: #6b7280;
        }

        #resetZoom:hover, #clearAll:hover { /* Added #clearAll selector here */
            background-color: #4b5563;
            border-color: #4b5563;
        }

        table {
            width: 100%;
            border-collapse: collapse;
            margin-top: 15px;
            background-color: #ffffff;
            border-radius: 8px;
            overflow: hidden;
            box-shadow: 0 1px 3px rgba(0,0,0,0.1);
        }

        table th {
            background-color: #f3f4f6;
            color: #374151;
            font-weight: 600;
            padding: 15px;
            text-align: center;
            border-bottom: 2px solid #e5e7eb;
        }

        table td {
            padding: 12px 15px;
            text-align: center;
            border-bottom: 1px solid #e5e7eb;
            font-family: 'Monaco', 'Courier New', monospace;
        }

        table tr:hover {
            background-color: #f9fafb;
        }

        .canvas-wrapper {
            width: 100%;
            height: 500px;
            border: 2px solid #e5e7eb;
            border-radius: 8px;
            overflow: hidden;
            background-color: #ffffff;
            position: relative;
        }

        canvas {
            width: 100% !important;
            height: 100% !important;
            display: block;
        }

        .calc-section {
            background-color: #f9fafb;
            padding: 20px;
            border-radius: 8px;
            border: 1px solid #e5e7eb;
        }

        #calcOutput {
            margin-top: 15px;
            padding: 15px;
            background-color: #ffffff;
            border: 1px solid #e5e7eb;
            border-radius: 6px;
            font-family: 'Monaco', 'Courier New', monospace;
            font-size: 18px;
            font-weight: bold;
            min-height: 25px;
            color: #1f2937;
        }

        /* Calculator Output Styles */
        .calc-success {
            color: #059669;
        }

        .calc-error {
            color: #dc2626;
            font-weight: 700;
        }

        .calc-warning {
            color: #d97706;
        }

        .calc-infinity {
            color: #7c3aed;
        }

        .calc-complex {
            color: #0891b2;
            font-weight: 600;
        }

        .calc-placeholder {
            color: #9ca3af;
            font-style: italic;
            font-weight: normal;
        }

        /* Enhanced table styling with result type indicators */
        .result-type {
            padding: 3px 8px;
            border-radius: 12px;
            font-size: 11px;
            font-weight: 600;
            text-transform: uppercase;
            white-space: nowrap;
        }

        .result-type.finite {
            background-color: #dcfce7;
            color: #166534;
        }

        .result-type.undefined {
            background-color: #fee2e2;
            color: #991b1b;
        }

        .result-type.positive_infinity,
        .result-type.negative_infinity {
            background-color: #ede9fe;
            color: #6b21a8;
        }

        .result-type.indeterminate {
            background-color: #fef3c7;
            color: #92400e;
        }

        .result-type.complex {
            background-color: #e0f2fe;
            color: #0c4a6e;
        }

        /* Math Error Styling */
        .result-type.math_error {
            background-color: #fef2f2;
            color: #b91c1c;
        }

        .result-type.syntax_error {
            background-color: #fdf2f8;
            color: #be185d;
        }

        .result-type.domain_error {
            background-color: #fff7ed;
            color: #c2410c;
        }

        .highlight-row {
            background-color: #fef9c3;
            font-weight: 600;
        }

        .highlight-row:hover {
            background-color: #fef08a;
        }

        /* Error cells in table */
        .error-cell {
            color: #dc2626;
            font-weight: 700;
            background-color: #fef2f2;
        }

        .undefined-cell {
            color: #991b1b;
            font-weight: 700;
            background-color: #fee2e2;
        }

        .math-error-cell {
            color: #b91c1c;
            font-weight: 700;
            background-color: #fef2f2;
        }

        /* Responsive design */
        @media (max-width: 768px) {
            .container {
                margin: 10px;
                padding: 20px;
            }
            
            .graph-controls {
                grid-template-columns: 1fr 1fr;
            }
            
            .function-buttons { /* Added for better responsiveness of function buttons */
                grid-template-columns: repeat(4, 1fr);
            }
            
            .canvas-wrapper {
                height: 350px;
            }
            
            h1 {
                font-size: 1.8em;
            }
            
            table th, table td {
                padding: 8px 10px;
                font-size: 14px;
            }
            
            .result-type {
                font-size: 10px;
                padding: 2px 6px;
            }
        }

        /* Loading animation */
        @keyframes pulse {
            0%, 100% { opacity: 1; }
            50% { opacity: 0.5; }
        }

        .loading {
            animation: pulse 2s infinite;
        }

        /* Error styling */
        .error {
            color: #ef4444;
            background-color: #fef2f2;
            border: 1px solid #fecaca;
            padding: 10px;
            border-radius: 6px;
            margin: 10px 0;
        }

        /* Calculator specific error states */
        .calculator-error {
            background-color: #fef2f2;
            border: 2px solid #fecaca;
            color: #dc2626;
            animation: errorFlash 0.3s ease-in-out;
        }

        @keyframes errorFlash {
            0% { background-color: #fef2f2; }
            50% { background-color: #fee2e2; }
            100% { background-color: #fef2f2; }
        }

        /* Enhanced focus states for accessibility */
        input:focus,
        button:focus {
            outline: 2px solid #3b82f6;
            outline-offset: 2px;
        }

        /* Improved table readability */
        table tr:nth-child(even) {
            background-color: #f9fafb;
        }

        table tr:nth-child(even):hover {
            background-color: #f3f4f6;
        }

        /* Better visual hierarchy */
        .calc-section h2 {
            color: #1f2937;
            font-size: 1.3em;
            margin-bottom: 20px;
        }

        /* Input validation states */
        input.invalid {
            border-color: #ef4444;
            background-color: #fef2f2;
        }

        input.valid {
            border-color: #10b981;
            background-color: #f0fdf4;
        }

        /* Tooltips for error explanations */
        .tooltip {
            position: relative;
            cursor: help;
        }

        .tooltip::after {
            content: attr(data-tooltip);
            position: absolute;
            bottom: 100%;
            left: 50%;
            transform: translateX(-50%);
            background: #1f2937;
            color: white;
            padding: 5px 10px;
            border-radius: 4px;
            font-size: 12px;
            white-space: nowrap;
            opacity: 0;
            pointer-events: none;
            transition: opacity 0.2s;
            z-index: 1000;
        }

        .tooltip:hover::after {
            opacity: 1;
        }

        /* Two-column layout for main sections */
        .two-column {
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 30px;
        }

        /* Responsive adjustment for two-column layout */
        @media (max-width: 768px) {
            .two-column {
                grid-template-columns: 1fr;
            }
        }
    </style>
</head>
<body>
    <div class="container">
        <h1>🧮 Advanced Graphing Calculator</h1>
        
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
                    <!-- Pre-filled with a default function for immediate graphing -->
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
                    <!-- Pre-filled with a default value -->
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
                // Enhanced pre-processing for common mathematical notations
                let processedExpr = expression
                    // Handle exponents
                    .replace(/\^/g, '**')
                    .replace(/(\d+|\w+|\))\*\*(\d+|\w+|\()/g, '($1)**($2)')
                    
                    // Handle logarithms
                    .replace(/log\(/g, 'log10(')
                    .replace(/ln\(/g, 'log(')
                    .replace(/log10\(/g, 'log10(')
                    .replace(/log2\(/g, 'log2(')
                    
                    // Handle exponentials
                    .replace(/e\^/g, 'exp(')
                    .replace(/exp\(/g, 'exp(')
                    
                    // Handle constants
                    .replace(/\be\b/g, 'e')
                    .replace(/\bpi\b/g, 'pi')
                    .replace(/π/g, 'pi')
                    
                    // Handle roots
                    .replace(/√/g, 'sqrt')
                    .replace(/cbrt/g, 'cbrt')
                    
                    // Handle absolute value
                    .replace(/abs\(/g, 'abs(')
                    .replace(/\|([^|]+)\|/g, 'abs($1)')
                    
                    // Handle trigonometric functions
                    .replace(/sin\(/g, 'sin(')
                    .replace(/cos\(/g, 'cos(')
                    .replace(/tan\(/g, 'tan(')
                    .replace(/asin\(/g, 'asin(')
                    .replace(/acos\(/g, 'acos(')
                    .replace(/atan\(/g, 'atan(')
                    
                    // Handle hyperbolic functions
                    .replace(/sinh\(/g, 'sinh(')
                    .replace(/cosh\(/g, 'cosh(')
                    .replace(/tanh\(/g, 'tanh(')
                    
                    // Handle implicit multiplication
                    .replace(/(\d)([a-zA-Z\(])/g, '$1*$2')
                    .replace(/\)(\d)/g, ')*$1')
                    .replace(/\)\(/g, ')*(');
                
                const expr = math.parse(processedExpr);
                const code = expr.compile();
                const result = code.evaluate({ 
                    ...variables, 
                    e: Math.E, 
                    pi: Math.PI,
                    exp: Math.exp,
                    log: Math.log,
                    log10: Math.log10,
                    log2: Math.log2,
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
                    cbrt: Math.cbrt,
                    abs: Math.abs
                });
                
                return analyzeResult(result, expression, variables);
            } catch (error) {
                return handleMathError(error, expression, variables);
            }
        }

        // Analyze mathematical results and categorize them
        function analyzeResult(result, expression, variables) {
            // Handle complex numbers
            if (typeof result === 'object' && result.re !== undefined) {
                if (Math.abs(result.im) < 1e-10) {
                    return analyzeResult(result.re, expression, variables);
                }
                return {
                    type: ResultType.COMPLEX,
                    value: result,
                    display: `${result.re.toFixed(3)} + ${result.im.toFixed(3)}i`
                };
            }
            
            // Handle arrays/matrices
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
            
            // Handle other types
            return {
                type: ResultType.FINITE,
                value: result,
                display: result.toString()
            };
        }

        // Handle mathematical errors
        function handleMathError(error, expression, variables) {
            const errorMsg = error.message.toLowerCase();
            
            // Division by zero - "Undefined"
            if (errorMsg.includes('division by zero') || errorMsg.includes('divide by zero')) {
                return {
                    type: ResultType.UNDEFINED,
                    value: NaN,
                    display: 'Undefined'
                };
            }
            
            // Domain errors
            if (errorMsg.includes('sqrt') || errorMsg.includes('asin') || errorMsg.includes('acos')) {
                return {
                    type: ResultType.MATH_ERROR,
                    value: NaN,
                    display: 'Math Error'
                };
            }
            
            // Logarithm errors
            if (errorMsg.includes('log')) {
                return {
                    type: ResultType.MATH_ERROR,
                    value: NaN,
                    display: 'Math Error'
                };
            }
            
            // Syntax errors
            if (errorMsg.includes('syntax') || errorMsg.includes('unexpected') || errorMsg.includes('parse')) {
                return {
                    type: ResultType.SYNTAX_ERROR,
                    value: NaN,
                    display: 'Syntax Error'
                };
            }
            
            // Generic error
            return {
                type: ResultType.UNDEFINED,
                value: NaN,
                display: 'Error'
            };
        }

        // Smart number formatting
        function formatNumber(num) {
            if (!isFinite(num)) return num.toString();
            
            const absNum = Math.abs(num);
            
            // Very small numbers (scientific notation)
            if (absNum < 1e-4 && absNum !== 0) {
                return num.toExponential(3);
            }
            
            // Very large numbers (scientific notation)
            if (absNum >= 1e6) {
                return num.toExponential(3);
            }
            
            // Regular numbers
            if (absNum < 1) {
                return num.toFixed(6).replace(/\.?0+$/, '');
            }
            
            if (absNum < 100) {
                return num.toFixed(3).replace(/\.?0+$/, '');
            }
            
            return num.toFixed(1).replace(/\.0$/, '');
        }

        // Function evaluation for graphing
        function evaluateFunction(fnString, xValue) {
            const result = evaluateMathExpression(fnString, { x: xValue });
            
            switch (result.type) {
                case ResultType.FINITE:
                    if (Math.abs(result.value) > 1e10) return null;
                    return result.value;
                
                default:
                    return null;
            }
        }

        // Canvas setup
        function setupCanvas() {
            const container = canvas.parentElement;
            const rect = container.getBoundingClientRect();
            
            const dpr = window.devicePixelRatio || 1;
            
            canvasWidth = rect.width;
            canvasHeight = rect.height;
            
            canvas.width = canvasWidth * dpr;
            canvas.height = canvasHeight * dpr;
            
            canvas.style.width = canvasWidth + 'px';
            canvas.style.height = canvasHeight + 'px';
            
            ctx.scale(dpr, dpr);
            
            ctx.textBaseline = 'middle';
            ctx.imageSmoothingEnabled = true;
            ctx.imageSmoothingQuality = 'high';
        }

        // Generate points for graphing
        function generatePoints(fnString, xMin, xMax, numPoints = 1000) {
            const points = [];
            const step = (xMax - xMin) / numPoints;
            
            let lastY = null;
            
            for (let i = 0; i <= numPoints; i++) {
                const x = xMin + i * step;
                const y = evaluateFunction(fnString, x);
                
                if (y !== null) {
                    if (lastY !== null && Math.abs(y - lastY) > (Math.abs(lastY) * 10 + 100)) {
                        points.push(null);
                    }
                    
                    points.push({ x, y });
                    lastY = y;
                } else {
                    if (points.length > 0 && points[points.length - 1] !== null) {
                        points.push(null);
                    }
                    lastY = null;
                }
            }
            
            return points;
        }

        // Find graph bounds
        function findGraphBounds(fnString, approach) {
            const testRange = 5;
            let xMin = approach - testRange;
            let xMax = approach + testRange;
            
            if (xMinInput.value !== '') xMin = parseFloat(xMinInput.value);
            if (xMaxInput.value !== '') xMax = parseFloat(xMaxInput.value);
            
            const samplePoints = [];
            for (let x = xMin; x <= xMax; x += (xMax - xMin) / 200) {
                const y = evaluateFunction(fnString, x);
                if (y !== null && Math.abs(y) < 1e6) {
                    samplePoints.push(y);
                }
            }
            
            let yMin, yMax;
            if (samplePoints.length > 0) {
                yMin = Math.min(...samplePoints);
                yMax = Math.max(...samplePoints);
                
                const yRange = yMax - yMin;
                const yPadding = Math.max(yRange * 0.1, 0.1);
                yMin -= yPadding;
                yMax += yPadding;
            } else {
                yMin = -10;
                yMax = 10;
            }
            
            if (yMinInput.value !== '') yMin = parseFloat(yMinInput.value);
            if (yMaxInput.value !== '') yMax = parseFloat(yMaxInput.value);
            
            return { xMin, xMax, yMin, yMax };
        }

        // Coordinate transformation
        function mathToCanvas(x, y, bounds) {
            const canvasX = ((x - bounds.xMin) / (bounds.xMax - bounds.xMin)) * canvasWidth;
            const canvasY = canvasHeight - ((y - bounds.yMin) / (bounds.yMax - bounds.yMin)) * canvasHeight;
            return { x: canvasX, y: canvasY };
        }

        function canvasToMath(canvasX, canvasY, bounds) {
            const x = (canvasX / canvasWidth) * (bounds.xMax - bounds.xMin) + bounds.xMin;
            const y = ((canvasHeight - canvasY) / canvasHeight) * (bounds.yMax - bounds.yMin) + bounds.yMin;
            return { x, y };
        }

        // Drawing functions
        function drawGraph() {
            ctx.clearRect(0, 0, canvasWidth, canvasHeight);
            
            drawGrid(graphBounds);
            drawAxes(graphBounds);
            
            if (currentFunction) {
                const points = generatePoints(currentFunction, graphBounds.xMin, graphBounds.xMax);
                drawFunction(points, graphBounds);
            }
        }

        function drawGrid(bounds) {
            const xRange = bounds.xMax - bounds.xMin;
            const yRange = bounds.yMax - bounds.yMin;
            const xStep = calculateStep(xRange, canvasWidth / 100);
            const yStep = calculateStep(yRange, canvasHeight / 100);
            
            ctx.strokeStyle = '#e5e7eb';
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

        function drawAxes(bounds) {
            ctx.strokeStyle = '#6b7280';
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

            ctx.fillStyle = '#374151';
            ctx.font = '12px Segoe UI';

            // X-axis labels
            const xRange = bounds.xMax - bounds.xMin;
            const xStep = calculateStep(xRange, canvasWidth / 100);
            for (let x = Math.ceil(bounds.xMin / xStep) * xStep; x <= bounds.xMax; x += xStep) {
                const { x: cx, y: cy } = mathToCanvas(x, 0, bounds);
                if (Math.abs(x) > 1e-6) { // Avoid labeling zero twice
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

        function calculateStep(range, targetTicks) {
            const magnitude = Math.pow(10, Math.floor(Math.log10(range / targetTicks)));
            const potentialSteps = [1, 2, 5];
            let bestStep = 1;

            for (const step of potentialSteps) {
                if (range / (magnitude * step) > targetTicks / 2) {
                    bestStep = step;
                }
            }
            return bestStep * magnitude;
        }

        function drawFunction(points, bounds) {
            ctx.strokeStyle = '#ef4444';
            ctx.lineWidth = 3;
            
            ctx.beginPath();
            let first = true;
            
            for (let i = 0; i < points.length; i++) {
                const p = points[i];
                if (p === null) {
                    if (!first) {
                        ctx.stroke();
                        ctx.closePath();
                    }
                    ctx.beginPath();
                    first = true;
                    continue;
                }
                
                const { x, y } = mathToCanvas(p.x, p.y, bounds);
                
                if (x >= -10 && x <= canvasWidth + 10 && y >= -10 && y <= canvasHeight + 10) {
                    if (first) {
                        ctx.moveTo(x, y);
                        first = false;
                    } else {
                        ctx.lineTo(x, y);
                    }
                } else if (!first) {
                    ctx.stroke();
                    ctx.closePath();
                    ctx.beginPath();
                    first = true;
                }
            }
            
            ctx.stroke();
        }

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
            
            const steps = [1, 0.1, 0.01, 0.001, 0.0001, 0.00001, 0.000001];
            
            // Points to the left of the limit
            for (const step of steps) {
                const x = approach - step;
                const result = evaluateMathExpression(fnString, { x });
                const row = createTableRow(x, result, approach);
                tbody.appendChild(row);
            }
            
            // Point at the limit itself
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
        
        function createTableRow(x, result, approach) {
            const tr = document.createElement('tr');
            
            const xTd = document.createElement('td');
            xTd.textContent = formatNumber(x);
            tr.appendChild(xTd);
            
            const yTd = document.createElement('td');
            yTd.textContent = result.display;
            yTd.classList.add(result.type + '-cell');
            
            if (result.type === ResultType.UNDEFINED || result.type === ResultType.MATH_ERROR || result.type === ResultType.SYNTAX_ERROR || result.type === ResultType.DOMAIN_ERROR) {
                yTd.textContent = result.display;
            } else {
                const typeSpan = document.createElement('span');
                typeSpan.classList.add('result-type', result.type);
                typeSpan.textContent = result.type.replace('_', ' ');
                yTd.prepend(typeSpan, ' ');
            }
            
            tr.appendChild(yTd);
            return tr;
        }

        // UI events and logic
        function handleCalculate() {
            currentFunction = fInput.value;
            currentApproach = parseFloat(xApproach.value) || 0;

            if (!currentFunction) {
                // Using a custom message box instead of alert() as per instructions
                displayMessageBox('Please enter a function f(x).', 'error');
                fInput.focus();
                return;
            }
            
            graphBounds = findGraphBounds(currentFunction, currentApproach);
            updateControlInputs();
            generateTable(currentFunction, currentApproach);
            drawGraph();
        }

        function handleResetZoom() {
            const defaultBounds = { xMin: -10, xMax: 10, yMin: -10, yMax: 10 };
            graphBounds = defaultBounds;
            xMinInput.value = '';
            xMaxInput.value = '';
            yMinInput.value = '';
            yMaxInput.value = '';
            drawGraph();
        }

        function handleClearAll() {
            fInput.value = '';
            xApproach.value = '';
            calcInput.value = '';
            calcOutput.innerHTML = '<span class="calc-placeholder">Enter an expression above...</span>';
            tableContainer.innerHTML = '';
            currentFunction = '';
            handleResetZoom();
        }

        function updateControlInputs() {
            xMinInput.value = graphBounds.xMin.toFixed(2);
            xMaxInput.value = graphBounds.xMax.toFixed(2);
            yMinInput.value = graphBounds.yMin.toFixed(2);
            yMaxInput.value = graphBounds.yMax.toFixed(2);
        }

        function validateFunctionInput() {
            const fn = fInput.value;
            if (!fn) {
                fInput.classList.remove('invalid', 'valid');
                return;
            }
            const testValue = 1; // Test with a default value, ideally should be within a valid domain
            const result = evaluateMathExpression(fn, { x: testValue });
            
            if (result.type === ResultType.SYNTAX_ERROR) {
                fInput.classList.add('invalid');
                fInput.classList.remove('valid');
            } else {
                fInput.classList.add('valid');
                fInput.classList.remove('invalid');
            }
        }

        function evaluateScientificCalc() {
            const expression = calcInput.value;
            const result = evaluateMathExpression(expression);
            
            calcOutput.innerHTML = '';
            
            if (result.type === ResultType.SYNTAX_ERROR || result.type === ResultType.UNDEFINED || result.type === ResultType.MATH_ERROR || result.type === ResultType.DOMAIN_ERROR) {
                calcOutput.innerHTML = `<span class="calc-error">${result.display}</span>`;
                calcOutput.classList.add('calculator-error');
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

        // Custom Message Box (replaces alert())
        function displayMessageBox(message, type) {
            const messageBox = document.createElement('div');
            messageBox.classList.add('message-box', type);
            messageBox.textContent = message;
            document.body.appendChild(messageBox);
            
            setTimeout(() => {
                messageBox.remove();
            }, 3000); // Message disappears after 3 seconds
        }

        // Add CSS for the message box
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

        // Event Listeners
        calculateBtn.addEventListener('click', handleCalculate);
        resetZoomBtn.addEventListener('click', handleResetZoom);
        clearAllBtn.addEventListener('click', handleClearAll);
        evalCalc.addEventListener('click', evaluateScientificCalc);
        
        fInput.addEventListener('input', validateFunctionInput);
        calcInput.addEventListener('keydown', (e) => {
            if (e.key === 'Enter') evaluateScientificCalc();
        });
        
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