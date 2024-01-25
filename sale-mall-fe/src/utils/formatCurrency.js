export default function formatCurrency(number, text) {
  let numberString = number.toString();

  let length = numberString.length;

  let result = "";
  for (let i = 0; i < length; i++) {
    result += numberString[i];
    if ((length - i - 1) % 3 === 0 && i !== length - 1) {
      result += ".";
    }
  }

  result += text;

  return result;
}
