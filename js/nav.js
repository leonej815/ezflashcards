$(document).ready(function(){

window.navHome.click(function(){
    $('.deleteFolderButton').hide()
    window.closeTableView()
    window.closeFc()
    window.nav.hide()

    addBodyMargin()
    $('html,body').scrollTop(0);
    window.homeView.show()
})


window.navFc.click(function(){
    window.closeTableView()
    window.homeView.hide()
    window.setupFc()
})


window.navTable.click(function(){
    window.homeView.hide()
    window.closeTableView()
    window.closeFc()
    
    window.setupTable()   
})


function addBodyMargin(){
    $('body').css('margin-top', 8)
}
   
})