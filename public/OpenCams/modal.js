import * as db from './dbFunctions.js'
import { getCurrentCam, setMax } from './stream.js'

var camsList = (await db.get()).cam
const countries = getCountries()

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

// Fires when a modal is opened
window.modalLoad = function modalLoad(event) {
    let camNum = getCurrentCam()

    // Updates current selected country
    if (event.target.id == "update-item") {
        const camera = camsList[camNum - 1]
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

    // Adds camera list and updates currently selected
    if (event.target.id == "remove-item") { 
        const element = document.getElementById("removeCamSelect")

        if (element.options.length == 0) {
            for (const i in camsList) {
                let option = document.createElement("option")
                const text = `${camsList[i].id} - ${camsList[i].title}`
                option.value = text
                option.text = text
                if (camsList[i].id == camNum) option.selected = true
    
                element.appendChild(option)
            }
        } else {
            const value = element.options[element.selectedIndex]
            value.selected = false

            for (const i in camsList) {
                if (camsList[i].id == camNum) {
                    element.options[i].selected = true
                    break
                }
            }
        }
    }
}


async function closeModal(id) {
    await setMax()

    const modalEl = document.getElementById(id)
    const modal = bootstrap.Modal.getInstance(modalEl)
    modal.hide()
}

function formatPostData(event) { 
    let country
    const element = event.target.elements

    // differentiate between update and add form
    if (typeof element.countrySelection != "undefined") {
        country = element.countrySelection.value
    } else {
        country = element.updateCountrySelect.value
    }

    const cc = Object.keys(countries).find(key => countries[key] === country)  
    const data = {
        title: event.target[1].value,
        url: event.target[2].value,
        cc: cc,
        id: camsList.length + 1,
        passcode: event.target[4].value
    }
    return data
}

// Add handler
window.addCam = async function addCam(event) {
    event.preventDefault()
    let err = document.getElementById('addError')

    let data = formatPostData(event)

    if (await db.post(data)) {
        await closeModal('addModal')
        if (!err.hasAttribute("hidden")) err.hidden = true
        camsList = (await db.get()).cam
    } else {
        if (err.hasAttribute("hidden")) err.removeAttribute("hidden")
    }
}

// Update handler
window.updateCam = async function updateCam(event) {
    event.preventDefault()
    let err = document.getElementById('updateError')

    let data = formatPostData(event)
    data.id = getCurrentCam() + 1

    if (await db.update(data)) {
        await closeModal('updateModal')
        if (!err.hasAttribute("hidden")) err.hidden = true
    } else {
        if (err.hasAttribute("hidden")) err.removeAttribute("hidden")
    }
}

// Remove handler
window.removeCam = async function removeCam(event) {
    event.preventDefault()
    let err = document.getElementById('removeError')

    let data = camsList[getCurrentCam() - 1]
    data.passcode = event.target[2].value

    if (await db.remove(data)) {
        await closeModal('removeModal')
        if (!err.hasAttribute("hidden")) err.hidden = true
        camsList = (await db.get()).cam
    } else {
        if (err.hasAttribute("hidden")) err.removeAttribute("hidden")
    }
}
