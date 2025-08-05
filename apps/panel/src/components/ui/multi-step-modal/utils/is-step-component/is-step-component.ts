import { isValidElement } from 'react';
import type { MultiStepModalStepProps } from '../../multi-step-modal-step';

// Type guard to check if element is a valid step component
export const isStepComponent = (
  child: unknown
): child is React.ReactElement<MultiStepModalStepProps> => {
  return (
    isValidElement(child) &&
    child.props !== null &&
    typeof child.props === 'object' &&
    'title' in child.props &&
    'children' in child.props
  );
};
