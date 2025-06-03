import { ReactNode, Children, isValidElement } from 'react';
import slugifyText from './slugify-text';

/**
 * Flattens React children to a plain string for ID generation
 */
const flattenChildrenToString = (children: ReactNode): string => {
  return Children.toArray(children)
    .map((child) => {
      if (typeof child === 'string' || typeof child === 'number' || typeof child === 'boolean') {
        return child.toString();
      }
      if (isValidElement(child)) {
        return flattenChildrenToString(child.props.children);
      }
      return '';
    })
    .join('');
};

/**
 * Generates a URL-friendly anchor ID for headings
 * Handles both string titles and React children
 */
export const generateHeadingId = (input: string | ReactNode): string => {
  if (typeof input === 'string') {
    return slugifyText(input);
  }

  const text = flattenChildrenToString(input);
  return slugifyText(text);
};

export default generateHeadingId;
