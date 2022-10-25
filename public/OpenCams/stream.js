import {dbFunctions} from './dbFunctions.js'

let db = new dbFunctions()
const camsList = await db.get()
const max = camsList.cam.length
var camNum
// Save to check height when we load new camera
var dropped

// Check if we have url params, set to cam 1 if none provided
if (window.location.search.includes("cam")) {
    loadCam()
} else {
    window.location.search = "cam=1"
}

function setURLParam(newCam) {
    camNum = newCam
    history.replaceState(`?cam=${camNum}`, '', `?cam=${newCam}`);
}

function getCurrentCam() {
    const url = new URL(window.location.href)
    const searchParams = new URLSearchParams(url.search)
    camNum = searchParams.get('cam')
    return camNum
}

async function loadCam() {
    camNum = getCurrentCam()

    // Height may be different because of dropdown button
    let streamHeight = ""
    if (dropped) {streamHeight = ` style="height:100%"`}

    document.getElementById("number").innerHTML = camNum
    const cam = await db.get(camNum)
    document.getElementById("stream").innerHTML = `<img class="stream" id="strm" src="${cam.url}"${streamHeight}></img>`
    document.getElementById("title").innerHTML = cam.title
    document.getElementById("flag").innerHTML = `<span class="fi fi-${cam.cc}" title="${cam.cc}"></span>`
}


window.firstCam = function firstCam() {
    if (camNum != 1) {
        setURLParam(1)
        loadCam()    
    }
}

window.nextCam = function nextCam() {
    const next = Number(camNum) + 1
    if (next <= max) {
        setURLParam(next)
        loadCam()
    }
}

window.previousCam = function previousCam() {
    if (camNum > 1) {
        const previous = Number(camNum) - 1
        if (previous > 0) {
            setURLParam(previous)
            loadCam()
        }
    }
}

window.lastCam = function lastCam() {
    if (camNum != max) {
        setURLParam(max)
        loadCam()
    }
}

window.dropUI = function dropUI() {
    document.getElementById("ui-container").style.display="none"
    document.getElementById("strm").style.height="100%"
    document.getElementById("expand").style.display="block"
    dropped = true
}

window.showUI = function showUI() {
    document.getElementById("ui-container").style.display="block"
    document.getElementById("strm").style.height="calc(100% - var(--ui-height))"
    document.getElementById("expand").style.display="none"
    dropped = false
}


document.addEventListener('keydown', (event) => {
    var key = event.key

    if (key == "ArrowRight") {
        nextCam()
    }

    if (key == "ArrowLeft") {
        previousCam()
    }

}, false)