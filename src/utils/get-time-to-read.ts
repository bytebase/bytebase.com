export const getTimeToRead = (content: string): string => {
  const wordsPerMinute = 200;
  const wordAmount = content.split(' ').length;

  const count = Math.ceil(wordAmount / wordsPerMinute);
  return `${count} min read`;
};
