export const isDifferenceLessTenPercent = (number1, number2) => {
  const difference = Math.abs(Number(number1) - Number(number2));
  const percentageDifference = (difference / Math.max(number1, number2)) * 100;
  return percentageDifference < 10;
}
