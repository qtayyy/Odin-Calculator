let	buttonArr = Array.from(document.querySelectorAll(".btn"));
let	zeroButton = document.querySelector(".zero-btn");
let	display = document.querySelector(".display");

const	OPERATORS = "+-*/";
let	displayed = "0";
let	stored = "";
let	currOperator = "";

function handleOperation()
{
	if (displayed === "0" && stored === "")
		return ("0");
	if (stored === "")
		return (displayed);
	switch (currOperator)
	{
		case "+":
		{
			return (Number(stored) + Number(displayed));
		}
		case "-":
		{
			return (Number(stored) - Number(displayed));
		}
		case "*":
		{
			return (Number(stored) * Number(displayed));
		}
		case "/":
		{
			if (Number(displayed) === 0)
				return "Noob";
			return (Number(stored) / Number(displayed));
		}
	}
}

function handleOperands(currVal)
{
	if (currOperator === "")
	{
		if (displayed === "0")
		{
			if (currVal === ".")
				displayed = "0."
			else if (currVal !== "0")
				displayed = currVal;
		}	
		else
		{
			if (currVal === "." && displayed.includes("."))
			{
				return;
			}		
			displayed += currVal;
		}	
	}
	else
	{
		if (stored === "")
		{
			stored = displayed;
			if (currVal === ".")
				displayed = "0."
			else
				displayed = currVal;
		}
		else
		{
			if (currVal === "." && displayed.includes("."))
				return;
			displayed += currVal;
		}	
	}
}

buttonArr.forEach(button => {
	button.addEventListener("click", (e) => {
		const	val = String(e.target.textContent);

		switch (val)
		{
			case "AC":
			{
				displayed = "0";
				saved = "";
				currOperator = "";
				break;
			}	
			case "DEL":
			{
				displayed = displayed.substring(0, displayed.length - 1);
				if (displayed.length == 0)
					displayed = "0";
				break;
			}
			case "%":
			{	
				displayed = displayed / 100;
				break;
			}
			case "=":
			{
				displayed = String(handleOperation());
				currOperator = "";
				stored = "";
				break;
			}
			default:
			{
				if (OPERATORS.includes(val))
				{
					if (currOperator !== "")
					{
						displayed = String(handleOperation());
						currOperator = "";
						stored = "";
					}
					currOperator = val;
				}
				else
					handleOperands(val);
			}
		}
		if (displayed.length > 10)
			displayed = displayed.substring(0, 10);
		display.textContent = displayed;
	})
});

zeroButton.addEventListener("click", (e) => {
	const	val = String(e.target.textContent);
	handleOperands(val);
	if (displayed.length > 10)
		displayed = displayed.substring(0, 10);
	display.textContent = displayed;
})
