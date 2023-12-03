# survey-service

# 목차

1. [사용 기술](#사용-기술)
2. [서버 설정 및 실행 방법](#서버-설정-및-실행-방법)

---

## 사용 기술

| 라이브러리     | 설명                      |
| :------------- | :------------------------ |
| Nestjs         | 서버 프레임워크           |
| typescript     | 유지, 보수 및 생산성 향상 |
| pg(postgresql) | DB                        |
| typeorm        | Object Relational Mapping |

## 서버 설정 및 실행 방법

### 서버 설정

- DB 설정

1. src 폴더 내에 .env파일 생성
2. env파일에 DB 정보 입력
3. app.module.ts파일에 synchronize 부분은 true일 경우 db를 최신 구성으로 동기화, false일 경우 마지막 동기화 상태로 유지.

- Winston Logger 설정

1. log가 저장 될 수 있는 폴더 생성
2. 폴더의 경로를 env에 입력
3. app.module.ts에 WinstonModule log 레벨을 설정

- 서버 실행 전 터미널에서 npm install로 서버 setting

### 서버 실행 방법

- npm run start:dev (개발 서버 실행)
- npm run start (서버 실행)
- 글로벌 프리픽스 설정을 했으므로 앞에 api를 붙여 서버 활용 (예시: http://localhost:4000/api/survey/createSurvey)
