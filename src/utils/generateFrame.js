const {
    drawAudioProgressBar,
    drawAudioEqualizer,
    rotateProfileImg,
    typingAnimation,
    rotatePhonograph,
    rotatePhonographShivam1,
    drawSineWave
} = require("./generalFeature");

function vinylTemplate(data, ctx, profileImg, imgData) {
    // Set Background color of Outermost part
    ctx.fillStyle = "rgb(255,255,255)"; // To remove player background effcet due to transparency of dominate color;
    ctx.fillRect(0, 0, data.canvasWidth, data.canvasHeight);
    ctx.fillStyle = "rgb(" + data.bgColor + ")";
    ctx.fillRect(0, 0, data.canvasWidth, data.canvasHeight);

    imgData.equalizerBackgroundImg = ctx.getImageData(
        0,
        0,
        data.barHeight,
        data.equalizerWidth + 20
    );

    drawAudioEqualizer(
        0,
        0,
        data.equalizerWidth,
        data.barHeight,
        data.interval,
        data.complementaryColor,
        ctx,
        imgData,
        data.freqArr[0],
        false,
        false,
        0
    );

    ctx.font = data.titleFontStyleForBackEnd;
    ctx.fillStyle = data.fontColor;
    ctx.textAlign = "center";
    ctx.textBaseline = "top";

    // Type title

    data.titleArr.forEach((item, i) => {
        ctx.fillText(item.word, item.textPositionX, item.textPositionY);
    });

    // Type User Name
    ctx.font = data.userNameFontStyleForBackEnd;
    ctx.fillText(data.userName, data.userNamePositionX, data.userNamePositionY);

    imgData.audioStartingTimeBackgroundImg = ctx.getImageData(
        data.progressBarX,
        data.progressBarY - 20 - ctx.measureText("M").width - 30,
        ctx.measureText("0:00").width + 80,
        ctx.measureText("M").width + 20
    );
    imgData.audioEndingTimeBackgroundImg = ctx.getImageData(
        data.progressBarwidth +
        data.progressBarX -
        ctx.measureText("0:00").width -
        60,
        data.progressBarY - 20 - ctx.measureText("M").width,
        ctx.measureText("0:00").width + 70,
        ctx.measureText("M").width + 20
    );
    imgData.progressBarBackgroundImg = ctx.getImageData(
        data.progressBarX - 20,
        data.progressBarY - 20,
        data.progressBarwidth + 40,
        50
    );

    ctx.font = data.audioFontStyleForBackEnd; // Set font style for audio time

    drawAudioProgressBar(
        data.progressBarX,
        data.progressBarY,
        data.progressBarwidth,
        10,
        data.complementaryColor,
        20,
        0,
        data.duration,
        data.fontColor,
        ctx,
        data.audioProgressPosition,
        0,
        true,
        imgData
    );

    rotateProfileImg(data, ctx, 0, profileImg);
}

function animateVinyl(data, ctx, i, j, time, imgData, profileImg, l, k) {
    timeSpend = (i + 1) / data.frameRate;
    progressPercentage = i / (data.frameCount - 1);

    drawAudioProgressBar(
        data.progressBarX,
        data.progressBarY,
        data.progressBarwidth,
        10,
        data.complementaryColor,
        20,
        timeSpend,
        data.duration,
        data.fontColor,
        ctx,
        data.audioProgressPosition,
        (data.progressBarwidth - 40) * progressPercentage,
        true,
        imgData
    );
    rotateProfileImg(data, ctx, 2 * i, profileImg); // Increase angile by 2 degree
    Number.isInteger(j / 6)
        ? drawAudioEqualizer(
            0,
            0,
            data.equalizerWidth,
            data.barHeight,
            data.interval,
            data.complementaryColor,
            ctx,
            imgData,
            data.freqArr[j / 6],
            false,
            false,
            0
        )
        : "";
}

