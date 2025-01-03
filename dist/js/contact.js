const contactForm = document.getElementById("contact-form");

let name = document.getElementById("name");
let email = document.getElementById("email");
let subject = document.getElementById("subject");
let message = document.getElementById("message");

contactForm.addEventListener("submit", (event) => {
    event.preventDefault();

    let formData = {
        name: name.value,
        email: email.value,
        subject: subject.value,
        message: message.value
    }

    let xhr = new XMLHttpRequest();
    xhr.open('POST', '/.netlify/functions/app');
    xhr.setRequestHeader('content-type', 'application/json');
    xhr.onload = function () {
        console.log(xhr.responseText);
        if (xhr.responseText == 'success') {
            alert("Email Sent");
            name.value = '';
            email.value = '';
            subject.value = '';
            message.value = '';
        } else {
            alert("Somthing went wrong!")
        }
    }

    xhr.send(JSON.stringify(formData))

});