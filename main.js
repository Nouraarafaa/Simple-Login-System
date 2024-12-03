let users = JSON.parse(localStorage.getItem('users')) || [];  

document.getElementById('signup').addEventListener('click', function() {
    document.getElementById('loginFormContainer').style.display = 'none';
    document.getElementById('registerFormContainer').style.display = 'block';
});

document.getElementById('signin').addEventListener('click', function() {
    document.getElementById('loginFormContainer').style.display = 'block';
    document.getElementById('registerFormContainer').style.display = 'none';
});

document.getElementById('loginform').addEventListener('submit', function(event) {
    event.preventDefault();
    var email = document.getElementById('loginEmail').value;
    var password = document.getElementById('loginPassword').value;

    if (!validateEmail(email)) {
        document.getElementById('loginErrorMessage').textContent = 'Invalid email format!';
        document.getElementById('loginErrorMessage').style.display = 'block';
        return;
    }
    
    var user = users.find(user => 
        user.password === password && 
        user.email.toLowerCase() === email.toLowerCase()
    );

    if (user) {
        localStorage.setItem('user', JSON.stringify(user)); 
        localStorage.setItem('username', user.username); 
        window.location.href = "welcome.html"; 
        document.getElementById('loginErrorMessage').style.display = 'none';
    } else {
        document.getElementById('loginErrorMessage').textContent = 'Invalid email or password';
        document.getElementById('loginErrorMessage').style.display = 'block';
    }
});

document.getElementById('registerform').addEventListener('submit', function(event) {
    event.preventDefault();
    var username = document.getElementById('registerName').value;  
    var email = document.getElementById('registerEmail').value; 
    var password = document.getElementById('registerPassword').value; 

    if (!validateEmail(email)) {
        document.getElementById('registerErrorMessage').textContent = 'Invalid email format!';
        document.getElementById('registerErrorMessage').style.display = 'block';
        return;
    }

    if (password.length < 8) {
        document.getElementById('registerErrorMessage').textContent = 'Password must be at least 8 characters long!';
        document.getElementById('registerErrorMessage').style.display = 'block';
        return;
    }

    var userExists = users.find(user => user.email.toLowerCase() === email.toLowerCase());

    if (userExists) {
        document.getElementById('registerErrorMessage').textContent = 'Email is already registered';
        document.getElementById('registerErrorMessage').style.display = 'block';
    } else {
        users.push({ username, email, password });
        localStorage.setItem('users', JSON.stringify(users)); 
        alert('Registration successful!');
        document.getElementById('registerErrorMessage').style.display = 'none';
        document.getElementById('registerFormContainer').style.display = 'none';
        document.getElementById('loginFormContainer').style.display = 'block';
        document.getElementById('registerform').reset();  
    }
});

function validateEmail(email) {
    var regex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
    return regex.test(email);
}
