const formatPhone = (text) => {
  const num = text.replace(/\D/g, "");

  if (num.length <= 10) {
    const part1 = num.substring(0, 2);
    const part2 = num.substring(2, 6);
    const part3 = num.substring(6, 10);
    return `(${part1}) ${part2}-${part3}`;
  }
  const part1 = num.substring(0, 2);
  const part2 = num.substring(2, 7);
  const part3 = num.substring(7, 11);
  return `(${part1}) ${part2}-${part3}`;
};

const clearPhone = (text) => {
  return text.replace(/\D/g, "");
};
export { formatPhone, clearPhone };
