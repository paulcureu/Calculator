document.addEventListener('DOMContentLoaded', () => {
    const output = document.querySelector('.output');
    const buttons = document.querySelectorAll('.btn, .btn-rectangular, .equal-button');

    let currentInput = '';
    let previousInput = '';
    let operator = null;

    buttons.forEach(button => {
        button.addEventListener('click', () => {
            const buttonText = button.textContent;

            switch (buttonText) {
                case 'AC':
                    currentInput = '';
                    previousInput = '';
                    operator = null;
                    output.textContent = '0';
                    break;
                case '+/-':
                    currentInput = currentInput.charAt(0) === '-' ? currentInput.slice(1) : `-${currentInput}`;
                    output.textContent = currentInput;
                    break;
                case '%':
                    currentInput = (parseFloat(currentInput) / 100).toString();
                    output.textContent = currentInput;
                    break;
                case '÷':
                case 'x':
                case '-':
                case '+':
                    if (currentInput === '') return;

                    if (previousInput !== '') {
                        previousInput = calculate(previousInput, currentInput, operator);
                        output.textContent = previousInput;
                    } else {
                        previousInput = currentInput;
                    }

                    currentInput = '';
                    operator = buttonText;
                    break;
                case '=':
                    if (currentInput === '' || previousInput === '' || operator === null) return;

                    currentInput = calculate(previousInput, currentInput, operator);
                    output.textContent = currentInput;

                    previousInput = '';
                    operator = null;
                    break;
                case ',':
                    if (!currentInput.includes('.')) {
                        currentInput += '.';
                        output.textContent = currentInput;
                    }
                    break;
                default:
                    if (currentInput === '0') {
                        currentInput = buttonText;
                    } else {
                        currentInput += buttonText;
                    }
                    output.textContent = currentInput;
                    break;
            }
        });
    });

    function calculate(a, b, operator) {
        const num1 = parseFloat(a);
        const num2 = parseFloat(b);

        if (isNaN(num1) || isNaN(num2)) return '';

        switch (operator) {
            case '÷':
                return (num1 / num2).toString();
            case 'x':
                return (num1 * num2).toString();
            case '-':
                return (num1 - num2).toString();
            case '+':
                return (num1 + num2).toString();
            default:
                return '';
        }
    }
});