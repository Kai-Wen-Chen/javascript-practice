// Update table event
{
    let table = document.getElementById(ElementId.ID_TABLE);
    table.addEventListener('updateContent', updateContent);
    
    function updateContent() {
        //console.log(WEBSITE_HTML);
        let resultObj = extractContent(KEYWORD);
        console.log(resultObj);

        let rows = document.getElementsByClassName(ElementClass.CLASS_DATA_ROW);
        let rows_length = rows.length;
        if (rows_length < resultObj.length) {
            for (let i=0; i<resultObj.length-rows_length; i++) {
                let row = document.createElement('tr');
                row.className = ElementClass.CLASS_DATA_ROW;
                let floor_cell = document.createElement('td');
                floor_cell.className = ElementClass.CLASS_CELL_FLOOR;
                let content_cell = document.createElement('td');
                content_cell.className = ElementClass.CLASS_CELL_CONTENT;

                row.appendChild(floor_cell);
                row.appendChild(content_cell);
                table.appendChild(row);
            }
        }
        
        rows_length = rows.length;
        let floor_cells = document.getElementsByClassName(ElementClass.CLASS_CELL_FLOOR);
        let content_cells = document.getElementsByClassName(ElementClass.CLASS_CELL_CONTENT);
        for (let i=0; i<rows_length; i++) {
            floor_cells[i].textContent = resultObj.floor_list[i];
            content_cells[i].textContent = resultObj.content_list[i];
        }
    };
}