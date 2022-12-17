// Fade in title card text
window.onload = function() {
    const fadeCollection = Object.values(document.getElementsByClassName("fade-up"))
    
    fadeCollection.forEach(element => {
        for (const element of fadeCollection) {
            element.classList.add('visible')
        }    
    })
}

// Navbar change when scrolling
window.addEventListener("scroll", function() {
    var header = this.document.querySelector("nav")
    header.classList.toggle("sticky", window.scrollY > 0)
})