import {dbFunctions} from './dbFunctions.js'

let db = new dbFunctions()
var camsList = await db.get()
var max = camsList.cam.length
var camNum = getCurrentCam()
var dropped = false
const countries = getCountries()

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
    const next = Number(camNum) + 1
    if (next <= max) {
        setURLParam(next)
    }
}

window.previousCam = function previousCam() {
    if (camNum > 1) {
        const previous = Number(camNum) - 1
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

// Get list of countries and country codes for add/update forms
function getCountries(lang = 'en') {
    const A = 65
    const Z = 90
    const countryName = new Intl.DisplayNames([lang], { type: 'region' })
    const countries = {}
    // duplicate/invalid country codes
    const ignore = ["DD", "YD", "TP", "QO", "MI", "JT", "BU", "RH", "XA", "XB", "CS", "YU", "DY", "CW", "PU", "WK", "QU", "UK", "SU", "HV", "NQ", "FQ", "FX", "VD", "PC", "CT", "PZ", "NT", "NH", "ZR", "EZ", "ZZ"]
    for(let i=A; i<=Z; ++i) {
        for(let j=A; j<=Z; ++j) {
            let code = String.fromCharCode(i) + String.fromCharCode(j)
            if (ignore.includes(code)) continue
            let name = countryName.of(code)
            if (code !== name) {
                countries[code] = name
            }
        }
    }

    // Add countries to form selection
    const countryElements = Object.values(document.getElementsByClassName("countrySelect"))
        countryElements.forEach(formSelect => {
    
        for (const cc in countries) {
            let option = document.createElement("option")
            option.value = countries[cc]
            option.text = countries[cc]
            if (cc == "US") option.selected = true  

            formSelect.appendChild(option)
        }
    })
    return countries
}

async function closeModal(id) {
    // Add cams to browser then close modal
    camsList = await db.get()
    max = camsList.cam.length

    const modalEl = document.getElementById(id)
    const modal = bootstrap.Modal.getInstance(modalEl)
    modal.hide()
}

function formatPostData(event) {    
    const country = event.target.elements.countrySelection.value
    const cc = Object.keys(countries).find(key => countries[key] === country)  
    const data = {
        title: event.target[1].value,
        url: event.target[2].value,
        cc: cc,
        id: camsList.cam.length + 1,
        passcode: event.target[4].value
    }

    return data
}

// Fires when a modal is opened
window.modalLoad = function modalLoad(event) {
    // Updates current selected country in form
    if (event.target.id == "update-item") {
        const camera = camsList.cam[camNum - 1]
        const element = document.getElementById("updateCountrySelect")
        const value = element.options[element.selectedIndex]
        value.selected = false

        for (const i in element.options) {
            if (countries[camera.cc] == element.options[i].value) {
                element.options[i].selected = true
                break
            }
        }

        document.getElementById("updateTitleInput").value = camera.title
        document.getElementById("updateUrlInput").value = camera.url
        document.getElementById("updateModalLabel").textContent = `Update camera ${camera.id}`
    }
}

// Add handler
window.addCam = async function addCam(event) {
    event.preventDefault()

    let data = formatPostData(event)

    if (await db.post(data)) {
        await closeModal('addModal')
    } else {
        let err = document.getElementById('addError')
        if (err.hasAttribute("hidden")) err.removeAttribute("hidden")
    }
}

// Update handler
window.updateCam = async function updateCam(event) {
    event.preventDefault()

    let data = formatPostData(event)

    if (await db.update(data)) {
        await closeModal('updateModal')
    } else {
        let err = document.getElementById('updateError')
        if (err.hasAttribute("hidden")) err.removeAttribute("hidden")
    }
}