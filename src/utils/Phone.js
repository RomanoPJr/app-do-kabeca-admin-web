function formatPhone(event) {
  var text = event;

  if (typeof event === "object") {
    text = event.target.value;
  }

  const num = text.replace(/\D/g, "");

  var part1 = "";
  var part2 = "";
  var part3 = "";

  part1 = num.substring(0, 2);

  if (num.length <= 10) {
    part2 = num.substring(2, 6);
    part3 = num.substring(6, 10);
  } else if (num.length > 10) {
    part2 = num.substring(2, 7);
    part3 = num.substring(7, 11);
  }

  if (part1.length === 2) {
    part1 = `(${part1})`;
  }

  if (part2.length === 4 || part2.length === 5) {
    part2 += "-";
  }

  var formatted = `${part1}${part2}${part3}`;

  if (
    typeof event === "object" &&
    event.nativeEvent.inputType === "deleteContentBackward" &&
    (formatted.slice(-1) === ` ` ||
      formatted.slice(-1) === ")" ||
      formatted.slice(-1) === "(" ||
      formatted.slice(-1) === "-")
  ) {
    formatted = formatted.slice(0, -1);
  }

  return formatted;
}

const clearPhone = (text) => {
  return text.replace(/\D/g, "");
};
export { formatPhone, clearPhone };
