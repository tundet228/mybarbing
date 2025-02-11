document.addEventListener("DOMContentLoaded", function () {
    let mysubb = document.getElementById("mySubmit");
    let nameN = document.getElementById("myText");
    let displayT = document.getElementById("name");
    let myCheckBoxEle = document.getElementById("myCheckBox");
    let visaEle = document.getElementById("visaBtn");
    let masterEle = document.getElementById("masterBtn");
    let paypalEle = document.getElementById("payPalBtn");
    let mySubmittEle = document.getElementById("mySubmitt");
    let subREle = document.getElementById("subR");
    let paymentREle = document.getElementById("paymentR");
    let checkIt = document.getElementById("check");

    // Load saved values from local storage
    let storedName = localStorage.getItem("username");
    let storedSubscription = localStorage.getItem("subscribed");
    let storedPayment = localStorage.getItem("paymentMethod");

    if (storedName) {
        displayT.textContent = `Hello ${storedName}, welcome to IBN BARBING SHOP!`;
    } else {
        this.textContent= 'Enter you name'
    }

    myCheckBoxEle.checked = storedSubscription === "true";
    checkIt.textContent = myCheckBoxEle.checked ? "Subscribed" : "Subscribe";
    subREle.textContent = myCheckBoxEle.checked ? "Subscribed" : "Please Subscribe";

    if (storedPayment) {
        paymentREle.textContent = `You are paying with ${storedPayment}`;
        if (storedPayment === "Visa") visaEle.checked = true;
        else if (storedPayment === "MasterCard") masterEle.checked = true;
        else if (storedPayment === "PayPal") paypalEle.checked = true;
    } else {
        paymentREle.textContent = "Please select a payment method";
    }

    mysubb.onclick = function () {
        let username = nameN.value.trim();
        if (username) {
            let firstname = username.slice(username.indexOf ( ' ' ) )
            displayT.textContent = `Hello ${firstname}, you are welcome to IBN BARBING SHOP!`;
            localStorage.setItem("username", firstname);
        }
    };

    myCheckBoxEle.addEventListener("change", function () {
        localStorage.setItem("subscribed", myCheckBoxEle.checked ? "true" : "false");
        checkIt.textContent = myCheckBoxEle.checked ? "Subscribed" : "Subscribe";
        subREle.textContent = myCheckBoxEle.checked ? "Subscribed" : "Please Subscribe";
    });

    visaEle.onclick = function () {
        localStorage.setItem("paymentMethod", "Visa");
        paymentREle.textContent = "You are paying with Visa Card";
    };

    masterEle.onclick = function () {
        localStorage.setItem("paymentMethod", "MasterCard");
        paymentREle.textContent = "You are paying with MasterCard";
    };

    paypalEle.onclick = function () {
        localStorage.setItem("paymentMethod", "PayPal");
        paymentREle.textContent = "You are paying with PayPal";
    };

    mySubmittEle.onclick = function () {
        if (!myCheckBoxEle.checked) {
            subREle.textContent = "You are not Subscribed";
            return;
        }

        if (visaEle.checked || masterEle.checked || paypalEle.checked) {
            window.location.href = "payment.html";
        } else {
            paymentREle.textContent = "Please select a payment method";
        }
    };
});

// Handle Login & Signup
document.addEventListener("DOMContentLoaded", function () {
    const loginForm = document.getElementById("form");
    const signupForm = document.getElementById("form2");
    const loginEmailInput = document.getElementById("loginname");
    const loginPasswordInput = document.getElementById("password");
    const signupEmailInput = document.getElementById("loginname2");
    const signupPasswordInput = document.getElementById("password2");
    const wrongnameSpan = document.getElementById("wrongname");
    const wrongnameSpan2 = document.getElementById("wrongname2");
    const logoutButton = document.getElementById("logout");

    if (signupForm) {
        signupForm.addEventListener("submit", function (event) {
            event.preventDefault();
            
            const email = signupEmailInput.value.trim();
            const password = signupPasswordInput.value.trim();

            if (email === "" || password === "") {
                wrongnameSpan2.textContent = "Email and password are required";
                wrongnameSpan2.style.color = "red";
                return;
            }

            let users = JSON.parse(localStorage.getItem("users")) || {};
            users[email] = password;
            localStorage.setItem("users", JSON.stringify(users));

            window.location.href = "login.html";
        });
    }

    if (loginForm) {
        loginForm.addEventListener("submit", function (event) {
            event.preventDefault();

            const email = loginEmailInput.value.trim();
            const password = loginPasswordInput.value.trim();
            let users = JSON.parse(localStorage.getItem("users")) || {};

            if (users[email] && users[email] === password) {
                window.location.href = "index.html";
            } else {
                wrongnameSpan.textContent = "Invalid email or password";
                wrongnameSpan.style.color = "red";
            }
        });
    }

    if (logoutButton) {
        logoutButton.addEventListener("click", function () {
            localStorage.removeItem("userEmail");
            localStorage.removeItem("userPassword");
            window.location.href = "login.html";
        });
    }
});

// Toggle Password Visibility
document.addEventListener("DOMContentLoaded", function () {
    function addTogglePasswordFeature(passwordFieldId) {
        const passwordInput = document.getElementById(passwordFieldId);
        if (!passwordInput) return;

        const toggleButton = document.createElement("button");
        toggleButton.innerText = "Show";
        toggleButton.className = "togglePassword";
        toggleButton.style.marginLeft = "10px";

        passwordInput.parentNode.appendChild(toggleButton);

        toggleButton.addEventListener("click", function (event) {
            event.preventDefault();
            passwordInput.type = passwordInput.type === "password" ? "text" : "password";
            toggleButton.innerText = passwordInput.type === "password" ? "Show" : "Hide";
        });
    }

    addTogglePasswordFeature("password");
    addTogglePasswordFeature("password2");
});

// Handle Password Reset
document.addEventListener("DOMContentLoaded", function () {
    document.getElementById("reset-form").addEventListener("submit", function (event) {
        event.preventDefault();

        let email = document.getElementById("email").value;
        let messageBox = document.getElementById("reset-message");
        let users = JSON.parse(localStorage.getItem("users")) || {};

        if (!users[email]) {
            messageBox.style.color = "red";
            messageBox.textContent = "Email not registered.";
            return;
        }

        let newPassword = prompt("Enter your new password:");
        if (newPassword) {
            users[email] = newPassword;
            localStorage.setItem("users", JSON.stringify(users));

            messageBox.style.color = "green";
            messageBox.textContent = "Your password has been reset successfully.";
            setTimeout(() => {
                window.location.href = "login.html";
            }, 3000);
        } else {
            messageBox.style.color = "red";
            messageBox.textContent = "Password reset cancelled.";
        }
    });
});
