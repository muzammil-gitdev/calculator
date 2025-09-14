const historyEl = document.getElementById("history");
const resultEl = document.getElementById("result");
const buttons = document.querySelectorAll(".btn");
const toggle = document.getElementById("theme-toggle");

let currentInput = "";
let historyInput = "";

buttons.forEach(button => {
  button.addEventListener("click", () => {
    const action = button.dataset.action;

    if (!isNaN(action) || action === ".") {
      currentInput += action;
      resultEl.textContent = currentInput || "0";
    } else if (["+", "-", "*", "/"].includes(action)) {
      if (currentInput === "" && historyInput === "") return;
      historyInput += currentInput + " " + action + " ";
      historyEl.textContent = historyInput;
      currentInput = "";
      resultEl.textContent = "0";
    } else if (action === "clear") {
      currentInput = "";
      historyInput = "";
      historyEl.textContent = "";
      resultEl.textContent = "0";
    } else if (action === "invert") {
      if (currentInput) {
        currentInput = (parseFloat(currentInput) * -1).toString();
        resultEl.textContent = currentInput;
      }
    } else if (action === "percent") {
      if (currentInput) {
        currentInput = (parseFloat(currentInput) / 100).toString();
        resultEl.textContent = currentInput;
      }
    } else if (action === "backspace") {
      currentInput = currentInput.slice(0, -1);
      resultEl.textContent = currentInput || "0";
    } else if (action === "=") {
      if (currentInput === "" && historyInput === "") return;

      historyInput += currentInput;
      try {
        const expression = historyInput.replace(/÷/g, "/").replace(/×/g, "*");
        const result = eval(expression);

        if (!isFinite(result)) {
          resultEl.textContent = "Error";
        } else {
          resultEl.textContent = result;
        }
      } catch {
        resultEl.textContent = "Error";
      }
      historyEl.textContent = historyInput;
      historyInput = "";
      currentInput = "";
    }
  });
});

// Theme toggle
toggle.addEventListener("change", () => {
  document.body.classList.toggle("light");
});
