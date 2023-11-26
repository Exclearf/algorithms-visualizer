const InitializeRangeWheel = (itemAmountSetter, getIsSorting) => {
  const rangeContainer: any = document.querySelector(".range-container");
  const rangeSVG = rangeContainer.querySelector(".range");
  const selectedValue = rangeContainer.querySelector(".value");
  // the controller of the range
  const maxStrokeDash = Number(
    rangeSVG.querySelector("path").getAttribute("stroke-dasharray")
  );
  // range values
  const rangeMin = Number(rangeContainer.getAttribute("data-min"));
  const rangeMax = Number(rangeContainer.getAttribute("data-max"));
  const rangeDefault = Number(rangeContainer.getAttribute("data-default"));

  // calc the angle when click
  function calculateAngle(centerX, centerY, clickedX, clickedY) {
    const dx = clickedX - centerX;
    const dy = clickedY - centerY;
    return Math.atan2(dy, dx);
  }

  // normalize the angle becuase the angle provided from prev function
  // is radian angle
  function normalizeAngle(angleRadians) {
    let normalizedAngle = angleRadians % (2 * Math.PI);
    if (normalizedAngle < 0) {
      normalizedAngle += 2 * Math.PI;
    }
    return normalizedAngle;
  }

  // function that will update the UI
  function updateStroke(percentage) {
    if (!getIsSorting()) {
      if (percentage >= 100) percentage = 100;
      if (percentage <= 0) percentage = 0;

      //update value
      const currentRangeVal = Math.round(
        ((rangeMax - rangeMin) * percentage) / 100 + rangeMin
      );
      selectedValue.innerText = `${currentRangeVal}`;
      itemAmountSetter(currentRangeVal);

      // 	update stroke
      let strokeVal = maxStrokeDash - (percentage / 100) * maxStrokeDash;
      rangeSVG
        .querySelector("path")
        .setAttribute("style", `stroke-dashoffset: ${strokeVal}`);
    }
  }

  // function will do all calculation to update the ui
  function updateRangeOnDrag(e) {
    if (!getIsSorting()) {
      const circleRect = rangeSVG.getBoundingClientRect();
      const centerX = circleRect.left + circleRect.width / 2;
      const centerY = circleRect.top + circleRect.height / 2;
      const mouseX = e.clientX;
      const mouseY = e.clientY;

      const angleRadians = calculateAngle(centerX, centerY, mouseX, mouseY);
      const adjustedAngleRadians = angleRadians + Math.PI / 2; // Add 90 degrees (π/2 radians)
      const normalizedAngleRadians = normalizeAngle(adjustedAngleRadians);
      const currentPercentage = (normalizedAngleRadians * 100) / (2 * Math.PI); // Calculate the percentage

      updateStroke(currentPercentage);
    }
  }

  // self called fucntion to update the ui on load
  (function makeDefaultOnLoad() {
    let defaultPercentage =
      ((rangeDefault - rangeMin) / (rangeMax - rangeMin)) * 100;
    updateStroke(defaultPercentage);
  })();

  // add all fucntionality with events, eg: on mouve move
  let isMouseDown = false;
  rangeContainer.addEventListener("mousedown", function (e) {
    isMouseDown = true;
    updateRangeOnDrag(e);
  });
  document.addEventListener("mouseup", function () {
    isMouseDown = false;
  });
  rangeContainer.addEventListener("mousemove", function (e) {
    if (!isMouseDown) return;
    updateRangeOnDrag(e);
  });
};

export { InitializeRangeWheel };
