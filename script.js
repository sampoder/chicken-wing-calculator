const dp = document.getElementById("displayResult")

const calculate = () => {
  if (!dp.value) return "";
  try {
    return eval(dp.value);
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
document.getElementById("form").addEventListener("submit",  e => {
  e.preventDefault();
  console.log("hit")
  dp.value = calculate();
});