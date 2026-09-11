document.addEventListener("DOMContentLoaded", function () {
    console.log("Pagina a fost încărcată cu succes!");

    const navLinks = document.querySelectorAll("nav a, .back-top");

    navLinks.forEach(link => {
        link.addEventListener("click", function (e) {
            const href = this.getAttribute("href");
            
            if (href.startsWith("#")) {
                e.preventDefault();
                const targetElement = document.querySelector(href);
                if (targetElement) {
                    targetElement.scrollIntoView({
                        behavior: "smooth"
                    });
                }
            }
        });
    });
});