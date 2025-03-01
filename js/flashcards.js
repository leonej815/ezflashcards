$(document).ready(function(){

window.fcMenu = $('#fcMenu')
window.fcCard = $('#fcCard')
window.fcTitle = $('#fcTitle')
window.fcNam = $('#fcNav')
window.fcPrev = $('#fcPrev')
window.fcNext = $('#fcNext')
window.fcText = $('#fcText')


window.front = true    
window.index = 0;


window.setupFc = function(){
    $('html,body').scrollTop(0);
    setFcData()
    setFcTitle()
    window.fcView.show()
    showFront()
    window.fcCard.focus()
}


window.closeFc = function(){
    window.index = 0
    window.fcView.hide()
}


window.fcView.on('keydown', '#fcCard', function(e){
    var keycode = (e.keyCode ? e.keyCode : e.which);

    if(keycode == '13' || keycode == '9'){  
        event.preventDefault();
        
        if (window.front === false){
            nextIndex()
            showFront()
        }
        else{
            showBack()
        }
    }
})


function setFcTitle(){
    window.fcTitle.text(window.folder + '/' + window.file)
}


function setFcData(){
   // randomize entries in flashcard data
    for(let i = window.fcData.length - 1; i > 0; i--){
        const j = Math.floor(Math.random() * i)
        const temp = window.fcData[i]
        window.fcData[i] = window.fcData[j]
        window.fcData[j] = temp
    } 
}


function showFront(){
    window.front = true
    window.fcCard.hide()
    window.fcText.text(window.fcData[window.index][0]) 
    window.fcCard.show()
}


function showBack(){
    window.front = false
    window.fcCard.hide()
    window.fcText.text(window.fcData[window.index][1]) 
    window.fcCard.show()
}


function nextIndex(){
    window.index += 1
    if (window.index >= fcData.length){
        window.index = 0
    }
}


function prevIndex(){
    window.index -= 1
    if (window.index < 0){
        window.index = fcData.length - 1
    }
}


window.fcCard.click(function(){
    if (window.front === false){
        showFront()
    }
    else{
        showBack()
    }
})
    

window.fcPrev.click(function(){
    prevIndex()
    showFront()
})


window.fcNext.click(function(){
    nextIndex()
    showFront()
})

})