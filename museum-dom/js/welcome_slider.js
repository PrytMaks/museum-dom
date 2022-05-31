const items = document.querySelectorAll('.slide__item')
const itemsSquares = document.querySelectorAll('.slide__square')
const sliderNum = document.querySelector('.slide__num')
const squaresParent = document.querySelector('.squares')
let currentItem = 0;
let isEnable = true;

function changeCurrentItem(n){
  currentItem = (n + items.length) % items.length;
}

function hideItem(direction){
  isEnable = false;
  items[currentItem].classList.add(direction);
  items[currentItem].addEventListener('animationend', function(){
    this.classList.remove('slide__active', direction)
  })
}

function showItem(direction){
  items[currentItem].classList.add('slide__next', direction)
  items[currentItem].addEventListener('animationend', function(){
    this.classList.remove('slide__next', direction)
    this.classList.add('slide__active')
    isEnable = true;
  })
}

function nextActiveSquare(n) {
  const activeSquare = document.querySelector('.square__active');
  activeSquare.classList.remove('square__active');
  if (n > itemsSquares.length - 1) {
    n = 0;
  }
  if (n < 0) {
    n = itemsSquares.length - 1;
  }
  itemsSquares[n].classList.add('square__active');
  sliderNum.innerHTML = `0${n + 1}`
}

function nextItem(n){
  hideItem('to-left');
  changeCurrentItem(n + 1);
  showItem('from-right');
}

function previousItem(n){
  hideItem('to-right');
  changeCurrentItem(n - 1);
  showItem('from-left');
}

document.querySelector('.left__arrow').addEventListener('click', function(){
  if(isEnable) {
    previousItem(currentItem)
    nextActiveSquare(currentItem)
  }

});

document.querySelector('.right__arrow').addEventListener('click', function(){
  if(isEnable) {
    nextItem(currentItem)
    nextActiveSquare(currentItem)
  }
});

function removeActiveSquare(arr){
  arr.forEach(elem => {
    if(elem.classList.contains('square__active')){
      elem.classList.remove('square__active')
    }
  });
}

function addActiveSquares(arr){
  arr.forEach((elem => {
    if (event.target.classList.contains('slide__square')){
    event.target.classList.add('square__active')
   }
  }))
}


function addNum(arr){
  arr.forEach((elem, index) => {
    if(elem.classList.contains(('square__active'))){
      sliderNum.innerHTML = `0${index + 1}`
    }
  })
}

function squaresChangeSlide(arr){
  let activeSquare = document.querySelector('.square__active')
  let itemsSquaresArr = [...document.querySelectorAll('.slide__square')];
  let index = itemsSquaresArr.indexOf(activeSquare);

  if ( index > currentItem){
    hideItem('to-left');
    changeCurrentItem(index);
    showItem('from-right');
  } else if (index < currentItem){
    hideItem('to-right');
    changeCurrentItem(index);
    showItem('from-left');
  }
}

squaresParent.addEventListener('click', function(event){
  removeActiveSquare(itemsSquares);
  addActiveSquares(itemsSquares); 
  addNum(itemsSquares);
  squaresChangeSlide(itemsSquares);
})

const swipeDetect = (element) => {
  let surface = element;
  let startX = 0;
  let startY = 0;
  let distX = 0;
  let distY = 0;
  let dist = 0;
  

  let startTime = 0;
  let elapsedTime = 0;

  let threshold = 150;
  let restraint = 100;
  let allowedTime = 300;

  surface.addEventListener('mousedown', function(elem){
    startX = elem.pageX;
    startY = elem.pageY;
    startTime = new Date().getTime();
    elem.preventDefault();
  })


  surface.addEventListener('mouseup', function(elem){
    distX = elem.pageX - startX;
    distY = elem.pageY - startY;
    elapsedTime = new Date().getTime() - startTime;
  
    if (elapsedTime <= allowedTime) {
      if (Math.abs(distX) >= threshold && Math.abs(distY) <= restraint ){
        if(distX > 0 ){
          if(isEnable){
            previousItem(currentItem); 
            nextActiveSquare(currentItem)
          }
        }  else {
          if(isEnable){
            nextItem(currentItem);
            nextActiveSquare(currentItem)
          }
        }
      } 
  }

  elem.preventDefault();
});

  surface.addEventListener('touchstart', function(elem){
    if(elem.target.classList.contains('.arrows') || elem.target.classList.contains('.slider__arrows') ) {
      if (elem.target.classList.contains('.left__arrow')){
        if(isEnable){
          previousItem(currentItem);
          sliderNum.innerHTML = `0${currentItem - 1}`
        }
      }  else if(elem.target.classList.contains('.right__arrow')){
        if(isEnable){
          nextItem(currentItem);
          
        }
      }  
    }

    let touchObj = elem.changedTouches[0]
    startX = touchObj.pageX;
    startY = touchObj.pageY;
    startTime = new Date().getTime();
    elem.preventDefault();
  })

  surface.addEventListener('touchmove', function(elem){
    elem.preventDefault();
  })
  
  
  surface.addEventListener('touchend', function(elem){
    let touchObj = elem.changedTouches[0]
    distX = touchObj.pageX - startX;
    distY = touchObj.pageY - startY;
    elapsedTime = new Date().getTime() - startTime;
  
    if (elapsedTime <= allowedTime) {
      if (Math.abs(distX) >= threshold && Math.abs(distY) <= restraint ){
        if(distX > 0 ){
          if(isEnable){
            previousItem(currentItem);
            sliderNum.innerHTML = `0${currentItem - 1}`
          }
        }  else {
          if(isEnable){
            nextItem(currentItem);
          }
        }
      } 
}

elem.preventDefault();
});
}

let slider = document.querySelector('.welcome__slider');
swipeDetect(slider);
