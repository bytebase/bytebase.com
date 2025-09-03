const fs = require('fs');
const path = require('path');
const glob = require('glob');
const matter = require('gray-matter');

// Generate mapping of blog slugs to whether they should include reo tracking
const generateBlogReoMapping = () => {
  const contentDir = path.join(process.cwd(), 'content/blog');
  const files = glob.sync(`${contentDir}/**/*.md`, {
    ignore: '**/share/*.md',
  });

  const mapping = {};

  files.forEach((file) => {
    try {
      const slug = file.replace(`${contentDir}/`, '').replace('.md', '');
      const markdownWithMeta = fs.readFileSync(file, 'utf-8');
      const { data } = matter(markdownWithMeta);

      // Skip hidden posts
      if (!data || data.tags?.includes('Hidden')) {
        mapping[slug] = false;
        return;
      }

      // Use keypage field from frontmatter, default to false if not present
      mapping[slug] = data.keypage === true;
    } catch (error) {
      const slug = file.replace(`${contentDir}/`, '').replace('.md', '');
      // eslint-disable-next-line no-console
      console.error(`Error processing ${file}:`, error);
      mapping[slug] = false; // Default to false on error
    }
  });

  return mapping;
};

const mapping = generateBlogReoMapping();
const outputDir = path.join(process.cwd(), 'data');
const outputFile = path.join(outputDir, 'blog-reo-mapping.ts');

// Ensure directory exists
if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
}

// Generate as a TypeScript module for better import support
const content = `// Auto-generated file - do not edit manually
// Generated at build time from blog post frontmatter

export const blogReoMapping: Record<string, boolean> = ${JSON.stringify(mapping, null, 2)} as const;

export default blogReoMapping;
`;

fs.writeFileSync(outputFile, content);

// eslint-disable-next-line no-console
console.log(`Generated blog reo mapping with ${Object.keys(mapping).length} entries`);
// eslint-disable-next-line no-console
console.log(`Allowed posts: ${Object.values(mapping).filter(Boolean).length}`);
// eslint-disable-next-line no-console
console.log(`Blocked posts: ${Object.values(mapping).filter(v => !v).length}`);