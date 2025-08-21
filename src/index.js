const fs = require('fs')
const ffmpegStatic = require('ffmpeg-static')
const ffmpeg = require('fluent-ffmpeg')
const { registerFont, Canvas, loadImage } = require('canvas')
const stitchFramesToVideo = require('./utils/stitchFramesToVideo.js')
const { vinylTemplate, animateVinyl, syncTemplate, animateSync, listenTemplate, animateListen, shivam1Template, animateShivam1, shivam2Template, animateShivam2 } = require('./utils/generateFrame.js')
registerFont('assets/font/Poppins-Bold.ttf', { family: 'PoppinsBold' });
registerFont('assets/font/Poppins-Regular.ttf', { family: 'PoppinsNormal' });

// Family Name should be unique for all font weight so we provide different font name in RegisterFont and same should be use in canvas fontstyle

let stopVideoCreation = {}


async function generateVideo(data) {

  let imgData = {

    audioStartingTimeBackgroundImg: '',
    audioEndingTimeBackgroundImg: '',
    progressBarBackgroundImg: '',
    equalizerBackgroundImg: '',
    titleBackgroundImg: '',
    titleBackgroundImgLine2: '',
    userNameeBackgroundImg: '',
    titleBackgroundImg: {},
    leftSinWaveBackgroundImg: '',
    rightSinWaveBackgroundImg: '',
    phonographImg: '',
    musicPlayerImg: '',


  }



  const t1 = new Date().getTime()

  const canvas = new Canvas(data.canvasWidth, data.canvasHeight);
  const ctx = canvas.getContext('2d', { willReadFrequently: true });


  // Tell fluent-ffmpeg where it can find FFmpeg
  ffmpeg.setFfmpegPath(ffmpegStatic);

  // Clean up the temporary directories first
  for (const path of ['assets/' + data.slug, 'assets/tmp-' + data.slug + '/output']) {
    if (fs.existsSync(path)) {
      await fs.promises.rm(path, { recursive: true });   // Remove folder from assets
    }
    await fs.promises.mkdir(path, { recursive: true });    // Create folder inside assets
  }



  const profileImg = await loadImage(data.profileImgUrl)   // Load profile Image
  // Load Image of Listen Now Cartd
  if (data.phonographImgUrl) {
    imgData.phonographImg = await loadImage(data.phonographImgUrl)
    imgData.musicPlayerImg = await loadImage(data.musicPlayerImgUrl)
  }



  data.currentTemplate == 'Vinyl Love' ? await vinylTemplate(data, ctx, profileImg, imgData) :
    data.currentTemplate == 'Sync Wave' ?
      (await syncTemplate(data, ctx, profileImg, imgData),
        data.titleArr.forEach((item, i) => {
          ctx.putImageData(imgData.titleBackgroundImg[i], item.backgroundImgPositionX, item.backgroundImgPositionY)
        })
      ) : data.currentTemplate == 'SHIVAM_1' ?
      await shivam1Template(data, ctx, profileImg, imgData) :
      data.currentTemplate == 'SHIVAM_2' ?
      await shivam2Template(data, ctx, profileImg, imgData) :
      await listenTemplate(data, ctx, profileImg, imgData)

  // Set animation template

  let animateTemplate = data.currentTemplate == 'Vinyl Love' ? animateVinyl : data.currentTemplate == 'Sync Wave' ? animateSync : data.currentTemplate == 'SHIVAM_1' ? animateShivam1 : data.currentTemplate == 'SHIVAM_2' ? animateShivam2 : animateListen;


  let j = 0
  let l = 0
  let k = 0
  let amplitudeIncrement = 0.4

  // Render each frame
  for (let i = 0; i < data.frameCount; i++) {
    const time = i / data.frameRate;


    console.log(`Rendering frame ${i} at ${Math.round(time * 10) / 10} seconds...`);
    animateTemplate(data, ctx, i, j, time, imgData, profileImg, l, k)



    if (data.currentTemplate == 'Listen Now') {
      j += amplitudeIncrement
      j >= 4 || j < 0 ? amplitudeIncrement *= -1 : ''
    } else {
      j++
      j >= 59 ? j = 0 : ''
      Number.isInteger(time * 5) ? l < data.titleArr[k].word.length ? l++ : k < data.titleArr.length - 1 ? (l = 0, k++) : '' : ''
    }

    console.log("J Value", j)



    // Store the image in the directory where it can be found by FFmpeg
    const output = canvas.toBuffer('image/png');
    const paddedNumber = String(i).padStart(4, '0');
    await fs.promises.writeFile(`assets/tmp-${data.slug}/output/frame-${paddedNumber}.png`, output);   // Save image in folder under assets

    if (stopVideoCreation[data.slug]) {
      break;
    }

  }



  // Stitch all frames together with FFmpeg and generate Video
  if (!stopVideoCreation[data.slug]) {
    console.log("Shivam data frame rate",);
    
    await stitchFramesToVideo(
      `assets/tmp-${data.slug}/output/frame-%04d.png`,
      data.audioSrc,
      `assets/${data.slug}/video.mp4`,
      data.duration,     // to include last frame
      data.frameRate,
      data.audioStartingTime,
    );
  }

  console.log("Total Time", (new Date().getTime() - t1) / 1000)


}

// Delete folder after send file to client side

async function deleteFolder(outPutFileName, tmpFile) {
  console.log("Folder Delete successFully")
  for (const path of [outPutFileName, tmpFile]) {
    if (fs.existsSync(path)) {
      await fs.promises.rm(path, { recursive: true });  // Remove folder after sending video
    }
  }
}



module.exports = { generateVideo, deleteFolder, stopVideoCreation }