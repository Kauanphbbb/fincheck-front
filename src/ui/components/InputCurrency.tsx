import { NumericFormat } from "react-number-format";

export function InputCurrency() {
  return (
    <NumericFormat
      className="text-gray-800 text-[32px] font-bold tracking-[-1px] outline-none w-full"
      thousandSeparator="."
      decimalSeparator=","
      defaultValue="0"
    />
  );
}
