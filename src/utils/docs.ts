import * as he from 'he';

function parseLine(line: string): [number | null, string | null, string | null] {
  const match = line.match(/^#+\s*\[(.*?)\]\((.*?)\)$/);
  const matchWithoutLink = line.match(/^#+\s*(.*?)$/);
  const separator = line.match(/^---$/);

  if (match) {
    const len = match[0]?.match(/^#+/)?.[0]?.length;
    const depth = len ? len - 1 : null;
    const title = match[1];
    const url = match[2];

    return [depth, he.decode(title), url];
  } else if (matchWithoutLink) {
    const len = matchWithoutLink[0]?.match(/^#+/)?.[0]?.length;
    const depth = len ? len - 1 : null;
    const title = matchWithoutLink[1];

    return [depth, he.decode(title), null];
  } else if (separator) {
    return [1, '---', null];
  } else {
    return [null, null, null];
  }
}

export { parseLine };
