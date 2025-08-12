let expressionDisplay = document.getElementById("expression");
let resultDisplay = document.getElementById("result");

let expression = "";
let lastAnswer = "";

document.querySelectorAll("button").forEach(button => {
    button.addEventListener("click", () => {
        let value = button.textContent;

        if (value === "clear") {
            expression = "";
            resultDisplay.textContent = "";
        } 
        else if (value === "del") {
            expression = expression.slice(0, -1);
        }
        else if (value === "ENTER") {
            try {
                let exp = expression.replace(/x/g, "*").replace(/÷/g, "/").replace(/√/g, "Math.sqrt");
                let result = eval(exp);
                resultDisplay.textContent = result;
                lastAnswer = result;
            } catch {
                resultDisplay.textContent = "Error";
            }
        }
        else if (value === "ans") {
            expression += lastAnswer;
        }
        else if (value === "±") {
            if (expression) {
                if (expression.startsWith("-")) {
                    expression = expression.substring(1);
                } else {
                    expression = "-" + expression;
                }
            }
        }
        else {
            expression += value;
        }

        expressionDisplay.textContent = expression;
    });
});
