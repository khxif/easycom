'use client';

import { Button } from '@/components/ui/button';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { ScrollArea } from '@/components/ui/scroll-area';
import { CheckIcon, ChevronDownIcon } from 'lucide-react';
import { useEffect, useState } from 'react';

interface Option {
  id: string;
  label: string;
}
interface MultiSelectProps {
  options: Option[];
  value: string[];
  onChange: (value: string[]) => void;
}

export function MultiSelect({ options, value, onChange }: MultiSelectProps) {
  console.log(value);
  const [selectedOptions, setSelectedOptions] = useState<string[]>(value);

  const toggleOption = (optionId: string) => {
    setSelectedOptions(prevSelected =>
      prevSelected.includes(optionId)
        ? prevSelected.filter(id => id !== optionId)
        : [...prevSelected, optionId],
    );
  };

  const selectedLabels = options
    .filter(option => selectedOptions.includes(option.id))
    .map(option => option.label)
    .join(', ');

  useEffect(() => {
    onChange(selectedOptions);
  }, [selectedOptions]);

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="outline" className="w-full justify-between">
          {selectedLabels.length ? selectedLabels : 'Select options'}
          <ChevronDownIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>

      <PopoverContent className="min-w-full px-2 py-4">
        <ScrollArea className="h-48 w-full">
          <div className="flex flex-col space-y-1 w-full">
            {options.map(option => (
              <div
                key={option.id}
                className="flex items-center justify-between px-2 py-1 rounded-md hover:bg-muted cursor-pointer"
                onClick={() => toggleOption(option.id)}
              >
                <span>{option.label}</span>
                {selectedOptions.includes(option.id) && (
                  <CheckIcon className="h-4 w-4 text-primary" />
                )}
              </div>
            ))}
          </div>
        </ScrollArea>
      </PopoverContent>
    </Popover>
  );
}
