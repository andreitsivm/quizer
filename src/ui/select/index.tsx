import * as React from 'react';
import { Select as RadixSelect } from '@radix-ui/themes';
import { ControllerRenderProps } from 'react-hook-form';

type RadixSelectOption = {
  value: string;
  label: string;
};

const Select: React.FC<
  { options: RadixSelectOption[] } & ControllerRenderProps
> = ({ options, ...props }) => {
  console.log(props);
  return (
    <RadixSelect.Root {...props} onValueChange={props.onChange}>
      <RadixSelect.Trigger className='flex items-center justify-between'></RadixSelect.Trigger>
      <RadixSelect.Content className='text-black'>
        <RadixSelect.Group>
          {options.map(option => (
            <RadixSelect.Item key={option.value} value={option.value}>
              {option.label}
            </RadixSelect.Item>
          ))}
        </RadixSelect.Group>
      </RadixSelect.Content>
    </RadixSelect.Root>
  );
};

export default Select;
