;(function(global, $){
  'use strict';
  // 변수선언
  var document = global.document;
  var audio = document.createElement('audio');
  var singer = document.querySelector('h3');
  var title = document.querySelector('h1');
  var back = document.querySelector('.cover');
  var play_btn = document.querySelector('#play');
  var next_btn = document.querySelector('#next');
  var prev_btn = document.querySelector('#prev');
  var shuffle_btn = document.querySelector('#shuffle');
  var repeat_btn = document.querySelector('#repeat');
  var play_time = document.querySelector('.play-time');
  var volume = document.querySelector('#volume');
  var volume_slider = document.querySelector('#volume-slider');
  var play_slider = document.querySelector('.play-slider');
  var music_address = "http://localhost:3000/music_info";
  var music_index;

  //  유틸리티 함수
  function load(){
    $.get(music_address, function(data, status){
      music_index = data;
      console.log('통신 상태:', status); // status
      console.log('데이터:', music_index); // []
      event_binding();
      audio_bind(0);
    })
  }
  function firstChild_classSet(select, name){
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
  function audio_bind(index){
    audio.setAttribute('src', music_index[index].src);
    title.innerHTML = music_index[index].title;
    singer.innerHTML = music_index[index].singer;
    back.style.backgroundImage = "url("+music_index[index].img+")";
  }

  // 오디오 조작함수
  function play(){
    if(audio.paused == true){
      audio.play();
      firstChild_classSet(play_btn, 'fa fa-pause');
    }else{
      audio.pause();
      firstChild_classSet(play_btn, 'fa fa-play');
    }
  }
  function next_music() {
    var audio_decode_src = decodeURI(audio.src).slice((decodeURI(audio.src).indexOf('music/')));
    firstChild_classSet(play_btn, 'fa fa-pause');
    for(var i =0, l=music_index.length; i<l; i++){
      if((audio_decode_src === music_index[i].src) && !(i === l-1)){
        audio.load();
        audio_bind(++i)
        audio.play();
      }else if((audio_decode_src === music_index[i].src) && (i===l-1)){
        audio.load();
        audio_bind(0);
        audio.play();
      }
    }
  }
  function prev_music() {
    firstChild_classSet(play_btn, 'fa fa-pause');
    for(var i =0, l=music_index.length; i<l; i++){
      if(decodeURI(audio.src).slice((decodeURI(audio.src).indexOf('music/'))) === music_index[i].src){
        audio.load();
      if(!(i ===0)){
          audio_bind(--i)
      }else if(i===0){
          audio_bind(--l)
      }
        audio.play();
      }
    }
  }
  function shuffle_music() {
    audio.load();
    audio_bind(Math.floor(Math.random() * music_index.length));
    firstChild_classSet(play_btn,'fa fa-pause');
    audio.play();
  }
  function volumeOff() {
    if(volume.getAttribute('class') === 'muted'){
      audio.muted = true;
      firstChild_classSet(volume, 'fa fa-volume-off');
      volume.classList.remove('muted');
    }else{
      volume.classList.add('muted')
      audio.muted = false;
      firstChild_classSet(volume, 'fa fa-volume-up');
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

  // 이벤트 바인딩
  function event_binding(){
    play_btn.addEventListener('click', play);
    audio.addEventListener('ended', next_music);
    next_btn.addEventListener('click', next_music);
    prev_btn.addEventListener('click', prev_music);
    shuffle_btn.addEventListener('click', shuffle_music);
    volume.addEventListener('click',volumeOff);
    volume_slider.addEventListener('mousemove', setVolume);
    play_slider.addEventListener('click', setTime);
    repeat_btn.addEventListener('click',repeat);
    setInterval(function() {
      document.querySelector('.current-time').innerHTML = readableDuration(audio.currentTime);
      document.querySelector('.duration-time').innerHTML = readableDuration(audio.duration);
      play_slider.value = audio.currentTime;
      play_slider.max = audio.duration;
    }, 1000);
    audio.loop = false;
  }

  // 초기 실행
  load();
}(window, window.jQuery));