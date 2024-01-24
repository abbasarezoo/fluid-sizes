const minMaxCalculator = document.querySelector('.min-max-calculator');
const multiplierCalculator = document.querySelector('.multiplier-calculator');
const dividerCalculator = document.querySelector('.divider-calculator');
const relativeCalculator = document.querySelector('.relative-calculator');

const remInput = document.querySelector('.rem-value');
const minInput = document.querySelector('.min-width');
const maxInput = document.querySelector('.max-width');

const minMaxInputs = minMaxCalculator.querySelectorAll('input');
const multiplierInputs = multiplierCalculator.querySelectorAll('input');
const dividerInputs = dividerCalculator.querySelectorAll('input');
const relativeInputs = relativeCalculator.querySelectorAll('input');

remInput.addEventListener('input', function() {
  minMaxCalculation();
  multiplierCalculation();
  dividerCalculation();
  relativeCalculation();
  // updateViewportWidth();
});

minInput.addEventListener('input', function() {
  minMaxCalculation();
  multiplierCalculation();
  dividerCalculation();
  relativeCalculation();
  // updateViewportWidth();
});

maxInput.addEventListener('input', function() {
  minMaxCalculation();
  multiplierCalculation();
  dividerCalculation();
  relativeCalculation();
  // updateViewportWidth();
});

minMaxInputs.forEach(function(input) {
  input.addEventListener('input', function() {
    minMaxCalculation();
    // updateViewportWidth();
  });
});

multiplierInputs.forEach(function(input) {
  input.addEventListener('input', function() {
    multiplierCalculation();
    // updateViewportWidth();
  });
});

dividerInputs.forEach(function(input) {
  input.addEventListener('input', function() {
    dividerCalculation();
    // updateViewportWidth();
  });
});

relativeInputs.forEach(function(input) {
  input.addEventListener('input', function() {
    relativeCalculation();
    // updateViewportWidth();
  });
});

// window.addEventListener('resize', updateViewportWidth);

minMaxCalculation();
multiplierCalculation();
dividerCalculation();
relativeCalculation();
// updateViewportWidth();

function minMaxCalculation() {
  const minFontSizeInput = minMaxCalculator.querySelector(".min-font-size");
  const maxFontSizeInput = minMaxCalculator.querySelector(".max-font-size");

  const remValue = parseFloat(remInput.value);
  const minWidthPx = parseFloat(minInput.value);
  const maxWidthPx = parseFloat(maxInput.value);
  const minFontSizePx = parseFloat(minFontSizeInput.value);
  const maxFontSizePx = parseFloat(maxFontSizeInput.value);
  
  const minWidth = minWidthPx / remValue;
  const maxWidth = maxWidthPx / remValue;
  const minFontSize = minFontSizePx / remValue;
  const maxFontSize = maxFontSizePx / remValue;

  const middleValue2 = (maxFontSize - minFontSize) / (maxWidth - minWidth);
  const middleValue1 = -minWidth * middleValue2 + minFontSize;

  const output = `clamp(${minFontSize}rem, ${middleValue1.toFixed(4)}rem + ${(middleValue2 * 100).toFixed(4)}vw, ${maxFontSize.toFixed(4)}rem);`
  const result = `${output} /* ${minFontSizePx}px @ ${minWidthPx}px > ${maxFontSizePx}px @ ${maxWidthPx}px */`;

  // minMaxCalculator.querySelector('.type-example').style.setProperty('--min-max', output);
  minMaxCalculator.querySelector(".result code").textContent = result;
}

function multiplierCalculation() {
  const minFontSizeInput = multiplierCalculator.querySelector(".min-font-size");
  const multiplierInput = multiplierCalculator.querySelector(".multiplier");
  const maxFontSizeInput = multiplierCalculator.querySelector(".max-font-size");

  const remValue = parseFloat(remInput.value);
  const minWidthPx = parseFloat(minInput.value);
  const maxWidthPx = parseFloat(maxInput.value);
  const minFontSizePx = parseFloat(minFontSizeInput.value);
  const multiplierValue = parseFloat(multiplierInput.value);
  const maxFontSizePx = minFontSizePx * multiplierValue;
  
  const minWidth = minWidthPx / remValue;
  const maxWidth = maxWidthPx / remValue;
  const minFontSize = minFontSizePx / remValue;
  const maxFontSize = (minFontSizePx * multiplierValue) / remValue;

  const middleValue2 = (maxFontSize - minFontSize) / (maxWidth - minWidth);
  const middleValue1 = -minWidth * middleValue2 + minFontSize;

  const output = `clamp(${minFontSize}rem, ${middleValue1.toFixed(4)}rem + ${(middleValue2 * 100).toFixed(4)}vw, ${maxFontSize.toFixed(4)}rem);`
  const result = `${output} /* ${minFontSizePx}px @ ${minWidthPx}px > ${maxFontSizePx}px @ ${maxWidthPx}px */`;
  maxFontSizeInput.value = maxFontSizePx;

  multiplierCalculator.querySelector(".result code").textContent = result;
}

