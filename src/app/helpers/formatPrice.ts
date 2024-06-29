const formatPrice = (price: number, locale = "en-US", currency = "USD") => {
  const options = new Intl.NumberFormat(locale, {
    style: "currency",
    currency,
  });
  return options.format(price);
};

export default formatPrice;
