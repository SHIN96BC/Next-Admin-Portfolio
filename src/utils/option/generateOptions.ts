export default function generateOptions(options: string[][]): any[] {
  const result: any[] = [];

  // 재귀 함수를 사용하여 모든 조합을 생성합니다.
  function generate(currentIndex: number, currentOptions: any[]) {
    if (currentIndex === options.length) {
      // 기저 조건: 배열의 끝에 도달하면 결과 객체에 추가합니다.
      result.push(Object.assign({}, ...currentOptions));
      return;
    }

    // 현재 배열의 모든 요소를 반복하여 재귀 호출합니다.
    for (const option of options[currentIndex]) {
      generate(
        currentIndex + 1,
        [
          ...currentOptions,
          {
            [`option${currentIndex + 1}`]: option,
            optionPrice: '',
            specialPrice: '',
            stock: '',
            availability: false,
          }
        ]
      );
    }
  }

  // 재귀 함수를 호출합니다.
  generate(0, []);

  return result;
}