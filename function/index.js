// 1. 두 수를 입력받아 큰 수를 반환하는 함수 
function max(number1, number2){
    if(number1 > number2){
        return number1;
    }else if(number1 === number2){
        return "입력한 두 수는 같은 수 입니다."
    }else{
        return number2;
    }
}
// -----------------------------------------

function j_max(a, b) {
    return a > b ? a : b;
}
// 삼항연산자
// -----------------------------------------// -----------------------------------------
// 2. 숫자를 입력하면 요일을 반환하는 함수
function weekly(number){
    var show = number % 7;
    var week = ['sunday','monday','tuesday','wendesday','thursday','friday','saturday']
    return week[show];
}
// -----------------------------------------
function j_weekly(num) {
    var week = "일월화수목금토";
    return week[bum%7];
}
//  문자열도 배열처럼 접근이 가능하다. 오직 접근만!

// -----------------------------------------// -----------------------------------------
// 3. 짝수, 홀수를 판단하는 함수
function evenOdd(number) {
    var box = number % 2;
    if(box === 1){
        return "홀수 입니다.";
    }else{
        return "짝수 입니다."
    }
}

// -----------------------------------------
function j_evenOdd(num) {
    return num % 2 === 0 ? '짝수' : '홀수';
}

// -----------------------------------------// -----------------------------------------
// 4. 숫자를 배열로 전달받아 숫자들의 평균을 반환하는 함수
function average(){
    var ave = arguments.length;
    var sum = 0;
    for(var i = 0; i < ave; i++){
        sum = sum + arguments[i];
    }
    return (sum / ave);
}
// -----------------------------------------
function j_average(numList) {
    var result = 0;
    for(var i = 0, l = numList.length; i < l; i++ ){
        result += numList[i];
    }
    return result / numList.length;
}

// -----------------------------------------
function j_average2(numList) {
    var result= 0;
    numList.forEach(function (item) {
        result += item;
    });
    return result / numList.length;
}

// -----------------------------------------// -----------------------------------------
// 5. 문자를 배열로 전달받아 문자열을 하나로 반환하는 함수
function sum(){
    var text = "";
    for(var i = 0; i < arguments.length; i++){
        text = text + arguments[i];
    }
    return text;
}

// -----------------------------------------
function j_sum(strArr) {
    var result = '';
    for(var i = 0, l=strArr.length; i < l; i++){
        result += strArr[i];
    }
    return result;
}
// -----------------------------------------
function j_sum2(strArr) {
    return strArr.join('');
}

// -----------------------------------------// -----------------------------------------
// 6. 세 수를 입력받아 큰 수를 반환하는 함수
function max2(number1, number2, number3) {
    return Math.max.apply(null, arguments);
}

// -----------------------------------------
function j_max2(a,b,c) {
    function max3(a,b,c){
        return max(max(a,b), max(b,c));
    }
}

// -----------------------------------------
function maxn(...n){
    console.log('n :',n);
    var max = n[0];
    for(var i = 1, l = n.length; i <l; i++){
        if(max , n[i]){
            max = n[i];
        }
    }
    return max;
}
// es6 문법 인자값이 배열로 받아진다.

// -----------------------------------------// -----------------------------------------
// 7. 전화번호를 입력하면 뒤에 4자리를 제외하고 *로 바꾸는 함수
function phone(s){
    var r = s + "";
    return "*".repeat(r.length -4) + r.slice(-4);
}

// -----------------------------------------
function j_phone(phoneNum) {
    var result = '';
    for(var i = 0, l = phoneNum.length; i < l; i++){
        if(l - i > 4){
            result += '*';
        }else{
            result += phoneNum[i];
        }
    }
    return result;
}

// -----------------------------------------
function j_phone2(phoneNum) {
    return phoneNum.replace(/[0-9](?=[0-9]{4})/g, '*');
}

// -----------------------------------------// -----------------------------------------
// 8. Email에 @가 있는지 확인하는 함수
function email(s){
    var v = s.indexOf('@');
    var e = s.indexOf('.');
    if((v === (-1))&&(e === (-1))){
        return "올바른 이메일 주소가 아닙니다."
    }else{
        return s;
    }
}
// -----------------------------------------
function j_emil(email) {
    return email.indexOf('@') !== -1
}

// -----------------------------------------// -----------------------------------------
// 9. 비밀번호에 문자, 숫자, 8자리이상인지 확인하는 함수
function password(s){
    var i = event.keyCode;
    if(i > 48 && i < 57){

    }
}

// -----------------------------------------
function j_validatePassword() {
    var lowCase = 'abcdefghijklmnopqrstuvwxyz';
    var upCase = low.toUpperCase();
    var numCase = '0123456789';
    var lowCheck = false;
    var upCheck = false;
    var numCheck = false;
    for(var i = 0, l = lowCase.length; i < l; i++){
        if(pw.indexOf(lowCase[i]) !== -1){
            lowCheck = true;
        }
        if(pw.indexOf(upCase[i]) !== -1){
            upCheck = true;
        }
    }
    for(var i = 0, l = numCase.length; i < l; i++){
        if(pw.indexOf(numCase[i]) !== -1){
            numCheck = true;
            break;
        }
    }
    if(lowCheck && upCheck && numCheck){
        return true;
    }else{
        return false;
    }
}

// -----------------------------------------
function j_validatePassword2(params) {
    return /^.(?={8, }).*(?=[0-9]).*(?=[a-zA-Z])&/.test(pw);
}