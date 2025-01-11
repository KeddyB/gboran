import React, { forwardRef } from 'react'

export interface LabelProps extends React.LabelHTMLAttributes<HTMLLabelElement> {
  // You can add custom props here if needed
}

export const Label = forwardRef<HTMLLabelElement, LabelProps>(
  ({ className = '', ...props }, ref) => {
    return (
      <label
        ref={ref}
        className={`block text-sm font-medium text-gray-700 ${className}`}
        {...props}
      />
    )
  }
)

Label.displayName = 'Label'

