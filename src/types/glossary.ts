export type GlossaryTag = 'All' | 'General' | 'Bytebase' | 'MySQL' | 'PostgreSQL';

export type Glossary = {
  name: string;
  description: string;
  reference?: string;
  slug?: string;
  tagList: GlossaryTag[];
};

export type GlossaryLetterSet = {
  letter: string;
  list: Glossary[];
};
