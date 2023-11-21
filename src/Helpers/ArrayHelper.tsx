function generateArray(size) {
  return Array.from({ length: size }, (_, index) => ({
    id: (index).toString(),
    height: index * 10,
    isActive: false,
    isSorted: false,
  }));
}

function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

export { generateArray, shuffleArray };