function syncTemplate(data, ctx, profileImg, imgData) {
    ctx.fillStyle = "rgb(255,255,255)"; // To remove player background effcet due to transparency of dominate color;
    ctx.fillRect(0, 0, data.canvasWidth, data.canvasHeight);
    ctx.fillStyle = "rgb(" + data.bgColor + ")";
    ctx.fillRect(0, 0, data.canvasWidth, data.canvasHeight);

    // Draw Profile Image

    ctx.beginPath();
    ctx.strokeStyle = data.complementaryColor;
    // ctx.roundRect(data.profileImagePositionX, data.profileImagePositionY, data.profileImgWidth, data.profileImgHeight, data.profileImgRadius)
    // console.log(data.profileImagePositionX, data.profileImagePositionY, data.profileImgWidth, data.profileImgHeight, data.profileImgRadius)
    // ctx.stroke()
    // ctx.save()
    // ctx.clip()
    ctx.drawImage(
        profileImg,
        data.profileImagePositionX,
        data.profileImagePositionY,
        data.profileImgWidth,
        data.profileImgHeight
    );
    ctx.restore();

    let titleBackgroundImgWidth = data.isCardShapeRectangle ? 1060 : 830;

    data.titleArr.forEach((item, i) => {
        imgData.titleBackgroundImg[i] = ctx.getImageData(
            item.backgroundImgPositionX,
            item.backgroundImgPositionY,
            titleBackgroundImgWidth,
            data.titleFontHeight + 10
        );
    });

    // Print Title on Canvas

    ctx.fillStyle = data.fontColor;
    ctx.textAlign = "center";
    ctx.textBaseline = "top";

    let textPositionX = data.isCardShapeRectangle ? 540 : 1384;

    data.titleArr.forEach((item) => {
        ctx.fillText(item.word, textPositionX, item.textPositionY);
    });

    // Type Artist Name

    ctx.font = data.userNameFontStyleForBackEnd;

    imgData.userNameeBackgroundImg = data.isCardShapeRectangle
        ? ctx.getImageData(
            data.userNameeBackgroundImgPositionX,
            data.userNameeBackgroundImgPositionY,
            1060,
            data.userNameFontHeight + 20
        )
        : ctx.getImageData(
            data.userNameeBackgroundImgPositionX,
            data.userNameeBackgroundImgPositionY,
            830,
            data.userNameFontHeight + 30
        );
    ctx.fillStyle = data.fontColor;
    ctx.textAlign = "center";
    ctx.textBaseline = "top";

    data.isCardShapeRectangle
        ? ctx.fillText(data.userName.toUpperCase(), 540, 1200)
        : ctx.fillText(
            data.userName.toUpperCase(),
            1384,
            926 - data.userNameFontHeight
        );

    // Draw Player Image

    //Previous

    //Background

    ctx.beginPath();
    data.isCardShapeRectangle
        ? ctx.arc(370, 1370, 45, 0, Math.PI * 2, false)
        : ctx.arc(661, 1416, 60, 0, Math.PI * 2, false);
    ctx.stroke();
    ctx.fillStyle = data.complementaryColor;
    ctx.fill();

    // Symbol

    ctx.fillStyle = "rgb(255,255,255)"; // White backgrond draw due to transparent background color.

    data.isCardShapeRectangle
        ? ctx.fillRect(351, 1356, 5, 25)
        : ctx.fillRect(645, 1401, 6, 32);

    ctx.fillStyle = "rgb(" + data.bgColor + ")";

    data.isCardShapeRectangle
        ? ctx.fillRect(351, 1356, 5, 25)
        : ctx.fillRect(645, 1401, 6, 32);

    ctx.beginPath();

    if (data.isCardShapeRectangle) {
        ctx.moveTo(359, 1368.5);
        ctx.lineTo(381, 1356);
        ctx.lineTo(381, 1381);
        ctx.lineTo(359, 1368.5);
    } else {
        ctx.moveTo(655, 1417);
        ctx.lineTo(683, 1401);
        ctx.lineTo(683, 1433);
        ctx.lineTo(655, 1417);
    }

    ctx.stroke();

    ctx.fillStyle = "rgb(255,255,255)"; // To remove other color effect on dominateColor due to transparency
    ctx.fill();
    ctx.fillStyle = "rgb(" + data.bgColor + ")";
    ctx.fill();

    // Play

    ctx.beginPath();
    data.isCardShapeRectangle
        ? ctx.arc(544, 1371, 70, 0, Math.PI * 2, false)
        : ctx.arc(903, 1416, 95, 0, Math.PI * 2, false);

    ctx.stroke();
    ctx.fillStyle = data.complementaryColor;
    ctx.fill();

    // Symbol

    ctx.beginPath();
    if (data.isCardShapeRectangle) {
        ctx.moveTo(524, 1344);
        ctx.lineTo(571, 1369);
        ctx.lineTo(524, 1394);
        ctx.lineTo(524, 1344);
    } else {
        ctx.moveTo(879, 1381);
        ctx.lineTo(940, 1416);
        ctx.lineTo(879, 1451);
        ctx.lineTo(879, 1381);
    }

    ctx.stroke();

    ctx.fillStyle = "rgb(255,255,255)"; // To remove other color effect on dominateColor due to transparency
    ctx.fill();
    ctx.fillStyle = "rgb(" + data.bgColor + ")";
    ctx.fill();

    //  Next

    ctx.beginPath();
    data.isCardShapeRectangle
        ? ctx.arc(718, 1370, 45, 0, Math.PI * 2, false)
        : ctx.arc(1146, 1416, 60, 0, Math.PI * 2, false);
    ctx.stroke();
    ctx.fillStyle = data.complementaryColor;
    ctx.fill();

    // Symbol

    ctx.beginPath();

    if (data.isCardShapeRectangle) {
        ctx.moveTo(703, 1356);
        ctx.lineTo(725, 1368.5);
        ctx.lineTo(703, 1381);
        ctx.lineTo(703, 1356);
    } else {
        ctx.moveTo(1122, 1401);
        ctx.lineTo(1150, 1417);
        ctx.lineTo(1122, 1433);
        ctx.lineTo(1122, 1401);
    }
    ctx.stroke();

    ctx.fillStyle = "rgb(255,255,255)"; // To remove other color effect on dominateColor due to transparency
    ctx.fill();
    ctx.fillStyle = "rgb(" + data.bgColor + ")";
    ctx.fill();

    ctx.fillStyle = "rgb(255,255,255)";

    data.isCardShapeRectangle
        ? ctx.fillRect(728, 1356, 5, 25)
        : ctx.fillRect(1156, 1401, 6, 32);

    ctx.fillStyle = "rgb(" + data.bgColor + ")";

    data.isCardShapeRectangle
        ? ctx.fillRect(728, 1356, 5, 25)
        : ctx.fillRect(1156, 1401, 6, 32);

    // Draw Eualizer

    imgData.equalizerBackgroundImg = ctx.getImageData(
        data.equalizerX - 10,
        data.equalizerY - data.barHeight - 10,
        data.equalizerWidth + 20,
        data.barHeight * 2 + 20
    );
    drawAudioEqualizer(
        data.equalizerX,
        data.equalizerY,
        data.equalizerWidth,
        data.barHeight,
        data.interval,
        data.complementaryColor,
        ctx,
        imgData,
        data.freqArr[0],
        true,
        true,
        1
    );
    drawAudioEqualizer(
        data.equalizerX,
        data.equalizerY,
        data.equalizerWidth,
        data.barHeight,
        data.interval,
        data.complementaryColor,
        ctx,
        imgData,
        data.freqArr[0],
        true,
        false,
        1,
        false
    );

    // Gradient

    var grd = ctx.createLinearGradient(...data.linearGradient);
    grd.addColorStop(0, data.complementaryColor);
    grd.addColorStop(1, data.fontColor);

    ctx.beginPath();

    // ctx.roundRect(...data.gradientPosition)

    // console.log("data.gradientPosition", data.gradientPosition)

    ctx.beginPath();
    ctx.moveTo(
        data.gradientPosition[0] + data.gradientPosition[4],
        data.gradientPosition[1]
    );
    ctx.arcTo(
        data.gradientPosition[0] + data.gradientPosition[2],
        data.gradientPosition[1],
        data.gradientPosition[0] + data.gradientPosition[2],
        data.gradientPosition[1] + data.gradientPosition[3],
        data.gradientPosition[4]
    );
    ctx.arcTo(
        data.gradientPosition[0] + data.gradientPosition[2],
        data.gradientPosition[1] + data.gradientPosition[3],
        data.gradientPosition[0],
        data.gradientPosition[1] + data.gradientPosition[3],
        data.gradientPosition[4]
    );
    ctx.arcTo(
        data.gradientPosition[0],
        data.gradientPosition[1] + data.gradientPosition[3],
        data.gradientPosition[0],
        data.gradientPosition[1],
        data.gradientPosition[4]
    );
    ctx.arcTo(
        data.gradientPosition[0],
        data.gradientPosition[1],
        data.gradientPosition[0] + data.gradientPosition[2],
        data.gradientPosition[1],
        data.gradientPosition[4]
    );
    ctx.closePath();

    ctx.stroke();

    ctx.fillStyle = grd;
    ctx.fill();
}

