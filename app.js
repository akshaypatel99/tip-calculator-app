let billAmount = document.getElementById('bill').value;
let tipCheckBox = document.querySelector('input[name="tip"]:checked')?.value;
let tipCustom = document.getElementById('custom-tip').value;
let persons = document.getElementById('persons').value;

let tipAmount = document.getElementById('tip-amount');
let total = document.getElementById('total');

// Select one tip input only
const tipInputs = document.querySelectorAll('input[name="tip"]');
tipInputs.forEach((ti) => {
	ti.addEventListener('click', () => {
		tipInputs.forEach((input) => {
			input.checked = false;
		});
		ti.checked = true;
	});
});

// Update results after user input
const inputsHTMLCollection = document.getElementsByTagName('input');
const inputs = [...inputsHTMLCollection];
const userInputs = inputs.slice(0, 8);

userInputs.forEach((ui) => {
	ui.addEventListener('input', () => {
		let billAmount = document.getElementById('bill').value || 0;
		let tipCheckBox = document.querySelector(
			'input[name="tip"]:checked'
		)?.value;
		let tipCustom = document.getElementById('custom-tip').value || 0;
		let persons = document.getElementById('persons').value || 1;

		let tipAmount = document.getElementById('tip-amount');
		let total = document.getElementById('total');

		const tipPercentage =
			tipCheckBox === undefined ? parseInt(tipCustom) : tipCheckBox;

		const amount = calculateTipAmount(tipPercentage, billAmount, persons);
		const totalAmount = calculateTotal(amount, billAmount, persons);

		tipAmount.value = `$${amount.toFixed(2)}`;
		total.value = `$${totalAmount.toFixed(2)}`;
	});
});

function calculateTipAmount(tipPercentage = 0, bill = 0, persons) {
	return tipPercentage
		? parseFloat(((tipPercentage / 100) * bill) / persons)
		: 0;
}

function calculateTotal(tipPerPerson, bill = 0, persons) {
	const billPerPerson = bill / persons;
	return tipPerPerson
		? parseFloat(billPerPerson) + parseFloat(tipPerPerson)
		: 0;
}
