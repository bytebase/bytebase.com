export const getExcerpt = ({ content, length = 5000 }: { content: string; length?: number }) => {
  const excerpt = content
    .replace(/```([\s\S]*?)```/g, '') // remove code blocks
    .replace(/<[^>]*>/g, '') // remove html tags
    .replace(/[\r\n]+/gm, ' ') // replace new lines with spaces
    .replace(/\s+/g, ' ') // replace multiple spaces with single space
    .replace(/\[([^\]]+)]\([^)]+\)/g, '$1') // replace markdown links with link text
    .replace(/([*~`#])/g, '') // remove markdown formatting
    .trim();

  return excerpt.length > length ? `${excerpt.substring(0, length)}...` : excerpt;
};
