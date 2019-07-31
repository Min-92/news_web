# News - web

nodejs Express 를 이용한 news 사이트 제작

## purpose


### Main

- 뉴스 게시
- 내용 공유

### Sub

- 의견 나누기

## Function


- 글 관리
    - 수정
    - 삭제
    - 숨기기
    - 댓글달기
    - 좋아요
- 회원 관리
    - 로그인
    - 회원가입
    - 로그아웃

## List of request

| function                 | method | uri                               |
| ------------------------ | ------ | --------------------------------- |
| 글 목록 보기             | GET    | /articles                         |
| 상세 글 보기             | GET    | /articles/:number         |
| 글작성 페이지 가져오기   | GET    | /new-form                         |
| 글 post 하기             | POST   | /articles                         |
| 로그인 페이지 가져오기   | GET    | /log-in                           |
| 로그인 하기              | POST   | /log-in                           |
| 회원가입 페이지 가져오기 | GET    | /sign-up                          |
| 회원가입 하기            | POST   | /sign-up                          |
| 댓글 작성하기            | POST   | /articles/:number/comment |
| 로그아웃 하기            | POST   | /log-out                          |
| 좋아요 누르기            | POST   | /articles/:number/like    |
| 글 수정 페이지 가져오기  | GET    | /articles/:number/edit    |
| 글 수정 보내기           | PATH   | /articles/:number         |



## List of pages


1. /news
2. /article
3. /write
4. /login
5. /signup

## Pages


### 1. /news

![](https://user-images.githubusercontent.com/26920620/61426508-92b28c80-a955-11e9-9014-e5f67bf65c2d.png)

- 메인페이지
- 기사 리스트를 보여줌
1. 로그인, 회원가입 버튼
    1. 로그인, 회원가입 페이지로 이동
    2. 로그인시 로그아웃 버튼으로 변경
2. 기사 리스트
    1. 기사 10개 출력
    2. 기사 
        1. 제목
        2. 사진
        3. 내용
3. 페이지 넘기기

### 2. /article

![](https://user-images.githubusercontent.com/26920620/61426512-96deaa00-a955-11e9-9a15-50a0fec8345c.png)

- 기사 상세내용 페이지
1. 기사
    1. 제목, 사진, 내용, 시간
    2. 좋아요 수
2. 댓글
    1. 입력부
    2. 사용자 이름, 내용

### 3. /write

![](https://user-images.githubusercontent.com/26920620/61426517-9a723100-a955-11e9-8043-e848c564f21b.png)

- 기사 작성 페이지(관리자)
1. 기사 작성부분
    1. 제목
    2. 내용
    3. 사진
    4. Post버튼
        1. 서버에 기사 data 보내기
        2. 기사 목록으로 이동하기
2. 팝업 메세지
    1. 제목이 없는 경우
    2. 내용이 없는 경우

### 4. /login

![](https://user-images.githubusercontent.com/26920620/61426522-9e9e4e80-a955-11e9-9e3f-63b6e866b1ee.png)

- 로그인 페이지
1. ID, PW 입력부
    1. ID, PW 입력 필수
    2. login 버튼 클릭시 로그인 요청
2. signup 페이지로 이동
3. 팝업메세지
    1. id가 없는경우
    2. pw가 다른경우

 

### 5. /signup

![](https://user-images.githubusercontent.com/26920620/61426528-a231d580-a955-11e9-9521-9b478a62e0f5.png)

- 회원가입 페이지
1. ID,PW 입력부
    1. ID,PW 입력 필수
    2. signup 버튼 클릭시 회원가입 요청
2. login 페이지로 이동
3. 팝업 메세지
    1. ID가 존재하는 경우