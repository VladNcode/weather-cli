const getArgs = () => {
  const args = process.argv.slice(2);
  const argsObj = {};

  args.forEach((el, i, arr) => {
    if (el === '-s' || el === '-h' || el === '-t') {
      if (arr[i + 1] !== undefined && arr[i + 1].charAt(0) !== '-') {
        argsObj[el[1]] = arr[i + 1];
      } else {
        argsObj[el[1]] = true;
      }
    }
  });

  return argsObj;
};

export { getArgs };
