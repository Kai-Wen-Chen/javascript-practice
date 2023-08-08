const hostname = 'localhost';
const port = 3000;
let ADDRESS = null;

const WebsiteValid = {
    Invalid: 0,
    Valid: 1,
    NeedLogin: 2
};

function updateKeywordUI(disabled=false) {
    let inputKeyword = document.getElementById('idKeyword');
    let idBtnSearchKeyword = document.getElementById('idBtnSearchKeyword');
    inputKeyword.disabled = disabled;
    idBtnSearchKeyword.disabled = disabled;
};

function createRequestBody(value, key=null) {
    if (key === null)
        key = ['method', 'value'];
    
    if (!key || !value || key.length != value.length) {
        console.log('wrong request body key-value');
        return {};
    }

    let body = {};
    for (let i=0; i<key.length; i++)
        body[key[i]] = value[i];

    return body;
}

// Address input event
{
    let inputAddress = document.getElementById('idAddress');
    inputAddress.addEventListener('input', onInput);

    function onInput() {
        ADDRESS = inputAddress.value;
        let body = createRequestBody(value=['onInputAddress', inputAddress.value]);
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
        let body = createRequestBody(value=['onClickSearchAddressBtn', ADDRESS]);
        fetch(`http://${hostname}:${port}`, {
            method: 'POST',
            body: JSON.stringify(body)
        })
            .then((response) => {
                return response.text();
            })
            .then((text) => {
                //console.log(text);
                // TODO: check if the website is valid
                let state = checkWebsiteValid(text);
                if (state === WebsiteValid.Valid)
                    updateKeywordUI(false);
                else if (state === WebsiteValid.NeedLogin) {
                    console.log('need login');
                } else {

                }
            })
            .catch((error) => {});
    };

    function checkWebsiteValid(text) {
        if (text === 'wrong url')
            return WebsiteValid.Invalid;

        let dummyHTML = document.createElement('html');
        dummyHTML.innerHTML = text;

        let paragraphs = dummyHTML.getElementsByTagName('p');
        //console.log(paragraphs);
        if (paragraphs) {
            for (let i=0; i<paragraphs.length; i++) {
                if (paragraphs[i].textContent === '無此討論板') {
                    console.log('no such forum');
                    return WebsiteValid.Invalid;
                }
            }
        }

        let headers = dummyHTML.getElementsByTagName('h1');
        //console.log(headers);
        if (headers) {
            for (let i=0; i<headers.length; i++) {
                if (headers[i].textContent === '兒少保護') {
                    return WebsiteValid.NeedLogin;
                }
            }
        }

        return WebsiteValid.Valid;
    }
}

// Keyword input event
{
    let inputKeyword = document.getElementById('idKeyword');
    inputKeyword.addEventListener('input', onInput);

    function onInput() {
        let body = createRequestBody(value=['onInputKeyword', inputKeyword.value]);
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

// Keyword search button event
{
    let btnSearchKeyword = document.getElementById('idBtnSearchKeyword');
    btnSearchKeyword.addEventListener('click', onClick);

    function onClick() {
        let body = createRequestBody(value=['onClickSearchKeywordBtn', null]);
        fetch(`http://${hostname}:${port}`, {
            method: 'POST',
            body: JSON.stringify(body)
        })
            .then((response) => {
                if (!response.ok)
                    throw new Error(`HTTP error: ${response.status}`);
                return response.text();
            })
            .then((text) => {
                //console.log(json);
                let event = new Event('updateContent');
                let table = document.getElementById('idTable');
                table.dispatchEvent(event);
            })
            .catch((error) => console.error(error));
    };
}