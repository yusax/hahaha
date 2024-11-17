import React from 'react';
import { DayPicker } from 'react-day-picker';
import { ja } from 'date-fns/locale';
import 'react-day-picker/dist/style.css';

interface DatePickerProps {
  selected: Date | undefined;
  onSelect: (date: Date | undefined) => void;
}

export function DatePicker({ selected, onSelect }: DatePickerProps) {
  return (
    <div className="bg-white rounded-lg shadow-sm p-4">
      <DayPicker
        mode="single"
        selected={selected}
        onSelect={onSelect}
        locale={ja}
        showOutsideDays
        className="!font-sans"
        classNames={{
          day_selected: "bg-indigo-600 text-white hover:bg-indigo-700",
          day_today: "font-bold text-indigo-600",
        }}
      />
    </div>
  );
}