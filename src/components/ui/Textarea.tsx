'use client';

import { TextareaHTMLAttributes, forwardRef, useState, useEffect } from 'react';
import { clsx } from 'clsx';

interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  error?: string;
  label?: string;
}

export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, error, label, id, ...props }, ref) => {
    const [clientId, setClientId] = useState<string>('');

    useEffect(() => {
      if (!id) {
        setClientId(`textarea-${Math.random().toString(36).substr(2, 9)}`);
      }
    }, [id]);

    const textareaId = id || clientId;

    return (
      <div className="w-full">
        {label && textareaId && (
          <label 
            htmlFor={textareaId} 
            className="block text-sm font-medium text-gray-900 mb-2"
          >
            {label}
          </label>
        )}
        <textarea
          ref={ref}
          id={textareaId}
          className={clsx(
            'w-full px-4 py-3 text-gray-900 bg-white border rounded-lg shadow-sm transition-all duration-200 resize-vertical',
            'placeholder:text-gray-500',
            'focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent',
            'hover:border-gray-400',
            error
              ? 'border-red-300 focus:ring-red-500'
              : 'border-gray-300',
            'disabled:bg-gray-50 disabled:text-gray-500 disabled:cursor-not-allowed',
            className
          )}
          {...props}
        />
        {error && (
          <p className="mt-2 text-sm text-red-600">
            {error}
          </p>
        )}
      </div>
    );
  }
);

Textarea.displayName = 'Textarea';