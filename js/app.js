const billInput = document.getElementById('bill');
const tipButtons = document.querySelectorAll('.tip-options button');
const peopleInput = document.getElementById('people');
const tipAmountDisplay = document.getElementById('tip-amount');
const totalAmountDisplay = document.getElementById('total');
const resetBtn = document.getElementById('reset-btn');

let billValue = 0;
let tipValue = 0;
let peopleValue = 0;
let isCustomTip = false;

const customTipBtn = document.getElementById('custom-tip-btn');
const customTipContainer = document.getElementById('custom-tip-container');
const customTipInput = document.getElementById('custom-tip');

billInput.addEventListener('input', (e) => {
    billValue = parseFloat(e.target.value) || 0;
    checkAndCalculate();
});

tipButtons.forEach(button => {
    button.addEventListener('click', () => {
        const tipText = button.textContent;
        tipValue = parseFloat(tipText) / 100 || 0;
        isCustomTip = false;
        customTipContainer.style.display = 'none';
        customTipInput.value = '';
        checkAndCalculate();
    });
});

customTipBtn.addEventListener('click', () => {
    customTipContainer.style.display = customTipContainer.style.display === 'none' ? 'block' : 'none';

    if (customTipContainer.style.display === 'none') {
        customTipInput.value = '';
    }
});

customTipInput.addEventListener('input', () => {
    let customTipValue = parseFloat(customTipInput.value) || 0;
    tipValue = customTipValue / 100;
    isCustomTip = true;
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

resetBtn.addEventListener('click', (e) => {
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
