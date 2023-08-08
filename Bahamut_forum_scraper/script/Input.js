const hostname = 'localhost';
const port = 3000;

function updateKeywordUI(disabled=false) {
    let inputKeyword = document.getElementById('idKeyword');
    let idBtnSearchKeyword = document.getElementById('idBtnSearchKeyword');
    inputKeyword.disabled = disabled;
    idBtnSearchKeyword.disabled = disabled;
};

// Address input event
{
    let inputAddress = document.getElementById('idAddress');
    inputAddress.addEventListener('input', onInput);

    function onInput() {
        let body = {
            'method': 'onInputAddress',
            'value': inputAddress.value
        };
        fetch(`http://${hostname}:${port}`, {
            method: 'POST',
            body: JSON.stringify(body)
        })
            .then((response) => {
                if (!response.ok)
                    throw new Error(`HTTP error: ${response.status}`);
                return response.json();
            })
            .then((json) => {
                //console.log(json);
                if (!json.action || json.action !== 'updateKeywordUI')
                    throw new Error(`unexpected action: ${json.action}`);
                if (!json.arguments || json.arguments.length != 1)
                    throw new Error(`unexpected arguments`);

                updateKeywordUI(json.arguments[0])
            })
            .catch((error) => console.error(error));
    };    
}

// Address search button event
{
    let btnSearchAddress = document.getElementById('idBtnSearchAddress');
    btnSearchAddress.addEventListener('click', onClick);

    function onClick() {
        let body = {
            'method': 'onClickSearchBtn',
            'value': null
        }
        fetch(`http://${hostname}:${port}`, {
            method: 'POST',
            body: JSON.stringify(body)
        })
            .then((response) => {
                if (!response.ok)
                    throw new Error(`HTTP error: ${response.status}`);
                return response.json();
            })
            .then((json) => {
                //console.log(json);
                if (!json.action || json.action !== 'updateKeywordUI')
                    throw new Error(`unexpected action: ${json.action}`);
                if (!json.arguments || json.arguments.length != 1)
                    throw new Error(`unexpected arguments`);

                updateKeywordUI(json.arguments[0])
            })
            .catch((error) => console.error(error));
    };
}

// Keyword input event
{
    let inputKeyword = document.getElementById('idKeyword');
    inputKeyword.addEventListener('input', onInput);

    function onInput() {
        let body = {
            'method': 'onInputKeyword',
            'value': inputKeyword.value
        };
        fetch(`http://${hostname}:${port}`, {
            method: 'POST',
            body: JSON.stringify(body)
        })
            .then((response) => {
                if (!response.ok)
                    throw new Error(`HTTP error: ${response.status}`);
                //console.log(response);
            })
            .catch((error) => console.error(error));
    }
}