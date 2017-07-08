;(function(global, $){
  'use strict';
  // 변수선언
  var document = global.document;
  var audio = document.createElement('audio');
  var back = document.querySelector('.cover');
  var play_btn = document.querySelector('#play');
  var repeat_btn = document.querySelector('#repeat');
  var volume = document.querySelector('#volume');
  var volume_slider = document.querySelector('#volume-slider');
  var play_slider = document.querySelector('.play-slider');
  var play_list_btn = document.querySelector('#play-list');
  var play_list = document.querySelector('.play-list');
  var music_address = "http://localhost:3000/music_info";
  var music_index, list_box, list_item;

  //  유틸리티 함수
  function load(){
    $.get(music_address, function(data, status){
      music_index = data;
      // console.log('통신 상태:', status); // status
      // console.log('데이터:', music_index); // []
      event_binding();
      audioBind(0);
      musicCheck();
    })
  }
  function random(max){
    return Math.floor(Math.random() * max);
  }
  function firstChildClassSet(select, name){
    select.firstChild.setAttribute('class', name);
  }
  function readableDuration(seconds) {
    var min, sec;
    seconds = Math.floor(seconds);
    min = Math.floor(seconds / 60);
    min = min >= 10 ? min : "0" + min;
    sec = Math.floor( seconds % 60 );
    sec = sec >= 10 ? sec : "0" + sec;
    return min + ":" + sec;
  }
  function audioBind(index){
    audio.setAttribute('src', music_index[index].src);
    document.querySelector('h1').innerHTML = music_index[index].title;
    document.querySelector('h3').innerHTML = music_index[index].singer;
    back.style.backgroundImage = "url("+music_index[index].img+")";
    audio.index = index;
  }
  function reLoadPlay(){
    audio.load()
    musicCheck();
    audio.play();
  }

  // 오디오 조작함수
  function play(){
    if(audio.paused == true){
      audio.play();
      firstChildClassSet(play_btn, 'fa fa-pause');
    }else{
      audio.pause();
      firstChildClassSet(play_btn, 'fa fa-play');
    }
  }
  function nextMusic() {
    firstChildClassSet(play_btn, 'fa fa-pause');
    for(var i =0, l=music_index.length; i<l; i++){
      if((audio.index === i) && !(i === l-1)){
        audioBind(++i)
        reLoadPlay()
      }else if((audio.index === i) && (i===l-1)){
        audioBind(0);
        musicCheck();
        reLoadPlay();
      }
    }
  }
  function prevMusic() {
    firstChildClassSet(play_btn, 'fa fa-pause');
    for(var i =0, l=music_index.length; i<l; i++){
      if(audio.index === i){
        if(!(i === 0)){
            audioBind(--i)
        }else if(i===0){
            audioBind(--l)
        }
        reLoadPlay();
      }
    }
  }
  function shuffleMusic() {
    var random_number = random(music_index.length);
    while(audio.index === random_number){
      random_number = random(music_index.length);
    }
    audioBind(random_number);
    firstChildClassSet(play_btn,'fa fa-pause');
    reLoadPlay();
  }
  function volumeOff() {
    if(volume.getAttribute('class') === 'muted'){
      audio.muted = true;
      firstChildClassSet(volume, 'fa fa-volume-off');
      volume.classList.remove('muted');
    }else{
      volume.classList.add('muted')
      audio.muted = false;
      firstChildClassSet(volume, 'fa fa-volume-up');
    }
  }
  function setVolume() {
    audio.volume = volume_slider.value / 100
  }
  function setTime(){
    audio.currentTime = play_slider.value;
  }
  function repeat(){
    if(audio.loop === false){
      repeat_btn.style.color = 'rgb(14,172,193)';
      audio.loop = true;
    }else{
      repeat_btn.style.color = '#B2AEAF';
      audio.loop = false;
    }
  }
  function listClick(event){
    audioBind(event);
    musicCheck();
    play();
  }
  function musicCheck(){
    for(var i=0, l=music_index.length; i<l ;i++){
      list_item[i].classList.remove('active')
      if(audio.index === i){
        list_item[i].classList.add('active');
      }
      
    }
  }
  function listView(){
    var list_class = play_list_btn.getAttribute('class');
    list_box = document.querySelector('.play-list');
    if(list_class === ''){
      play_list_btn.setAttribute('class', 'active');
      list_box.classList.add('list-active');
    }else{
      play_list_btn.setAttribute('class', '');
      list_box.classList.remove('list-active');
    }
  }

  // 이벤트 바인딩
  function event_binding(){
    play_btn.addEventListener('click', play);
    audio.addEventListener('ended', nextMusic);
    document.querySelector('#next').addEventListener('click', nextMusic);
    document.querySelector('#prev').addEventListener('click', prevMusic);
    document.querySelector('#shuffle').addEventListener('click', shuffleMusic);
    volume.addEventListener('click',volumeOff);
    volume_slider.addEventListener('mousemove', setVolume);
    play_slider.addEventListener('click', setTime);
    repeat_btn.addEventListener('click',repeat);
    play_list_btn.addEventListener('click', listView)
    function makeList(){
      var html = ''
      for(var i=0, l=music_index.length; i<l ;i++){
        html += '<li class="list-item">'+music_index[i].singer+' - '+music_index[i].title+'</li>';
      }
      return html;
    }
    play_list.innerHTML = makeList();
    list_item = document.querySelectorAll('.list-item');
    for(var i=0, l=music_index.length; i<l; i++){
      list_item[i].addEventListener('click', listClick.bind(null, i));
    }
    audio.loop = false;
  }

  // 초기 실행
  setInterval(function() {
    document.querySelector('.current-time').innerHTML = readableDuration(audio.currentTime);
    document.querySelector('.duration-time').innerHTML = readableDuration(audio.duration);
    play_slider.value = audio.currentTime;
    play_slider.max = audio.duration;
  }, 1000);
  load();
}(window, window.jQuery));