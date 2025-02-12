"use strict";

const resetBtn = document.querySelector(".reset");
const errorZero = document.querySelector(".error-zero");
const errorStr = document.querySelector(".error-string");

const billForm = document.querySelector(".bill");
const numberForm = document.querySelector(".number-people-box");
const customForm = document.querySelector(".custom-form");

const billInpt = document.querySelector("#bill-amount");
const customInpt = document.querySelector("#custom");
const peopleInpt = document.querySelector("#number-people");

const tipAmount = document.querySelector("#curr1");
const totalAmount = document.querySelector("#curr2");

const tipPercents = document.querySelectorAll(".tip-number");
// default value should be 15
let currChosenPercent = 0.15;
let currClicked = tipPercents[2];
currClicked.classList.add("clicked");

// need to cut our value to two decimal places (without rounding)
const twoDecimal = function (val) {
  const str = `${val}`;
  return +str.slice(0, str.indexOf(".") + 3);
};

// function to calculate and display our results
const enterCalc = function () {
  // get value of the inputs
  const billVal = document.getElementById("bill-amount").value;
  const numberVal = document.getElementById("number-people").value;
  const customVal = document.getElementById("custom").value;

  //   this is to get the value of tip amount per person
  let tipValue;
  let totalValue;

  //   checks for zero division
  if (+numberVal === 0) {
    // reset the error values first
    errorZero.classList.remove("error");
    errorStr.classList.remove("error");

    peopleInpt.setAttribute("error", "1");
    errorZero.classList.add("error");
    return;
  }
  //   checks for string error
  if (!+numberVal) {
    // reset the error values first
    errorZero.classList.remove("error");
    errorStr.classList.remove("error");

    peopleInpt.setAttribute("error", "1");
    errorStr.classList.add("error");
    return;
  }
  if (peopleInpt.hasAttribute("error")) {
    peopleInpt.removeAttribute("error");
    errorZero.classList.remove("error");
    errorStr.classList.remove("error");
  }

  //   We want to account for cases where user enters a custom amount
  if (customVal) {
    tipValue = (+billVal * (+customVal / 100)) / numberVal;
    totalValue = +billVal / +numberVal;
    totalValue += +tipValue;
  } else {
    tipValue = (+billVal * +currChosenPercent) / numberVal;
    totalValue = +billVal / +numberVal;
    totalValue += +tipValue;
  }

  //   display calculations

  tipAmount.innerHTML = `$${twoDecimal(tipValue)}`;
  totalAmount.innerHTML = `$${totalValue.toFixed(2)}`;
};

// add to all the forms the submit event
[billForm, numberForm, customForm].forEach((form) =>
  form.addEventListener("submit", function (e) {
    e.preventDefault();
    enterCalc();
  })
);

// update curr percentage to the number the user clicked on
tipPercents.forEach((tip) =>
  tip.addEventListener("click", function () {
    // remove the clicked class once you click on a new tip-number
    currClicked.classList.remove("clicked");

    // also reset custom val
    document.getElementById("custom").value = "";

    // add the clicked class to currently clicked and set the curr percentage to it
    // and also update the element currently chosen
    tip.classList.add("clicked");
    currChosenPercent = +tip.id / 100;
    currClicked = tip;
  })
);

// reset clicked class and currchosenpercent upon clicking the Custom form
customInpt.addEventListener("click", function (e) {
  currClicked.classList.remove("clicked");
  currChosenPercent = 0;
});

// reset each value when clicking the reset button
resetBtn.addEventListener("click", function () {
  currClicked.classList.remove("clicked");
  currChosenPercent = 0.15;
  currClicked = tipPercents[2];
  currClicked.classList.add("clicked");

  tipAmount.innerHTML = "$0.00";
  totalAmount.innerHTML = "$0.00";
  document.getElementById("custom").value = "";
  [billInpt, customInpt, peopleInpt].forEach((val) => (val.value = ""));

  peopleInpt.removeAttribute("error");
  errorZero.classList.remove("error");
  errorStr.classList.remove("error");
});
