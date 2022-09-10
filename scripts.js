/* When the user clicks on the button,
toggle between hiding and showing the dropdown content */
function showTrigonometryMenu() {
    document.getElementById("buttonsDropdown").classList.toggle("show");
}

// Close the dropdown menu if the user clicks outside of it
window.onclick = function(event) {
  if (!event.target.matches('.button-dropTrigonometry') && 
  !event.target.matches('#buttonSwitchTrig') && 
  !event.target.matches('#buttonSwitchHyp')) {

    let dropdowns = document.getElementsByClassName("dropdown-content");
    for (let i = 0; i < dropdowns.length; i++) {
      let openDropdown = dropdowns[i];
      if (openDropdown.classList.contains('show')) {
        openDropdown.classList.remove('show');
      }        
    }
  }
}

//смена в окне тригонометрии кнопок на соответствуюшие выбранные
const blockFirstNormalButtons = document.getElementById("buttonsDropdown").querySelectorAll(".first.normal");//0
const blockFirstHypButtons = document.getElementById("buttonsDropdown").querySelectorAll(".first.hyperbolic");//1
const blockSecondNormalButtons = document.getElementById("buttonsDropdown").querySelectorAll(".second.normal");//2
const blockSecondHypButtons = document.getElementById("buttonsDropdown").querySelectorAll(".second.hyperbolic");//3
let trigSelected = false;//0
let hypSelected = false;//1

/* логика показа
0 0 - 0
0 1 - 1
1 0 - 2
1 1 - 3
*/

//показ обратных функций
function showReverseFunctions() {
  document.getElementById("buttonSwitchTrig").classList.toggle("selected");
  switchTrigonometry();
  trigSelected = !trigSelected;
  switchTrigonometry();
}

//показ гиперболических функций
function showHyperbolicFunctions() {
  document.getElementById("buttonSwitchHyp").classList.toggle("selected");
  switchTrigonometry();
  hypSelected = !hypSelected;
  switchTrigonometry();
}

function switchTrigonometry() {
  if (!trigSelected) {
    if (!hypSelected) blockFirstNormalButtons.forEach(button => {
      button.classList.toggle("invisible")
    });
    else blockFirstHypButtons.forEach(button => {
      button.classList.toggle("invisible")
    });
  }
  else {
    if (!hypSelected) blockSecondNormalButtons.forEach(button => {
      button.classList.toggle("invisible")
    });
    else blockSecondHypButtons.forEach(button => {
      button.classList.toggle("invisible")
    });
  }
}

//показ соответствующих кнопок при нажатии на 2nd
let changeableButtons = document.getElementById("board").querySelectorAll(".changeable");
console.log(document.getElementById("board").querySelectorAll(".changeable"))
console.log(changeableButtons);
function showAnotherFunctions() {
  document.getElementById("buttonSwitch").classList.toggle("selected");
  changeableButtons.forEach(button => {
    button.classList.toggle("invisible");
  });
}

const buttons = document.getElementsByClassName('buttons');
let mainButtons = document.querySelectorAll('#main');
let displayNumber = document.getElementById('number');
let displayExpression = document.getElementById('expression');
//console.log(displayNumber);
//console.log(displayExpression);

//changed display number when clicked
let shiftPressed = false;
mainButtons.forEach(button => { button.addEventListener('click', () => reactMainButtons(button.dataset.key)) });
window.addEventListener('keydown', function(e){
  console.log(e);
  //mainBoardEntered(e);
  shiftPressed = true;
  reactMainButtons(e.code);
  reactOtherButtons(e.code);

  shiftPressed = false;
});

//отклик на 0-9 смену знака и точку на клавиатуре и по нажатию
//исправить ввод большого количества чисел
function reactMainButtons(key) {
  //console.log(key);
  if (key === "sign") displayNumber.innerHTML = -Number(displayNumber.innerHTML);  
  if (displayNumber.innerHTML.length > 17) exit;
  if (key.includes("Digit")) { 
    displayNumber.innerHTML += key.slice(5); 
    displayNumber.innerHTML = Number(displayNumber.innerHTML);
  }
  else if (key.includes("Numpad") && !key === "NumpadDecimal") displayNumber.innerHTML += key.slice(6);
  else if (key === "NumpadDecimal" && !displayNumber.innerHTML.includes('.')) displayNumber.innerHTML += '.';   
}

