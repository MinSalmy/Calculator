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
let changeableButtons = document.querySelector(".buttons").querySelectorAll("#changeable");
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
mainButtons.forEach(button => { button.addEventListener('click', () => reactMainButtons(button.dataset.key)) });
window.addEventListener('keydown', function(e){
  console.log(e);
  //mainBoardEntered(e);
  reactMainButtons(e.code);
});

//отклик на 0-9 смену знака и точку на клавиатуре и по нажатию
function reactMainButtons(key) {
  //console.log(key);
  if (key === "sign") displayNumber.innerHTML = -Number(displayNumber.innerHTML);  
  if (displayNumber.innerHTML.length > 17) exit;
  if (key.includes("Digit")) displayNumber.innerHTML += key.slice(5);
  else if (key.includes("Numpad") && !key === "NumpadDecimal") displayNumber.innerHTML += key.slice(6);
  else if (key === "NumpadDecimal" && !displayNumber.innerHTML.includes('.')) displayNumber.innerHTML += '.';   
}