function animateSync(data, ctx, i, j, time, imgData, profileImg, l, k) {
    Number.isInteger(j / 6)
        ? animateSyncEqualizer(data, ctx, j / 6, imgData)
        : "";
    Number.isInteger(time * 5) && time * 5 <= data.sentenceLength
        ? animateSyncTyping(data, ctx, time * 5, imgData, l, k)
        : "";
}

function animateSyncTyping(data, ctx, i, imgData, l, k) {
    // Title typing
    i <= data.title.length
        ? typingAnimation(
            data.titleArr[k].word,
            l,
            data.titleArr[k].backgroundImgPositionX,
            data.titleArr[k].backgroundImgPositionY,
            data.fontColor,
            data.titleFontStyleForBackEnd,
            imgData.titleBackgroundImg[k],
            ctx,
            data.titleArr[k].textPositionX,
            data.titleArr[k].textPositionY
        )
        : "";

    // UserName typing
    i <= data.userNameLength
        ? typingAnimation(
            data.userName,
            i,
            data.userNameeBackgroundImgPositionX,
            data.userNameeBackgroundImgPositionY,
            data.fontColor,
            data.userNameFontStyleForBackEnd,
            imgData.userNameeBackgroundImg,
            ctx,
            data.userNamePositionX,
            data.userNamePositionY
        )
        : "";
}

function animateSyncEqualizer(data, ctx, i, imgData) {
    drawAudioEqualizer(
        data.equalizerX,
        data.equalizerY,
        data.equalizerWidth,
        data.barHeight,
        data.interval,
        data.complementaryColor,
        ctx,
        imgData,
        data.freqArr[i],
        true,
        true,
        1
    );
    drawAudioEqualizer(
        data.equalizerX,
        data.equalizerY,
        data.equalizerWidth,
        data.barHeight,
        data.interval,
        data.complementaryColor,
        ctx,
        imgData,
        data.freqArr[i],
        true,
        false,
        1,
        false
    );
}

