const HOSTNAME = 'localhost';
const PORT = 3000;
let ADDRESS = null;
let KEYWORD = '';
let WEBSITE_HTML = null;

const ElementId = {
    ID_ADDRESS: 'idAddress',
    ID_KEYWORD: 'idKeyword',
    ID_BTN_SEARCH_ADDRESS: 'idBtnSearchAddress',
    ID_BTN_SEARCH_KEYWORD: 'idBtnSearchKeyword',
    ID_TABLE: 'idTable',
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