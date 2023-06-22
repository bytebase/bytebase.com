import slug from 'slug';

export default function slugifyText(input: string): string {
  return slug(input);
}
