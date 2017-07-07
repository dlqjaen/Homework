;(function(global){
  'use strict';
  var document = global.document;
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
  var audio = document.createElement('audio');
  var volume_slider = document.querySelector('#volume-slider');
  var play_slider = document.querySelector('.play-slider');
  var audio_current_time = document.querySelector('.current-time');
  var audio_duratuion_time = document.querySelector('.duration-time');
  var music_index = [{
      src: 'music/아이유-밤편지.mp3',
      singer: '아이유',
      title: '밤편지',
      img: 'music/아이유.jpeg'
    },
    {
      src: 'music/에일리-첫눈처럼 너에게 가겠다.mp3',
      singer: '에일리',
      title: '첫눈처럼 너에게 가겠다',
      img: 'music/에일리.jpeg'
    },
    {
      src: 'music/아이유-팔레트 (Feat. G-DRAGON).mp3',
      singer: '아이유',
      title: '팔레트(Feat. G-DRAGON)',
      img: 'music/아이유.jpeg'
    },
    {
      src: 'music/오혁-공드리 (feat. 김예림).mp3',
      singer: '오혁',
      title: '공드리 (feat. 김예림)',
      img: 'music/오혁.jpeg'
    },
    {
      src: 'music/혁오-TOMBOY.mp3',
      singer: '혁오',
      title: 'TOMBOY',
      img: 'music/혁오.jpeg'
    },
    {
      src: 'music/MC 몽-너에게 쓰는 편지.mp3',
      singer: 'MC몽',
      title: '너에게 쓰는 편지',
      img: 'music/MC_몽.jpg'
    },
    {
      src: 'music/Drake-Madiba Riddim.mp3',
      singer: 'Drake',
      title: 'Mediba Riddim',
      img: 'music/Drake.jpg'
    },
    {
      src: 'music/검정치마-한시 오분 (1_05).mp3',
      singer: '검정치마',
      title: '한시 오분(1_05)',
      img: 'music/검정치마.jpg'
    },
    {
      src: 'music/비프리-Hot Summer.mp3',
      singer: '비프리',
      title: 'Hot Summer',
      img: 'music/비프리.jpg'
    }
  ];
  function play(){
      if(audio.paused == true){
        audio.play();
        play_btn.innerHTML = '<i class="fa fa-pause" aria-hidden="true"></i>';
      }else{
        audio.pause();
        play_btn.innerHTML = '<i class="fa fa-play" aria-hidden="true"></i>';
      }
  }
  function next_music() {
    play_btn.innerHTML = '<i class="fa fa-pause" aria-hidden="true"></i>';
    for(var i =0, l=music_index.length; i<l; i++){
        if((decodeURI(audio.src).slice((decodeURI(audio.src).indexOf('music/'))) === music_index[i].src) && !(i === l-1)){
        audio.load();
        audio_bind(++i)
        audio.play();

        }else if((decodeURI(audio.src).slice((decodeURI(audio.src).indexOf('music/'))) === music_index[i].src) && (i===l-1)){
        audio.load();
        audio_bind(0);
        audio.play();
        }
    }
  }
  function prev_music() {
    play_btn.innerHTML = '<i class="fa fa-pause" aria-hidden="true"></i>';
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
  function readableDuration(seconds) {
    var min, sec;
    seconds = Math.floor(seconds);
    min = Math.floor(seconds / 60);
    min = min >= 10 ? min : "0" + min;
    sec = Math.floor( seconds % 60 );
    sec = sec >= 10 ? sec : "0" + sec;
    return min + ":" + sec;
  };
  function shuffle_music() {
    audio.load();
    audio_bind(Math.floor(Math.random() * music_index.length));
    play_btn.innerHTML = '<i class="fa fa-pause" aria-hidden="true"></i>';
    audio.play();
  }
  function audio_bind(index){
    audio.setAttribute('src', music_index[index].src);
    title.innerHTML = music_index[index].title;
    singer.innerHTML = music_index[index].singer;
    back.style.backgroundImage = "url("+music_index[index].img+")";
  }
  function volumeOff() {
    if(volume.getAttribute('class') === 'muted'){
      audio.muted = true;
      volume.innerHTML='<i class="fa fa-volume-off" aria-hidden="true"></i>';
      volume.classList.remove('muted');
    }else{
      volume.classList.add('muted')
      audio.muted = false;
      volume.innerHTML='<i class="fa fa-volume-up" aria-hidden="true"></i>';
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
  play_btn.addEventListener('click', play);
  audio.addEventListener('ended', next_music);
  next_btn.addEventListener('click', next_music);
  prev_btn.addEventListener('click', prev_music);
  shuffle_btn.addEventListener('click', shuffle_music);
  volume.addEventListener('click',volumeOff);
  volume_slider.addEventListener('mousemove', setVolume);
  play_slider.addEventListener('click', setTime);
  repeat_btn.addEventListener('click',repeat);
  audio.loop = false;
  setInterval(function() {
    audio_current_time.innerHTML = readableDuration(audio.currentTime);
    audio_duratuion_time.innerHTML = readableDuration(audio.duration);
    play_slider.value = audio.currentTime;
    play_slider.max = audio.duration;
  }, 1000);
  audio_bind(0);
}(window));