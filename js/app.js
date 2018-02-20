'use strict'

//Global
var countDown = 25;
var resetFlash = 0;
var picPaths = ['img/bag.jpg' , 'img/banana.jpg' , 'img/bathroom.jpg' , 'img/boots.jpg' ,'img/breakfast.jpg' , 'img/bubblegum.jpg' , 'img/chair.jpg' , 
                'img/cthulhu.jpg' , 'img/dog-duck.jpg' , 'img/dragon.jpg' , 'img/pen.jpg' , 'img/pet-sweep.jpg' , 'img/scissors.jpg' , 'img/shark.jpg',
                'img/sweep.png' , 'img/tauntaun.jpg' , 'img/unicorn.jpg' , 'img/usb.gif' , 'img/water-can.jpg' , 'img/wine-glass.jpg'];
var picNames = ['bagPic' , 'bananaPic' , 'bathroomPic' , 'bootsPic' , 'breakfastPic' , 'bubblePic' , 'chairPic' , 'demonPic' , 'dogPic' , 'dragonPic',
                   'penPic' , 'petPic' , 'scissorsPic' , 'sharkPic' , 'sweepPic' , 'taunPic' , 'unicornPic' , 'usbPic' , 'canPic' , 'winePic'];
var allInfo = [];
var picSection = document.getElementById('picSection');

//Constructor and render method
function Picture(name, path) {
    this.name = name;
    this.path = path;
    allInfo.push(this);
    
};

Picture.prototype.render = function(){
    var newLI = document.createElement('li');
    newLI.id = this.name
    newLI.innerHTML = '<img src=' + this.path + ' alt=' + this.name + '>';
    picSection.appendChild(newLI);
};

//Initial instance creation
var createStateOne = function(){
   for (var i = 0; i < picNames.length; i++){
        var newName = picNames[i];
        var newName = new Picture(picNames[i] , picPaths[i]);
        newName.clickCount = 0;
        newName.showCount = 0;
        newName.checkState = true;
   }
};

//Random pic function
var flashRandom = function(){
    picSection.innerHTML = '';
    var stopRendering = 0;

    for(var i = 0; i < allInfo.length; i++){
        var randomNumber = Math.floor(Math.random() * 20);
        if(allInfo[randomNumber].checkState === true){
            allInfo[randomNumber].render();
            allInfo[randomNumber].showCount++;
            allInfo[randomNumber].checkState = false;
            stopRendering++;
            } 

        if(stopRendering === 3){
            break;
        }
    }
};

//Show end list function
var showAll = function(){
    for(var i = 0; i < allInfo.length; i++){
        var finalLI = document.createElement('li');
        finalLI.textContent = allInfo[i].name + ' was clicked ' + allInfo[i].clickCount + " times and was shown " + allInfo[i].showCount + ' times.';
        reportSection.appendChild(finalLI);
    }
};

//Click event listener
picSection.addEventListener('click' , (event) => {
    if(countDown === 0){
       picSection.removeEventListener('click' , event);
       alert('Thanks for playing. See Sam for a free carton of cigarettes.');
       showAll();

    }else if(resetFlash === 2){
        for(var j = 0; j < allInfo.length; j++){
            allInfo[j].checkState = true;
        }  
        resetFlash = 0;
        
    }else{
        countDown--;
        resetFlash++; 
        var x = event.target.alt;
        for(var i = 0; i < allInfo.length; i++){
            if(x === allInfo[i].name){
                allInfo[i].clickCount++;
            }
        }
        flashRandom();
        } 
});

//Set state one
createStateOne();
flashRandom();
