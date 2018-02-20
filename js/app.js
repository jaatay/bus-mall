'use strict'

var countDown = 25;
var picPaths = ['img/bag.jpg' , 'img/banana.jpg' , 'img/bathroom.jpg' , 'img/boots.jpg' ,'img/breakfast.jpg' , 'img/bubblegum.jpg' , 'img/chair.jpg' , 
                'img/cthulhu.jpg' , 'img/dog-duck.jpg' , 'img/dragon.jpg' , 'img/pen.jpg' , 'img/pet-sweep.jpg' , 'img/scissors.jpg' , 'img/shark.jpg',
                'img/sweep.png' , 'img/tauntaun.jpg' , 'img/unicorn.jpg' , 'img/usb.gif' , 'img/water-can.jpg' , 'img/wine-glass.jpg'];
var picNames = ['bagPic' , 'bananaPic' , 'bathroomPic' , 'bootsPic' , 'breakfastPic' , 'bubblePic' , 'chairPic' , 'demonPic' , 'dogPic' , 'dragonPic',
                   'penPic' , 'petPic' , 'scissorsPic' , 'sharkPic' , 'sweepPic' , 'taunPic' , 'unicornPic' , 'usbPic' , 'canPic' , 'winePic'];
var allInfo = [];
var picSection = document.getElementById('picSection');

function Picture(name, path) {
    this.name = name;
    this.path = path;
    allInfo.push(this);
    
}

Picture.prototype.render = function(){
    var newLI = document.createElement('li');
    newLI.id = this.name
    newLI.innerHTML = '<img src=' + this.path + ' alt=' + this.name + '>';
    picSection.appendChild(newLI);
}

var createStateOne = function(){
   for (var i = 0; i < picNames.length; i++){
       var newName = picNames[i];
    var newName = new Picture(picNames[i] , picPaths[i]);
    newName.clickCount = 0;
    newName.showCount = 0;
    newName.checkState = true;
   }
};

var flashRandom = function(){
    picSection.innerHTML = '';
    for(var i = 0; i < 3; i++){
        var randomNumber = Math.floor(Math.random() * 20);
        allInfo[randomNumber].render();
        allInfo[randomNumber].showCount++;
        allInfo[randomNumber].checkState = false;
    } 
};

var showAll = function(){
    for(var i = 0; i < allInfo.length; i++){
        
    }
}

picSection.addEventListener('click' , (event) => {
   if(countDown === 0){
       picSection.removeEventListener('click' , event);
   } else {
            countDown--;
            var x = event.target.alt;
            for(var i = 0; i < allInfo.length; i++){
                if(x === allInfo[i].name){
                    allInfo[i].clickCount++;
                }
            }
        
        flashRandom();
        }
    console.log(countDown);
    console.log(event.target);
    console.log(x);
    console.log(allInfo[x]);
    
});

createStateOne();
flashRandom();