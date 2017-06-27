;(function(global, document){
  'use strict';
//   요소생성
  var todobox = document.querySelector('#demo');
  var fieldset = document.createElement('fieldset');
  var legend = document.createElement('legend');
  var label = document.createElement('label');
  var input = document.createElement('input');
  var clear = document.createElement('input');
  var add = document.createElement('input');
  var delet = document.createElement('input');
  var ul = document.createElement('ul');
  var span = document.createElement('span');
  var time = setInterval(function(){
  var date = new Date();
    span.textContent = date.toLocaleDateString();
  },1000);
//   요소노드에 속성생성
  label.setAttribute('class', 'a11y-hidden');
  input.setAttribute('placeholder','To Do...');
  input.setAttribute('class','input');
  clear.setAttribute('type','button');
  clear.setAttribute('class','clear');
  clear.setAttribute('value','All Clear');
  span.setAttribute('class','date');
  add.setAttribute('type','button');
  add.setAttribute('class','add');
  add.setAttribute('value','+');
  delet.setAttribute('type','button');
  delet.setAttribute('class','delet');
  delet.setAttribute('value','check-delet');
//   요소노드 문서에 붙이기
  todobox.appendChild(fieldset);
  fieldset.appendChild(legend);
  fieldset.appendChild(span);
  fieldset.appendChild(clear);
  fieldset.appendChild(delet);
  fieldset.appendChild(label);
  fieldset.appendChild(input);
  fieldset.appendChild(add);
  fieldset.appendChild(ul);
//   내용적용
  label.textContent = '할 일을 적으세요.'
  legend.textContent = 'To Do List';
//  클릭이벤트
function add_event(){
  var lang = input.value.trim();
  if(lang === ''){
  input.value = '';
    return false;
  }
  var li = document.createElement('li');
  var select = document.createElement('input');
  var list_label = document.createElement('label');
  list_label.setAttribute('class','list_label');
  select.setAttribute('type','checkbox');
  select.setAttribute('class','select');
  list_label.textContent = input.value;
  ul.appendChild(li);
  li.appendChild(list_label);
  li.appendChild(select);
  input.value = '';
  return false;
}
  input.onkeypress = function enter(e){
    if(e.keyCode === 13){
      add_event()
      return false;
    }
  }
  add.onclick = add_event;
  clear.onclick = function(){
    // var li_list = document.querySelectorAll('li');
    // for(var i = 0, l=li_list.length;i<l; i++){
    //     ul.removeChild(li_list[i]);
    // }
    ul.textContent="";
    return false;
  }
  delet.onclick = function(){
      var delet_list = document.querySelectorAll('.select');
      for(var i =0, l= delet_list.length;i<l;i++){
          if(delet_list[i].checked === true){
              ul.removeChild(delet_list[i].parentElement);
          }
      }
  }
}(window,window.document));