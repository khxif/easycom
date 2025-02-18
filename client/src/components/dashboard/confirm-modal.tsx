'use client';

import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';

interface ConfirmModalProps {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  onConfirm: () => void;
  title: string;
  description: string;
  buttonText: string;
}

export function ConfirmModal({
  isOpen,
  setIsOpen,
  onConfirm,
  title,
  description,
  buttonText,
}: ConfirmModalProps) {
  return (
    <Dialog open={isOpen} onOpenChange={() => setIsOpen(false)}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
        </DialogHeader>
        <h6 className="font-medium py-2.5">{description}</h6>

        <DialogFooter>
          <div className="flex space-x-4 md:justify-end w-full">
            <Button size="sm" variant="outline" onClick={() => setIsOpen(false)} className="w-full">
             Cancel
            </Button>
            <Button size="sm" variant="destructive" onClick={onConfirm} className="w-full">
            {buttonText}
            </Button>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
