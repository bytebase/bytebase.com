import { ReactNode, Children, isValidElement } from 'react';
import slugifyText from './slugify-text';

/**
 * Context for tracking used heading IDs to handle duplicates
 */
export interface HeadingIdContext {
  usedIds: Set<string>;
}

/**
 * Creates a new heading ID context
 */
export const createHeadingIdContext = (): HeadingIdContext => ({
  usedIds: new Set<string>(),
});

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
 * Automatically handles duplicates by appending -1, -2, etc.
 */
export const generateHeadingId = (
  input: string | ReactNode,
  context?: HeadingIdContext,
): string => {
  let baseText: string;

  if (typeof input === 'string') {
    baseText = input;
  } else {
    baseText = flattenChildrenToString(input);
  }

  const baseId = slugifyText(baseText);

  // If no context provided, return the base ID (backward compatibility)
  if (!context) {
    return baseId;
  }

  // Check for duplicates and append suffix if needed
  let finalId = baseId;
  let counter = 1;

  while (context.usedIds.has(finalId)) {
    finalId = `${baseId}-${counter}`;
    counter++;
  }

  // Track the used ID
  context.usedIds.add(finalId);

  return finalId;
};

export default generateHeadingId;
