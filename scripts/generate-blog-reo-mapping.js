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

  const allowedTags = ['Announcement', 'Case Study', 'Comparison', 'Engineering'];
  const mapping = {};

  files.forEach((file) => {
    try {
      const slug = file.replace(`${contentDir}/`, '').replace('.md', '');
      const markdownWithMeta = fs.readFileSync(file, 'utf-8');
      const { data } = matter(markdownWithMeta);

      if (!data || data.tags?.includes('Hidden')) {
        mapping[slug] = false;
        return;
      }

      const tags = data.tags ? data.tags.split(',').map(tag => tag.trim()) : [];
      const hasAllowedTag = allowedTags.some(tag => tags.includes(tag));
      
      mapping[slug] = hasAllowedTag;
    } catch (error) {
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

console.log(`Generated blog reo mapping with ${Object.keys(mapping).length} entries`);
console.log(`Allowed posts: ${Object.values(mapping).filter(Boolean).length}`);
console.log(`Blocked posts: ${Object.values(mapping).filter(v => !v).length}`);