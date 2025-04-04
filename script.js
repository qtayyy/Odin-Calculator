let	buttonArr = Array.from(document.querySelectorAll(".btn"));
let	zeroButton = document.querySelector(".zero-btn");
let	display = document.querySelector(".display");

const	OPERATORS = "+-*/";
let		saved;
let		currOperator = "";

function handleOperation()
{
	switch (currOperator)
	{
		case "+":
		{
			return (Number(saved) + Number(display.textContent));
		}
		case "-":
		{
			return (Number(saved) - Number(display.textContent));
		}
		case "*":
		{
			return (Number(saved) * Number(display.textContent));
		}
		case "/":
		{
			return (Number(saved) / Number(display.textContent));
		}
	}
}

function handleOperands(currVal)
{
	if (display.textContent != 0 && currOperator != "")
	{
		saved = display.textContent;
		display.textContent = currVal;
	}
	else if (display.textContent != 0 && currOperator == "")
		display.textContent += currVal;
	else
		display.textContent = currVal;	
}

buttonArr.forEach(button => {
	button.addEventListener("click", (e) => {
		const	val = e.target.textContent;

		switch (val)
		{
			case "AC":
			{
				display.textContent = 0;
				saved = "";
				currOperator = "";
				break;
			}	
			case "DEL":
			{
				display.textContent = display.textContent.substring(0, display.textContent.length - 1);
				if (display.textContent.length == 0)
					display.textContent = 0;
				break;
			}
			case "%":
			{	
				display.textContent = display.textContent / 100;
				break;
			}
			case "=":
			{
				display.textContent = handleOperation();
				currOperator = "";
				break;
			}
			default:
			{
				if (OPERATORS.includes(val))
				{
					if (currOperator != "")
					{
						display.textContent = handleOperation();
					}
					currOperator = val;
				}
				else
					handleOperands(val);
			}
		}
	})
});

zeroButton.addEventListener("click", (e) => {
	const	val = e.target.textContent;

	if (display.textContent != 0)	
		display.textContent += val;
	else
		display.textContent = val;	
})
