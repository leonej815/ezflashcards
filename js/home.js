$(document).ready(function(){

getFolders()


function getFolders(){
    $.get('get_folders.php', function(data){
        injectFolders(JSON.parse(data))
    })
}

function injectFolders(folders){
    var html = ''
    for(let i=0; i<folders.length; i++){
        html += makeFolderButton(folders[i])
    }
    
    window.folders.html(html)
}
                
function makeFolderButton(folderName){
    var html = '<div class="folderButtonContainer"><span class="folderButton">' + folderName + '</span>'
    html += '<span class="deleteFolderButton">delete</span>' 
    html += '</div>'
    
    return html
}

window.homeView.on('click', '#homeHeading, .folderButtonContainer, .fileButtonContainer', function(){
    window.newFolderName.hide()  
    window.newFileName.hide()
})


window.files.on('mouseenter', '.fileButtonContainer', function(){
    $(this).css('background', '#D3D3D3')
    $( this ).find('.deleteFileButton').eq(0).show()
})

window.files.on('mouseleave', '.fileButtonContainer', function(){
    $(this).css('background', '#fff')
    $( this ).find('.deleteFileButton').eq(0).hide()
})


window.folders.on('click', '.folderButton', function(){
    unHighlight()
    $('.deleteFolderButton').hide()
    $(this).next().show()

    window.folder = $(this).text()
    getFiles()

    // # highlight selected button and files section
    highlight(this)

    // show new file button
    window.newFileDiv.show()
})


window.folders.on('click', '.deleteFolderButton', function(){
    deleteFolder(this)  
})


window.files.on('click', '.deleteFileButton', function(){
    unHighlight()

    window.file = $(this).text()
    
    getData()
})


function deleteFolder(folderButton){
    var buttonContainer = $(folderButton).parent()
    var folderName = $(folderButton).prev().text()

    $.get('delete_folder.php', {folder: folderName}, function(result){
        console.log(result)
        if(result === '0'){
            window.showSuccess(window.folder + ' deleted')
           
            // remove button container
            buttonContainer.remove()
            // reset global folder value
            window.folder = null
            // remove highlighting
            unHighlight()
            // clear files
            window.files.empty()
        }
        else{
            window.showError(result)
        }
    })
}


function getFiles(){
    $.get('get_files.php', {folder: window.folder}, function(data){
        injectFiles(JSON.parse(data))
    })
}


function injectFiles(folders){
    var html = ''
    for(let i=0; i<folders.length; i++){
        html += makeFileButton(folders[i])
    }
    
    window.files.html(html)
}
 
 
function makeFileButton(fileName){
    var html = '<div class="fileButtonContainer"><span class="fileButton">' + fileName + '</span>'
    // add delte button
    html += '<span class="deleteFileButton">delete</span>'
    html += '</div>'
    
    return html
}
 

window.files.on('click', '.fileButton', function(){
    unHighlight()

    window.file = $(this).text()
    
    getData()
})


// load data and set up table view and switch to table view
function getData(){
    // get data
    $.get('get_data.php', {folder: window.folder, file: window.file}, function(data){
        if(data.length === 0){
            window.data = []
            window.fcData = []
        }
        else{
            window.data = JSON.parse(data)
            window.fcData = JSON.parse(data)
        }

        window.setupTable()
    })
}


function highlight(folderButton){
    var buttonContainer = $(folderButton).parent()

    // highlight folder button cotainer and files area
    buttonContainer.css('background', '#D3D3D3')

}


function unHighlight(){
    $('.folderButtonContainer').css('background', '#fff')
}


window.newFolder.click(function(){
    window.newFileName.hide()
    window.newFolderName.toggle()
    window.newFolderName.focus()
})


window.newFile.click(function(){
    window.newFolderName.hide()
    window.newFileName.toggle()
    window.newFileName.focus()
})

window.newFolderName.keypress(function(e){
    var keycode = (e.keyCode ? e.keyCode : e.which)

    if(keycode == '13'){
        event.preventDefault()
        
        var folderName = window.newFolderName.val()

        createFolder(folderName)

        // clear and hide input field
        window.newFolderName.hide()
        window.newFolderName.val('')

    }
})


function createFolder(folderName){
    $.get('create_folder.php', {folderName: folderName}, function(data){
        var response = JSON.parse(data)
        if(response[0] === 0){
            window.showSuccess('Folder created')

            // add new folder button
            window.folders.append(makeFolderButton(folderName))
        }
    })    
}


window.newFileName.keypress(function(e){
    var keycode = (e.keyCode ? e.keyCode : e.which)

    if(keycode == '13'){
        event.preventDefault()
        
        var fileName = window.newFileName.val()

        createFile(fileName)

        // clear and hide input field
        window.newFileName.hide()
        window.newFileName.val('')
    }
})


function createFile(file){
    $.get('create_file.php', {file: file, folder: window.folder}, function(data){
        var response = JSON.parse(data)
        if(response[0] === 0){
            window.showSuccess('File created')

            // add new file button        
            window.files.append(makeFileButton(file))
            
        }
    })    
}




})