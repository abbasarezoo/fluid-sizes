const minMaxCalculator = document.querySelector('.min-max-calculator');
const multiplierCalculator = document.querySelector('.multiplier-calculator');
const relativeCalculator = document.querySelector('.relative-calculator');

const remInput = document.querySelector('.rem-value');
const minInput = document.querySelector('.min-width');
const maxInput = document.querySelector('.max-width');

const minMaxInputs = minMaxCalculator.querySelectorAll('input');
const multiplierInputs = multiplierCalculator.querySelectorAll('input');
const relativeInputs = relativeCalculator.querySelectorAll('input');

remInput.addEventListener('input', function() {
  minMaxCalculation();
  multiplierCalculation();
  relativeCalculation();
  updateViewportWidth();
});

minInput.addEventListener('input', function() {
  minMaxCalculation();
  multiplierCalculation();
  relativeCalculation();
  updateViewportWidth();
});

maxInput.addEventListener('input', function() {
  minMaxCalculation();
  multiplierCalculation();
  relativeCalculation();
  updateViewportWidth();
});

minMaxInputs.forEach(function(input) {
  input.addEventListener('input', function() {
    minMaxCalculation();
    updateViewportWidth();
  });
});

multiplierInputs.forEach(function(input) {
  input.addEventListener('input', function() {
    multiplierCalculation();
    updateViewportWidth();
  });
});

relativeInputs.forEach(function(input) {
  input.addEventListener('input', function() {
    relativeCalculation();
    updateViewportWidth();
  });
});

window.addEventListener('resize', updateViewportWidth);

minMaxCalculation();
multiplierCalculation();
relativeCalculation();
updateViewportWidth();

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

  const slope = (maxFontSize - minFontSize) / (maxWidth - minWidth);
  const yAxisIntersection = -minWidth * slope + minFontSize;

  const output = `--fluid: clamp(${minFontSize}rem, ${yAxisIntersection.toFixed(4)}rem + ${(slope * 100).toFixed(4)}vw, ${maxFontSize.toFixed(4)}rem);`
  const result = `${output}`;

  minMaxCalculator.querySelector('.type-example').style.setProperty('--min-max', output);
  // minMaxCalculator.querySelector('.min-example').style.fontSize = minFontSize + 'rem';
  // minMaxCalculator.querySelector('.max-example').style.fontSize = maxFontSize + 'rem';
  minMaxCalculator.querySelector(".result").textContent = result;
}

function multiplierCalculation() {
  const minFontSizeInput = multiplierCalculator.querySelector(".min-font-size");
  const multiplierInput = multiplierCalculator.querySelector(".multiplier");

  const remValue = parseFloat(remInput.value);
  const minWidthPx = parseFloat(minInput.value);
  const maxWidthPx = parseFloat(maxInput.value);
  const minFontSizePx = parseFloat(minFontSizeInput.value);
  const multiplierValue = parseFloat(multiplierInput.value);
  
  const minWidth = minWidthPx / remValue;
  const maxWidth = maxWidthPx / remValue;
  const minFontSize = minFontSizePx / remValue;
  const maxFontSize = (minFontSizePx * multiplierValue) / remValue;

  const slope = (maxFontSize - minFontSize) / (maxWidth - minWidth);
  const yAxisIntersection = -minWidth * slope + minFontSize;

  const output = `--fluid: clamp(${minFontSize}rem, ${yAxisIntersection.toFixed(4)}rem + ${(slope * 100).toFixed(4)}vw, ${maxFontSize.toFixed(4)}rem);`
  const result = `${output}`;

  multiplierCalculator.querySelector('.type-example').style.setProperty('--multiplier', output);
  // multiplierCalculator.querySelector('.min-example').style.fontSize = minFontSize + 'rem';
  // multiplierCalculator.querySelector('.max-example').style.fontSize = maxFontSize + 'rem';
  multiplierCalculator.querySelector(".result").textContent = result;
}

function relativeCalculation() {
  const minFontSizeInput = relativeCalculator.querySelector(".min-font-size");

  const remValue = parseFloat(remInput.value);
  const minWidthPx = parseFloat(minInput.value);
  const maxWidthPx = parseFloat(maxInput.value);
  const minFontSizePx = parseFloat(minFontSizeInput.value);
  const ratioValue = (maxWidthPx / minWidthPx);
  const multiplier = (ratioValue / 10) + 1;
  
  const minWidth = minWidthPx / remValue;
  const maxWidth = maxWidthPx / remValue;
  const minFontSize = minFontSizePx / remValue;
  const maxFontSize = (minFontSizePx * multiplier) / remValue;

  const slope = (maxFontSize - minFontSize) / (maxWidth - minWidth);
  const yAxisIntersection = -minWidth * slope + minFontSize;

  const output = `--fluid: clamp(${minFontSize}rem, ${yAxisIntersection.toFixed(4)}rem + ${(slope * 100).toFixed(4)}vw, ${maxFontSize.toFixed(4)}rem);`
  const result = `${output}`;

  relativeCalculator.querySelector('.type-example').style.setProperty('--relative', output);
  // relativeCalculator.querySelector('.min-example').style.fontSize = minFontSize + 'rem';
  // relativeCalculator.querySelector('.max-example').style.fontSize = maxFontSize + 'rem';
  relativeCalculator.querySelector(".result").textContent = result;
}

function updateViewportWidth() {
  const viewportWidth = window.innerWidth;
  const minMaxCurrentFontSizeEl = minMaxCalculator.querySelector('.type-example');
  const minMaxCurrentFontSize = window.getComputedStyle(minMaxCurrentFontSizeEl).fontSize;
  const multiplierCurrentFontSizeEl = multiplierCalculator.querySelector('.type-example');
  const multiplierCurrentFontSize = window.getComputedStyle(multiplierCurrentFontSizeEl).fontSize;
  const relativeCurrentFontSizeEl = relativeCalculator.querySelector('.type-example');
  const relativeCurrentFontSize = window.getComputedStyle(relativeCurrentFontSizeEl).fontSize;

  minMaxCalculator.querySelector(".type-example span").textContent = minMaxCurrentFontSize;
  minMaxCalculator.querySelector(".spacing-example").style.width = minMaxCurrentFontSize;
  multiplierCalculator.querySelector(".type-example span").textContent = multiplierCurrentFontSize;
  multiplierCalculator.querySelector(".spacing-example").style.width = multiplierCurrentFontSize;
  relativeCalculator.querySelector(".type-example span").textContent = relativeCurrentFontSize;
  relativeCalculator.querySelector(".spacing-example").style.width = relativeCurrentFontSize;

  document.querySelector('.browser-width span').textContent = `${viewportWidth}px`;
}
