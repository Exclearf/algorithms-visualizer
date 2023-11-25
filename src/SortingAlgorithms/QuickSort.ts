const quickSort = (
  arr,
  setArrayHandler,
) => {
  const partition = (arr, low, high) => {
    const pivot = arr[high];
    let i = low - 1;

    const partitionIntervalId = setInterval(() => {
      for (let j = low; j < high; j++) {
        arr[j].isActive = true;
      }
      setArrayHandler([...arr]);
      clearInterval(partitionIntervalId);
    }, 50);

    for (let j = low; j < high; j++) {
      if (parseInt(arr[j].id) < parseInt(pivot.id)) {
        i++;
        [arr[i], arr[j]] = [arr[j], arr[i]];
      }
    }

    [arr[i + 1], arr[high]] = [arr[high], arr[i + 1]];

    const swapIntervalId = setInterval(() => {
      [arr[i + 1], arr[high]] = [arr[high], arr[i + 1]];
      arr.forEach((item) => {
        item.isActive = false;
      });
      setArrayHandler([...arr]);
      clearInterval(swapIntervalId);
    }, 50);

    return i + 1;
  };

  const quickSortHelper = (arr, low, high) => {
    if (low < high) {
      const partitionIndex = partition(arr, low, high);

      const leftQuickSortIntervalId = setInterval(() => {
        quickSortHelper(arr, low, partitionIndex - 1);
        clearInterval(leftQuickSortIntervalId);
      }, 150);

      const rightQuickSortIntervalId = setInterval(() => {
        quickSortHelper(arr, partitionIndex + 1, high);
        clearInterval(rightQuickSortIntervalId);
      }, 150);
    }
  };

  quickSortHelper(arr, 0, arr.length - 1);

  const sortedIntervalId = setInterval(() => {
    arr.forEach((item, index) => {
      if (index === arr.length - 1) {
        item.isSorted = true;
      } else {
        item.isSorted = false;
      }
    });
    setArrayHandler([...arr]);
    clearInterval(sortedIntervalId);
  }, 100);
};

export { quickSort };
