/**
 * Generates a CSS string for a scroll animation with a specified number of steps.
 *
 * @param size - The number of steps in the scroll animation.
 * @returns A string containing the CSS for the scroll animation.
 *
 * The generated CSS includes:
 * - Keyframes for the scroll animation, where each step translates the element vertically.
 * - A CSS class that applies the animation with a duration based on the number of steps.
 */
export const generateScrollAnimationCSS = (size: number): string => {
  const keyframes: string[] = [];
  const stepPercentage = 100 / (size - 1);
  const transformStep = 100 / size;

  for (let i = 0; i < size; i++) {
    const percentage = i * stepPercentage;
    const transformValue = -i * transformStep;

    keyframes.push(`
      ${(i - 0.5) * stepPercentage}% {
        transform: translateY(${transformValue}%);
      }
      ${percentage}% {
        transform: translateY(${transformValue}%);
      }
    `);
  }

  const keyframesCSS = `
    @keyframes hero-scroll-${size} {
      ${keyframes.join('')}
    }
  `;

  return `
    .scroll-animation-${size} {
      animation: hero-scroll-${size} ${3 * (size - 1)}s ease-in-out infinite;
      animation-delay: 3s;
    }
    ${keyframesCSS}
  `;
};
