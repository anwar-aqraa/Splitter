const billInput = document.getElementById('bill');
const tipButtons = document.querySelectorAll('.tip-options button');
const peopleInput = document.getElementById('people');
const tipAmountDisplay = document.getElementById('tip-amount');
const totalAmountDisplay = document.getElementById('total');
const resetBtn = document.getElementById('reset-btn');

let billValue = 0;
let tipValue = 0;
let peopleValue = 0;

const customTipBtn = document.getElementById('custom-tip-btn');
const customTipContainer = document.getElementById('custom-tip-container');
const customTipInput = document.getElementById('custom-tip');


function validateInput(inputId, errorId, maxValue = null) {
    const input = document.getElementById(inputId);
    const errorMessage = document.getElementById(errorId);

    input.addEventListener('input', () => {
        if (input.value < 0) {
            errorMessage.textContent = 'Negative values are not allowed!';
            errorMessage.style.display = 'block';
            input.value = '';
        } else if (maxValue !== null && input.value > maxValue) {
            errorMessage.textContent = `Value cannot exceed ${maxValue}!`;
            errorMessage.style.display = 'block';
            input.value = '';
        } else {
            errorMessage.style.display = 'none';
        }
    });
}

validateInput('bill', 'bill-error');
validateInput('custom-tip', 'custom-tip-error', 100);
validateInput('people', 'people-error');


billInput.addEventListener('input', (e) => {
    billValue = parseFloat(e.target.value) || 0;
    checkAndCalculate();
});

tipButtons.forEach(button => {
    button.addEventListener('click', () => {
        const tipText = button.textContent;
        tipValue = parseFloat(tipText) / 100 || 0;
        customTipContainer.style.display = 'none';
        customTipInput.value = '';
        checkAndCalculate();
    });
});


customTipBtn.addEventListener('click', () => {
    document.getElementById('custom-tip-container').style.display = 'block';
});

customTipInput.addEventListener('input', () => {
    let customTipValue = parseFloat(customTipInput.value) || 0;
    tipValue = customTipValue / 100;
    checkAndCalculate();
});


peopleInput.addEventListener('input', (e) => {
    const value = parseInt(e.target.value);
    peopleValue = (isFinite(value) && value > 0) ? value : 0;
    checkAndCalculate();
});

function checkAndCalculate() {
    if (billValue > 0 && tipValue > 0 && peopleValue > 0) {
        const tipAmount = (billValue * tipValue) / peopleValue;
        tipAmountDisplay.textContent = `$${tipAmount.toFixed(2)}`;

        const totalAmount = (billValue + (billValue * tipValue)) / peopleValue;
        totalAmountDisplay.textContent = `$${totalAmount.toFixed(2)}`;
    } else {
        tipAmountDisplay.textContent = '$0.00';
        totalAmountDisplay.textContent = '$0.00';
    }
}

resetBtn.addEventListener('click', () => {
    billInput.value = '';
    peopleInput.value = '';

    tipAmountDisplay.textContent = '$0.00';
    totalAmountDisplay.textContent = '$0.00';
    customTipInput.value = '';

    billValue = 0;
    tipValue = 0;
    peopleValue = 0;
    customTipContainer.style.display = 'none';
});