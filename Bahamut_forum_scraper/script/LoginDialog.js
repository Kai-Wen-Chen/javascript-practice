function showLoginDialog() {
    let dialog = document.getElementById(ElementId.ID_LOGIN_DIALOG);
    dialog.showModal();
}

// Login button event
{
    let btnLogin = document.getElementById(ElementId.ID_BTN_LOGIN);
    let access_token = document.getElementById(ElementId.ID_ACCESS_TOKEN);
    btnLogin.addEventListener('click', onClick);

    function onClick() {
        //console.log(access_token.value);
        ACCESS_TOKEN = access_token.value;
        accessURLByToken();
    }
}