let openBracketCount = 0;
//отклик на остальные функции
function reactOtherButtons(key) {
  //console.log(key);
  if (key === "Backspace") displayNumber.innerHTML = Number(displayNumber.innerHTML.slice(0, -1));
  if (key === "Digit9" && shiftPressed) leftBracketClicked();
  if (key === "Digit0" && shiftPressed) rightBracketClicked();
  if (key === "NumpadDivide" || key === "Backslash" && shiftPressed) divideClicked();
  if (key === "NumpadMultiply" || key === "Digit8" && shiftPressed) multiplyClicked();
  if (key === "NumpadSubtract" || key ===  "Minus") subtractClicked();
  if (key === "NumpadAdd" || key ===  "Equal" && shiftPressed) addClicked(); 
  if (key === "Equal" || key ===  "Enter" || key ===  "NumpadEnter") equalClicked(); 
}

function leftBracketClicked() {
  displayNumber.innerHTML = 0;
  displayExpression.innerHTML += "(";
  openBracketCount++;
  document.getElementById('leftbracket').innerHTML = "(" + `<sub>${openBracketCount}</sub>`;
}

function rightBracketClicked() {
  if (openBracketCount > 0){  
    if (displayExpression.innerHTML.slice(-1) === ")") displayExpression.innerHTML += ")";
    else displayExpression.innerHTML += displayNumber.innerHTML + ")";
    openBracketCount--;    
    if (openBracketCount === 0) document.getElementById('leftbracket').innerHTML = "(";
    else document.getElementById('leftbracket').innerHTML = "(" + `<sub>${openBracketCount}</sub>`;
  }
}

const OPERANDS = {"÷":"&divide;", "×":"&times;", "-":"-", "+":"+"};//["&divide;", "&times;", "-", "+"];
function divideClicked() {
  //if (displayExpression.innerHTML.slice(-1) !== "&divide;") displayExpression.innerHTML += displayNumber.innerHTML + '&divide;';
  console.log(displayExpression.innerHTML.slice(-1) in OPERANDS);
  if (!(displayExpression.innerHTML.slice(-1) in OPERANDS)) displayExpression.innerHTML += displayNumber.innerHTML + '&divide;';
  else displayExpression.innerHTML = displayExpression.innerHTML.slice(0, -1) + '&divide;';
}

function multiplyClicked() {
  console.log(displayExpression.innerHTML.slice(-1));
  //if (displayExpression.innerHTML.slice(-1) !== "&times;") displayExpression.innerHTML += displayNumber.innerHTML + '&times;'; 
  if (!(displayExpression.innerHTML.slice(-1) in OPERANDS)) displayExpression.innerHTML += displayNumber.innerHTML + '&times;';
  else displayExpression.innerHTML = displayExpression.innerHTML.slice(0, -1) + '&times;';
}

function subtractClicked() {
  //if (displayExpression.innerHTML.slice(-1) !== "-") displayExpression.innerHTML += displayNumber.innerHTML + '-';
  if (!(displayExpression.innerHTML.slice(-1) in OPERANDS)) displayExpression.innerHTML += displayNumber.innerHTML + '-';
  else displayExpression.innerHTML = displayExpression.innerHTML.slice(0, -1) + '-';
}

function addClicked() {
  //if (displayExpression.innerHTML.slice(-1) !== "-") displayExpression.innerHTML += displayNumber.innerHTML + '-';
  if (!(displayExpression.innerHTML.slice(-1) in OPERANDS)) displayExpression.innerHTML += displayNumber.innerHTML + '+';
  else displayExpression.innerHTML = displayExpression.innerHTML.slice(0, -1) + '+';
}

function equalClicked() {
  console.log(parseFloat((displayExpression.innerHTML + displayNumber.innerHTML).replaceAll("÷", "/").replaceAll("×", "*")));
  let result = eval((displayExpression.innerHTML + displayNumber.innerHTML).replaceAll("÷", "/").replaceAll("×", "*"));
  displayExpression.innerHTML += displayNumber.innerHTML + "="; 
  displayNumber.innerHTML = result;
}

