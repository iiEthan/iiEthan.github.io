import {addDB} from "./db.js"

async function addCam(title, url) {
    await addDB(title, url)
}

addCam("test", "http://camera.buffalotrace.com/mjpg/video.mjpg")