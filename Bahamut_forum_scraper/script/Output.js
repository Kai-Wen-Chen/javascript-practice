function extractContent() {
    let data = WEBSITE_HTML;

    let dummyHTML = document.createElement('html');
    dummyHTML.innerHTML = data;

    let floors = dummyHTML.getElementsByClassName('floor tippy-gpbp');
    let contents = dummyHTML.getElementsByClassName('c-post__body');

    if (!floors || !contents || floors.length != contents.length) {
        console.log('wrong floor or content data');
        return null;
    }

    let floor_list = [];
    for (let i=0; i<floors.length; i++)
        floor_list.push(floors[i].dataset.floor);

    
    let content_list = [];
    for (let i=0; i<contents.length; i++) {
        let tree_walker = document.createTreeWalker(
            contents[i],
            NodeFilter.SHOW_TEXT,
            null
        );
        let text = '';
        let currentNode = null;
        while ((currentNode = tree_walker.nextNode())) {
            text += currentNode.data.trim();
        }
        content_list.push(text);
    }

    console.log(floor_list);
    console.log(content_list);
    return [floor_list, content_list];
}

// Update table event
{
    let table = document.getElementById('idTable');
    table.addEventListener('updateContent', updateContent);
    
    function updateContent() {
        //console.log(WEBSITE_HTML);
        extractContent();
        let rows = document.getElementsByClassName('DataRow');
        let rows_length = rows.length;
        if (rows_length < 4) {
            let table = document.getElementById('idTable');
            for (let i=0; i<4-rows_length; i++) {
                let row = document.createElement('tr');
                row.className = 'DataRow';
                let floor_cell = document.createElement('td');
                floor_cell.className = 'CellFloor';
                let content_cell = document.createElement('td');
                content_cell.className = 'CellContents';

                row.appendChild(floor_cell);
                row.appendChild(content_cell);
                table.appendChild(row);
            }
        }
        
        rows_length = rows.length;
        let floor_cells = document.getElementsByClassName('CellFloor');
        let content_cells = document.getElementsByClassName('CellContents');
        for (let i=0; i<rows_length; i++) {
            floor_cells[i].textContent = '#8787';
            content_cells[i].textContent = 'hello world';
        }
    };
}
