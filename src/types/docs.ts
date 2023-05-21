type SidebarItem = {
  title: string | null;
  url: string | null;
  depth: number;
  children?: SidebarItem[];
  path?: number[];
};

type PreviousAndNextLinks = {
  previousLink: SidebarItem | undefined;
  nextLink: SidebarItem | undefined;
};

type PostData = {
  slug: string;
  title: string;
  feature_image?: string;
  description: string;
  isDraft: boolean;
  content: string;
};

type TableOfContents = {
  title: string;
  id: string;
  level: number;
};

export type { SidebarItem, PreviousAndNextLinks, PostData, TableOfContents };
