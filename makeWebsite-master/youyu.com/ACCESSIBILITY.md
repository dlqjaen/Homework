# 고정형 레이아웃 접근성관련 정리
 ## heading-level
  - 꼭 필요한 부분이라고 생각되는 곳에만 넣어봄. 
 ## header 
  1. search
   - 어떤 내용이 들어갈지에 대한 placeholder 내용을 추가
     - input의 속성인 placeholder는 스크린리더에 읽히지 않는다. 그래서 aria를 사용
     [참고자료](https://stackoverflow.com/questions/9157867/placeholder-vs-label-for-input-in-html5)
     - aria-describedby=""
  2. user-info
   - 영역에 대한 설명추가
     - aria-labelledby=""
  3. navigation
   - 영역에 대한 설명추가
     - aria-labelledby=""
   - 각각의 content(a 태그)에 대한 설명 추가
     - aria-label=""
 ## filter
  1. form / checkbox
   - 각각의 row 레벨의 부가설명을 추가 / 그룹이라는 역할을 부여
     - aria-labelledby="" role="group"
   - row안의 column 부분의 컨텐츠에 부가설명 추가
     - aria-label=""
 ## main
   1. banner
    - banner 부분의 설명을 추가
      - aria-labelledby=""
    - 이미지에 탭키가 적용되도록 설정
      - tabindex=""
    - anchor-box의 span태그에 button이라는 역할을 추가하고 탭키가 적용되게 끔 함.
      - role="button" / tabindex="0"
    - 각 anchor-box 버튼 부분에 대한 설명 추가
      - aria-label=""
   2. bestseller
    - bestseller 부분의 설명을 추가.
      - aria-labelledby=""
    - a태그에 대한 역할과 설명 추가 및 like-btn에 탭키가 적용될 수 있도록 함.
      - aria-label="" / tabindex=""
    - .price 부분에 탭키가 적용될 수 있도록 함
      - tabindex=""
   3. brand 
    - brand 부분의 설명을 추가
      - aria-labelledby="" 
    - a태그의 그룹 역할 / 설명 추가
      - role="group" / aria-label
    - .brand-like-btn에 역할 / 탭키 적용 / 설명 추가
      - role="button" / tabindex="0" / aria-label=""
    - .brand-btn에 설명 추가
      - aria-label=""
   4. brandnew
    - brandnew 부분의 설명을 추가.
      - aria-labelledby=""
    - a태그에 대한 역할과 설명 추가 및 like-btn에 탭키가 적용될 수 있도록 함.
      - aria-label="" / tabindex=""
    - .price 부분에 탭키가 적용될 수 있도록 함
      - tabindex="" 
   5. tip
    - tip 부분의 설명을 추가.
      - aria-labelledby=""
    - a태그에 대한 역할과 설명 추가 및 anchor-box에 대한 역할과 탭키적용 추가
      - aria-label="" / role="" / tabindex=""
   6. best-review
    - best-review 부분의 설명을 추가.
      - aria-labelledby=""
    - a태그에 대한 역할과 설명 추가 및 like-btn에 탭키가 적용될 수 있도록 함.
      - aria-label="" / tabindex=""
    - .price 부분에 탭키가 적용될 수 있도록 함
      - tabindex=""
 ## footer
   1. user-info
    - user-info 부분의 설명을 추가.
      - aria-labelledby=""
    - company-info 부분의 설명을 추가.
      - aria-labelledby=""
    - cs 부분의 설명을 추가.
      - aria-labelledby=""
   