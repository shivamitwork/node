const ffmpeg = require('fluent-ffmpeg')

async function stitchFramesToVideo(
  framesFilepath,
  soundtrackFilePath,
  outputFilepath,
  duration,
  frameRate,
  audioStartingTime
) {

  await new Promise((resolve, reject) => {
    const t2 = new Date().getTime()
    ffmpeg()

      // Tell FFmpeg to stitch all images together in the provided directory
      .input(framesFilepath)
      .inputOptions([
        // Set input frame rate
        `-framerate ${frameRate}`,
      ])

      // Add the soundtrack
      .input(soundtrackFilePath)
      .seekInput(audioStartingTime) 
      .audioFilters([
        // Fade out the volume 2 seconds before the end
        `afade=out:st=${duration - 2}:d=2`,
      ])

      .videoCodec('libx264')
      .outputOptions([
        // YUV color space with 4:2:0 chroma subsampling for maximum compatibility with
        // video players
        '-pix_fmt yuv420p',
      ])

      // Set the output duration. It is required because FFmpeg would otherwise
      // automatically set the duration to the longest input, and the soundtrack might
      // be longer than the desired video length
      .duration(duration)
      // Set output frame rate
      .fps(frameRate)

      // Resolve or reject (throw an error) the Promise once FFmpeg completes
      .saveToFile(outputFilepath)
      .on('end', () => {

        console.log("Time taken to make video", (new Date().getTime() - t2)/1000)
        resolve()
      })
      .on('error', (error) => reject(new Error(error)));
  });
}

module.exports = stitchFramesToVideo