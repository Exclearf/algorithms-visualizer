const quickSort = (arr, setArrayHandler) => {
    const partition = async (arr, low, high) => {
      const pivot = arr[high];
      let i = low - 1;
  
      for (let j = low; j < high; j++) {
        arr[j].isActive = true;
        setArrayHandler([...arr]);
        await delay(10);
  
        if (parseInt(arr[j].id) < parseInt(pivot.id)) {
          i++;
          [arr[i], arr[j]] = [arr[j], arr[i]];
        }
  
        arr[j].isActive = false;
      }
  
      [arr[i + 1], arr[high]] = [arr[high], arr[i + 1]];
      arr[i + 1].isSorted = true;
      setArrayHandler([...arr]);
      await delay(10);
  
      return i + 1;
    };
  
    const quickSortRecursive = async (arr, low, high) => {
      if (low < high) {
        const partitionIndex = await partition(arr, low, high);
  
        await quickSortRecursive(arr, low, partitionIndex - 1);
        await quickSortRecursive(arr, partitionIndex + 1, high);
      }
    };
  
    const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));
  
    quickSortRecursive(arr, 0, arr.length - 1);
  };
  
  export { quickSort };