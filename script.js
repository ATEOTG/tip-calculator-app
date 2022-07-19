"use strict";

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
let currChosenPercent = 15;
let currClicked = tipPercents[2].classList.add("clicked");

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

  //   We want to account for cases where user enters a custom amount
  if (customVal) {
    tipValue = (+billVal * (+customVal / 100)) / numberVal;
    totalValue = +billVal / +numberVal;
    totalValue += +tipValue;
  } else {
    console.log(currChosenPercent);
    tipValue = (+billVal * +currChosenPercent) / numberVal;
    console.log(tipValue);
    totalValue = +billVal / +numberVal;
    totalValue += +tipValue;
  }

  //   display calculations
  tipAmount.innerHTML = `$${twoDecimal(tipValue)}`;
  totalAmount.innerHTML = `$${totalValue.toFixed(2)}`;
  //   clear each input value
  //   [billInpt, customInpt, peopleInpt].forEach((val) => (val.value = ""));
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
    tipPercents.forEach((tip) => tip.classList.remove("clicked"));

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

// error when customVar is zero and curr Chosen Percent is 0
