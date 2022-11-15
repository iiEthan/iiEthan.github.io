import * as db from './dbFunctions.js'

var camsList = (await db.get()).cam
var max = camsList.length
var camNum = getCurrentCam()
var dropped = false

// Check if we have url params, set to first if none provided
if (window.location.search.includes("cam")) {
    loadCam()
} else {
    setURLParam(1)
}

function setURLParam(newCam) {
    history.replaceState('', '', `?cam=${newCam}`)
    loadCam() 
}

export function getCurrentCam() {
    const url = new URL(window.location.href)
    const searchParams = new URLSearchParams(url.search)
    camNum = Number(searchParams.get('cam'))
    return camNum
}

export async function setMax() {
    camsList = (await db.get()).cam
    max = camsList.length
}

async function loadCam() {
    camNum = getCurrentCam()

    // Height may be different because of dropdown button
    let streamHeight = ""
    if (dropped) {streamHeight = `style="height:100%"`}

    document.getElementById("number").innerHTML = camNum
    const cam = await db.get(camNum)
    document.getElementById("stream").innerHTML = `<img class="stream" id="strm" src="${cam.url}"${streamHeight}></img>`
    document.getElementById("title").innerHTML = cam.title
    document.getElementById("flag").innerHTML = `<span class="fi fi-${cam.cc.toLowerCase()}" title="${cam.cc}"></span>`
}

window.firstCam = function firstCam() {
    if (camNum != 1) {
        setURLParam(1)
    }
}

window.nextCam = function nextCam() {
    const next = camNum + 1
    if (next <= max) {
        setURLParam(next)
    }
}

window.previousCam = function previousCam() {
    if (camNum > 1) {
        const previous = camNum - 1
        if (previous > 0) {
            setURLParam(previous)
        }
    }
}

window.lastCam = function lastCam() {
    if (camNum != max) {
        setURLParam(max)
    }
}

window.reload = function reload() {
    loadCam()
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
    let key = event.key

    if (key == "ArrowRight") {
        nextCam()
    }

    if (key == "ArrowLeft") {
        previousCam()
    }

    if (key == "r") {
        reload()
    }
    
}, false)
