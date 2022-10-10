const canvasSize = 600;

let rainbowStatus = false;
let eraserStatus = false;

const gridEl = document.querySelector(".grid-container");
const resize = document.querySelector(".resize-grid");
const eraserBtn = document.querySelector(".eraser");
const rainbowBtn = document.querySelector(".rainbow");

let paintColor = document.querySelector(".color-picker").value;

// tracking if user holds mouse button
let mouseDown = false;
document.body.onmousedown = () => (mouseDown = true);
document.body.onmouseup = () => (mouseDown = false);

function renderGrid(size) {
  const gridHtml = [];
  for (let i = 0; i < size * size; i++) {
    gridHtml.push(
      `<div class="grid-block" style="width: ${canvasSize / size}px; height: ${
        canvasSize / size
      }px"></div>`
    );
  }
  gridEl.innerHTML = gridHtml.join("");
}

function resizeGrid(size) {
  renderGrid(size);
  addPaintFunc();
}

function eraserMode() {
  if (rainbowStatus) {
    rainbowMode();
  }
  if (eraserStatus) {
    eraserBtn.classList.remove("active");
    eraserStatus = false;
  } else {
    eraserBtn.classList.add("active");
    eraserStatus = true;
  }
}

function rainbowMode() {
  if (eraserStatus) {
    eraserMode();
  }
  if (rainbowStatus) {
    rainbowBtn.classList.remove("active");
    rainbowStatus = false;
  } else {
    rainbowBtn.classList.add("active");
    rainbowStatus = true;
  }
}

function renderInputValue(value) {
  document.querySelector(".input-value").innerText = value;
}

function changeColor(color) {
  document.querySelector(".color-value").innerText = color;
  paintColor = color;
}

function paintBlock(e) {
  if (e.type === "mouseover" && !mouseDown) return;
  // stops execution if mouse button not held
  if (rainbowStatus) {
    const randomR = Math.floor(Math.random() * 256);
    const randomG = Math.floor(Math.random() * 256);
    const randomB = Math.floor(Math.random() * 256);
    e.target.style.backgroundColor = `rgb(${randomR}, ${randomG}, ${randomB})`;
  } else if (eraserStatus) {
    e.target.style.backgroundColor = "";
  } else {
    e.target.style.backgroundColor = `${paintColor}`;
  }
}

function addPaintFunc() {
  const gridBlocks = document.querySelectorAll(".grid-block");
  gridBlocks.forEach((block) => {
    block.addEventListener("mousedown", paintBlock);
    block.addEventListener("mouseover", paintBlock);
  });
}
function reset() {
  const size = document.querySelector(".resize-grid").value;
  resizeGrid(size);
}

resizeGrid(resize.value);
