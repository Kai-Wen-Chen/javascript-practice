let UpdateKeywordUI = function(disabled=false) {
    let inputKeyword = document.getElementById('idKeyword');
    let idBtnSearchKeyword = document.getElementById('idBtnSearchKeyword');
    inputKeyword.disabled = disabled;
    idBtnSearchKeyword.disabled = disabled;
};