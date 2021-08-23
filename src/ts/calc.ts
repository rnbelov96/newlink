/* eslint-disable no-param-reassign */
export {};

const leftColor = '#e22a41';
const rightColor = '#cdcdcd';

const rangeElList = document.querySelectorAll('.js-range');

const singleRange = document.querySelector(
  '.js-single-range',
) as HTMLInputElement;
const litleRange = document.querySelector(
  '.js-litle-range',
) as HTMLInputElement;
const bigRange = document.querySelector('.js-big-range') as HTMLInputElement;

const resultLabelEl = document.querySelector('.js-calc-result') as HTMLSpanElement;

let result: number;

let singleCurrentStep = 2;
let litleCurrentStep = 2;
let bigCurrentStep = 2;

const calcResult = () => {
  result = (Number(singleRange.value) * 800
      + Number(litleRange.value) * 2200
      + Number(bigRange.value) * 2500)
    * 0.2;
  resultLabelEl.textContent = result.toLocaleString();
  return result;
};

calcResult();

rangeElList.forEach(el => {
  const rangeEl = el as HTMLInputElement;

  const steps = (Number(rangeEl.max) - Number(rangeEl.min)) / Number(rangeEl.step);

  const currentStep = (Number(rangeEl.value) - Number(rangeEl.min)) / Number(rangeEl.step);

  rangeEl.style.background = `linear-gradient(to right, ${leftColor} 0%, ${leftColor} ${String(
    (currentStep / steps) * 100,
  )}%, ${rightColor} ${String(
    (currentStep / steps) * 100,
  )}%, ${rightColor} 100%)`;
});

singleRange.addEventListener('input', e => {
  const rangeEl = e.currentTarget as HTMLInputElement;

  const steps = (Number(rangeEl.max) - Number(rangeEl.min)) / Number(rangeEl.step);

  singleCurrentStep = (Number(rangeEl.value) - Number(rangeEl.min)) / Number(rangeEl.step);

  rangeEl.style.background = `linear-gradient(to right, ${leftColor} 0%, ${leftColor} ${String(
    (singleCurrentStep / steps) * 100,
  )}%, ${rightColor} ${String(
    (singleCurrentStep / steps) * 100,
  )}%, ${rightColor} 100%)`;

  calcResult();
});

litleRange.addEventListener('input', e => {
  const rangeEl = e.currentTarget as HTMLInputElement;

  const steps = (Number(rangeEl.max) - Number(rangeEl.min)) / Number(rangeEl.step);

  litleCurrentStep = (Number(rangeEl.value) - Number(rangeEl.min)) / Number(rangeEl.step);

  rangeEl.style.background = `linear-gradient(to right, ${leftColor} 0%, ${leftColor} ${String(
    (litleCurrentStep / steps) * 100,
  )}%, ${rightColor} ${String(
    (litleCurrentStep / steps) * 100,
  )}%, ${rightColor} 100%)`;

  calcResult();
});

bigRange.addEventListener('input', e => {
  const rangeEl = e.currentTarget as HTMLInputElement;

  const steps = (Number(rangeEl.max) - Number(rangeEl.min)) / Number(rangeEl.step);

  bigCurrentStep = (Number(rangeEl.value) - Number(rangeEl.min)) / Number(rangeEl.step);

  rangeEl.style.background = `linear-gradient(to right, ${leftColor} 0%, ${leftColor} ${String(
    (bigCurrentStep / steps) * 100,
  )}%, ${rightColor} ${String(
    (bigCurrentStep / steps) * 100,
  )}%, ${rightColor} 100%)`;

  calcResult();
});
