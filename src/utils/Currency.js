export const formatMoney = (value = 0) => {
  return value.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
};
