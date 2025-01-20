// 전역 변수 선언
let indicatorPoints = [];


function drawAllPoints() {
  const canvas = document.getElementById('myCanvas');
  const ctx = canvas.getContext('2d');

  // 캔버스를 지우고 다시 그립니다.
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // indicatorPoints 배열에 저장된 모든 점을 순서대로 그립니다.
  indicatorPoints.forEach(point => {
    ctx.beginPath();
    ctx.arc(point.x, point.y, 5, 0, Math.PI * 2);
    ctx.fill();
  });
}


function drawPoint() {
  const canvas = document.getElementById('myCanvas');
  const ctx = canvas.getContext('2d');

  // 입력 값 가져오기
  const x = parseInt(document.getElementById('xCoord').value);
  const y = parseInt(document.getElementById('yCoord').value);

  // 점 그리기
  ctx.beginPath();
  ctx.arc(x, y, 5, 0, Math.PI * 2);
  ctx.fill();

  // 점 정보 저장
  indicatorPoints.push({ x, y });

  console.log('현재 점들:', indicatorPoints);
}


function calculateRotatedCorners(x, y, width, height, angle) {
    const halfWidth = width / 2;
    const halfHeight = height / 2;

    // 원래 꼭지점 좌표 (중심 기준)
    const corners = [
        { x: -halfWidth, y: -halfHeight }, // 좌상단
        { x: halfWidth, y: -halfHeight },  // 우상단
        { x: halfWidth, y: halfHeight },   // 우하단
        { x: -halfWidth, y: halfHeight },  // 좌하단
    ];

    // 회전 변환 적용
    return corners.map(corner => ({
        x: corner.x * Math.cos(angle) - corner.y * Math.sin(angle) + x,
        y: corner.x * Math.sin(angle) + corner.y * Math.cos(angle) + y,
    }));
}

/**
 * 계산된 꼭지점을 콘솔에 출력하는 함수
 * @param {Array<{x: number, y: number}>} corners - 회전된 꼭지점 좌표 배열
 */
function logCorners(corners) {
    console.log("Rotated Rectangle Corners:");
    corners.forEach((corner, index) => {
        console.log(`Corner ${index + 1}: (${corner.x.toFixed(2)}, ${corner.y.toFixed(2)})`);
    });
}

/**
 * 캔버스에 회전된 사각형을 그리는 함수
 * @param {CanvasRenderingContext2D} ctx - 캔버스 2D 컨텍스트
 * @param {number} x - 사각형의 중심 x 좌표
 * @param {number} y - 사각형의 중심 y 좌표
 * @param {number} width - 사각형의 너비
 * @param {number} height - 사각형의 높이
 * @param {number} angle - 회전 각도 (라디안 단위)
 */
// function drawRotatedRectangle(ctx, x, y, width, height, angle) {
    // // 캔버스 상태 저장
    // ctx.save();

    // // 캔버스 중심을 사각형 중심으로 이동
    // ctx.translate(x, y);

    // // 캔버스 회전
    // ctx.rotate(angle);

    // // 사각형 그리기 (translate로 이동했으므로 중심 기준)
    // ctx.beginPath();
    // ctx.rect(-width / 2, -height / 2, width, height);
    // ctx.fillStyle = "blue"; // 사각형 색상
    // ctx.fill(); // 사각형 채우기
    // ctx.strokeStyle = "black"; // 사각형 테두리
    // ctx.stroke(); // 테두리 그리기

    // // 원래 캔버스 상태로 복원
    // ctx.restore();
// }

function drawRotatedRectangle(ctx, x, y, width, height, angle) {
  // 캔버스 상태 저장
  ctx.save();

  // 캔버스 중심을 사각형 중심으로 이동
  ctx.translate(x, y);

  // 캔버스 회전 (시계 방향으로 회전하려면 음수 값을 사용)
  ctx.rotate(-angle); // 여기서 음수 부호를 주의

  // 사각형 그리기
  ctx.beginPath();
  ctx.rect(-width / 2, -height / 2, width, height);
  ctx.fillStyle = "blue";
  ctx.fill();
  ctx.strokeStyle = "black";
  ctx.stroke();

  // 원래 캔버스 상태로 복원
  ctx.restore();
}


function degreeToRadian(degree) {
  const radian = degree * (Math.PI / 180);
  return radian;
}

function drawAll() {
	ctx.clearRect(0, 0, canvas.width, canvas.height);

	// 입력 값 가져오기
	const degree = parseInt(document.getElementById('degree').value);
	const radian1 = degreeToRadian(degree);
	// 회전된 사각형 그리기
	drawRotatedRectangle(ctx, centerX, centerY, rectWidth, rectHeight, radian1);

	// 꼭지 좌표
	const corners = calculateRotatedCorners(centerX, centerY, rectWidth, rectHeight, radian1);
	// 꼭지점 좌표 출력
	logCorners(corners);
	
}

// 예제 사용법
const canvas = document.getElementById("myCanvas");
const ctx = canvas.getContext("2d");


//drawRotatedRectangle(ctx, 150, 150, 100, 50, degreeToRadian(80)); // 45도 회전

// 중심, 크기, 각도 정의
const centerX = 150;
const centerY = 150;
const rectWidth = 100;
const rectHeight = 50;
const rotationAngle = Math.PI / 4; // 45도 회전

// 사각형 꼭지점 계산
const corners = calculateRotatedCorners(centerX, centerY, rectWidth, rectHeight, rotationAngle);

// 꼭지점 좌표 출력
//logCorners(corners);

// 회전된 사각형 그리기
//drawRotatedRectangle(ctx, centerX, centerY, rectWidth, rectHeight, rotationAngle);