displayNumber.addEventListener('input', () => {//не работает
  if (displayNumber.innerHTML !== "0") document.getElementById('clear').innerHTML = "CE";
});
let isDeg = true;
document.getElementById('deg').addEventListener('click', () => {
  isDeg = !isDeg;
  if (isDeg) document.getElementById('deg').innerHTML = "deg";
  else document.getElementById('deg').innerHTML = 'rad';
});
document.getElementById('pi').addEventListener('click', () => {
  displayNumber.innerHTML = Math.PI;
});
document.getElementById('clear').addEventListener('click', () => {
  displayNumber.innerHTML = "0";
  document.getElementById('clear').innerHTML = "C";
  displayExpression.innerHTML = "";
});
document.getElementById('backspace').addEventListener('click', () => {
  displayNumber.innerHTML = Number(displayNumber.innerHTML.slice(0, -1));
});
document.getElementById('sqr').addEventListener('click', () => {
  displayExpression.innerHTML += `sqr(${displayNumber.innerHTML})`;
  displayNumber.innerHTML = Math.pow(displayNumber.innerHTML, 2);
});
document.getElementById('cube').addEventListener('click', () => {
  displayExpression.innerHTML += `cube(${displayNumber.innerHTML})`;
  displayNumber.innerHTML = Math.pow(displayNumber.innerHTML, 3);
});
document.getElementById('1divX').addEventListener('click', () => {
  displayExpression.innerHTML += `1/(${displayNumber.innerHTML})`;
  displayNumber.innerHTML = 1/displayNumber.innerHTML;
});
document.getElementById('module').addEventListener('click', () => {
  displayExpression.innerHTML += `abs(${displayNumber.innerHTML})`;
  displayNumber.innerHTML = Math.abs(displayNumber.innerHTML);
});
document.getElementById('e').addEventListener('click', () => {
  displayExpression.innerHTML += `${Math.E}`;
  displayNumber.innerHTML = Math.E;  
});
//определиться с этим говном
document.getElementById('percent').addEventListener('click', () => {
  displayExpression.innerHTML += `${displayNumber.innerHTML}%`;
  displayNumber.innerHTML = displayNumber.innerHTML / 100;   
});
document.getElementById('squareroot').addEventListener('click', () => {
  displayExpression.innerHTML += `&radic;(${displayNumber.innerHTML})`;
  displayNumber.innerHTML = Math.sqrt(displayNumber.innerHTML);  
});
document.getElementById('cuberoot').addEventListener('click', () => {
  displayExpression.innerHTML += `&#8731;(${displayNumber.innerHTML})`;
  displayNumber.innerHTML = Math.cbrt(displayNumber.innerHTML);
});
document.getElementById('leftbracket').addEventListener('click', () => leftBracketClicked());
document.getElementById('rigthbracket').addEventListener('click', () => rightBracketClicked());
document.getElementById('factorial').addEventListener('click', () => {
  let result = 1;
  for (let i = 1; i <= displayNumber.innerHTML; i++) {
    result *= i;
  } 
  displayExpression.innerHTML = `fact(${displayNumber.innerHTML})`;
  displayNumber.innerHTML = result;
});
document.getElementById('divide').addEventListener('click', () => divideClicked());
document.getElementById('XpowerY').addEventListener('click', () => {
  displayExpression.innerHTML += `${displayNumber.innerHTML} ^`; 
});
document.getElementById('YrootX').addEventListener('click', () => {
  displayExpression.innerHTML += `${displayNumber.innerHTML} yroot `; 
});
document.getElementById('multiply').addEventListener('click', () => multiplyClicked());
document.getElementById('tenPowerX').addEventListener('click', () => {
  displayExpression.innerHTML += `10 ^(${displayNumber.innerHTML})`;
  displayNumber.innerHTML = Math.pow(10, displayNumber.innerHTML);
});
document.getElementById('twoPowerX').addEventListener('click', () => {
  displayExpression.innerHTML += `2 ^(${displayNumber.innerHTML})`;
  displayNumber.innerHTML = Math.pow(2, displayNumber.innerHTML);
});
document.getElementById('subtract').addEventListener('click', () => subtractClicked());
document.getElementById('log').addEventListener('click', () => {
  displayExpression.innerHTML += `log(${displayNumber.innerHTML})`;
  displayNumber.innerHTML = Math.log10(displayNumber.innerHTML);
});
document.getElementById('logXbyY').addEventListener('click', () => {
  displayExpression.innerHTML += `${displayNumber.innerHTML} log base `;
});
document.getElementById('add').addEventListener('click', () => addClicked());
document.getElementById('ln').addEventListener('click', () => {
  displayExpression.innerHTML += `ln(${displayNumber.innerHTML})`;
  displayNumber.innerHTML = Math.log(displayNumber.innerHTML);
});
document.getElementById('ePowerX').addEventListener('click', () => {
  displayExpression.innerHTML += `e ^(${displayNumber.innerHTML})`;
  displayNumber.innerHTML = Math.pow(Math.E, displayNumber.innerHTML);
});
document.getElementById('equal').addEventListener('click', () => equalClicked());
//trigonometry
document.getElementById('').addEventListener('click', () => {

});
