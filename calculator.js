const billInput = document.querySelector('#bill');
const pplNmbrInput = document.querySelector('#pplNmbr');
const percentButtons = document.querySelectorAll('.percentage button');
const customPercent = document.querySelector('#custom');
const resetBtn = document.querySelector('#reset');

const totalTPP = document.querySelector('#totaltpp');
const totalPP = document.querySelector('#totalpp');

const billSpan = document.querySelector('#B span');
const peopleSpan = document.querySelector('#N span');
const tipSpan = document.querySelector('.tip-option span');

let percent;

percentButtons.forEach(element => {
    element.addEventListener('click', () => {
        removeClasses(percentButtons);
        element.className = 'active';
        percent = parseInt(element.id) / 100;
        tipSpan.textContent = '';


        totalTPP.textContent = `$${calculateTip(billInput.value, pplNmbrInput.value, percent)}`;
        totalPP.textContent = `$${calculateBillTip(billInput.value, pplNmbrInput.value, percent)}`;
    })
})



billInput.addEventListener('input', () => {
    if (billInput.validity.valid) {
        billSpan.textContent = '';
        totalTPP.textContent = `$${calculateTip(billInput.value, pplNmbrInput.value, percent)}`;
        totalPP.textContent = `$${calculateBillTip(billInput.value, pplNmbrInput.value, percent)}`;
    } else if (!billInput.validity.rangeOverflow) {
        billSpan.textContent = 'Can\'t be zero!';  
        totalTPP.textContent = '$0.00';
        totalPP.textContent = '$0.00';
    } 
})

pplNmbrInput.addEventListener('input', () => {
    if (pplNmbrInput.validity.valid) {
        peopleSpan.textContent = '';
        totalTPP.textContent = `$${calculateTip(billInput.value, pplNmbrInput.value, percent)}`;
        totalPP.textContent = `$${calculateBillTip(billInput.value, pplNmbrInput.value, percent)}`;
    } else if (!pplNmbrInput.validity.rangeOverflow) {
        peopleSpan.textContent = 'Can\'t be zero!';
        totalTPP.textContent = '$0.00';
        totalPP.textContent = '$0.00';
    }
});

customPercent.addEventListener('input', () => {
    removeClasses(percentButtons);

    if (customPercent.validity.valid) {
        tipSpan.textContent = '';
        if (customPercent.value === '') {
            percent = 0;
            tipSpan.textContent = 'Select tip option or input custom value!';
        } else {
            percent = parseFloat(parseFloat(customPercent.value).toFixed(2) / 100).toFixed(4);
        }

        totalTPP.textContent = `$${calculateTip(billInput.value, pplNmbrInput.value, percent)}`;
        totalPP.textContent = `$${calculateBillTip(billInput.value, pplNmbrInput.value, percent)}`;
    } else if (!customPercent.validity.rangeOverflow) {
        tipSpan.textContent = 'Select tip option or input custom value!';
    }
})

resetBtn.addEventListener('click', () => {
    billInput.value = '';
    pplNmbrInput.value = '';
    removeClasses(percentButtons);
    customPercent.value = '';
    totalTPP.textContent = '$0.00';
    totalPP.textContent = '$0.00';
})

function removeClasses(array) {
    array.forEach(element => {
        element.className = '';
    })
}

function calculateBill(b, n) {
    if (b === '' || n === '') {
        return '0.00'
    } else {
        return parseFloat(parseFloat(b) / parseInt(n)).toFixed(2);
    }
}

function calculateTip(b, n, p) {
    if (b === '' || n === '') {
        return '0.00'
    } else {
        if (p !== undefined) {
            return parseFloat(calculateBill(b, n) * p).toFixed(2);
        } else {
            return parseFloat(calculateBill(b, n)).toFixed(2);
        }
        
    }
}

function calculateBillTip(b, n, p) {
    if (b === '' || n === '') {
        return '0.00'
    } else {
        if (p === 0 || p === undefined) {
            return parseFloat(parseFloat(calculateBill(b , n))).toFixed(2);
        } else {
            return parseFloat(parseFloat(calculateBill(b , n)) + parseFloat(calculateTip(b, n, p))).toFixed(2);
        }
        
    }
}
