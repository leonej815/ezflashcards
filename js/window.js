$(document).ready(function(){

// html elements
window.homeView = $('#homeView');
window.tableView = $('#tableView');
window.fcView = $('#fcView');

window.nav = ($('#nav'));
window.navHome = $('#navHome')
window.navFc = $('#navFc')
// window.navTable = $('#navTable') 

window.folders = $('#folders')
window.files = $('#files')
window.name = $('#name')

window.newFolderDiv = $('#newFolderDiv')
window.newFolder = $('#newFolder')
window.newFolderName = $('#newFolderName')

window.newFileDiv = $('#newFileDiv')
window.newFile = $('#newFile')
window.newFileName = $('#newFileName')

window.success = $('#success')
window.error = $('#error')
window.deadSpace = $('#deadSpace')

// constant values
window.inputMinHeight = '19'

// data
window.folder = null;
window.file = null;
window.data = [];


window.showError = function(message){
    window.error.hide()
    window.error.text(message)
    
    window.error.fadeIn('fast', function(){
        setTimeout(function(){
            window.error.fadeOut('fast')
        }, 1800)        
    })
}


window.showSuccess = function(message){
    window.error.hide()
    window.success.text(message)

    window.success.fadeIn('fast', function(){
        setTimeout(function(){
            window.success.fadeOut('fast')
        }, 1800)        
    })
}


// hide any input elements when dead space clicked
window.deadSpace.click(function(){
    $('input').hide()
})

})