function dividerCalculation() {
  const maxFontSizeInput = dividerCalculator.querySelector(".max-font-size");
  const dividerInput = dividerCalculator.querySelector(".divider");
  const minFontSizeInput = dividerCalculator.querySelector(".min-font-size");

  const remValue = parseFloat(remInput.value);
  const minWidthPx = parseFloat(minInput.value);
  const maxWidthPx = parseFloat(maxInput.value);
  const maxFontSizePx = parseFloat(maxFontSizeInput.value);
  const dividerValue = parseFloat(dividerInput.value);
  const minFontSizePx = maxFontSizePx / dividerValue;
  
  const minWidth = minWidthPx / remValue;
  const maxWidth = maxWidthPx / remValue;
  const maxFontSize = maxFontSizePx / remValue;
  const minFontSize = (maxFontSizePx / dividerValue) / remValue;

  const middleValue2 = (maxFontSize - minFontSize) / (maxWidth - minWidth);
  const middleValue1 = -minWidth * middleValue2 + minFontSize;

  const output = `clamp(${minFontSize}rem, ${middleValue1.toFixed(4)}rem + ${(middleValue2 * 100).toFixed(4)}vw, ${maxFontSize.toFixed(4)}rem);`
  const result = `${output} /* ${minFontSizePx}px @ ${minWidthPx}px > ${maxFontSizePx}px @ ${maxWidthPx}px */`;
  minFontSizeInput.value = minFontSizePx;

  // dividerCalculator.querySelector('.type-example').style.setProperty('--divider', output);
  dividerCalculator.querySelector(".result code").textContent = result;
}

function relativeCalculation() {
  const minFontSizeInput = relativeCalculator.querySelector(".min-font-size");
  const multiplierInput = relativeCalculator.querySelector(".multiplier");
  const maxFontSizeInput = relativeCalculator.querySelector(".max-font-size");

  const remValue = parseFloat(remInput.value);
  const minWidthPx = parseFloat(minInput.value);
  const maxWidthPx = parseFloat(maxInput.value);
  const minFontSizePx = parseFloat(minFontSizeInput.value);
  const ratioValue = (maxWidthPx / minWidthPx);
  const multiplier = ratioValue / 10 + 1;
  const maxFontSizePx = minFontSizePx * multiplier;
  
  const minWidth = minWidthPx / remValue;
  const maxWidth = maxWidthPx / remValue;
  const minFontSize = minFontSizePx / remValue;
  const maxFontSize = (minFontSizePx * multiplier) / remValue;

  const middleValue2 = (maxFontSize - minFontSize) / (maxWidth - minWidth);
  const middleValue1 = -minWidth * middleValue2 + minFontSize;

  const output = `clamp(${minFontSize}rem, ${middleValue1.toFixed(4)}rem + ${(middleValue2 * 100).toFixed(4)}vw, ${maxFontSize.toFixed(4)}rem);`
  const result = `${output} /* ${minFontSizePx}px @ ${minWidthPx}px > ${maxFontSizePx}px @ ${maxWidthPx}px */` ;
  multiplierInput.value = multiplier;
  maxFontSizeInput.value = maxFontSizePx;

  // relativeCalculator.querySelector('.type-example').style.setProperty('--relative', output);
  relativeCalculator.querySelector(".result code").textContent = result;
}

// function updateViewportWidth() {
//   const viewportWidth = window.innerWidth;

//   const minMaxCurrentFontSizeEl = minMaxCalculator.querySelector('.type-example');
//   const minMaxCurrentFontSize = window.getComputedStyle(minMaxCurrentFontSizeEl).fontSize;

//   const multiplierCurrentFontSizeEl = multiplierCalculator.querySelector('.type-example');
//   const multiplierCurrentFontSize = window.getComputedStyle(multiplierCurrentFontSizeEl).fontSize;

//   const dividerCurrentFontSizeEl = dividerCalculator.querySelector('.type-example');
//   const dividerCurrentFontSize = window.getComputedStyle(dividerCurrentFontSizeEl).fontSize;

//   const relativeCurrentFontSizeEl = relativeCalculator.querySelector('.type-example');
//   const relativeCurrentFontSize = window.getComputedStyle(relativeCurrentFontSizeEl).fontSize;

//   minMaxCalculator.querySelector(".type-example span").textContent = minMaxCurrentFontSize;
//   minMaxCalculator.querySelector(".spacing-example").style.width = minMaxCurrentFontSize;

//   multiplierCalculator.querySelector(".type-example span").textContent = multiplierCurrentFontSize;
//   multiplierCalculator.querySelector(".spacing-example").style.width = multiplierCurrentFontSize;

//   dividerCalculator.querySelector(".type-example span").textContent = dividerCurrentFontSize;
//   dividerCalculator.querySelector(".spacing-example").style.width = dividerCurrentFontSize;

//   relativeCalculator.querySelector(".type-example span").textContent = relativeCurrentFontSize;
//   relativeCalculator.querySelector(".spacing-example").style.width = relativeCurrentFontSize;

//   // document.querySelector('.browser-width').textContent = `${viewportWidth}px`;
// }

const calculators = document.querySelectorAll(".calculator");

calculators.forEach(function(calculator){
  const btn = calculator.querySelector('.copy');
  const result = calculator.querySelector('.result code');

  btn.addEventListener('click', function() {
    const resultHTML = result.textContent;
    const btnElement = this;

    navigator.clipboard.writeText(resultHTML)
    .then(() => {
        btnElement.classList.add('success');
        setTimeout(() => {
            btnElement.classList.remove('success');
        }, 3000);
    })
    .catch(err => {
        btnElement.classList.add('fail');
        setTimeout(() => {
            btnElement.classList.remove('fail');
        }, 3000);
    });
  });

});