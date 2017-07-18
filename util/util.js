var MyUtility = (function(global){
    'use strict';
    //  자주 쓰여지는 감춰진 지역 내장함수
    var document = global.document;
    var toString = Object.prototype.toString;
    var forEach = Array.prototype.forEach;
    var slice = Array.prototype.slice;
    // ——————————————————————————————————————
    // JavaScript 유틸리티 함수
    // ——————————————————————————————————————
    /**
     * 인자값으로 받은 data의 유형을 반환하는 함수
     * 
     * @func type
     * @param {any} data - JavaScript의 모든 데이터 유형
     * @returns {string} - 소문자로 데이터 유형 이름을 문자열로 반환
     */
    var type = function(data){
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
    var isType = function(data, kind){
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
    var validateError = function(data, kind, error_massage){
        data = type(data);
        if(data !== kind){
            throw error_massage || '두 값은 동일하지 않습니다.'
        }
        return '오류는 발생하지 않았습니다.'
    }

    /**
     * 1에서부터 전달된 수까지 난수를 반환하는 함수
     * 
     * @func randomNumber
     * @param {number} n - 난수의 최댓값
     * @default {number} - 2
     * @returns {number} - 난수
     */
    var randomNumber = function(n){
        validateError(n, 'number', '인자값으로 숫자를 전달해야 합니다.')
        n = n || 2;
        return Math.ceil(Math.random()*n);
    }

    /**
     * 전달된 인자에서 최솟값, 최댓값을 구분한 후 그 사이의 난수를 반환하는 함수
     * 
     * @func randomMinMax
     * @param {number} min - 수(최댓 혹은 최솟값)
     * @param {number} max - 수(최댓 혹은 최솟값)
     * @returns {number} - 난수 
     */
    var randomMinMax = function(min, max){
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
    var isNumber = function(data){
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
    var isString = function(data){
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
    var isBoolean = function(data){
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
    var isFunction = function(data){
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
    var isArray = function(data){
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
    var isObject = function(data){
        return isType(data, 'object');
    }

    /**
     * 인자값을 배열로 변환해주는 함수
     * 
     * @func makeArray
     * @param {any} o - 유사 배열 객체 (배열과 흡사한 객체)
     * @returns {array} - 배열 객체
     */
    var makeArray = function(o){
        return slice.call(o);
    }

    /**
     * 첫번째 인자로 전달된 객체에 나머지 전달된 객체들의 속성,값을 전달해주는 함수
     * 
     * @func mixin
     * @returns {object} - 전달된 인자 객체들의 속성을 전달받은 객체
     */
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
     * 브라우저 환경을 점검해 forEach함수를 폴리필 하는 함수
     * 
     * @func forEaxhFn
     * @returns {function} - forEach함수
     */
    var forEachFn = function(){
        if(forEach){
            return function(o, callback){
                o.forEach(callback);
            }
        }else{
            return function(o, callback){
                for(var i=0, l=o.length; i<l; i++){
                    callback(o[i], i, o);
                }
            }
        }
    }

    /**
     * JavaScript의 데이터 유형을 검사해서 배열, 객체의 각 요소에 callback함수를 실행하는 함수
     * 
     * @global
     * @param {array, object} o - 배열 & 유사배열 & 객체
     * @param {function} callback - 함수
     */
    var each = function(o, callback){
        validateError(callback, 'function');
        if(!isObject(o) && o.length){
            o = makeArray(o);
        }
        isArray(o) && forEachFn(o, callback);
        if(isObject(o)){
            for( var prop in o){
                o.hasOwnProperty(prop) && callback(prop, o[prop], o);
            }
        }
        if(o.nodeType === 1){
            for(var prop in o){
                callback(prop, o[prop], o);
            }
        }
    }

    // ——————————————————————————————————————
    // DOM 검증 유틸리티 함수
    // ——————————————————————————————————————

    /**
     * 대상Node가 ElementNode인지 확인해주는 함수
     * 
     * @func isElementNode
     * @param {any} node - Dom의 모든 node
     * @returns {boolean} - node가 ElementNode인지 유무확인
     */
    var isElementNode = function(node){
        return node.nodeType === document.ELEMENT_NODE;
    }

    /**
     * 대상Node가 ElementNode인지 확인해주는 함수
     * 
     * @func isTextNode
     * @param {any} node - Dom의 모든 node
     * @returns {boolean} - node가 TextNode인지 유무확인
     */
    var isTextNode = function(node){
        return node.nodeType === document.TEXT_NODE;
    }

    /**
     * 대상Node가 ElementNode인지 확인후 경고메세지를 전달해주는 함수
     * 
     * @func validateElementNode
     * @param {any} node - Dom의 모든 node
     * @returns {boolean} - node가 ElementNode인지 유무확인 후 경고메세지 전달
     */
    var validateElementNode = function(node){
        if(!node || !isElementNode(node)){ throw '요소노드를 전달해야만 합니다.'}
    }

    /**
     * 대상Node가 ElementNode 혹은 document인지 확인 후 경고메세지를 전달해주는 함수
     * 
     * @func validateElementNodeOrDocument
     * @param {any} node - Dom의 모든 node
     * @returns {boolean} - node가 ElementNode혹은 document인지 유무확인 후 경고메세지 전달
     */
    var validateElementNodeOrDocument = function(node){
        if(node !== document && !isElementNode(node)){throw '두 번째 인자로 반드시 요소노드를 전달해 주세요.'}
    }

    // ——————————————————————————————————————
    // DOM 선택 API: 유틸리티 함수
    // ——————————————————————————————————————

    /**
     * document에서 특정 id를가진 요소를 반환하는 함수
     * 
     * @func id
     * @param {string} name - JavaScript 문자열 데이터 
     * @returns {element} - 특정 아이디를 가진 요소
     */
    var id = function(name){
        validateError(name, 'string', '전달인자는 문자여야 합니다.');
        return document.getElementById(name);
    }

    /**
     * document 혹은 특정 elementNode에서 특정 Tag를 가진 요소를 모두 찾아내는 함수
     *
     * @func tagAll 
     * @param {string} name - 찾고자하는 요소노드의 명칭(문자열) 
     * @param {string, document} context - 찾고자하는 요소노드의 상위 요소 혹은 document(옵션)
     * @returns {nodeList, HTMLCollection}- 찾고자하는 요소들의 유사배열
     */
    var tagAll = function(name, context) {
        validateError(name, 'string', '전달인자는 문자여야 합니다.');
        if(context && !isElementNode(context) && context !== document){
            throw '두번째 전달인자는 요소노드여야 합니다.'
        }
        return (context || document).getElementsByTagName(name);
    }

    /**
     * 찾고자하는 특정 요소중 첫번째 요소를 반환하는 함수
     * 
     * @func tag
     * @param {string} name - 찾고자하는 요소노드의 명칭(문자열) 
     * @param {string, document} context - 찾고자하는 요소노드의 상위 요소 혹은 document(옵션)
     * @returns {node}- 찾고자하는 요소 중 첫번쨰
     */
    var tag = function(name, context){
        return tagAll(name,context)[0];
    }

    /**
     * 특정 class를 가지고 있는 요소들의 집합을 반환하는 함수
     * 
     * @func classAll
     * @param {string} name - 찾고자하는 특정 class의 이름(문자열) 
     * @param {string, document} context - 찾고자하는 class의 상위 요소 혹은 document(옵션)
     * @returns {nodeList, HTMLCollection} - 찾고자하는 class이름을 가진 모든 요소의 유사배열
     */
    var classAll = function(name, context){
        var _classAll = null;
        if('getElementsByClassName' in Element.prototype){
            return _classAll = function(name, context){
                validateError(name, 'string', '전달인자는 문자여야 합니다.');
                context = context || document;
                validateElementNodeOrDocument(context);
                return context.getElementsByClassName(name);
            }
        }else{
            return _classAll = function(name, context){
                validateError(name, 'string', '전달인자는 문자여야 합니다.')
                context = context || document;
                validateElementNodeOrDocument(context);
                var _alls = tagAll('*', context);
                var _matched = [];
                var match = new RegExp('^|\\s')+ name +('$|\\s');
                for(var i=0, l=_alls.length; i<l; i++){
                    var _el = _alls[i];
                    if(match.test(_el.className)){_matched.push(_el)}
                }
                return _matched;
            }
        }
    }();

    /**
     * 찾고자하는 특정 class 하나를 반환하는 함수
     * 
     * @func classSingle
     * @param {string} name - 찾고자하는 특정 class의 이름(문자열)
     * @param {string, document} context - 찾고자하는 특정 class의 상위 요소(옵션))
     * @returns {node} - 찾고자하는 class를 가진 요소들 중 첫번쨰
     */
    function classSingle(name, context){
        return classAll(name, context)[0];
    }

    /**
     * 찾고자하는 특정 class, id, tag들을 찾아 nodeList로 반환하는 함수
     * 
     * @global
     * @func queryAll
     * @param {string} name - 찾고자하는 특정 class | is | tag의 이름
     * @param {string, document} context -  찾고자하는 특정 class | is | tag 상위 요소(옵션))
     * @returns {nodeList} - 찾고자하는 class | is | tag를 가진 요소들의 유사배열
     */
    function queryAll(name, context){
        validateError(name, 'string', '전달인자는 문자여야 합니다.');
        context = context || document;
        validateElementNodeOrDocument(context);
        return context.querySelectAll(name);
    }

    /**
     * 찾고자하는 특정 class, id, tag를 반환하는 함수
     * 
     * @global
     * @func query
     * @param {string} name - 찾고자하는 특정 class | is | tag의 이름
     * @param {string, document} context -  찾고자하는 특정 class | is | tag 상위 요소(옵션))
     * @returns {nodeList} - 찾고자하는 class | is | tag를 가진 요소들 중 첫번쨰
     */
    function query(name, context){
        return queryAll(name, context)[0];
    }

    // ——————————————————————————————————————
    // DOM 탐색 API: 유틸리티 함수
    // ——————————————————————————————————————
    /**
     * 전달한 요소노드의 첫번째 자식요소를 반환하는 함수
     * 
     * @global
     * @func firstChild
     * @param {node} el_node - 요소노드
     * @returns {node} - 인자로 전달한 요소노드의 첫번째 자식노드
     */
    var firstChild = function(el_node){
        var _firstChild = null;
        if('firstElementChild' in Element.prototype){
            return _firstChild = function(el_node){
                validateElementNode(el_node);
                return el_node.firstElementChild;
            }
        }else{
            return _firstChild = function(el_node){
                validateElementNode(el_node);
                return el_node.children[0];
            }
        }
    }();

    /**
     * 전달한 요소노드의 마지막 자식요소를 반환하는 함수
     * 
     * @global
     * @func lastChild
     * @param {node} el_node - 요소노드
     * @returns {node} - 인자로 전달한 요소노드의 마지막 자식노드
     */
    var lastChild = function(el_node){
        var _lastChild = null;
        if( 'lastElementChild' in Element.prototype ){
            return _lastChild = function(el_node){
                validateElementNode(el_node);
                return el_node.lastElementChild();
            }
        }else{
            return _lastChild = function(el_node){
                validateElementNode(el_node);
                var children = el_node.children;
                return children[ --children.length ];
            }
        }
    }();

    /**
     * 전달한 요소노드의 다음 형제요소를 반환하는 함수
     * 
     * @global
     * @func nextSibling
     * @param {node} el_node - 요소노드
     * @returns {node} - 인자로 전달한 요소노드의 다음 형제노드
     */
    var nextSibling = function(el_node){
        var _nextSibling = null;
        if( 'nextElementSibling' in Element.prototype ){
            return _nextSibling = function(el_node){
                validateElementNode(el_node);
                return el_node.nextElementSibling;
            }
        }else{
            return _nextSibling = function(el_node){
                validateElementNode(el_node);
                do{
                    el_node = el_node.nextSibling;
                }while(el_node && !isElementNode(el_node))
            }
        }
    }();

    /**
     * 전달한 요소노드의 마지막 자식요소를 반환하는 함수
     * 
     * @global
     * @func previousSibling
     * @param {node} el_node - 요소노드
     * @returns {node} - 인자로 전달한 요소노드의 마지막 자식노드
     */
    var previousSibling = function(el_node){
        var _previousSibling;
        if('previousElementSibling' in Element.prototype){
            return _previousSibling = function(el_node){
                validateElementNode(el_node);
                el_node.previousElementSibling;
            }
        }else{
            return _previousSibling = function(el_node){
                validateElementNode(el_node);
                do{
                    el_node = el_node.previousSibling;
                }while(el_node && !isElementNode(el_node))
            }
        }
    }();

    /**
     * 전달한 노드의 부모노드를 찾는 함수
     * 
     * @global
     * @func parent
     * @param {node} el_node - 요소노드
     * @param {number} depth - JavaScript 숫자열
     * @returns {node} - 인자로 전달한 노드의 부모노드
     */
    var parent = function(node, depth){
        validateElementNode(node);
        dept = dept || 1;
        do{ node = node.parentNode; }
        while(node && --dept);
        return node;
    };

    /**
     * 전달한 요소노드가 자식노드를 유사배열(nodeList, HTMLCollection)을 반환하는 함수
     * 
     * @global
     * @func hasChild
     * @param {node} el_node - 요소노드
     * @returns {node} - 인자로 전달한 요소노드의 자식노드들의 유사배열
     */
    var hasChild = function(node){
        validateElementNode(node);
        return node.hasChildNodes();
    }

    // ——————————————————————————————————————
    // DOM 생성/조작 API: 유틸리티 함수
    // ——————————————————————————————————————
    var createElement = function(name){
        validateError(name, 'string', '요소의 이름을 문자로 전달해주세요.');
        return document.createElement(name);
    }

    var createText = function(content){
        validateError(content, 'string', '콘텐츠는 문자열이어야 합니다.');
        return document.createTextNode(content);
    }
    
    var appendChild = function(parent, child){
        validateElementNode(parent);
        parent.appendChild(child);
        return child;
    }

    var createEl = function(name, content){
        validateElementNode(name, 'string', '첫번째 인자로 요소의 이름을 설정해주세요.');
        var el = createElement(name);
        if(contnet && isType(content, 'string')){
            var text = createText(content);
            appendChild(el, text)
        }
        return el;
    }

    var insertBefore = function(insert, target){
        validateElementNode(insert);
        validateElementNode(target);
        parent(target).insertBefore(insert, target);
        return insert;
    }

    var before = function(insert, target){
        return insertBefore(target, insert);
    }

    var preventChild = function(parent, child){
        validateElementNode(parent);
        validateElementNode(child);
        var target = firstChild(parent);
        return target ? insertBefore(child, target) : appendChild(parnet, child)
    }
    /**
     * JavaScript 데이터를 받아 인스턴스로 만들어 관리하는 생성자함수
     * 
     * @func  Utility
     * @param {any} data - 인스턴스가 관리할 데이터
     * @return {object} - 데이터를 가지는 인스턴스 함수
     */
    function Utility(data){
        if(!(this instanceof MyUtility)){
            return new Utility(data);
        }
    }
    Utility.include = function(o){
        mixin(Utility, o);
    }
    // 데이터 생성, 로드, 업데이트, 제거 만들어보기
    // ----------------
    // 공개 API
    // ----------------
    Utility.include({
        info: {
            version: '0.0.1',
            author: '나무소리',
            license: 'MIT'
        },
        
        // JavaScript 유틸리티
        type : type,
        isType : isType,
        validateError : validateError,
        isNumber : isNumber,
        isString: isString,
        isBoolean : isBoolean,
        isFunction : isFunction,
        isArray : isArray,
        isObject : isObject,
        each : each,

    })
    return Utility;
})(window);