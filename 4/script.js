document.getElementById('registrationForm').addEventListener('submit', function(event) {
    let email = document.getElementById('email').value;
    let password = document.getElementById('password').value;
    let passwordStrength = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/; // проверка на одну строчную, заглавную букву и цифру

    if (!validateEmail(email)) {
        alert('Введите корректный email.');
        event.preventDefault();
    } else if (!passwordStrength.test(password)) {
        alert('Пароль должен содержать минимум 8 символов, включая строчные, заглавные буквы и цифры.');
        event.preventDefault();
    }
});

function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}
