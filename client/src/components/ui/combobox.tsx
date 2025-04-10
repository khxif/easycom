'use client';

import { Check, ChevronsUpDown } from 'lucide-react';
import * as React from 'react';

import { Button } from '@/components/ui/button';
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from '@/components/ui/command';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { cn } from '@/lib/utils';
import { useVirtualizer } from '@tanstack/react-virtual';

interface ComboBoxOptions {
  value: string;
  label: string;
}

interface ComboboxProps {
  options: ComboBoxOptions[];
  placeholder: string;
  searchInputPlaceholder: string;
  disabled?: boolean;
  emptyLabel: string;
  value: string;
  onChange: (value: string) => void;
}

export function Combobox({
  options,
  placeholder,
  emptyLabel,
  value,
  onChange,
  searchInputPlaceholder,
}: ComboboxProps) {
  const [open, setOpen] = React.useState(false);
  const [search, setSearch] = React.useState('');

  const filteredOptions = React.useMemo(
    () =>
      search
        ? options.filter(option => option.label.toLowerCase().includes(search.toLowerCase()))
        : options.slice(0, 10),
    [search, options],
  );
  console.log(filteredOptions);
  const parentRef = React.useRef(null);

  const rowVirtualizer = useVirtualizer({
    count: filteredOptions.length,
    getScrollElement: () => parentRef.current,
    estimateSize: () => 35,
    overscan: 50,
  });

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-full justify-between"
        >
          {value ? value : placeholder}
          <ChevronsUpDown className="opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="p-0 min-w-[--radix-popover-trigger-width]" align="start">
        <Command>
          <CommandInput
            onValueChange={v => setSearch(v)}
            placeholder={searchInputPlaceholder}
            className="h-9 w-full"
          />
          <CommandList
            ref={parentRef}
            className="w-full"
            style={{
              height: filteredOptions.length > 0 ? `${rowVirtualizer.getTotalSize()}px` : undefined,
              overflow: 'auto',
              position: 'relative',
            }}
          >
            <CommandEmpty>{emptyLabel}</CommandEmpty>
            <CommandGroup>
              {rowVirtualizer.getVirtualItems().map(virtualRow => {
                const option = filteredOptions[virtualRow.index];
                if (!option) return;

                return (
                  <CommandItem
                    key={option.value ?? virtualRow.index}
                    value={option.value}
                    onSelect={currentValue => {
                      onChange(currentValue === value ? '' : currentValue);
                      setOpen(false);
                    }}
                  >
                    {option?.label}
                    <Check
                      className={cn(
                        'ml-auto',
                        value === option.value ? 'opacity-100' : 'opacity-0',
                      )}
                    />
                  </CommandItem>
                );
              })}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
