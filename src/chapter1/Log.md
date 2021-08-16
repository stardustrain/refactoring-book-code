# 1. Refactoring - 첫 번째 예시

## 1. 주요 내용 정리

- 프로그램이 너무 짧아서 특별히 애써 이해해야할 구조가 없다고 하더라도 이런 코드가 모이게되면 결국은 이해하기 힘들게 된다.
  - 사람은 코드의 "미적 상태"에 민감하고, 설계가 나쁜 시스템은 수정하기 어렵다.
- 프로그램이 새로운 기능을 추가하기에 편한 구조가 아니라면, 먼저 기능을 추가하기 쉬운 형태로 refactoring하고 나서 원하는 기능을 추가한다.
  - Refactoring이 필요한 이유는 `변경`때문이며, 이러한 요구는 시도떄도 없이 몰려올 가능성이 있다.
- Refactoring에서 테스트 코드의 역할은 매우 중요하다. Refactoring하기 전에 제대로 된 테스트부터 마련한다.
  - TDD에서 처럼 red-green-blue의 step을 통과하도록 자동화 한다.
- Refactoring을 할때는 프로그램 수정을 작은 단계로 나누어 진행한다. 그래야 중간에 실수하더라도 버그를 쉽게 찾을 수 있다.
- 컴퓨터가 이해하는 코드는 바보도 작성할 수 있다. 사람이 이해하도록 작성하는 프로그래머가 진정한 실력자다.
  - 변수명, 함수명, parameter name을 신경쓴다. 명확성을 높이기 위해서라면 이름 바꾸는 것을 망설이지 않는다.
- 보이스카웃 원칙 - 처음 캠핑장에 도착했을 때 보다 더 깔끔하게 정돈하고 떠난다.
- **좋은 코드를 가늠하는 확실한 방법은 '얼마나 수정하기 쉬운가'이다.**

## 2. 소개된 테크닉들

1. 반복문 쪼개기

   - 반복문 내부에서 여러가지 목적이 동시에 달성되고 있다면, 목적별로 반복문을 나눈다.
   - 반복문이 중복되며 성능이 염려된다 하더라도 생각보다 성능에 끼치는 영향은 크지 않는다. _성능의 경우 특별한 경우가 아니라면 일단 무시하라 (p.47)_
   - 성능에 문제가 생기더라도 깔끔하게 나누어진 코드가 성능을 개선하기 더 쉽다.

2. 문장 슬라이드하기

   - 변수 초기화 문장을 변수값이 바뀌는 코드 바로 앞으로 옮긴다.

3. 단계 쪼개기

   - 하나의 함수에 여러 단계의 코드를 섞어놓지 않는다.
   - 이를테면, 데이터를 정제하는 단계와 이를 표시하는 단계를 나누어 코드도 그에 맞춰 나누어 작성한다.

4. 임시 변수를 질의 함수로 바꾸기
5. 함수로 추출하기

   - 코드를 보고 어떤 일을 하는지 분석하는데 시간이 많이 소모된다면, 그 부분을 함수로 추출하고 적당한 이름을 붙인다.

6. 변수 인라인 하기
7. 반복문을 파이프라인으로 바꾸기

   - for loop을 이용해 `어떻게 할지` 작성하는 것도 좋지만, JavaScript의 내장 method pipeline을 통해 `무엇을 할지`를 알기 쉽게끔 작성한다.

8. 조건부 로직을 다형성을 통해 처리하게끔 바꾸기

```ts
get amount() {
 let result = 0;

 switch (this.play.type) {
   case 'tragedy':
     result = 40000;
     if (this.performance.audience > 30) {
       result += 1000 * (this.performance.audience - 30);
     }
     break;
   case 'comedy':
     result = 30000;
     if (this.performance.audience > 20) {
       result += 10000 + 500 * (this.performance.audience - 20);
     }
     result += 300 * this.performance.audience;
     break;
   default:
     throw new Error(`Unknown play type: ${this.play.type}`);
 }

 return result;
}

// Refactoring after
class PerformanceCalculator {
 performance: Performance;
 play: Play;

 constructor(performance: Performance, play: Play) {
   this.performance = performance;
   this.play = play;
 }

 get volumeCredits() {
   return Math.max(this.performance.audience - 30, 0);
 }
}

export type PerformanceCalculatorParameters = ConstructorParameters<typeof PerformanceCalculator>;
export class TragedyPerformanceCalculator extends PerformanceCalculator {
  get amount() {
    let result = 40000;
    if (this.performance.audience > 30) {
      result += 1000 * (this.performance.audience - 30);
    }
    return result;
  }
}
export class ComedyPerformanceCalculator extends PerformanceCalculator {
  get amount() {
    let result = 30000;
    if (this.performance.audience > 20) {
      result += 10000 + 500 * (this.performance.audience - 20);
    }
    result += 300 * this.performance.audience;
    return result;
  }

  get volumeCredits() {
    return super.volumeCredits + Math.floor(this.performance.audience / 5);
  }
}
```

## 3. 논의하고 싶은 것
