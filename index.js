

function App() {
  const [displayValue, setDisplayValue] = React.useState("");

  
  const handleClick = (e) => {
    const value = e.target.innerText;

    if (value === "AC") {
        setDisplayValue("0");
        return;
    } 

    if (value === "=") {
        calculate();
        return;
    }

    if (displayValue === "0" && !(".".includes(value))) {
        setDisplayValue(value);
        return;
    }

    if (value === ".") {
      const numbers = displayValue.split(/[\+\-\x\/]/);
      const currentNumber = numbers[numbers.length - 1];
      if (currentNumber.includes('.')) {
          return;
      }
    }

    const lastChar = displayValue.slice(-1);
    const lastTwoChars = displayValue.slice(-2);

    // Si el valor entrante es `-` y los últimos dos caracteres son `--`, entonces no añadirlo
    if (value === "-" && lastTwoChars === "--") {
        return;
    }

    // Lógica para otros operadores...
    if (["/", "x", "+"].includes(value)) {
        let tempValue = displayValue;
        while (["/", "x", "+", "-"].includes(tempValue.slice(-1))) {
            tempValue = tempValue.slice(0, -1);
        }
        setDisplayValue(tempValue + value);
        return;
    }

    setDisplayValue(prevValue => prevValue + value);
};



const calculate = () => {
  let result = displayValue;

  // Transformar x en * para la operación de multiplicación
  result = result.replace(/x/g, '*');

  // Transformar -- en + 
  result = result.replace(/--/g, '+');

  // Usa eval() para calcular el resultado
  try {
      let calculatedValue = eval(result);

      // Redondea el valor a un decimal y convierte de nuevo a número
      let roundedValue = parseFloat(calculatedValue.toFixed(4));

      setDisplayValue(roundedValue.toString());
  } catch (error) {
      setDisplayValue("NAN");
  }
}


  const buttons = [
    { id: "clear", class: "padButton", value: "AC" },
    { id: "divide", class: "padButton op", value: "/" },
    { id: "multiply", class: "padButton op", value: "x" },
    { id: "seven", class: "padButton num", value: "7" },
    { id: "eight", class: "padButton num", value: "8" },
    { id: "nine", class: "padButton num", value: "9" },
    { id: "subtract", class: "padButton op", value: "-" },
    { id: "four", class: "padButton num", value: "4" },
    { id: "five", class: "padButton num", value: "5" },
    { id: "six", class: "padButton num", value: "6" },
    { id: "add", class: "padButton op", value: "+" },
    { id: "one", class: "padButton num", value: "1" },
    { id: "two", class: "padButton num", value: "2" },
    { id: "three", class: "padButton num", value: "3" },
    { id: "equals", class: "padButton", value: "=" },
    { id: "zero", class: "padButton num", value: "0" },
    { id: "decimal", class: "padButton num", value: "." }
  ];

  return (
    <div className="contenedor">
      <h2>Calculadora FCC</h2>
      <div className="calculadora">
        <div id="display">{displayValue}</div>
        <div className="botones">
        {buttons.map(button => (
          <div
            key={button.id}
            id={button.id}
            className={button.class}
            onClick={handleClick}
          >
            {button.value}
          </div>
        ))}
        </div>
      </div>
      <div className="derechos">
        <p>Diseñado y Desarrollado por:</p>
        <a 
        href="https://jpdev.site"
        target="_blank" 
        rel="noopener noreferrer">
          <img className="logo" src="https://i.ibb.co/khRv85Y/logo2.png" alt="logo" border="0" />
        </a>
      </div>
    </div>
  );
}

const rootElement = document.getElementById("app");
const appRoot = ReactDOM.createRoot(rootElement);
appRoot.render(<App />);

