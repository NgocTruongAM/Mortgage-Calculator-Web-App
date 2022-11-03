const homeValue = document.getElementById("homeValue");
const downPayment = document.getElementById("downPayment");
const loanAmount = document.getElementById("loanAmount");
const interestRate = document.getElementById("interestRate");
const loanDuration = document.getElementById("loanDuration");

const form = document.getElementById("mortgage");

var slider = document.getElementById("rangeSlider");
var output = document.getElementById("percentage");
output.innerHTML = slider.value;

slider.oninput = function () {
    output.innerHTML = this.value;
}
slider.addEventListener("change", updateDownPaymentValue);
slider.addEventListener("change", updateLoanAmountValue);

homeValue.addEventListener("keyup", updateDownPaymentValue);
homeValue.addEventListener("keyup", updateLoanAmountValue);

downPayment.addEventListener("keyup", updateLoanAmountValue);



function calculateMortgage(loanAmount, interestRate, numberMonthlyPayments) {
    interestRate = percentageToDecimal(interestRate);
    function percentageToDecimal(percent) {
        return percent / 12 / 100;
    }

    numberMonthlyPayments = yearsToMonths(numberMonthlyPayments);
    function yearsToMonths(year) {
        return year * 12;
    }

    let mortgage =
        (interestRate * loanAmount) /
        (1 - Math.pow(1 + interestRate, -numberMonthlyPayments));

    console.log(mortgage);
    return parseFloat(mortgage.toFixed(2));
}

form.onsubmit = (e) => {
    e.preventDefault();
    validate();
    let loanAmount = homeValue.value - downPayment.value;

    let monthlyPayment = calculateMortgage(
        loanAmount,
        interestRate.value,
        loanDuration.value
    );

    document.getElementById("monthlyPayment").innerHTML = `$ ${monthlyPayment}`;
};

function validate() {
    if (
        homeValue.value === "" ||
        downPayment.value === "" ||
        interestRate.value === "" ||
        loanDuration.value === ""
    ) {

        // alert("complete all fileds");
        let alert = document.createElement("div");
        alert.className = "alert alert-warning";
        alert.innerHTML = `<span>Complete all fields!</span>`;
        alert.style.textAlign= "center";
        alert.style.marginLeft = "3rem";
        alert.style.marginRight = "3rem";
        form.parentNode.insertBefore(alert, form);

        alert.onclick = () => alert.remove();
        setTimeout(() => alert.remove(), "3000");
    }
}

function updateDownPaymentValue() {
    downPayment.value = (homeValue.value * slider.value / 100).toFixed(0);

    var downPaymentValue = downPayment.value;
    console.log(downPaymentValue);
    updateLoanAmountValue;
    return downPaymentValue;
}
function updateLoanAmountValue() {
    loanAmount.value = homeValue.value - downPayment.value;

    var loanAmountValue = loanAmount.value;
    console.log(loanAmountValue);
    return loanAmountValue;
}

