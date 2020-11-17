const dp = document.getElementById("displayResult")

const wings = document.getElementById("wings")
const form = document.getElementById("form")

const calculate = () => {
  if (!dp.value) return "";
  try {
    const result = eval(dp.value)

    // this checks if the calculate function has already run (by checking if there are x amounts of children in the wing div) because it is invoked once by pressing on = and another time because the form is submitted; prevents from showinig twice the amounts of wings
    // TODO: improve this and add a clear function
    if (wings.childNodes.length === result) return result
    for (let i = 0; i < result; i++) {
      const image = document.createElement("img")
      image.src = "chickenwing/1.png"
      image.classList.add("result-wing")
      wings.appendChild(image)
    }
    return result;
  } catch (ex) {
    console.error(ex);
    return "";
  }
}

const operators = ["+", "-", "*", "/", "."];

// this binds the onclick event listener to all buttons instead of doing it manually for each button over at index.html
document.querySelectorAll("button").forEach(elem => {
  elem.addEventListener("click", e => {
    let current = dp.value;
    let val = elem.value;

    // do not allow two operators in a row
    if (dp.value && operators.includes(dp.value.slice(-1)) && operators.includes(val))
      current = current.slice(0, -1); // remove previous operator

    dp.value = val == "=" ? calculate() : current + val;
  });
});

// handling submit allows us to catch the Enter key
document.getElementById("form").addEventListener("submit", e => {
  e.preventDefault();
  console.log("hit")
  dp.value = calculate();
});