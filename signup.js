document.addEventListener("DOMContentLoaded", function () {
    const loginForm = document.getElementById("form");
    const signupForm = document.getElementById("form2");
    const loginEmailInput = document.getElementById("loginname");
    const loginPasswordInput = document.getElementById("password");
    const signupEmailInput = document.getElementById("loginname2");
    const signupPasswordInput = document.getElementById("password2");
    const wrongnameSpan = document.getElementById("wrongname");
    const wrongnameSpan2 = document.getElementById("wrongname2");

    if (signupForm) {
        signupForm.addEventListener("submit", function (event) {
            event.preventDefault(); // Prevent default form submission
            
            const email = signupEmailInput.value.trim();
            const password = signupPasswordInput.value.trim();
            
            if (email === "" || password === "") {
                wrongnameSpan2.textContent = "Email and password are required";
                wrongnameSpan2.style.color = "red";
                return;
            }

            // Store signup credentials
            localStorage.setItem("userEmail", email);
            localStorage.setItem("userPassword", password);
            
            // Redirect to index.html
            alert('You are succesfully signed up, Please login')
            window.location.href = "login.html";
        });
    }

    if (loginForm) {
        loginForm.addEventListener("submit", function (event) {
            event.preventDefault(); // Prevent default form submission
            
            const email = loginEmailInput.value.trim();
            const password = loginPasswordInput.value.trim();
            
            const storedEmail = localStorage.getItem("userEmail");
            const storedPassword = localStorage.getItem("userPassword");

            if (email === storedEmail && password === storedPassword) {
                // Redirect to index.html
                window.location.href = "index.html";
                alert('Welcome back. You are logged in.')
            } else {
                wrongnameSpan.textContent = "Invalid email or password";
                wrongnameSpan.style.color = "red";
            }
        });
    }
});


logout.addEventListener("submit", function (event) {
    event.preventDefault(); // Prevent default form submission
    Window.location.href = "signup.html"
})