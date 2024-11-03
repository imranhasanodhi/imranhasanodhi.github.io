document.addEventListener("scroll", () => {
    const header = document.querySelector(".header");
    if (window.scrollY > 100) {
        header.style.backgroundColor = "rgba(0, 0, 0, 0.8)";
    } else {
        header.style.backgroundColor = "transparent";
    }
});
document.getElementById('contactForm').addEventListener('submit', function (event) {
    event.preventDefault();

    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const message = document.getElementById('message').value;

    console.log('Form submitted:', { name, email, message });

    alert('Thank you for your message, ' + name + '! We will get back to you soon.');

    document.getElementById('contactForm').reset();
});