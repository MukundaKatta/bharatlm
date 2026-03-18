'use client';

import React from 'react';
import { cn } from '@/utils/cn';

interface TextAreaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  indicFont?: string;
}

export function TextArea({ label, indicFont, className, ...props }: TextAreaProps) {
  return (
    <div className="flex flex-col gap-1.5">
      {label && (
        <label className="text-sm font-medium text-gray-700">{label}</label>
      )}
      <textarea
        className={cn(
          'rounded-lg border border-gray-300 bg-white px-4 py-3 text-indic-base',
          'focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-200',
          'transition-colors duration-200 resize-none leading-relaxed',
          indicFont,
          className
        )}
        {...props}
      />
    </div>
  );
}
