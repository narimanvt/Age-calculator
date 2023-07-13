const dayinput = document.querySelector(".day-input");
const monthinput = document.querySelector(".month-input");
const yearinput = document.querySelector(".year-input");

const submitbtn = document.querySelector(".arrow-button");

const dayoutput = document.querySelector(".days-result");
const monthoutput = document.querySelector(".months-result");
const yearoutput = document.querySelector(".years-result");

const dayerror = document.querySelector(".day-error")
const montherror = document.querySelector(".month-error")
const yearerror = document.querySelector(".year-error")

const inputbox = document.querySelector(".input-box");
const pp = document.querySelectorAll(".pp");
const ppp = document.querySelectorAll(".ppp");
const pppp = document.querySelectorAll(".pppp");

submitbtn.addEventListener('click', calculateAge);

function calculateAge(){
    clearerrors()
    
    const date = new Date();
    const yeardate = date.getFullYear();
    const monthdate = date.getMonth() + 1;
    const daydate = date.getDay();

    if (isNaN(parseInt(dayinput.value)) || isNaN(parseInt(monthinput.value)) || isNaN(parseInt(yearinput.value))) {
        return;
    }

    if (parseInt(dayinput.value)>31 || parseInt(dayinput.value<1)){
        showError(dayerror , 'Must be a valid day');
        inputbox.style.color = "red"
        pp.style.color = "red";
        return;
    }
    if (parseInt(monthinput.value) >= 7 && parseInt(dayinput.value) > 30) {
        showError(dayerror, 'Must be a valid day');
        inputbox.style.color = "red";
        pp.style.color = "red";
        return;
    }
    if (parseInt(monthinput.value)>12 || parseInt(monthinput.value)<1){
        showError(montherror, 'Must be a valid month')
        inputbox.style.color = "red";
        ppp.style.color = "red";
        return;
    }
    if (parseInt(yearinput.value) > yeardate){
        showError(yearerror, 'Must be in the past')
        inputbox.style.color = "red";
        pppp.style.color = "red";
        return;
    }
    

    dayoutput.textContent = calculateDays(dayinput.value, daydate, monthdate, yeardate);
    monthoutput.textContent = calculateMonths(monthinput.value, monthdate);
    yearoutput.textContent = calculateYears(yeardate, yearinput.value, monthdate, monthinput.value, dayinput.value, daydate);


}

function calculateDays(dayinput, daydate, monthdate, yeardate){
    let days = 0;
    if (daydate >= dayinput){
        days += (daydate - dayinput);
    }
    else{
        const prevMonth = monthdate === 1 ? 12 : monthdate - 1;
        const prevYear = monthdate === 1 ? yeardate - 1 : yeardate;
        const prevMonthDays = new Date(prevYear, prevMonth, 0).getDate();
        days += prevMonthDays - (dayinput - daydate);
    }
    return days;
}

function calculateMonths(monthinput, monthdate){
    let months ;
    months = monthdate >= monthinput ? monthdate - monthinput : 12 - (monthinput - monthdate);
    return months;
}

function calculateYears(yeardate, yearinput, monthdate, monthinput, dayinput, daydate){
    let year = yeardate - yearinput;
    if (monthinput > monthdate || (monthdate === monthinput && dayinput > daydate)){
        year--;
    }
    return year;
}




function showError (errorplace, message){
    errorplace.textContent = message;
    errorplace.parentElement.classList.add('error');
    pp.forEach((pp) => pp.style.color = 'red');
    ppp.forEach((ppp) => ppp.style.color = 'red');
    pppp.forEach((pppp) => pppp.style.color = 'red');
}

function clearerrors(){
    dayerror.textContent = '';
    montherror.textContent = '';
    yearerror.textContent = '';
    pp.forEach((pp) => pp.style.color = 'hsl(0, 1%, 44%)');
    ppp.forEach((ppp) => ppp.style.color = 'hsl(0, 1%, 44%)');
    pppp.forEach((pppp) => pppp.style.color = 'hsl(0, 1%, 44%)');
    
    
    
}