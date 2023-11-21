const mergeSort = (arr, setArrayHandler) => {
    const merge = (arr, left, mid, right) => {
      const n1 = mid - left + 1;
      const n2 = right - mid;
  
      const leftArray = arr.slice(left, left + n1);
      const rightArray = arr.slice(mid + 1, mid + 1 + n2);
  
      let i = 0,
        j = 0,
        k = left;
  
      while (i < n1 && j < n2) {
        if (parseInt(leftArray[i].id) <= parseInt(rightArray[j].id)) {
          arr[k] = leftArray[i];
          i++;
        } else {
          arr[k] = rightArray[j];
          j++;
        }
        k++;
      }
  
      while (i < n1) {
        arr[k] = leftArray[i];
        i++;
        k++;
      }
  
      while (j < n2) {
        arr[k] = rightArray[j];
        j++;
        k++;
      }
    };
  
    const mergeSortRecursive = (arr, left, right) => {
      if (left < right) {
        const mid = Math.floor((left + right) / 2);
  
        mergeSortRecursive(arr, left, mid);
        mergeSortRecursive(arr, mid + 1, right);
  
        merge(arr, left, mid, right);
  
        setArrayHandler([...arr]);
      }
    };
  
    mergeSortRecursive(arr, 0, arr.length - 1);
  };
  
  export { mergeSort };