$(document).ready(function(){

window.setupTable = function(){
    $('html,body').scrollTop(0);
    createTable()

    // hide home view and clear files and hide new folder input and new file input
    window.homeView.hide()
    window.newFolderName.hide()
    window.newFileName.hide()
    
    removeBodyMargin()
    window.nav.show()
    window.tableView.show()

    window.input.focus()
}


window.closeTableView = function(){
    window.tableView.hide()
    window.tableView.empty()
}
    

function createTable(){
    var table = $('<table id="table"></table>')

    // add first row if there is data
    if(window.data.length > 0){
        table.append(makeFirstRow(window.data[0]))
    }
    else{
        table.append(makeFirstRow(['','']))     
    }

    // go through remaining data and add table rows
    for(let i=1; i<window.data.length; i++){
        table.append(makeRow(window.data[i], i+1))
    }

    // add heading and table
    window.tableView.append(makeTableHeading())
    window.tableView.append(table)

    // add numbers
    window.setNumbers()

    
    window.table = $('#table')
    window.input = $('#input')
    window.newRow = $('#newRow')
    window.showMenu = $('#showMenu')
    window.insertRow = $('#insertRow')
    window.deleteRow = $('#deleteRow')
    window.menuOptions = $('#menuOptions')
    window.firstTableEl = $('#firstTableEl')
    window.menu = $('#menu')
}


function makeTableHeading(){
    var heading = $('<div id="tableHeading"></div>')
    var title = $('<span id="tableTitle"><span>')
    title.text(window.folder + '/' + window.file)
    var invert = $('<span id="tableInvert">Invert table</span>')

    heading.append(title)
    heading.append(invert)
    
    window.tableHeading = $('#tableHeading')
    window.title = $('#title')
    window.invert = $('#tableInvert')

    return heading
}
    

function makeFirstRow(rowData){
    var row = $('<tr class="tableRow"></tr>')

    // add els
    row.append(makeNumberCell())
    row.append(makeFirstTableEl(rowData[0]))
    row.append(makeTableEl(rowData[1]))

    return row
}   


function makeRow(rowData){
    var row = $('<tr class="tableRow"></tr>')

    // add els
    row.append(makeNumberCell())
    row.append(makeTableEl(rowData[0]))
    row.append(makeTableEl(rowData[1]))

    return row
}


function makeNumberCell(){
    var cell = $('<td class="numberCell"></td>')
    return cell
}


function makeFirstTableEl(text){
    var tableEl = $('<td class="tableEl" id="firstTableEl"></td>')
    tableEl.append($('<span class="elText">' + text + '</span'))

    // add input
    tableEl.append('<textarea id="input">' + text + '</textarea>')

    // add menu
    tableEl.append(makeMenu())

    return tableEl
}    

function makeTableEl(text){
    return $('<td class="tableEl"><span class="elText">' + text + '</span></td>')
}    


function makeMenu(){
    var menu = $('<div id="menu"></div>')

    // add toggle button
    menu.append($('<button id="showMenu">Menu</button>'))

    // add menu options
    menu.append($(`
        <div id="menuOptions">
            <span class="menuOption" id="insertRow">Insert</span>
            <span class="menuOption" id="deleteRow">Delete</span>
        </div>
    `))

    return menu
}


function removeBodyMargin(){
    $('body').css('margin-top', 0)
}


})