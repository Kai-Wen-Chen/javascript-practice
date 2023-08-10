function updateKeywordUI(disabled=false) {
    let inputKeyword = document.getElementById('idKeyword');
    let idBtnSearchKeyword = document.getElementById('idBtnSearchKeyword');
    inputKeyword.disabled = disabled;
    idBtnSearchKeyword.disabled = disabled;
};

function clearTableUI() {
    let rows = document.getElementsByClassName('DataRow');
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

    let p_pageBtn = dummyHTML.getElementsByClassName('BH-pagebtnA');
    if (p_pageBtn) {
        //console.log(p_pageBtn[0].lastChild.textContent);
        return parseInt(p_pageBtn[0].lastChild.textContent);
    }

    return 0;
}
class ResultObj {
    constructor(f_list = null, c_list = null) {
        this.floor_list = f_list;
        this.content_list = c_list;
        this.length = f_list.length;
    }
};

function extractContent(keyword='') {
    let data = WEBSITE_HTML;

    let dummyHTML = document.createElement('html');
    dummyHTML.innerHTML = data;

    let section_main_post = dummyHTML.getElementsByClassName('c-section__main c-post');
    let floor_list = [];
    let content_list = [];
    for (let i=0; i<section_main_post.length; i++) {
        let contents = section_main_post[i].getElementsByClassName('c-article FM-P2');
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
            let floor = section_main_post[i].getElementsByClassName('floor tippy-gpbp');
            floor_list.push(floor[0].dataset.floor);
            content_list.push(text);
        }
    }

    //console.log(floor_list);
    //console.log(content_list);
    return new ResultObj(floor_list, content_list);
}