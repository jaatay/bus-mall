'use strict'

var countDown = 25;
var picPaths = ['img/bag.jpg' , 'img/banana.jpg' , 'img/bathroom.jpg' , 'img/boots.jpg' ,'img/breakfast.jpg' , 'img/bubblegum.jpg' , 'img/chair.jpg' , 
                'img/cthulhu.jpg' , 'img/dog-duck.jpg' , 'img/dragon.jpg' , 'img/pen.jpg' , 'img/pet-sweep.jpg' , 'img/scissors.jpg' , 'img/shark.jpg',
                'img/sweep.png' , 'img/tauntaun.jpg' , 'img/unicorn.jpg' , 'img/usb.gif' , 'img/water-can.jpg' , 'img/wine-glass.jpg'];
var picNames = ['bagPic' , 'bananaPic' , 'bathroomPic' , 'bootsPic' , 'breakfastPic' , 'bubblePic' , 'chairPic' , 'demonPic' , 'dogPic' , 'dragonPic',
                   'penPic' , 'petPic' , 'scissorsPic' , 'sharkPic' , 'sweepPic' , 'taunPic' , 'unicornPic' , 'usbPic' , 'canPic' , 'winePic'];
var allInfo = [];
var picSection = document.getElementById('picSection');
var pic1 = document.getElementById('pic1');
var pic2 = document.getElementById('pic2');
var pic3 = document.getElementById('pic3');

function Picture(name, path) {
    this.name = name;
    this.path = path;
    allInfo.push(this);
    
}

Picture.prototype.render1 = function(){
    pic1.src = this.path;
    pic1.alt = this.name;
}

Picture.prototype.render2 = function(){
    pic2.src = this.path;
    pic2.alt = this.name;
}

Picture.prototype.render3 = function(){
    pic3.src = this.path;
    pic3.alt = this.name;
}

Picture.prototype.addCounter = function(){
    this.clickCount++;
}

var createStateOne = function(){
   for (var i = 0; i < picNames.length; i++){
       var newName = picNames[i];
    var newName = new Picture(picNames[i] , picPaths[i]);
    newName.clickCount = 0;
   }
};

var flashRandom = function(){
        var randomNumber1 = Math.floor(Math.random() * 20);
        var randomNumber2 = Math.floor(Math.random() * 20);
        var randomNumber3 = Math.floor(Math.random() * 20);
        allInfo[randomNumber1].render1();
        allInfo[randomNumber2].render2();
        allInfo[randomNumber3].render3();
    
};

picSection.addEventListener('click' , (event) => {
    flashRandom();
    countDown--;
    console.log(event.target);
    console.log(countDown);
    console.log(event.target.src);
    console.log(event.target.name)
});

createStateOne();