export default function getBlogCardColors(theme: string): {
  tagColors: string;
  titleHover: string;
} {
  const tagThemes: Record<string, { tagColors: string; titleHover: string }> = {
    announcement: {
      tagColors: 'bg-[#E0E7FF] text-[#382E9E]',
      titleHover: 'hover:text-[#382E9E]',
    },
    industry: {
      tagColors: 'bg-[#FEF6CD] text-[#8A420F]',
      titleHover: 'hover:text-[#8A420F]',
    },
    explanation: {
      tagColors: 'bg-[#D1FAE5] text-[#056049]',
      titleHover: 'hover:text-[#056049]',
    },
    engineering: {
      tagColors: 'bg-gray-94',
      titleHover: 'hover:text-gray-60',
    },
    'how-to': {
      tagColors: 'bg-[#F9E8FF] text-[#8E1B98]',
      titleHover: 'hover:text-[#8E1B98]',
    },
    'case-study': {
      tagColors: 'bg-[#CFFAFE] text-[#176782]',
      titleHover: 'hover:text-[#176782]',
    },
    tutorial: {
      tagColors: 'bg-[#D1FAE5] text-[#056049]',
      titleHover: 'hover:text-[#056049]',
    },
    newsletter: {
      tagColors: 'bg-[#FEF6CD] text-[#8A420F]',
      titleHover: 'hover:text-[#8A420F]',
    },
  };

  return tagThemes[theme] || '';
}
