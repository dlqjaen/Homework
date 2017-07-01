MyUtility = (function(global){
    'use strict';
    //  자주 쓰여지는 감춰진 지역 내장함수
    var document = global.document;
    var toString = Object.prototype.toString;
    var forEach = Array.prototype.forEach;
    var slice = Array.prototype.slice;
    var mixin = function(){
        var arg = makeArray(arguments)
        for(var i =0, l = arg.length; i<l; i++){
            if(!isType(arg[i], 'object')&& !isType(arg[i], 'function')){
                throw '전달인자로 객체만 허용합니다.'
            }
        }
        var mixin_obj = arg.shift();
        var next = arg.shift();
        do{
            for(var prop in next){
                if( next.hasOwnProperty(prop) ){
                    mixin_obj[prop] = next[prop];
                }
            }
            next = arg.shift();
        }while(next)
        return mixin_obj;
    }
    /**
     * 인자값으로 받은 data의 유형을 반환하는 함수
     * 
     * @func type
     * @param {any} data - JavaScript의 모든 데이터 유형
     * @returns {string} - 소문자로 데이터 유형 이름을 문자열로 반환
     */
    function type(data){
        return toString.call(data).slice(8,-1).toLowerCase();
    }
    /**
     * JavaScript의 데이터 유형을 검증하여 참/거짓을 반환하는 함수
     * 
     * @global
     * @func isType
     * @param {any} data - JavaScript의 모든유형
     * @param {any} kind - 데이터 유형의 이름(소문자)
     * @returns {boolean} - 데이터 일치 검증 결과를 참/거짓으로 반환
     */
    function isType(data, kind){
        validateError(kind, 'string', '두번째 전달인자는 문자열이어야 합니다.');
        return type(data) === kind;
    }

    /**
     * 오류 조건을 발생시키는 문장을 만들어 내는 함수
     * 
     * @global
     * @func validateError
     * @param {any} data - JavaScript의 모든 데이터
     * @param {any} kind - 오류 검증을 위한 문자열
     * @param {any} error_massage - 출력할 오류 메세지(옵션)
     * @returns {string} - 유효한 경우 출력되는 메세지
     */
    function validateError(data, kind, error_massage){
        data = type(data);
        if(data !== kind){
            throw error_massage || '두 값은 동일하지 않습니다.'
        }
        return '오류는 발생하지 않았습니다.'
    }

    /**
     * 1에서부터 전달된 수까지 난수를 반환하는 함수
     * 
     * @global
     * @func randomNumber
     * @param {number} n - 난수의 최댓값
     * @default {number} - 2
     * @returns {number} - 난수
     */
    function randomNumber(n){
        validateError(n, 'number', '인자값으로 숫자를 전달해야 합니다.')
        n = n || 2;
        return Math.ceil(Math.random()*n);
    }

    /**
     * 전달된 인자에서 최솟값, 최댓값을 구분한 후 그 사이의 난수를 반환하는 함수
     * 
     * @global
     * @func randomMinMax
     * @param {number} min - 수(최댓 혹은 최솟값)
     * @param {number} max - 수(최댓 혹은 최솟값)
     * @returns {number} - 난수 
     */
    function randomMinMax(min, max){
        validateError(min, 'number', '인자값으로 숫자를 전달해 주세요.');
        validateError(max, 'number', '인자값으로 숫자를 전달해 주세요.');
        min = Math.min(min, max);
        max = Math.max(min, max) - min;
        return Math.round((Math.random()*max)+min);
    }

    /**
     * 인자값의 데이터 형태가 숫자형인지 감별하는 함수
     * 
     * @global
     * @func isNumber
     * @param {any} data - JavaScript의 모든 데이터 유형 
     * @returns {boolean} - 인자값이 숫자 유형인지의 유무 true || false
     */
    function isNumber(data){
        return isType(data, 'number')
    }

    /**
     * 인자값의 데이터 형태가 문자형인지 감별하는 함수
     * 
     * @global
     * @func isString
     * @param {any} data - JavaScript의 모든 데이터 유형 
     * @returns {boolean} - 인자값이 문자 유형인지의 유무 true || false
     */
    function isString(data){
        return isType(data, 'string');
    }

    /**
     * 인자값의 데이터 형태가 불리언인지 감별하는 함수
     * 
     * @global
     * @func isBoolean
     * @param {any} data - JavaScript의 모든 데이터 유형 
     * @returns {boolean} - 인자값이 불리언 유형인지의 유무 true || false
     */
    function isBoolean(data){
        return isType(data, 'boolean');
    }

    /**
     * 인자값의 데이터 형태가 함수형인지 감별하는 함수
     * 
     * @global
     * @func isFunction
     * @param {any} data - JavaScript의 모든 데이터 유형 
     * @returns {boolean} - 인자값이 함수 유형인지의 유무 true || false
     */
    function isFunction(data){
        return isType(data, 'function');
    }

    /**
     * 인자값의 데이터 형태가 배열형인지 감별하는 함수
     * 
     * @global
     * @func isArray
     * @param {any} data - JavaScript의 모든 데이터 유형 
     * @returns {boolean} - 인자값이 배열 유형인지의 유무 true || false
     */
    function isArray(data){
        return isType(data, 'array');
    }

    /**
     * 인자값의 데이터 형태가 객체형인지 감별하는 함수
     * 
     * @global
     * @func isObject
     * @param {any} data - JavaScript의 모든 데이터 유형 
     * @returns {boolean} - 인자값이 객체 유형인지의 유무 true || false
     */
    function isObject(data){
        return isType(data, 'object');
    }

    /**
     * 인자값의 데이터 형태가 숫자형인지 감별하는 함수
     * 
     * @global
     * @func makeArray
     * @param {any} o - 유사 배열 객체 (배열과 흡사한 객체)
     * @returns {array} - 배열 객체
     */
    function makeArray(o){
        return slice.call(o);
    }

    /**
     * JavaScript 데이터를 받아 인스턴스로 만들어 관리하는 생성자함수
     * 
     * @global
     * @func  Utility
     * @param {any} data - 인스턴스가 관리할 데이터
     * @return {object} - 데이터를 가지는 인스턴스 함수
     */
    function Utility(data){
        if(!(this instanceof FDS)){
            return new Utility(data);
        }
    }
    Utility.include = function(o){
        mixin(Utility, o);
    }
    Utility.include({
        info: {
            version: '0.0.1',
            author: '나무소리',
            license: 'MIT'
        },
        type : type,
        isType : isType,
        validateError : validateError,
        randomNumber : randomNumber,
        randomMinMax : randomMinMax,
        isNumber : isNumber,
    })
    return Utility;
})(window);