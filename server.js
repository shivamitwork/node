const express = require("express")
const cors = require('cors');
const fs = require('fs')
var http = require('http');


var path = require('path');

var {generateVideo, deleteFolder, stopVideoCreation} = require('./src/index');

const app = express()

var server = http.createServer(app);

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }))


app.post('/download', async (req, res)=>{

    try {
        await generateVideo(req.body)   // Generate Video

        if(!stopVideoCreation[req.body.slug]){  // Check Whether there is any cancellation request before completion of video
             // Stream the video file to the response
             const videoStream = fs.createReadStream(`assets/${req.body.slug}/video.mp4`);
             videoStream.pipe(res);
        }else {
            delete stopVideoCreation[req.body.slug]
             res.json({
                message: 'The video creation process has been halted'
             })
        }
        deleteFolder('assets/'+req.body.slug, 'assets/tmp-'+ req.body.slug)  
    } catch (error) {
        deleteFolder('assets/'+req.body.slug, 'assets/tmp-'+ req.body.slug)
        delete stopVideoCreation[req.body.slug]
        console.log(error.message)
        res.status(error.status || 500);
        res.json({
            message: "Oops! Something went wrong. Please try again after some time.",error:error
    })  
    }
})

app.get('/cancel', (req, res)=>{

   stopVideoCreation[req.query.song_slug] = true
   res.json({
    message : 'Cancellation Successfully',
    isCancelled: true
   })
})


server.listen(8080,'0.0.0.0',()=>{
    console.log("Server running on 0.0.0.0:8080")
})
