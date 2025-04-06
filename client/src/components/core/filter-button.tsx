'use client';

import { Button } from '@/components/ui/button';
import { FormLabel } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { LucideIcon } from 'lucide-react';
import { FormEvent, useState } from 'react';

interface FilterButtonProps {
  value: string | null;
  setValue: (value: string) => void;
  placeholder: string;
  label: string;
  icon: LucideIcon;
}

export function FilterButton({
  value,
  setValue,
  placeholder,
  label,
  icon: Icon,
}: FilterButtonProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [tempLocation, setTempLocation] = useState(value ?? '');

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setValue(tempLocation);
    setIsOpen(false);
  };
  return (
    <Popover open={isOpen} onOpenChange={setIsOpen}>
      <PopoverTrigger asChild>
        <Button variant="outline" className="flex items-center gap-2 max-w-fit">
          <Icon className="size-5" />
          <>{value ? value : label}</>
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-72 p-4" align="start" sideOffset={10}>
        <form onSubmit={handleSubmit} className="flex flex-col space-y-4">
          <FormLabel>{label}</FormLabel>
          <Input
            value={tempLocation}
            onChange={e => setTempLocation(e.target.value)}
            placeholder={placeholder}
            className="w-full"
          />
          <Button type="submit" size="sm" className="w-full">
            Apply
          </Button>
        </form>
      </PopoverContent>
    </Popover>
  );
}
