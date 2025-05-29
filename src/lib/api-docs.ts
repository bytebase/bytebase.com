import { parseLine } from '@/utils/docs';
import slugifyText from '@/utils/slugify-text';
import fs from 'fs';
import * as glob from 'glob';
import matter from 'gray-matter';

import { Breadcrumb } from '@/types/breadcrumb';

import { PostData, PreviousAndNextLinks, SidebarItem, TableOfContents } from '@/types/docs';

const getPostSlugs = (docsPath: string): string[] => {
  const files = glob.sync(`${docsPath}/**/*.md`, {
    ignore: ['**/_layout.md', `${docsPath}/share/**/*.md`],
  });
  return files.map((file) => file.replace(docsPath, '').replace('.md', ''));
};

const getPostBySlug = (
  docsPath: string,
  slug: string,
): { data: Record<string, any>; content: string } | null => {
  try {
    const VERSION = fs.readFileSync(`${process.cwd()}/VERSION`).toString();
    const API_ENDPOINT = 'http://bytebase.example.com';
    const source = fs.readFileSync(`${docsPath}/${slug}.md`);
    const { data, content } = matter(source);

    const contentWithReplacements = content.replace(
      /%%bb_version%%|%%bb_api_endpoint%%/g,
      (match) => {
        if (match === '%%bb_version%%') {
          return VERSION;
        } else if (match === '%%bb_api_endpoint%%') {
          return API_ENDPOINT;
        }
        return match; // Just in case there's a match that doesn't fit any case
      },
    );

    return { data, content: contentWithReplacements };
  } catch (e) {
    return null;
  }
};

const getAllPosts = (docsPath: string): PostData[] => {
  const slugs = getPostSlugs(docsPath);

  return slugs
    .map((slug) => {
      const postData = getPostBySlug(docsPath, slug);
      if (!postData) return null;
      const slugWithoutFirstSlash = slug.slice(1);
      const { data, content } = postData;
      return {
        slug: slugWithoutFirstSlash,
        title: data.title,
        description: data.description,
        isDraft: data.isDraft,
        content,
      };
    })
    .filter(
      (item) => process.env.NEXT_PUBLIC_VERCEL_ENV !== 'production' || !item?.isDraft,
    ) as PostData[];
};

const getNestedSidebar = (data: SidebarItem[]): SidebarItem[] => {
  for (let i = 0; i < data.length; i++) {
    const section = data[i];
    const nextSection = data[i + 1];

    if (nextSection && nextSection?.depth > section?.depth) {
      data.splice(i + 1, 1);
      section.children = section.children || [];
      section.children.push(nextSection);
      getNestedSidebar(section.children);
      i--;
    }
  }

  return data;
};

const getSidebar = (docsPath: string): { sidebar: SidebarItem[]; expandedList: string[] } => {
  const layoutFile = glob.sync(`${docsPath}/_layout.md`);

  const sidebar: SidebarItem[] = [];

  const md = fs.readFileSync(layoutFile[0], 'utf-8');
  const { data, content } = matter(md);

  const lines = content.trim().split('\n');

  let currentSection: SidebarItem | null = null;

  lines.forEach((line) => {
    const [depth, title, url] = parseLine(line);
    if (depth !== null) {
      currentSection = { title, url, depth };
      sidebar.push(currentSection);
    } else if (currentSection && title) {
      currentSection.children = currentSection.children || [];
      currentSection.children.push({ title, url, depth: currentSection?.depth + 1 });
    }
  });

  return { sidebar: getNestedSidebar(sidebar), expandedList: data.expand_section_list };
};

const getFlatSidebar = (sidebar: SidebarItem[], path: number[] = []): SidebarItem[] => {
  return sidebar.reduce((acc, item, index) => {
    const current = { title: item.title, url: item.url, depth: item.depth, path: [...path, index] };
    if (item.children) {
      return [...acc, current, ...getFlatSidebar(item.children, current.path)];
    }
    return [...acc, { ...item, path: [...path, index] }];
  }, [] as SidebarItem[]);
};

const getDocPreviousAndNextLinks = (
  slug: string,
  flatSidebar: SidebarItem[],
): PreviousAndNextLinks => {
  const items = flatSidebar.filter((item) => item.url);

  const currentItemIndex = items.findIndex((item) => item.url === slug);
  const previousItem = items[currentItemIndex - 1];
  const nextItem = items[currentItemIndex + 1];

  return { previousLink: previousItem, nextLink: nextItem };
};

const getBreadcrumbs = (
  docsPath: string,
  currentPath: string,
  flatSidebar: SidebarItem[],
): Breadcrumb[] => {
  const path = flatSidebar.find((item) => item.url === currentPath)?.path;
  const { sidebar } = getSidebar(docsPath);

  const arr: Breadcrumb[] = [];

  if (path) {
    path.reduce((prev, cur) => {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      const current = prev?.[cur] || prev?.children?.[cur];

      arr.push({
        title: current.title,
        url: current.url ? current.url : undefined,
      });
      return current;
    }, sidebar as SidebarItem[] | SidebarItem);

    return arr.slice(0, -1);
  }

  return [];
};

const getTableOfContents = (content: string): TableOfContents[] => {
  const headings = content.match(/(#+)\s(.*)/g) || [];
  const arr = headings.map((item) => item.replace(/(#+)\s/, '$1 '));

  const toc: TableOfContents[] = [];

  arr.forEach((item) => {
    const [depth, title] = parseLine(item);
    if (title && depth && depth <= 2) {
      const id = slugifyText(title);

      toc.push({
        title: title.replace(/[^a-zA-Z0-9+\\/\-~_:,.<>&?!()\s"]/g, ''),
        id,
        level: depth + 1,
      });
    }
  });

  return toc;
};

export {
  getPostSlugs,
  getPostBySlug,
  getAllPosts,
  getSidebar,
  getFlatSidebar,
  getDocPreviousAndNextLinks,
  getBreadcrumbs,
  getTableOfContents,
};
