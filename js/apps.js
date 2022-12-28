const introImg = document.querySelector("#intro-img");
const introContainer = document.querySelector("#intro-container");

const title = document.querySelector("#title");
const selectBox = document.querySelector("#option-btn-div");
const paging = document.querySelector("#paging");
const goMain = document.querySelector("#goMain");
const option1 = document.querySelector("#option-con1");
const option2 = document.querySelector("#option-con2");

const pageCount = document.querySelector("#question-count");
const before = document.querySelector("#before");
const after = document.querySelector("#after");
const printResult = document.querySelector("#printResult");
let page = 1; // page 1 ~ 12
let index = -1; // testListArr의 index. 현재 page를 통해 index를 구한다.

pageCount.innerText = `${page} / 12`;

const HIDDEN_KEY = "hidden";
const CHECK_KEY = "check";

disabledSet();

let totalArr = [];

const testList = {
  // page : 1 - 3 index : 0
  zero: {
    select: [
      [
        "휴일은 다른 사람들과 같이 지내는 게 좋다.",
        "휴일은 혼자 보내는게 좋다.",
      ],
      [
        "생각을 자연스럽게 나눌 때 브레인스토밍이 가장 잘 된다.",
        "논제를 미리 알려주었을때 브레인스토밍이 가장 잘 된다.",
      ],
      ["어딜 가든 친구를 사귄다.", "진정한 친구가 몇 안된다."],
    ],
    choose: ["E", "I"],
  },

  // s n
  // page : 4 - 6 index : 1
  one: {
    select: [
      ["숲보다는 나무에 집중한다.", "나무보다는 숲에 집중한다."],

      [
        "오감에 의존하며 실존 정보, 기록, 자신의 경험 위주에 의존하여 판단을 내린다.",
        "아이디어, 직관, 영감에 의존해서 판단을 내린다.",
      ],
      [
        "몇 분동안 아무 생각 하지 않을 수 있다.",
        "아무 생각을 하지 않는 것이 어렵다.",
      ],
    ],
    choose: ["S", "N"],
  },
  // t f
  // page : 7 - 9 index : 2
  two: {
    select: [
      [
        "객관적으로 사실을 판단한다.",
        "상황적, 포괄적이며 주변 상황을 고려하여 판단한다.",
      ],

      ["과정보다 결과에 초점을 맞춘다.", "결과보다 과정에 초점을 맞춘다."],
      [
        "고민상담을 할 때 주로 실질적인 해결책을 제시해주는 편이다.",
        "고민상담을 할 때 주로 정서적인 지지와 공감을 해주는 편이다.",
      ],
    ],
    choose: ["T", "F"],
  },
  // p j
  // page : 10 - 12 index : 3
  three: {
    select: [
      ["유동적인 목적과 방향을 선호한다.", "분명한 목적과 방향을 선호한다."],

      [
        "반복되는 일상을 지겨워 한다.",
        "반복되는 일상이 깨지면 스트레스를 받는다.",
      ],
      ["당일 약속이 싫지 않다.", "당일 약속이 싫다."],
    ],

    choose: ["P", "J"],
  },
};
// testListArr[0~3].select[0 ~ 2][0 ~ 1]
// testListArr[0~3].choose[0 ~ 1]
// testListArr[0~3].result
const testListArr = [testList.zero, testList.one, testList.two, testList.three];

indexSet();
let index2 = 0;
option1.innerText = testListArr[index].select[index2][0];
option2.innerText = testListArr[index].select[index2][1];

// test start
function showChoose() {
  introContainer.classList.add(HIDDEN_KEY); // hidden 추가

  //  hidden 제거
  title.classList.remove(HIDDEN_KEY);
  selectBox.classList.remove(HIDDEN_KEY);
  paging.classList.remove(HIDDEN_KEY);
  goMain.classList.remove(HIDDEN_KEY);
}
introImg.addEventListener("click", showChoose);

