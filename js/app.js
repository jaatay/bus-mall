'use strict'

//Global
var countDown = 25;
var resetFlash = 0;
var picPaths = ['img/bag.jpg' , 'img/banana.jpg' , 'img/bathroom.jpg' , 'img/boots.jpg' ,'img/breakfast.jpg' , 'img/bubblegum.jpg' , 'img/chair.jpg' , 'img/cthulhu.jpg' , 'img/dog-duck.jpg' , 'img/dragon.jpg' , 'img/pen.jpg' , 'img/pet-sweep.jpg' , 'img/scissors.jpg' , 'img/shark.jpg','img/sweep.png' , 'img/tauntaun.jpg' , 'img/unicorn.jpg' , 'img/usb.gif' , 'img/water-can.jpg' , 'img/wine-glass.jpg'];
var picNames = ['bagPic' , 'bananaPic' , 'bathroomPic' , 'bootsPic' , 'breakfastPic' , 'bubblePic' , 'chairPic' , 'demonPic' , 'dogPic' , 'dragonPic','penPic' , 'petPic' , 'scissorsPic' , 'sharkPic' , 'sweepPic' , 'taunPic' , 'unicornPic' , 'usbPic' , 'canPic' , 'winePic'];
var allInfo = [];
var allShows = [];
var allClicks = [];
var allClicksNew = [];
var picSection = document.getElementById('picSection');
var intro = document.getElementById('introPara');
var ctx = document.getElementById('myChart');
var myName = '';

//Constructor and render method
function Picture(name, path){
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
var createStateOne = () =>{
   for (var i = 0; i < picNames.length; i++){
        var newName = picNames[i];
        var newName = new Picture(picNames[i] , picPaths[i]);
        newName.clickCount = 0;
        newName.showCount = 0;
        newName.checkState = true;
   }
};

//Random pic function
var flashRandom = () =>{
    picSection.innerHTML = '';
    var stopRendering = 0;

    for(var i = 0; i < allInfo.length; i++){
        var randomNumber = Math.floor(Math.random() * 20);
        if(allInfo[randomNumber].checkState === true){
            allInfo[randomNumber].render();
            allInfo[randomNumber].showCount++;
            allShows.push(allInfo[randomNumber].showCount);
            allInfo[randomNumber].checkState = false;
            stopRendering++;
            console.log(allInfo[randomNumber].name);
            } 

        if(stopRendering === 3){
            break;
        }
    }
};

var introFunction = () =>{
    myName = prompt('What is your name?');
    intro.innerHTML = `Welcome, ${myName}!`;
}

//localStorage functions
var storeThis = () =>{
    
    for (var i = 0; i <allInfo.length; i++){
        allClicks.push(allInfo[i].clickCount);
        }
    
    localStorage.setItem('clickInfo' , JSON.stringify(allClicks));
    localStorage.setItem('userName' , JSON.stringify(myName));
    console.log(allClicks);
};

var getThis = () =>{
    var newClicks = localStorage.getItem('clickInfo');
       myName = localStorage.getItem('userName');
    if (newClicks){
        allClicks = [];
        newClicks = JSON.parse(newClicks);
        console.log(newClicks);
        myName = JSON.parse(myName);
        intro.innerHTML = `Welcome back, ${myName}`;

        for (var i = 0; i < allInfo.length; i++){
            allInfo[i].clickCount = newClicks[i];
        } 

    } else {
        introFunction();
    }
    
};

//show end chart and store clicks function
var showAll = () =>{
picSection.style.display = 'none';
storeThis();

//Chart
var myChart = new Chart(ctx, {
    type: 'bar',
    data: {
        labels: picNames,
        datasets: [{
            label: '# of Votes',
            data: allClicks,
            backgroundColor: ['#000000','#000000','#000000','#000000','#000000','#000000','#000000','#000000','#000000','#000000','#000000','#000000','#000000','#000000','#000000','#000000','#000000','#000000','#000000','#000000'
            ],
            borderColor: ['#000000','#000000','#000000','#000000','#000000','#000000','#000000','#000000','#000000','#000000','#000000','#000000','#000000','#000000','#000000','#000000','#000000','#000000','#000000','#000000'
            ],
            borderWidth: 1,
            barPercentage: .5,
            categoryPercentage: .5,
            hoverBackgroundColor: '#FFFFFF'
        }]
    },
    options: {
        scales: {
            yAxes: [{
                ticks: {
                    beginAtZero:true
                }
            }]
        }
    }
});
};

//Click event listener
picSection.addEventListener('click' , (event) => {
    if(countDown === 0){
       picSection.removeEventListener('click' , event);
       alert('Thanks for playing. See Sam for a free carton of cigarettes.');
       showAll();

    }else if(resetFlash === 4){
        for(var j = 0; j < allInfo.length; j++){
            allInfo[j].checkState = true;
        }  
        resetFlash = 0;
        
    }else{
        console.log(countDown);
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
getThis();

flashRandom();
