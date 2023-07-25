"use strict";

const day = document.getElementById('day');
const month = document.getElementById('month');
const year = document.getElementById('year');

const currentDate = new Date();
const currentDay = currentDate.getDate();
const currentMonth = currentDate.getMonth() + 1;
const currentYear = currentDate.getFullYear();

const maxDay = new Date(year.value, month.value, 0).getDate();


const yearsResult = document.querySelector('.years-result');
const monthsResult = document.querySelector('.months-result');
const daysResult = document.querySelector('.days-result');

const calculateBtn = document.querySelector('.calculate-btn');

////////////////////////////////////////////////////////////////////////////////////

const limitInputLength = (input, maxLength)=> {
  if (input.value.length > maxLength) {
    input.value = input.value.slice(0, maxLength);
  }
}

day.addEventListener("input",(e)=> {
  limitInputLength(day, 2);
});

month.addEventListener("input",(e)=> {
  limitInputLength(month, 2);
});

year.addEventListener("input",(e)=> {
  limitInputLength(year, 4);
});

const inputs = document.querySelectorAll('input');

inputs.forEach((input) => {
	input.addEventListener("focus",()=> {
		input.style.borderColor = 'var(--primary)'
	});

	input.addEventListener("blur",()=> {
		input.style.borderColor = 'var(--neutral-3)'
	});
});

////////////////////////////////////////////////////////////////////////////////////

const showError = (input,message)=> {
	const errorElement = input.nextElementSibling;
	input.style.borderColor = 'var(--secondary)';
	errorElement.textContent = `${input.name} `+`${message}`;
}

const calculateAge = ()=> {
	const dayValue = day.value;
	const monthValue = month.value;
	const yearValue = year.value;
  
  let years = currentYear - parseInt(yearValue);
 	let months = currentMonth - parseInt(monthValue);
  let days = currentDay - parseInt(dayValue);

  if (months < 0 || (months === 0 && days < 0)) {
   	years--;
   	months += 12;
 	}

  if (days < 0) {
    const prevMonth = new Date(currentYear, currentMonth - 1, 0);
    days += prevMonth.getDate();
    months--;
  }

  yearsResult.textContent = `${years}`;
  monthsResult.textContent = `${months}`;
  daysResult.textContent = `${days}`;
};

const validateDate = ()=> {
	let valid = true;

	inputs.forEach((input)=> {
		const errorElement = input.nextElementSibling;
		input.style.borderColor = 'var(--neutral-3)';
		errorElement.textContent = ``;
	});

  if (day.value >= currentDay && month.value >= currentMonth && year.value >= currentYear) {
  	showError(year,`must be a valid date`);
   	valid = false;
  }

  if (day.value == "") {
    showError(day,`can't be empty`);
    valid = false;
  } else if (day.value < 1 || day.value > maxDay || isNaN(day.value)) {
    showError(day,`must be between 1 and ${maxDay}`);
    valid = false;
  }

	if (month.value == "") {
    showError(month,`can't be empty`);
   	valid = false;
  } else if (month.value < 1 || month.value > 12 || isNaN(month.value)) {
  	showError(month,`must be between 1 and 12`);
   	valid = false;
  }

	if (year.value == "") {
    showError(year,`can't be empty`);
    valid = false;
  } else if (year.value > currentYear || year.value < 1900 || isNaN(year.value)) {
		showError(year,`must be between 1900 and ${currentYear}`);
   	valid = false;
  }
  return valid;
};

calculateBtn.addEventListener('click',(e)=> {
	e.preventDefault();
  	if (validateDate()) {
    	calculateAge();
  	}
});

