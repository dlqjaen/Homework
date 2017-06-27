(function(global){
    var select = document.getElementsByClassName('select');
    var replace = document.getElementsByClassName('replace');
    for(var i=0, l= select.length; i<l; i++){
        select[i].onclick = give_select;
    }
    function give_select(){
        for(var i=0, l= select.length; i<l; i++){
            select[i].setAttribute('class','select');
        }
        this.setAttribute('class', 'select give')
    }
    for(var i=0, l=replace.length; i<l; i++){
        replace[i].onclick = change;
    }
    function change(){
        var give = document.querySelector('.give');
        if(!give){
            alert('Section1의 요소를 선택해 주세요.')
        }
        give_text = give.textContent;
        var change_text = this.textContent;
        this.textContent = give_text;
        give.textContent = change_text;
        give.setAttribute('class', 'select');
    }
})(window)