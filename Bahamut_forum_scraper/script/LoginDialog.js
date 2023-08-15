function showLoginDialog() {
    let dialog = document.getElementById(ElementId.ID_LOGIN_DIALOG);
    dialog.showModal();
}

// Login button event
{
    let btnLogin = document.getElementById(ElementId.ID_BTN_LOGIN);
    let account = document.getElementById(ElementId.ID_ACCOUNT);
    let password = document.getElementById(ElementId.ID_PASSWORD);
    btnLogin.addEventListener('click', onClick);

    function onClick() {
        console.log(account.value);
        console.log(password.value);
        requestLogin(account.value, password.value);
    }
}