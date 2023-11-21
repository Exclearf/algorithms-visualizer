const bubbleSort = (arr, setArrayHandler, buttonHandler, isSortedHandler, changeText) => {
  let isSorted = true;
  let newArr = [...arr];
  let sortedCount = 0;
  let comparisonIndex = 0;

  const intervalId = setInterval(() => {
    newArr[comparisonIndex].isActive = true;
    newArr[comparisonIndex + 1].isActive = true;

    if (newArr[comparisonIndex - 1])
      newArr[comparisonIndex - 1].isActive = false;

    if (comparisonIndex === 0 && newArr[newArr.length - sortedCount - 1]) {
      newArr[newArr.length - sortedCount - 1].isActive = false;
      if (newArr[newArr.length - sortedCount])
        newArr[newArr.length - sortedCount].isActive = false;
    }

    if (
      parseInt(newArr[comparisonIndex].id) >
      parseInt(newArr[comparisonIndex + 1].id)
    ) {
      isSorted = false;
      [newArr[comparisonIndex], newArr[comparisonIndex + 1]] = [
        newArr[comparisonIndex + 1],
        newArr[comparisonIndex],
      ];
    }

    setArrayHandler([...newArr]);
    comparisonIndex++;

    if (comparisonIndex >= newArr.length - 1 - sortedCount) {
      comparisonIndex = 0;
      if (isSorted) {
        clearInterval(intervalId);

        let currentSortedIndex = 0;

        const sortedIntervalId = setInterval(() => {
          if (newArr[currentSortedIndex + 1]) {
            newArr[currentSortedIndex].isSorted = true;
            newArr[currentSortedIndex + 1].isActive = true;
            currentSortedIndex++;
            setArrayHandler([...newArr]);
          } else {
            newArr[currentSortedIndex].isSorted = true;
            setArrayHandler([...newArr]);
            clearInterval(sortedIntervalId);
            buttonHandler(false);
            isSortedHandler(true);
            changeText("SORT");
          }
        }, 1);
      } else {
        isSorted = true;
        sortedCount++;
      }
    }
  }, 1);
};
export { bubbleSort };
