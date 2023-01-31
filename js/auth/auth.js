function onDOMLoaded(){ 
    $('#login-button').click(function (e) { 
        e.preventDefault();
        $.ajax({
            type: "POST",
            url: `https://localhost:7020/api/Auth/Login/login?UserName=${$('#login-form__login').val()}&Password=${$('#login-form__password').val()}`,
            success: function (response) {
                alert('Добро пожаловать')
                sessionStorage.setItem("token",response.token);
                window.location = '../index.html';
            },
            error: function (error) {
                alert('Вход не выполнен.');
            }
        });
    });

    $('#reg-button').click(function (e) { 
        e.preventDefault();
        $.ajax({
            type: "POST",
            url: `https://localhost:7020/api/Auth/RegUser/regUser?UserName=${$('#reg-form__login').val()}&Password=${$('#reg-form__password').val()}&Email=${$('#reg-form__email').val()}`,
            success: function (response) {
                alert('Успешная регистрация')
                sessionStorage.setItem("token",response.token);
                window.location = '../index.html';
            },
            error: function (error) {
                alert('Регистрация не выполнена.');
            }
        });
    });

}
document.addEventListener('DOMContentLoaded', onDOMLoaded);
