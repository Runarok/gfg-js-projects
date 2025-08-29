
  const minRange = document.getElementById("minRange");
  const maxRange = document.getElementById("maxRange");
  const minInput = document.getElementById("minInput");
  const maxInput = document.getElementById("maxInput");
  const display = document.getElementById("rangeDisplay");
  const progress = document.getElementById("sliderProgress");

  const maxSliderValue = 1000000;
  const minGap = 5000;

  function formatCurrency(value) {
    return "₹" + Number(value).toLocaleString();
  }

  function updateSliderUI() {
    const minVal = parseInt(minRange.value);
    const maxVal = parseInt(maxRange.value);

    display.textContent = `${formatCurrency(minVal)} – ${formatCurrency(maxVal)}`;

    const percentMin = (minVal / maxSliderValue) * 100;
    const percentMax = (maxVal / maxSliderValue) * 100;

    progress.style.left = percentMin + "%";
    progress.style.width = (percentMax - percentMin) + "%";
  }

  function syncInputsToSlider() {
    let minVal = parseInt(minInput.value);
    let maxVal = parseInt(maxInput.value);

    if (maxVal - minVal < minGap) {
      if (event.target === minInput) {
        minVal = maxVal - minGap;
      } else {
        maxVal = minVal + minGap;
      }
    }

    if (minVal < 0) minVal = 0;
    if (maxVal > maxSliderValue) maxVal = maxSliderValue;

    minRange.value = minVal;
    maxRange.value = maxVal;

    updateSliderUI();
  }

  function syncSliderToInputs() {
    let minVal = parseInt(minRange.value);
    let maxVal = parseInt(maxRange.value);

    if (maxVal - minVal < minGap) {
      if (event.target === minRange) {
        minRange.value = maxVal - minGap;
        minVal = maxVal - minGap;
      } else {
        maxRange.value = minVal + minGap;
        maxVal = minVal + minGap;
      }
    }

    minInput.value = minVal;
    maxInput.value = maxVal;

    updateSliderUI();
  }

  function resetSlider() {
    minRange.value = 50000;
    maxRange.value = 500000;
    minInput.value = 50000;
    maxInput.value = 500000;
    updateSliderUI();
  }

  // Event listeners
  minRange.addEventListener("input", syncSliderToInputs);
  maxRange.addEventListener("input", syncSliderToInputs);
  minInput.addEventListener("input", syncInputsToSlider);
  maxInput.addEventListener("input", syncInputsToSlider);

  // Initial update
  updateSliderUI();
