export function taxValidation(tax_id) {
  tax_id = tax_id.replace(/[^\d.-]/g, "");

  if (tax_id.length !== 14 || /^(\d)\1{10}$/.test(tax_id)) {
    return false;
  }

  const digits = tax_id.split("").filter((c) => /\d/.test(c));

  if (digits.length !== 11) {
    return false;
  }

  const sum = digits
    .slice(0, 9)
    .map((d, i) => parseInt(d) * (10 - i))
    .reduce((acc, val) => acc + val, 0);

  const firstDigit = 11 - (sum % 11);

  const calc1 =
    (firstDigit >= 10 ? 0 : firstDigit) !== parseInt(digits[9]);

  const sum2 = digits
    .slice(0, 10)
    .map((d, i) => parseInt(d) * (11 - i))
    .reduce((acc, val) => acc + val, 0);

  const secondDigit = 11 - (sum2 % 11);

  const calc2 =
    (secondDigit >= 10 ? 0 : secondDigit) !== parseInt(digits[10]);

  return !calc1 && !calc2;
}
