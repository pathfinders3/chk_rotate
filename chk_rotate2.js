// HTML elements
const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
const degreeInput = document.getElementById('degree');
const rotateBtn = document.getElementById('rotateBtn');
const outputDiv = document.getElementById('output');

const centerX = 250;//canvasWidth / 2;
const centerY = 250;//canvasHeight / 2;


    // Initial points
    const points = [
      { x: 100, y: 0 },
      { x: 0, y: 100 },
      { x: -100, y: 0 },
      { x: 0, y: -100 },
    ];
    const center = { x: 250, y: 250 }; // Center of rotation

    /**
     * Rotate a single point
     * @param {number} x
     * @param {number} y
     * @param {number} degree
     * @returns {{x: number, y: number}}
     */
    function rotatePoint(x, y, degree) {
      const radians = (degree * Math.PI) / 180;
      const newX = x * Math.cos(radians) - y * Math.sin(radians);
      const newY = x * Math.sin(radians) + y * Math.cos(radians);
      return { x: newX, y: newY };
    }

    /**
     * Rotate multiple points
     * @param {{x: number, y: number}[]} points
     * @param {number} degree
     * @returns {{x: number, y: number}[]}
     */
    function rotatePoints(points, degree) {
      return points.map(({ x, y }) => rotatePoint(x, y, degree));
    }

    /**
     * Draw points on canvas
     * @param {CanvasRenderingContext2D} ctx
     * @param {{x: number, y: number}[]} points
     * @param {string} color
     */
    function drawPoints(ctx, points, color) {
      ctx.fillStyle = color;
      points.forEach(({ x, y }) => {
        ctx.beginPath();
        ctx.arc(center.x + x, center.y - y, 5, 0, Math.PI * 2); // Flip y-axis
        ctx.fill();
      });
    }

    /**
     * Draw the center point
     * @param {CanvasRenderingContext2D} ctx
     * @param {{x: number, y: number}} center
     */
    function drawCenterPoint(ctx, center) {
      ctx.fillStyle = 'darkgreen'; // Center point color
      ctx.beginPath();
      ctx.arc(center.x, center.y, 5, 0, Math.PI * 2);
      ctx.fill();
    }
    function drawPoint(ctx, x1,y1, col1='black') {
      ctx.fillStyle = col1;
      ctx.beginPath();
      ctx.arc(x1, y1, 5, 0, Math.PI * 2);
      ctx.fill();
    }	
	
    /**
     * Clear canvas
     */
    function clearCanvas() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
    }

    /**
     * Display rotated points in the output div
     * @param {number} degree
     * @param {{x: number, y: number}[]} points
     */
    function displayRotatedPoints(degree, points) {
      let output = `Rotated points by ${degree}°:\n`;
      points.forEach((point, index) => {
        output += `Point ${index + 1}: x = ${point.x.toFixed(2)}, y = ${point.y.toFixed(2)}\n`;
      });
      outputDiv.textContent = output;
    }

	/**
	 * Draw grid on canvas
	 * @param {CanvasRenderingContext2D} ctx
	 * @param {number} width
	 * @param {number} height
	 * @param {number} spacing
	 */
	function drawGrid(ctx, width, height, spacing) {
	  ctx.strokeStyle = '#ddd';
	  ctx.lineWidth = 1;

	  // Draw vertical lines
	  for (let x = 0; x <= width; x += spacing) {
		ctx.beginPath();
		ctx.moveTo(x, 0);
		ctx.lineTo(x, height);
		ctx.stroke();
	  }

	  // Draw horizontal lines
	  for (let y = 0; y <= height; y += spacing) {
		ctx.beginPath();
		ctx.moveTo(0, y);
		ctx.lineTo(width, y);
		ctx.stroke();
	  }
	}

   // Initial draw
    function drawScene() {
		const centerX = 250;//parseFloat(centerXInput.value);
		const centerY = 250;//parseFloat(centerYInput.value);

		clearCanvas();
		drawGrid(ctx, canvas.width, canvas.height, 50); // Draw grid
		
		//center point
		drawPoint(ctx, centerX, centerY, '#616100');	// yellow
		//Original points
		drawPoints(ctx, points, 'darkblue');
    }
	
    
	drawScene();
    // Initial draw
    // drawPoints(ctx, points, 'blue');

// Rotate button event
rotateBtn.addEventListener('click', () => {
	const degree = parseFloat(degreeInput.value);
	const centerX = 250;//parseFloat(centerXInput.value);
	const centerY = 250;//parseFloat(centerYInput.value);
	
	const rotatedPoints = rotatePoints(points, degree);

	displayRotatedPoints(degree, rotatedPoints);

	// Redraw canvas
	clearCanvas();
	drawGrid(ctx, canvas.width, canvas.height, 50); // Draw grid
	//drawCenterPoint(ctx, { x: centerX, y: centerY }); // Redraw the center point
	drawPoint(ctx, centerX, centerY, '#207100');


	drawPoints(ctx, points, 'blue'); // Original points
	drawPoints(ctx, rotatedPoints, 'red'); // Rotated points
});
	

const coordinateDisplay = document.getElementById('coordinateDisplay');

// 마우스 이동 이벤트 처리 함수
function handleMouseMove(event) {
	// 데카르트 좌표계
	const mouseX = event.clientX - canvas.offsetLeft - centerX;
	const mouseY = canvas.height - (event.clientY - canvas.offsetTop) - centerY; // y좌표 반전
	
	const canvasX = event.clientX - canvas.offsetLeft;
	const canvasY = event.clientY - canvas.offsetTop;

	// coordinateDisplay.textContent = `x: ${mouseX}, y: ${mouseY}`;
	coordinateDisplay.textContent = `데카르트 좌표: (${mouseX}, ${mouseY}), 화면 좌표: (x: ${canvasX}, y: ${canvasY})`;
	
}

function handleMouseClick(event) {
	// 데카르트 좌표계
	const mouseX = event.clientX - canvas.offsetLeft - centerX;
	const mouseY = canvas.height - (event.clientY - canvas.offsetTop) - centerY; // y좌표 반전
	
	const canvasX = event.clientX - canvas.offsetLeft;
	const canvasY = event.clientY - canvas.offsetTop;

	// coordinateDisplay.textContent = `x: ${mouseX}, y: ${mouseY}`;
	
	console.log(`데카르트 좌표: (${mouseX}, ${mouseY}), 화면 좌표: (x: ${canvasX}, y: ${canvasY})`);
	
}

canvas.addEventListener('mousemove', handleMouseMove);
canvas.addEventListener('click', handleMouseClick);
