const hostname = 'localhost';
const port = 3000;
let ADDRESS = null;
let KEYWORD = null;
let WEBSITE_HTML = null;

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

function getTotalPage() {
    let dummyHTML = document.createElement('html');
    dummyHTML.innerHTML = WEBSITE_HTML;

    let p_pageBtn = dummyHTML.getElementsByClassName('BH-pagebtnA');
    if (p_pageBtn) {
        //console.log(p_pageBtn[0].lastChild.textContent);
        return parseInt(p_pageBtn[0].lastChild.textContent);
    }

    return 0;
}

function requestPage(cur_page, total_page, cur_address) {
    let body = createRequestBody(value=['onClickSearchKeywordBtn', cur_address]);
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
            //console.log(text);
            let event = new Event('updateContent');
            let table = document.getElementById('idTable');
            table.dispatchEvent(event, text);
        })
        .catch((error) => {
            console.error(error);
        })
        .finally(() => {
            if (cur_page < total_page) {
                // TODO: Update cur_address
                requestPage(cur_page + 1, total_page, cur_address);
            }
        });
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
                let state = checkWebsiteValid(text);
                if (state === WebsiteValid.Valid) {
                    WEBSITE_HTML = text;
                    updateKeywordUI(false);
                }
                else if (state === WebsiteValid.NeedLogin) {
                    console.log('need login');
                    updateKeywordUI(true);
                    // TODO: Do login or cancel
                } else {
                    updateKeywordUI(true);
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
        KEYWORD = inputKeyword.value;
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
        let totalPage = getTotalPage();
        if (totalPage === 0) {
            console.log('no page, do nothing');
            return;
        }

        let currentPage = 1;
        let currentAddress = ADDRESS;
        // TODO: use total page rather than 1
        requestPage(currentPage, 1, currentAddress);
        /*
        let body = createRequestBody(value=['onClickSearchKeywordBtn', currentAddress]);
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
            .catch((error) => {
                console.error(error);
                totalPage = -1;
            })
            .finally(() => {
                if (currentPage < totalPage) {
                    currentPage++;
                }
            });
        */
    };
}