function listenTemplate(data, ctx, profileImg, imgData) {
    // Set Background color of Outermost part 
    ctx.fillStyle = 'rgb(255,255,255)' // To remove player background effcet due to transparency of dominate color;
    ctx.fillRect(0, 0, data.canvasWidth, data.canvasHeight)
    ctx.fillStyle = 'rgb(' + data.bgColor + ')';
    ctx.fillRect(0, 0, data.canvasWidth, data.canvasHeight)


    ctx.font = data.titleFontStyle;
    ctx.fillStyle = data.fontColor;
    ctx.textAlign = "center";
    ctx.textBaseline = "top";

    // Type title

    data.titleArr.forEach((item, i) => {
        ctx.fillText(item.word, item.textPositionX, item.textPositionY);
    });




    // Type card Name

    ctx.font = data.userNameFontStyle;
    ctx.fillText('LISTEN NOW', data.userNamePositionX, data.userNamePositionY);


    imgData.progressBarBackgroundImg = ctx.getImageData(data.progressBarX - 20, data.progressBarY - 20, data.progressBarwidth + 40, 50)


    // Draw Image to get background Inage without sinwave
    // rotatePhonograph(data, ctx, 0, profileImg, imgData.phonographImg)


    // Get Image 
    imgData.leftSinWaveBackgroundImg = ctx.getImageData(data.leftSinWaveBackgroundX, data.leftSinWaveBackgroundY, data.leftSinWaveWidth, data.leftSinWaveHeight)
    imgData.rightSinWaveBackgroundImg = ctx.getImageData(data.rightSinWaveBackgroundX, data.rightSinWaveBackgroundY, data.rightSinWaveWidth, data.rightSinWaveHeight)


    drawSineWave(data.sinWaveAmplitute, data.sinWaveFrequency, data.fontColor, ctx, data.leftSinWaveCenterY, data.rightSinWaveCenterY, 9, data.waveLength, data.leftShift, data.rightShift, data.rightSinWaveBackgroundX)

    // Drwa Image Again
    rotatePhonograph(data, ctx, 0, profileImg, imgData.phonographImg)


    // Draw Progress bar
    drawAudioProgressBar(data.progressBarX, data.progressBarY, data.progressBarwidth, 10, data.complementaryColor, data.progressBarArcRadius, 0, data.duration, data.fontColor, ctx, data.audioProgressPosition, 0, false, imgData)

    ctx.drawImage(imgData.musicPlayerImg, data.progressBarX, data.musicPlayerImgY, data.progressBarwidth, data.musicPlayerImgHeight)
}

function animateListen(data, ctx, i, j, time, imgData, profileImg, l, k) {

    timeSpend = (i + 1) / data.frameRate;
    progressPercentage = i / (data.frameCount - 1);

    drawAudioProgressBar(
        data.progressBarX,
        data.progressBarY,
        data.progressBarwidth,
        10,
        data.complementaryColor,
        20,
        timeSpend,
        data.duration,
        data.fontColor,
        ctx,
        data.audioProgressPosition,
        (data.progressBarwidth - 40) * progressPercentage,
        false,
        imgData
    );

    ctx.putImageData(imgData.leftSinWaveBackgroundImg, data.leftSinWaveBackgroundX, data.leftSinWaveBackgroundY)
    ctx.putImageData(imgData.rightSinWaveBackgroundImg, data.rightSinWaveBackgroundX, data.rightSinWaveBackgroundY)
    drawSineWave(data.sinWaveAmplitute + 5 * j, data.sinWaveFrequency, data.fontColor, ctx, data.leftSinWaveCenterY, data.rightSinWaveCenterY, 9, data.waveLength, data.leftShift, data.rightShift, data.rightSinWaveBackgroundX)
    rotatePhonograph(data, ctx, 2 * i, profileImg, imgData.phonographImg)

}
    // Loading shivamimg 
function rgbToHex(r, g, b) {
    // Ensure values are within 0–255
    const toHex = (c) => {
      const hex = c.toString(16); // convert to hex
      return hex.length === 1 ? "0" + hex : hex; // pad single digit
    };
  
    return "#" + toHex(r) + toHex(g) + toHex(b);
}
const fs = require("fs");
const path = require('path');
const { createCanvas, loadImage } = require('canvas');

// Global variable to store preloaded images
let shivamImg = null;

async function preloadAssets() {
  const shivamImgPath = path.join('src/assets/Story Template.png');
  shivamImg = await loadImage(shivamImgPath);
  console.log("✅ shivamImg preloaded:", shivamImg.width, shivamImg.height);
}

