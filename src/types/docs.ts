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

type Breadcrumb = {
  title: string | null;
  url: string | null;
};

type PostData = {
  slug: string;
  title: string;
  description: string;
  isDraft: boolean;
  content: string;
};

export type { SidebarItem, PreviousAndNextLinks, Breadcrumb, PostData };
