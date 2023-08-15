const HOSTNAME = 'localhost';
const PORT = 3000;
const PAGE_URL_PIECE = 'page='
let ADDRESS = null;
let START_ADDRESS = null;
let KEYWORD = '';
let WEBSITE_HTML = null;
let IS_LOADING = false;
let IS_CANCEL = false;

const ElementId = {
    ID_ADDRESS: 'idAddress',
    ID_KEYWORD: 'idKeyword',
    ID_BTN_SEARCH_ADDRESS: 'idBtnSearchAddress',
    ID_BTN_SEARCH_KEYWORD: 'idBtnSearchKeyword',
    ID_BTN_CANCEL: 'idBtnCancel',
    ID_TABLE: 'idTable',
    ID_STATE: 'idState'
}

const ElementClass = {
    CLASS_DATA_ROW: 'DataRow',
    CLASS_CELL_FLOOR: 'CellFloor',
    CLASS_CELL_CONTENT: 'CellContent',
    CLASS_PAGE_BTN: 'BH-pagebtnA',
    CLASS_SECTION_MAIN_POST: 'c-section__main c-post',
    CLASS_ARTICLE: 'c-article FM-P2',
    CLASS_GPBP_FLOOR: 'floor tippy-gpbp',
}

const WebsiteValid = {
    Invalid: 0,
    Valid: 1,
    NeedLogin: 2
};

class ResultObj {
    constructor(f_list = null, c_list = null) {
        this.floor_list = f_list;
        this.content_list = c_list;
        this.length = f_list.length;
    }
};

function updateKeywordUI(disabled=false) {
    let inputKeyword = document.getElementById(ElementId.ID_KEYWORD);
    let idBtnSearchKeyword = document.getElementById(ElementId.ID_BTN_SEARCH_KEYWORD);
    inputKeyword.disabled = disabled;
    idBtnSearchKeyword.disabled = disabled;
};

function clearTableUI() {
    let rows = document.getElementsByClassName(ElementClass.CLASS_DATA_ROW);
    let rows_length = rows.length;
    for (let i=0; i<rows_length; i++)
        rows[0].remove();
}

function updateStateUI(state) {
    let stateText = document.getElementById(ElementId.ID_STATE);
    if (state === WebsiteValid.Invalid) {
        stateText.textContent = 'Access failed';
        stateText.style.color = 'red';
    } else if (state === WebsiteValid.NeedLogin) {
        stateText.textContent = 'Need login';
        stateText.style.color = 'yellow';
        // TODO: Add a dialog to let them login onsite
    } else if (state === WebsiteValid.Valid) {
        stateText.textContent = 'Access succeeded';
        stateText.style.color = 'rgb(0, 255, 0)';
    } else {
        stateText.textContent = 'None';
        stateText.style.color = 'white';
    }
}

function updateUIForSearching() {
    document.getElementById(ElementId.ID_BTN_SEARCH_ADDRESS).disabled = IS_LOADING;
    document.getElementById(ElementId.ID_ADDRESS).disabled = IS_LOADING;
    document.getElementById(ElementId.ID_BTN_SEARCH_KEYWORD).disabled = IS_LOADING;
    document.getElementById(ElementId.ID_KEYWORD).disabled = IS_LOADING;
    //TODO: Show/Hide loading message or waiting cursor
}

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

    let p_pageBtn = dummyHTML.getElementsByClassName(ElementClass.CLASS_PAGE_BTN);
    if (p_pageBtn) {
        //console.log(p_pageBtn[0].lastChild.textContent);
        return parseInt(p_pageBtn[0].lastChild.textContent);
    }

    return 0;
}

function extractContent(keyword='') {
    let data = WEBSITE_HTML;

    let dummyHTML = document.createElement('html');
    dummyHTML.innerHTML = data;

    let section_main_post = dummyHTML.getElementsByClassName(ElementClass.CLASS_SECTION_MAIN_POST);
    let floor_list = [];
    let content_list = [];
    for (let i=0; i<section_main_post.length; i++) {
        let contents = section_main_post[i].getElementsByClassName(ElementClass.CLASS_ARTICLE);
        if (!contents) {
            console.log('wrong content');
            continue;
        }

        let text = '';
        for (let j=0; j<contents.length; j++) {
            let tree_walker = document.createTreeWalker(
                contents[j],
                NodeFilter.SHOW_TEXT,
            );

            let currentNode = null;
            while ((currentNode = tree_walker.nextNode())) {
                //console.log(currentNode);
                text += currentNode.data.trim();
            }
        }
        
        //console.log(text);
        if (text.search(keyword) != -1) {
            let floor = section_main_post[i].getElementsByClassName(ElementClass.CLASS_GPBP_FLOOR);
            floor_list.push(floor[0].dataset.floor);
            content_list.push(text);
        }
    }

    //console.log(floor_list);
    //console.log(content_list);
    return new ResultObj(floor_list, content_list);
}

function initializeURL() {
    let currentAddress = ADDRESS;
    let page_index = currentAddress.search(PAGE_URL_PIECE);
    //console.log(page_index);
    if (page_index === -1)
        return currentAddress;

    let page_index_end = page_index + PAGE_URL_PIECE.length;
    while (currentAddress[page_index_end] !== '&')
        page_index_end++;

    currentAddress = currentAddress.replace(currentAddress.substr(page_index, page_index_end - page_index + 1), '');
    console.log(currentAddress);

    return currentAddress;
}

function appendPageToURL(url, page=1) {
    return url + '&' + PAGE_URL_PIECE + page.toString();
}