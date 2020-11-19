const dp = document.getElementById("displayResult")
const limitResultWings = 10000
const wings = document.getElementById("wings")
const form = document.getElementById("form")

document.addEventListener("keydown", function (event) {
  if (event.keyCode === 13) {
    document.getElementById("equalsb").click()
  }
})


function calculate() {
  if (!dp.value) return "";
  toEval = dp.value
  toEval = toEval.replace("\^", "**") // do exponentiation and not the bitwise operation. Escape needed because it is regex
  console.log(toEval)
  try {
    const result = eval(toEval)
    executeAsync(function() {
      addWingImgs(result)
    })
    return result
  } catch (ex) {
    console.error(ex)
    return "ERR"
  }
}

function addWingImgs(result) {
  // this checks if the calculate function has already run (by checking if there are x amounts of children in the wing div) because it is invoked once by pressing on = and another time because the form is submitted; prevents from showing twice the amounts of wings
  if (wings.childNodes.length === result) {
    return
  } else if (result > limitResultWings && wings.childNodes.length + 1 === result) { // to check if the limit had been reached. The one is added because the span element is added
    return
  } else {
    wings.textContent = ""
  }
  for (let i = 1; i <= result; i++) {
    if (i > limitResultWings) {
      const limitText = document.createElement("span")
      let wingsLeft = (result - limitResultWings)
      limitText.innerText = wingsLeft == 1 ? `and ${wingsLeft} more chicken wing` : `and ${wingsLeft} more chicken wings`
      wings.appendChild(limitText)
      break;
    }
    const image = document.createElement("img")
    image.src = "chickenwing/1.png"
    image.classList.add("result-wing")
    image.classList.add("noSelect")
    wings.appendChild(image)
  }
}

const operators = ["+", "-", "*", "/", ".", "^"];

// this binds the onclick event listener to all buttons instead of doing it manually for each button over at index.html
document.querySelectorAll("button").forEach(elem => {
  elem.addEventListener("click", e => {
    let val = elem.value;
    // TODO: do not allow two decimal points in one number
    // do not allow two operators in a row
    if (dp.value && operators.includes(dp.value.slice(-1)) && operators.includes(val)) {
      dp.value = dp.value.slice(0, -1) // remove previous operator
    }
    if (elem.value == "clear") {
      dp.value = ""
      document.getElementById("wings").innerText = ""
      return
    }
    if (elem.value == "delete") {
      dp.value = dp.value.slice(0, -1)
      return
    }
    dp.value = val == "=" ? calculate() : dp.value + val
  });
});

// handling submit allows us to catch the Enter key
document.getElementById("form").addEventListener("submit", e => {
  e.preventDefault();
  console.log("calculating...")
  dp.value = calculate();
  console.log("calculated!")
});





//from w3schools: https://www.w3schools.com/howto/howto_js_draggable.asp

// Make the DIV element draggable:
dragElement(document.getElementById("container"));

function dragElement(elmnt) {
  var pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;
  if (document.getElementById(elmnt.id + "Header")) {
    // if present, the header is where you move the DIV from:
    document.getElementById(elmnt.id + "Header").onmousedown = dragMouseDown;
  } else {
    // otherwise, move the DIV from anywhere inside the DIV:
    elmnt.onmousedown = dragMouseDown;
  }

  function dragMouseDown(e) {
    e = e || window.event;
    e.preventDefault();
    // get the mouse cursor position at startup:
    pos3 = e.clientX;
    pos4 = e.clientY;
    document.onmouseup = closeDragElement;
    // call a function whenever the cursor moves:
    document.onmousemove = elementDrag;
  }

  function elementDrag(e) {
    e = e || window.event;
    e.preventDefault();
    // calculate the new cursor position:
    pos1 = pos3 - e.clientX;
    pos2 = pos4 - e.clientY;
    pos3 = e.clientX;
    pos4 = e.clientY;
    // set the element's new position:
    elmnt.style.top = (elmnt.offsetTop - pos2) + "px";
    elmnt.style.left = (elmnt.offsetLeft - pos1) + "px";
  }

  function closeDragElement() {
    // stop moving when mouse button is released:
    document.onmouseup = null;
    document.onmousemove = null;
  }
}

function executeAsync(func) {
    setTimeout(func, 0);
}