// check가 하나만 되게 && button을 클릭하면 색상 orange로 바뀌게
function check(event) {
  event.target.classList.toggle(CHECK_KEY);

  const thisButtonId = event.target.id;
  if (thisButtonId === "option-con1") {
    option2.classList.remove(CHECK_KEY);
  } else {
    option1.classList.remove(CHECK_KEY);
  }

  if (
    option1.classList.contains(CHECK_KEY) ||
    option2.classList.contains(CHECK_KEY)
  ) {
    after.disabled = false;
  }

  if (
    !(
      option1.classList.contains(CHECK_KEY) ||
      option2.classList.contains(CHECK_KEY)
    )
  ) {
    after.disabled = true;
  }
  if (page === 12) {
    after.disabled = true;
  }

  if (
    page === 12 &&
    (option1.classList.contains(CHECK_KEY) ||
      option2.classList.contains(CHECK_KEY))
  ) {
    printResult.classList.remove(HIDDEN_KEY);
  }
}

option1.addEventListener("click", check);
option2.addEventListener("click", check);

// --------------------------------------------------------
// 1, 12에서 더 극단적인 숫자로 못가게 disabled설정 함수
// 이전으로 넘어갈 때 결과 배열에서 맨 뒤의 요소 pop,
// 이후로 넘어갈 때 결과 배열에서 맨 뒤에 결과 추가
function disabledSet() {
  if (page === 1) {
    before.disabled = true;
  } else if (page === 12) {
    after.disabled = true;
    // 결과보기 button 생성
  } else {
    printResult.classList.add(HIDDEN_KEY);
    before.disabled = false;
    after.disabled = false;
  }
  pageCount.innerText = `${page} / 12`;
}

// 페이지 +1 함수
function pagePlus() {
  after.disabled = false;
  const newAnswer = document.querySelector(".check").value;
  totalArr.push(newAnswer);
  console.log(totalArr);
  page++;
  disabledSet();
  indexSet();
  if (index2 === 2) {
    index2 = 0;
  } else {
    index2++;
  }

  option1.innerText = testListArr[index].select[index2][0];
  option2.innerText = testListArr[index].select[index2][1];
  option1.classList.remove(CHECK_KEY);
  option2.classList.remove(CHECK_KEY);
  after.disabled = true;
}

// 페이지가 -1 함수
function pageMinus() {
  option1.classList.remove(CHECK_KEY);
  option2.classList.remove(CHECK_KEY);
  totalArr.pop();
  console.log(totalArr);
  page--;
  disabledSet();
  indexSet();
  if (index2 === 0) {
    index2 = 2;
  } else {
    index2--;
  }
  option1.innerText = testListArr[index].select[index2][0];
  option2.innerText = testListArr[index].select[index2][1];
  after.disabled = true;
}

// before클릭하면 page 숫자 -1
before.addEventListener("click", pageMinus);

// after 클릭하면 page 숫자 +1
after.addEventListener("click", pagePlus);

goMain.addEventListener("click", function reload() {
  // 새로고침
  location.reload();
});

// testListArr의 index set 함수
function indexSet() {
  if (page % 3 === 0) {
    index = parseInt(page / 3) - 1;
  } else {
    index = parseInt(page / 3);
  }
}

let finalResultString = "";
function finalResult() {
  const newAnswer = document.querySelector(".check").value;
  totalArr.push(newAnswer);
  console.log(totalArr);

  let finalIndex = 0;
  for (let i = 0; i < totalArr.length / 3; i++) {
    let middleResult = 0;
    for (let j = 0; j < 3; j++) {
      middleResult += Number(totalArr[finalIndex++]);
    }

    // middleresult >= 2 -> choose[1]
    if (middleResult >= 2) {
      finalResultString += `${testListArr[i].choose[1]}`;
    } else {
      finalResultString += `${testListArr[i].choose[0]}`;
    }
  }
  document.querySelector("#a1").classList.add(HIDDEN_KEY);
  document.querySelector(
    "#a2 p"
  ).innerText = `귀하의 mbti는 ${finalResultString}입니다.`;
  document.querySelector("#a2").classList.remove(HIDDEN_KEY);
  console.log(finalResultString);
}

printResult.addEventListener("click", finalResult);
