## Next.js Admin Portfolio

## 현재 작업중입니다.

## 프로젝트 설명
- 백오피스 웹 프론트 코드를 보여드리기 위한 프로젝트 입니다.

## Skill
<div>
    <div>
        <img src="https://img.shields.io/badge/Node.js(v20.3.0)-339933?style=flat&logo=node.js&logoColor=white"/>
        <img src="https://img.shields.io/badge/npm(v9.6.7)-CB3837?style=flat&logo=npm&logoColor=white"/>
    </div>
    <div>
        <img src="https://img.shields.io/badge/Next(v14.2.3)-000000?style=flat&logo=next.js&logoColor=white"/>
        <img src="https://img.shields.io/badge/React(v18)-61DAFB?style=flat&logo=react&logoColor=white"/>
        <img src="https://img.shields.io/badge/Typescript-3178C6?style=flat&logo=typescript&logoColor=white"/>
    </div>
    <div>
        <img src="https://img.shields.io/badge/MUI-007FFF?style=flat&logo=mui&logoColor=white"/>
        <img src="https://img.shields.io/badge/redux-764ABC?style=flatl&logo=redux&logoColor=white"/>
        <img src="https://img.shields.io/badge/ReactQuery-FF4154?style=flat&logo=reactquery&logoColor=white"/>
        <img src="https://img.shields.io/badge/Axios-5A29E4?style=flat&logo=axios&logoColor=white"/>
        <img src="https://img.shields.io/badge/Zod-3E67B1?style=flat&logo=zod&logoColor=white"/>
        <img src="https://img.shields.io/badge/React Hook Form-EC5990?style=flat&logo=reacthookform&logoColor=white"/>
    </div>
</div>

### 왜 yup이 아니라 zod를 선택했는가
- yup의 장점
  - 오랫동안 사용되어 왔기 때문에 생태계가 넓다.
  - 검증된 라이브러리이고, Formik 라이브러리와의 통합이 잘 되어있다.
  - addMethod를 통해 커스텀 검증 로직을 추가할 수 있다.
- yup의 단점
  - TypeScript에 대한 지원이 부족하다.
  - yup은 기본적으로 TypeScript 타입을 자동으로 추론하지 않으며, 별도의 타입 정의가 필요하다.
  - 복잡한 검증 로직이 많은 경우 런타임 성능이 떨어진다.
- zod의 장점
  - TypeScript에 대해 친화적이기 때문에 TypeScript와의 통합이 매우 뛰어나며, 스키마를 정의하면서 타입을 자동으로 생성해준다.
  - Type 안전성을 제공하여, 개발자가 컴파일 타임에 타입 에러를 잡을 수 있도록 해준다.
  - 경량형이어서 빠른 성능을 제공하고, 특히 복잡한 검증 로직에서도 yup보다 비교적 빠르게 동작한다.
  - 직관적이며, 코드가 간결하다.
  - 데이터 파싱과 검증을 동시에 처리할 수 있어 코드 중복을 줄일 수 있다.
  - 플러그인이나 확장 기능을 사용하지 않고도 기본 기능이 강력하여, 다양한 검증 요구사항을 쉽게 처리할 수 있다.
- zod의 단점
  - yup에 비해 생태계가 작다. 
  - 새로운 라이브러리이기 때문에 성숙도가 yup에 비해 낮다.
- 내 상황에서는 어떤 라이브러리를 선택하는게 좋을까?
  - TypeScript를 사용하기 때문에 TypeScript에 친화적이고, Type 안정성을 제공하는 zod가 좋을 것 같다.
  - yup과 찰떡궁합인 Formik이 아닌 react-hook-form을 사용하기 때문에 굳이 yup을 고집할 필요는 없다.
  - 성능면에서는 zod가 더 우세하다.
  - 코드의 간결함도 zod가 더 우세하다.
  - 유연성면에서는 yup이 더 우세하다.
  - 생태계는 yup이 더 크기 때문에 예제를 찾기에는 yup이 더 좋다.
- 결론
  - zod 선택
  - 이유
    - 먼저 생태계의 크기 측면에서 보면 직접 사용하면서 방법을 찾아가는 것을 선호하기 때문에 크게 문제가 되지 않는다.
    - TypeScript에 친화적이고, 성능이 우수하며, 코드가 간결한 것을 더 선호한다.
    - 종합적으로 봤을 때 zod가 더 잘 맞을 것 같아서 선택


## Design Pattern
<div>
  <img src="https://img.shields.io/badge/Feature Sliced Design-FFDA44?style=flat&logo=textpattern&logoColor=black"/>
</div>

### 왜 Feature Sliced Design 패턴(Feature-Based Architecture)을 선택했는가
- Feature Sliced Design 패턴은 각 기능이나 도메인별로 관련된 파일들을 모아놓는 방식입니다.
- 보통 복잡한 기능이 많고 프로젝트 규모가 큰 어드민 프로젝트는 Feature Sliced Design 패턴을 사용하는 것이 여러가지로 유리하다고 생각했습니다.
- 또한 단일 책임 원칙을 준수하며 개발하기 용이합니다.
- 유지보수 측면: 기능단위로 폴더가 존재하기 때문에 각 기능들을 독립적으로 개발, 테스트, 유지보수하기가 쉽습니다.
  해당 코드가 어떤 기능과 관련이 있는지 쉽게 알 수 있어 가독성이 높아집니다.
- 확장성 측면: 새로운 기능이 추가 되더라도 기존 폴더 구조를 수정할 필요 없이 새로운 폴더를 추가하기만 하면 되기 때문에 확장에 좀 더 유연하게 대처할 수 있습니다.
- 협업 측면: 팀원들끼리 기능 단위로 작업을 나눠서 진행할 때 팀원들이 기능별로 독립적으로 작업할 수 있어 협업에 유리합니다.



## Getting Started


```bash
npm install

npm run dev

npm run build
```

## Deploy on Vercel

