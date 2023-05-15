import slugifyText from '@/utils/slugify-text';

import { Glossary, GlossaryLetterSet } from '@/types/glossary';

import { GLOSSARY_LIST } from './glossary-data';

const getAllGlossaryPosts = (): GlossaryLetterSet[] => {
  const glossaryListWithSlug = GLOSSARY_LIST.map((letterSet) => {
    const updatedList = letterSet.list.map((glossary) => ({
      ...glossary,
      slug: slugifyText(glossary.name),
    }));

    return {
      ...letterSet,
      list: updatedList,
    };
  });

  return glossaryListWithSlug;
};

const getGlossaryBySlug = (slug: string): Glossary | null => {
  const glossaryList = getAllGlossaryPosts();
  const result = glossaryList.reduce((acc: Glossary | null, letterSet) => {
    const glossary = letterSet.list.find((term) => term.slug === slug);

    if (glossary) {
      return glossary;
    }

    return acc;
  }, null);

  return result;
};

export { getAllGlossaryPosts, getGlossaryBySlug };
