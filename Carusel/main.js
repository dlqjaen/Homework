;(function(global, document){
  'use strict';
  var carusel = document.querySelector('.carusel');
  var prev_btn = document.querySelector('.prev'); 
  var next_btn = document.querySelector('.next'); 
  var marginLeft = 0;
  var img_box = '';
  var img_number = 5;
  function img_roop(){
    for(var i=0; i<img_number; i++){
      img_box += `
        <img class="animal-img" src="img/${i}.jpg" alt="${i}이미지">
      `
    }
    return img_box;
  }
  function prevEvent(){
    marginLeft += 1024;
    if(marginLeft > 0){
      marginLeft = -1024 * (img_number-1);
    }
    carusel.style.marginLeft = marginLeft + 'px';
  }
  function nextEvent(){
    marginLeft += -1024;
    if(marginLeft < -1024*(img_number-1)){
      marginLeft = 0;
    }
    carusel.style.marginLeft = marginLeft + 'px';
  }
  carusel.innerHTML = img_roop();
  carusel.style.width = document.querySelector('.animal-img').offsetWidth * img_number + 'px';
  prev_btn.addEventListener('click', prevEvent);
  next_btn.addEventListener('click', nextEvent);

  
})//(window, window.document);

// carusel 2
;(function(global, document){
  'use strict';
  
  var carusel = document.querySelector('.carusel');
  var prev_btn = document.querySelector('.prev'); 
  var next_btn = document.querySelector('.next'); 
  var img_number = 5;
  var img_roll;
  function img_roop(){
    var img_box = '';
    for(var i=0; i<img_number; i++){
      img_box += `
        <img class="animal-img" src="img/${i}.jpg" alt="${i}이미지">
      `
    }
    carusel.innerHTML = img_box;
    img_roll = document.querySelectorAll('.animal-img');
  }
  function bind(){
    prev_btn.addEventListener('click', prevEvent, reset);
    next_btn.addEventListener('click', nextEvent);
  }
  function indexBind(count){
      img_roll[0].style.zIndex = 1;
  }
  function reset(){
    for(var i=0; i<img_roll.length; i++){
      img_roll[i].style.marginLeft = 0;
      carusel.style.marginLeft = 0;
    }
  }
  function nextEvent(){
    for(var i=0; i<img_roll.length; i++){
      if(img_roll[i].style.zIndex === '1'){
        if(i === 0){
          img_roll[img_roll.length-1].style.marginLeft = 1024+'px';
          img_roll[img_roll.length-1].style.zIndex = 1;
          carusel.style.marginLeft = -1024 + 'px';
        }else{
          img_roll[i-1].style.marginLeft = 1024+'px';
          img_roll[i-1].style.zIndex = 1;
          carusel.style.marginLeft = -1024 + 'px';
        }
        img_roll[i].style.zIndex = 0;
        setTimeout(reset, 500);
        break;
      }
    }
  }
  function prevEvent(){
    for(var i=0; i<img_roll.length; i++){
      if(img_roll[i].style.zIndex === '1'){
        img_roll[i].style.zIndex = 0;
        i === img_roll.length-1 ? img_roll[0].style.zIndex = 1 : img_roll[i+1].style.zIndex = 1;
        break;
      }
    }
  }
  img_roop();
  bind();
  indexBind();
})(window, window.document);