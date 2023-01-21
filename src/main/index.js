window.onload = function() {
    
    // Fade in items on open
    const fadeCollection = Object.values(document.getElementsByClassName("fade-up"))
    
    fadeCollection.forEach(element => {
        element.classList.add('visible')
    })
    
    // Add skews to content
    const skews = Object.values(document.getElementsByClassName("seperator-skew"))
    
    skews.forEach(element => {
        element.innerHTML = 
        "<svg x='0' y='0' viewBox='0 0 2560 100' preserveAspectRatio='none' version='1.1' " +
        "xmlns='http://www.w3.org/2000/svg' style='position: absolute;bottom: -1px;'> " +
        "<polygon points='2560 0 2560 100 0 100'></polygon></svg>"
    })
    
    
    const fadeInElements = document.querySelectorAll('.fade-in');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (entry.intersectionRatio > 0) {
                entry.target.classList.add('appear');
                observer.unobserve(entry.target);
            }
        });
    });
    
    fadeInElements.forEach((element) => {
        observer.observe(element);
    });
    
    
}

// Navbar sticky when scrolling
window.addEventListener("scroll", function() {
    var header = this.document.querySelector("nav")
    header.classList.toggle("sticky", window.scrollY > 0)
})