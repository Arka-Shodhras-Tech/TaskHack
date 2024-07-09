export const Overlay = (divtag) => {
    const targetDiv = document.getElementById(divtag);
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
            } else {
                try {
                    targetDiv.style.display='none'
                } catch (e) {
                    console.log(e);
                }
            }
        });
    }, {
        threshold: 0
    });
    observer.observe(targetDiv);
}