async function loadSVG(filePath) {
  const res = await fetch(filePath);
  const svgData = await res.text();

  // no replacement since #58251b stays same
  const img = new Image();
  img.src = "data:image/svg+xml;base64," + btoa(svgData);

  return new Promise((resolve, reject) => {
    img.onload = () => resolve(img);
    img.onerror = reject;
  });
}
async function shivam1Template(data, ctx, profileImg, imgData) {
    // Clear canvas with white background
    // const img = await loadAssets();
    ctx.setTransform(1, 0, 0, 1, 0, 0); // Always reset transform first
    ctx.fillStyle = '#f9f9f9';
    ctx.fillRect(0, 0, data.canvasWidth, data.canvasHeight);
    console.log("Shivam data", data);
    console.log("Shivam data username", data.userName  );
    console.log("Shivam data title", data.title  );

    

    // --- STATIC NEW RELEASE TEXT (no animation, styled like animateNewRelease) ---
    ctx.save();
    ctx.font = data.titleFontStyleForBackEnd || 'bold 32px Arial';
    ctx.fillStyle = 'black';
    ctx.textAlign = 'left';
    ctx.textBaseline = 'middle';
    const text = 'NEW RELEASE';
    const letterSpacing = 20; // px
    let totalWidth = 0;
    // Measure total width
    for (let i = 0; i < text.length; i++) {
      totalWidth += ctx.measureText(text[i]).width;
      if (i < text.length - 1) totalWidth += letterSpacing;
    }
    let startX = data.canvasWidth / 2 - totalWidth / 2;
    for (let i = 0; i < text.length; i++) {
      ctx.fillText(text[i], startX, 150);
      startX += ctx.measureText(text[i]).width + letterSpacing;
    }
    ctx.restore();

    // --- STATIC RING (shivamImg) ---
    // Draw the static ring (shivamImg) centered, with no rotation
    const ringScaleStatic = 1.45 * 0.85; // Decreased by 5%
    const plateScaleStatic = 1.35 * 0.85; // Decreased by 5%
    const plateSizeStatic = data.rotatedImgPosition[2] * plateScaleStatic;
    const ringSizeStatic = plateSizeStatic * ringScaleStatic + 20;
    const ringHeightStatic = ringSizeStatic * 1.75 +20;
    const centerXStatic = data.canvasWidth / 2;
    const centerYStatic = data.canvasHeight / 2 -160;
    ctx.save();
    ctx.setTransform(1, 0, 0, 1, 0, 0);
    ctx.translate(centerXStatic, centerYStatic);
    ctx.drawImage(
      shivamImg,
      -ringSizeStatic/2,
      -ringHeightStatic/2,
      ringSizeStatic,
      ringHeightStatic
    );
    ctx.restore();

    // Draw the album title and username below the shivamImg image
    // Calculate positions
    const titleFont = 'bold 58px Poppins, Arial, sans-serif';
    const usernameFont = '48px Poppins, Arial, sans-serif';
    const titleText = data.title && data.title.length > 0 ? (data.title.length > 32 ? data.title.slice(0, 32) + '...' : data.title) : 'TITLE';
    const usernameText = data.userName && data.userName.length > 0 ? data.userName : 'USERNAME';

    // Center X is the same as image center
    const textCenterX = centerXStatic;
    // Y position: bottom of shivamImg + margin
    const shivamImgBottomY = centerYStatic ;
    const titleY = shivamImgBottomY + 500; // 40px below image
    const usernameY = titleY + 80; // 48px below title

    // Draw title
    ctx.save();
    ctx.font = titleFont;
    ctx.fillStyle = 'rgb(' + data.bgColor + ')';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'top';
    ctx.fillText(titleText, textCenterX, titleY);
    // Draw username
    ctx.font = usernameFont;
    ctx.fillStyle = 'rgb(' + data.bgColor + ')';
    ctx.fillText(usernameText, textCenterX, usernameY);
    ctx.restore();

    // this.progressBarBackgroundImg = ctx.getImageData(data.progressBarX - 20, data.progressBarY - 20, data.progressBarwidth + 40, 50)
    let profileWidth = 680;
    data.profileImageArcPostionY = data.titleArr[0].textPositionY - 118 - profileWidth / 2;

    rotatePhonographShivam1(data, ctx, 0, profileImg, imgData.phonographImg);

    // --- PLAYER IMAGE AT BOTTOM ---
    // console.log('Image is  loaded',this.brownPlayerImg);

    
    const playerWidth = 1880;
    const playerHeight = 600;

    const targetColor = rgbToHex(data.bgColor[0],data.bgColor[1],data.bgColor[2]);
    const svgPath = path.join("src/assets/shivam1.svg");
    let svgData = fs.readFileSync(svgPath, "utf8");
    console.log("Shivam svgData",svgData);
    
    svgData = svgData.replace(/fill:#58251b/gi, `fill:${targetColor}`);
  // Encode as Data URI and load with canvas
  const svgBase64 = Buffer.from(svgData).toString("base64");
  const svgImg = await loadImage("data:image/svg+xml;base64," + svgBase64);
    playerImg = svgImg;
  // ctx.drawImage(svgImg, 150, 600, playerWidth, playerHeight);


  }
  let _newReleaseAnimationState;
 // Initializes NEW RELEASE animation state (call once at animation start)
 function initNewReleaseAnimation(ctx, canvasWidth, fontStyle) {
  const text = "NEW RELEASE";
  const letters = text.split("");
  const startTime = performance.now();
  const targetY = 140;
  const floatDistance = 60; // how far the letter rises
  const duration = 700; // ms for each letter
  const stagger = 80; // ms delay between each letter
  const animationAreaHeight = 120;
  const letterSpacing = 28;
  const wordSpacing = 60;

  ctx.font = fontStyle;
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";

  let totalTextWidth = 0;
  letters.forEach((letter, idx) => {
    totalTextWidth += ctx.measureText(letter).width;
    if (idx < letters.length - 1) {
      if (letter === " ") {
        totalTextWidth += wordSpacing;
      } else {
        totalTextWidth += letterSpacing;
      }
    }
  });
  let currentX = (canvasWidth / 2) - (totalTextWidth / 2);
  const letterData = letters.map((letter, idx) => {
    const width = ctx.measureText(letter).width;
    const x = currentX + width / 2;
    currentX += width + (letter === " " ? wordSpacing : letterSpacing);
    return {
      letter,
      startTime: startTime + idx * stagger, // staggered
      x,
      width,
      isComplete: false
    };
  });
  _newReleaseAnimationState = {
    ctx,
    canvasWidth,
    fontStyle,
    text,
    letters,
    startTime,
    targetY,
    floatDistance,
    duration,
    animationAreaHeight,
    letterSpacing,
    wordSpacing,
    totalTextWidth,
    letterData,
    done: false
  };
}
 
  let playerImg;
  // Draws a single frame of NEW RELEASE animation using persistent state
  function drawNewReleaseFrame() {
  const state = _newReleaseAnimationState;
  if (!state || state.done) return;
  const ctx = state.ctx;
  ctx.font = state.fontStyle;
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  const now = performance.now();
  ctx.clearRect(
    (state.canvasWidth / 2) - (state.totalTextWidth / 2) - 20,
    state.targetY - state.floatDistance - 40,
    state.totalTextWidth + 40,
    state.animationAreaHeight + 50
  );
  let allComplete = true;
  let hasVisibleLetters = false;
  state.letterData.forEach(item => {
    const elapsed = now - item.startTime;
    if (elapsed >= 0) {
      const progress = Math.min(elapsed / state.duration, 1);
      // Ease-out for smoothness
      const eased = 1 - Math.pow(1 - progress, 2);
      const currentY = state.targetY + (state.floatDistance * (1 - eased));
      const opacity = eased;
      // Scale for pop effect
      const scale = 0.7 + 0.3 * Math.sin(Math.PI * Math.min(eased, 1));
      ctx.save();
      ctx.globalAlpha = opacity;
      ctx.translate(item.x, currentY);
      ctx.scale(scale, scale);
      ctx.fillStyle = "#111";
      ctx.shadowColor = "#FFD700";
      ctx.shadowBlur = 18 * opacity;
      ctx.fillText(item.letter, 0, 0);
      ctx.restore();
      item.isComplete = progress === 1;
      hasVisibleLetters = true;
    } else {
      allComplete = false;
    }
    if (!item.isComplete) {
      allComplete = false;
    }
  });
  if (allComplete && hasVisibleLetters) {
    state.done = true;
  }
}

function animateShivam1(data, ctx, i, j, time, imgData, profileImg, l, k) {
    // Use frame index to animate typing and progress
    timeSpend = (i + 1) / data.frameRate;
    progressPercentage = i / (data.frameCount - 1);
    let rotatingAngle = 2 * i; // Make rotation depend on frame

    // Fonts and text
    const titleFont = 'bold 58px Poppins, Arial, sans-serif';
    const usernameFont = '48px Poppins, Arial, sans-serif';
    const titleText = data.title && data.title.length > 0 
        ? (data.title.length > 32 ? data.title.slice(0, 32) + '...' : data.title) 
        : 'TITLE';
    const usernameText = data.userName && data.userName.length > 0 ? data.userName : 'USERNAME';

    // Typing animation: reveal chars based on frame
    const charsPerFrame = 6 / data.frameRate; // 6 chars/sec
    const titleIdx = Math.min(titleText.length, Math.floor(i * charsPerFrame));
    let userIdx = 0;
    if (titleIdx > Math.ceil(titleText.length * 0.25)) {
        userIdx = Math.min(usernameText.length, Math.floor((i - titleText.length * 0.25) * charsPerFrame));
    }

    // Static sizes
    const ringScaleStatic = 1.45 * 0.85;
    const plateScaleStatic = 1.35 * 0.85;
    const plateSizeStatic = data.rotatedImgPosition[2] * plateScaleStatic;
    const ringSizeStatic = plateSizeStatic * ringScaleStatic + 20;
    const ringHeightStatic = ringSizeStatic * 1.75 + 20;
    const centerXStatic = data.canvasWidth / 2;
    const centerYStatic = data.canvasHeight / 2 - 160;

    // Text positions
    const textCenterX = centerXStatic;
    const titleY = centerYStatic + 500;
    const usernameY = titleY + 80;

    // Clear canvas
    ctx.setTransform(1, 0, 0, 1, 0, 0);
    ctx.fillStyle = '#f9f9f9';
    ctx.fillRect(0, 0, data.canvasWidth, data.canvasHeight);

    // --- NEW RELEASE header animation ---
    // Animate NEW RELEASE: random letters appear and fade in, using j as animation step
    const phrase = "NEW RELEASE";
    const letterCount = phrase.length;
    const animationDuration = 5 * data.frameRate; // 3 seconds worth of frames
    // Track which letters have appeared and their fade progress
    if (!data._newReleaseLetterStates) {
        data._newReleaseLetterStates = Array(letterCount).fill().map(() => ({ visible: false, alpha: 0, appearFrame: 0 }));
    }
    // Each frame, randomly pick a letter to appear if not already visible
    let visibleCount = data._newReleaseLetterStates.filter(l => l.visible).length;
    if (visibleCount < letterCount) {
        // Use j as a seed for randomness
        let idx = Math.floor(Math.abs(Math.sin(j + i) * 10000) % letterCount);
        // Find a not-yet-visible letter
        let tries = 0;
        while (data._newReleaseLetterStates[idx].visible && tries < letterCount) {
            idx = (idx + 1) % letterCount;
            tries++;
        }
        if (!data._newReleaseLetterStates[idx].visible) {
            data._newReleaseLetterStates[idx].visible = true;
            data._newReleaseLetterStates[idx].appearFrame = i;
        }
    }
    // Draw the animated NEW RELEASE
    ctx.save();
    ctx.font = data.titleFontStyleForBackEnd || 'bold 58px Poppins, Arial, sans-serif';
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    const spacing = 38;
    const totalWidth = Array.from(phrase).reduce((sum, l, idx) => sum + ctx.measureText(l).width + (idx < letterCount - 1 ? spacing : 0), 0);
    let x = data.canvasWidth / 2 - totalWidth / 2;
    for (let k = 0; k < letterCount; k++) {
        const letter = phrase[k];
        const state = data._newReleaseLetterStates[k];
        let alpha = 0;
        if (state.visible) {
            // Fade in over 0.5s (adjust as needed)
            alpha = Math.min(1, (i - state.appearFrame) / (0.5 * data.frameRate));
        }
        ctx.globalAlpha = alpha;
        ctx.fillStyle = "#111";

        ctx.fillText(letter, x + ctx.measureText(letter).width / 2, 140);
        x += ctx.measureText(letter).width + spacing;
    }
    ctx.restore();
    // Reset after animation is done
    if (i >= animationDuration) {
        delete data._newReleaseLetterStates;
    }

    // 1) Static ring
    ctx.save();
    ctx.setTransform(1, 0, 0, 1, 0, 0);
    ctx.translate(centerXStatic, centerYStatic);
    ctx.drawImage(
        shivamImg,
        -ringSizeStatic / 2,
        -ringHeightStatic / 2,
        ringSizeStatic,
        ringHeightStatic
    );
    ctx.restore();

    // 2) Draw typed text
    ctx.save();
    ctx.textAlign = 'center';
    ctx.textBaseline = 'top';
    ctx.font = titleFont;
    ctx.fillStyle = 'rgb(' + data.bgColor + ')';
    ctx.fillText(titleText.substring(0, titleIdx), textCenterX, titleY);
    ctx.font = usernameFont;
    ctx.fillStyle = 'rgb(' + data.bgColor + ')';
    ctx.fillText(usernameText.substring(0, userIdx), textCenterX, usernameY);
    ctx.restore();

    // 3) Draw SVG player image at the bottom (every frame)
    const playerWidth = 1080;
    const playerHeight = 1950;
    const playerX = (data.canvasWidth - playerWidth) / 2  + 145;
    const playerY = data.canvasHeight - playerHeight + 510;
    console.log("SHIVAM plaerX",playerX);
    console.log("SHIVAM plaerY",playerY);
    console.log("SHIVAM playerWidth",playerWidth);
    console.log("SHIVAM playerHeight",playerHeight);
    
    if (playerImg) {
        ctx.drawImage(playerImg, playerX, playerY, playerWidth, playerHeight);
    }
    // 4) Rotating phonograph + profile
    rotatePhonographShivam1(data, ctx, rotatingAngle, profileImg, imgData.phonographImg);
}
async function shivam2Template(data, ctx, profileImg, imgData) {
        const [r, g, b] = data.bgColor;
        const baseColor = `rgb(${r}, ${g}, ${b})`;
    
        // Generate a darker version for gradient end
        const darkerColor = `rgb(${r * 0.5}, ${g * 0.5}, ${b * 0.5})`;
    
        // Create linear gradient at 180 degrees (top to bottom)
        const gradient = ctx.createLinearGradient(0, 0, 0, data.canvasHeight);
        gradient.addColorStop(0, baseColor);    // top
        gradient.addColorStop(1, darkerColor);  // bottom
    
        // Apply gradient as fill
        ctx.fillStyle = gradient;
        ctx.fillRect(0, 0, data.canvasWidth, data.canvasHeight);
         
        // ---------- Draw LISTEN NOW text ----------
        ctx.font = "80px 'Poppins', sans-serif";
        ctx.fillStyle = "white";
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        ctx.fillText("LISTEN NOW", data.canvasWidth / 2, data.canvasHeight * 0.10);
        //Drawing phonographimg
        const imgWidth = data.canvasWidth * 0.7;
        const imgHeight = imgWidth; // square since it's circular
        const centerX = (data.canvasWidth - imgWidth) / 2;
        const centerY = (data.canvasHeight - imgHeight) / 2;
        ctx.drawImage(imgData.phonographImg, centerX, centerY, imgWidth, imgHeight);
    
        // Drawing solid circle
        // Draw white circle in center
        const circleRadius = data.canvasWidth * 0.15;
        ctx.beginPath();
        ctx.arc(data.canvasWidth / 2, data.canvasHeight / 2, circleRadius, 0, Math.PI * 2);
        ctx.fillStyle = "";
        ctx.fill();
    
        // ---------- Square with white border ----------
      const squareSize = Math.min(data.canvasWidth * 0.6, data.canvasHeight * 0.6); // proportionate size
      const squareHeight = squareSize + 300; 
      const squareWidth = data.canvasWidth * 0.8;
    
      // Position square centered horizontally, near bottom
      const squareX = (data.canvasWidth - squareWidth) / 2;
      const squareY = data.canvasHeight - squareHeight  ; // 20px margin from bottom
    
      // Draw square border
      ctx.lineWidth = 30;
      ctx.strokeStyle = "white";
      ctx.strokeRect(squareX, squareY, squareWidth, squareHeight);
    
        // ---------- Draw profile image inside square ----------
        const padding = 0; // space between image and border
        ctx.save();
        ctx.beginPath();
        ctx.rect(squareX + padding, squareY + padding, squareWidth - padding * 2, squareHeight - padding * 2);
        ctx.clip(); // clip image to square
        ctx.drawImage(profileImg, squareX + padding, squareY + padding, squareWidth - padding * 2, squareHeight - padding * 2);
        ctx.restore();
      
}
 function rotatePhonographOnly(data, ctx, rotatingAngle, phonographImg) {
    // Use the phonograph center as in other templates
    
    // console.log('shivam img position',data.rotatedImgPosition);
    
    ctx.save();
    const imgWidth = data.canvasWidth * 0.7;
    const imgHeight = imgWidth; // square since it's circular
    const centerX = data.canvasWidth / 2;
    const centerY = data.canvasHeight / 2;
    ctx.translate(centerX, centerY);
    ctx.rotate(rotatingAngle * 0.0175);
    ctx.drawImage(phonographImg, -imgWidth / 2, -imgHeight / 2, imgWidth, imgHeight);
    ctx.restore();
  }
function animateShivam2(data, ctx, i, j, time, imgData, profileImg, l, k) {
    timeSpend = (i + 1) / data.frameRate;
    progressPercentage = i / (data.frameCount - 1);
    let rotatingAngle = i * 2; // Rotates 3 degrees per frame (adjust as needed)
    let solidspeed = 0;
    
    //  Clear canvas
    ctx.clearRect(0, 0, data.canvasWidth, data.canvasHeight);
    const [r, g, b] = data.bgColor;
    const baseColor = `rgb(${r}, ${g}, ${b})`;  
    // Generate a darker version for gradient end
    const darkerColor = `rgb(${r * 0.5}, ${g * 0.5}, ${b * 0.5})`;  
    // Create linear gradient at 180 degrees (top to bottom)
    const gradient = ctx.createLinearGradient(0, 0, 0, data.canvasHeight);
    gradient.addColorStop(0, baseColor);    // top
    gradient.addColorStop(1, darkerColor);  // bottom      
    // Apply gradient as fill
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, data.canvasWidth, data.canvasHeight);
    ctx.font = "80px 'Poppins', sans-serif";
    ctx.fillStyle = "white";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillText("LISTEN NOW", data.canvasWidth / 2, data.canvasHeight * 0.10);
    // --- ROTATE PHONOGRAPH IMAGE (only phonograph rotates) ---
    console.log('shivam animate');
    console.log("haha",imgData);
        
    rotatePhonographOnly(data, ctx, rotatingAngle, imgData.phonographImg);
    // Increment rotation for next frame
    rotatingAngle += 3 * i; // Slower rotation
    solidspeed += 0.03 * i;
    // --- ROTATE SOLID CIRCLE ---
    const circleRadius = data.canvasWidth * 0.15;
    const centerX = data.canvasWidth / 2;
    const centerY = data.canvasHeight / 2;
    ctx.save();
    ctx.translate(centerX, centerY);
    ctx.rotate(-solidspeed); // Opposite direction for effect
    ctx.beginPath();
    ctx.arc(0, 0, circleRadius, 0, Math.PI * 2);
    ctx.fillStyle = `rgb(${data.bgColor[0]}, ${data.bgColor[1]}, ${data.bgColor[2]})`;
    ctx.fill();
    ctx.restore();
    // --- CIRCULAR TEXT (same as template, not rotating) ---
    if (data.title) {
        const text = data.title.toUpperCase();
        ctx.save();
        ctx.font = '40px Arial';
        ctx.fillStyle = data.fontColor || '#000';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        const radius = circleRadius * 0.75;
        ctx.translate(centerX, centerY);
        ctx.rotate(solidspeed + (-Math.PI / 2 + 1));
        const step = 0.29;
        for (let i = 0; i < text.length; i++) {
            ctx.save();
            ctx.rotate(i * step);
            ctx.translate(0, -radius);
            ctx.fillText(text[i], 0, 0);
            ctx.restore();
            }
        ctx.restore();
          }
          // Increment rotation for next frame
          rotatingAngle += 0.03; // Adjust speed as needed
          // --- SQUARE BORDER ---
          const squareSize = Math.min(data.canvasWidth * 0.6, data.canvasHeight * 0.6);
          const squareHeight = squareSize + 300;
          const squareWidth = data.canvasWidth * 0.8;
          const squareX = (data.canvasWidth - squareWidth) / 2;
          const squareY = data.canvasHeight - squareHeight;
          ctx.lineWidth = 30;
          ctx.strokeStyle = "white";
          ctx.strokeRect(squareX, squareY, squareWidth, squareHeight);
    
          // --- PROFILE IMAGE IN SQUARE ---
          const padding = 0;
          ctx.save();
          ctx.beginPath();
          ctx.rect(squareX + padding, squareY + padding, squareWidth - padding * 2, squareHeight - padding * 2);
          ctx.clip();
          ctx.drawImage(profileImg, squareX + padding, squareY + padding, squareWidth - padding * 2, squareHeight - padding * 2);
          ctx.restore();
          rotatingAngle += 0.03; // Adjust speed as needed

}
    
        (async () => {
            await preloadAssets();
            console.log("🚀 Server ready, all assets preloaded!");
          })();
module.exports = { vinylTemplate, animateVinyl, syncTemplate, animateSync, listenTemplate, animateListen, shivam1Template, animateShivam1, shivam2Template, animateShivam2 };
