import slugify from 'slugify';

export default function slugifyText(input: string): string {
  return slugify(input, { lower: true, strict: true, remove: /[*+~.()'"!:@]/g });
}
