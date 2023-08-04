// Address input event
{
    let inputAddress = document.getElementById('idAddress');
    inputAddress.addEventListener('input', onInput);

    function onInput() {
        ADDRESS = inputAddress.value;
        UpdateKeywordUI(true);
        console.log(ADDRESS);
    };
}

// Address search button event
{
    let btnSearchAddress = document.getElementById('idBtnSearchAddress');
    btnSearchAddress.addEventListener('click', onClick);

    function onClick() {
        console.log('search address click');
        // TODO: Enable keyword UI if the address is valid and succeed to login buhamut
        
        UpdateKeywordUI();
    }
}

// Keyword input event
{
    let inputKeyword = document.getElementById('idKeyword');
    inputKeyword.addEventListener('input', onInput);

    function onInput() {
        KEYWORD = inputKeyword.value;
        console.log(KEYWORD);

        //TODO: Search contents based on keyword
    }
}