$(document).ready(function(){


window.tableView.on("click", ".tableEl", function(){ 
    tableEl = $(this)

    // check if input element inside already
    if (tableEl.has(window.input).length === 0){
        setupCell(tableEl)

        // update window.data and saveFile
        updateData()
        saveFile()
    }    
})


window.tableView.on('click', '#showMenu', function(){
    window.menuOptions.toggle()
})


window.tableView.on('click', '#deleteRow', function(){
    prevRow = findPrevRow()
    nextRow = findNextRow()
    currentRow = window.menu.parent().parent()
    
    if (prevRow[0] !== undefined){
        tableEl = prevRow.find('.tableEl').eq(0)
        setupCell(tableEl)
        currentRow.remove()
    }
    else if (nextRow[0] !== undefined){
        tableEl = nextRow.find('.tableEl').eq(0)
        setupCell(tableEl)
        currentRow.remove()
    }
    else{
       clearRow()
    }
    setNumbers()

})


window.tableView.on('click', '#insertRow', function(){
    insertRow() 
})


window.tableView.on('click', '#input', function(){   
    setInputHeight()
})
  

window.tableView.on('keydown', '#input', function(e){
    var keycode = (e.keyCode ? e.keyCode : e.which);

      
    if(keycode == '13' || keycode == '9'){  
        event.preventDefault();
        
        nextTableEl = findNextTableEl()
        if (nextTableEl === undefined){
            addRow()
            nextTableEl = findNextTableEl()
        }
        
        // move #input to next .tableEl
        setupCell(nextTableEl)
        
        // update window.data and save file
        updateData()
        saveFile()
    }
})


window.tableView.on('keypress', '#input', function(){
    setInputHeight()
})


window.tableView.on('click', '#tableInvert', function(){
    reverseDataArrays()
    window.closeTableView()
    window.setupTable()
})


window.setNumbers = function(){ 
    var numberCells = window.tableView.find('.numberCell')
    
    for(i=0; i<numberCells.length; i++){
        numberCells.eq(i).text(i+1)
    }

    setNumberCellWidth((i).toString().length)
}


function setNumberCellWidth(digitCount){
    var width = digitCount * 10

    $('.numberCell').css('width', width)
}
    


// reverses the entries data arrays
function reverseDataArrays(){
    for(i=0; i<window.data.length; i++){
        window.data[i].reverse()
    }
    for(i=0; i<window.fcData.length; i++){
        window.fcData[i].reverse()
    }
}


function setupCell(tableEl){
    moveInputEl(tableEl)
    moveMenu(tableEl)
}

function moveMenu(tableEl){
    tableEl.append(window.menu)
    window.menuOptions.hide()
}    
    
function setMenuHeight(){
    var height = window.menu.parent().height()
}
    
// finds the next .tableEl from #input and returns its jquery object
function findNextTableEl(){
    var nextRow = findNextRow()

    var nextTableEl = window.input.parent().next('.tableEl') // element after #input
    
    if (nextTableEl.length > 0){
        return nextTableEl
    }
    else if(nextRow.length > 0){
        return nextRow.children('.tableEl').eq(0)
    }
    else{
        return undefined
    }
}    


function findNextRow(){
    return window.input.parent().parent().next('.tableRow')
}


function findPrevRow(){
    return window.input.parent().parent().prev('.tableRow')
}


function findCurrentRow(){
    return window.input.parent().parent()
}


// hides tableEl and moves inputEl under tableEl
function moveInputEl(tableEl){
    var elText = tableEl.find('.elText').eq(0) // new elText
    var newText = elText.text() 
    var height = tableEl[0].scrollHeight
    
    var prevTableEl = window.input.parent() // current tableEl  
    var prevElText = prevTableEl.find('.elText').eq(0)
    
   
    // update and show .elText
    prevElText.text(window.input.val())
    prevElText.show()
            
    // hide element text
    elText.hide()
        
    // clear #input,, add .elText from new .tableEl
    window.input.val('')

    // reduce border of previous tableEl
    prevTableEl.css('border', '1px solid black')
        
    // increase border of tableEl
    tableEl.css('border', '2px solid orange')

    // show .elText from previous element
    window.input.prev().show()
    
    // clear input element
    window.input.val('')
    
    // move element to new .tableEl
    $(tableEl).append(window.input)
    
    // add text from new cell to #input
    window.input.val(newText)

    // set height of #input
    resetInputHeight()
    setInputHeight() 
   
    // show input element and focus
    window.input.show()  
    window.input.focus()
}

function resetInputHeight(){
    window.input.css('height', window.inputMinHeight + 'px')  
}    

function setInputHeight(){   
    window.input.css('height', window.input[0].scrollHeight + 'px')
}


function clearRow(){
    row = findCurrentRow()
    row.find('.elText').each(function(){
        $(this).text('')
    })
    window.input.val('')

}

function insertRow(){
    window.menu.parent().parent().after('<tr class="tableRow"><td class="numberCell"><td class="tableEl"><span class="elText"></span></td><td class="tableEl"><span class="elText"></span></td></tr>')
    setNumbers()
}

// adds row to table
function addRow(){
    window.table.append($('<tr class="tableRow"><td class="numberCell"></td><td class="tableEl"><span class="elText"></span></td><td class="tableEl"><span class="elText"></span></td></tr>'))
    setNumbers()
}


function updateData(){
    var elTexts = window.table.find('.elText')
    var data = []

    for(let i=0; i<elTexts.length; i=i+2){
        var front = elTexts.eq(i).text().trim()
        var back = elTexts.eq(i+1).text().trim()
        
        // if the row is empty then skip
        if(front.length === 0 && back.length === 0){
            continue
        }

        // add data and update global
        data.push([front, back])
        window.data = data
    }
}


function saveFile(){
    $.post('save_file.php', {folder: window.folder, fileName: window.file, dataArr: window.data}, function(data){
        var response = JSON.parse(data)
        if(response === 0){
            window.showSuccess('File saved')
        }
    })    
}


})
    