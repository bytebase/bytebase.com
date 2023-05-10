export const getExcerpt = ({ content, length = 5000 }: { content: string; length?: number }) => {
  const emojiRegex =
    /([\u2700-\u27BF]|[\uE000-\uF8FF]|\uD83C[\uDC00-\uDFFF]|\uD83D[\uDC00-\uDFFF]|[\u2011-\u26FF]|\uD83E[\uDD10-\uDDFF])/g;
  const excerpt = content
    .replace(/```([\s\S]*?)```/g, '') // remove code blocks
    .replace(/<[^>]*>/g, '') // remove html tags
    .replace(emojiRegex, '') // remove emojis
    .replace(/[\r\n]+/gm, ' ') // replace new lines with spaces
    .replace(/\[([^\]]+)]\([^)]+\)/g, '$1') // replace markdown links with link text
    // remove tables
    .replace(/--+/g, '') // remove long dashes
    .replace(/\|/g, '') // remove all pipe characters
    .replace(/\s+/g, ' ') // replace multiple spaces with single space
    .replace(/([*~`#])/g, '') // remove markdown formatting
    .trim();

  return excerpt.length > length ? `${excerpt.substring(0, length)}...` : excerpt;
};
