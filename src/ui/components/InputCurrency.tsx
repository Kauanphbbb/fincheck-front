import { CrossCircledIcon } from '@radix-ui/react-icons';
import CurrencyInput from 'react-currency-input-field';
import { cn } from '../../app/utils/cn';

interface InputCurrencyProps {
  error?: string;
  value?: string | number;
  className?: string;
  onChange(value?: string): void;
}

export function InputCurrency({
  error,
  value,
  onChange,
  className,
}: InputCurrencyProps) {
  function handleTransform(value: string) {
    return value.length === 0 ? '0' : value;
  }

  return (
    <div className={cn(error && 'relative top-4')}>
      <CurrencyInput
        groupSeparator="."
        decimalSeparator=","
        decimalScale={2}
        value={value}
        defaultValue={0}
        onValueChange={(value) => onChange(value)}
        transformRawValue={handleTransform}
        className={cn(
          'w-full text-gray-800 text-[32px] font-bold tracking-[-1px] outline-none',
          error && 'text-red-900',
          className
        )}
      />

      {error && (
        <div className="mt-2 flex gap-2 items-center text-red-900">
          <CrossCircledIcon />
          <span className="text-xs">{error}</span>
        </div>
      )}
    </div>
  );
}
