let sizeLabel;
let jumpButton;
let weekSelect;
let iframe;
let isJumping = false;
let offsets = [];
let frequencies = [];

function setup() {
  createCanvas(windowWidth, windowHeight); // 設置畫布為全螢幕
  inputElement = createInput("Woo");
  inputElement.position(50, 50);
  
  sizeLabel = createP('字體大小: 32px'); // 創建文字標籤
  sizeLabel.position(inputElement.x + inputElement.width + 15, inputElement.position().y); // 將標籤放在文字框旁邊
  sizeLabel.style('color', 'white'); // 設置文字標籤顏色為白色
  
  sliderElement = createSlider(28, 50, 32); // 創建滑桿，範圍從28到50，初始值為32
  sliderElement.position(50, inputElement.y + inputElement.height + 10);

  jumpButton = createButton('跳動文字');
  jumpButton.position(sliderElement.x + sliderElement.width + 15, sliderElement.position().y);
  jumpButton.mousePressed(toggleJumping);

  weekSelect = createSelect();
  weekSelect.position(jumpButton.x + jumpButton.width + 15, jumpButton.position().y);
  weekSelect.option('HackMD');
  weekSelect.option('第二周');
  weekSelect.option('第三周作品');
  weekSelect.changed(updateIframe);

  iframe = createElement('iframe');
  iframe.position(100, 100);
  iframe.size(windowWidth - 200, windowHeight - 200);
  iframe.hide();
}

function draw() {
  background(0); // 設置背景顏色為黑色
  fill(255); // 設置文字顏色為白色
  let fontSize = sliderElement.value();
  textSize(fontSize); // 根據滑桿的值設置字型大小
  sizeLabel.html('字體大小: ' + fontSize + 'px'); // 更新文字標籤的內容
  let txts = inputElement.value();
  let repeatedText = txts.split('').join(' '); // 在每個字母之間添加空格
  let textWidthWithSpace = textWidth(repeatedText) + 10;
  let y = 0;
  while (y < height) {
    let x = 0;
    while (x < width) {
      if (isJumping) {
        for (let i = 0; i < repeatedText.length; i++) {
          let char = repeatedText.charAt(i);
          let offset = offsets[i] || 0;
          let frequency = frequencies[i] || 0;
          text(char, x + textWidth(char) * i, y + offset * sin(frameCount * frequency));
        }
      } else {
        text(repeatedText, x, y);
      }
      x += textWidthWithSpace;
    }
    y += textAscent() + textDescent() + 10; // 設置行間距
  }
}

function toggleJumping() {
  isJumping = !isJumping;
  if (isJumping) {
    let txts = inputElement.value().split('').join(' ');
        offsets = [];
    frequencies = [];
    for (let i = 0; i < txts.length; i++) {
      offsets.push(random(-10, 10));
      frequencies.push(random(0.05, 0.15));
    }
  }
}

function updateIframe() {
  let selectedWeek = weekSelect.value();
  let url;
  switch (selectedWeek) {
    case 'HackMD':
      url = 'https://hackmd.io/@Woodogggggggg/ryruPYGsJe';
      break;
    case '第二周':
      url = 'https://edcollege.tku.edu.tw/';
      break;
    case '第三周作品':
      url = 'http://127.0.0.1:5500/index.html';
      break;
  }
  iframe.attribute('src', url);
  iframe.show();
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight); // 當窗口大小改變時調整畫布大小
  iframe.size(windowWidth - 200, windowHeight - 200);
  iframe.position(100, 100);
}
