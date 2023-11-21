const insertionSort = (
  arr,
  setArrayHandler,
  buttonHandler,
  isSortedHandler,
  changeText
) => {
  let newArr = [...arr];
  let currentIndex = 1;

  const intervalId = setInterval(() => {
    const currentElement = newArr[currentIndex];
    let j = currentIndex - 1;

    if (newArr[currentIndex]) newArr[currentIndex].isActive = false;

    newArr.forEach((element) => {
      element.isActive = false;
    });

    newArr[j].isActive = true;
    newArr[currentIndex].isActive = true;

    while (j >= 0 && parseInt(newArr[j].id) > parseInt(currentElement.id)) {
      newArr[j + 1] = newArr[j];
      j--;
      setArrayHandler([...newArr]);
    }

    newArr[j + 1] = currentElement;
    setArrayHandler([...newArr]);

    currentIndex++;

    if (currentIndex >= newArr.length) {
      clearInterval(intervalId);
      console.log(j + 1);

      if (newArr[j + 1]) newArr[j + 1].isActive = false;

      if (newArr[newArr.length - 1]) newArr[newArr.length - 1].isActive = false;

      setArrayHandler([...newArr]);

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
    }
  }, 100);
};

export { insertionSort };
