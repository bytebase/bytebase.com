/* eslint-disable no-console */
import { mkdir, writeFile } from 'fs';
import fetch from 'node-fetch';
import { promisify } from 'util';

const SCHEMA_FILE = 'sql-review-schema.yaml';
const PROD_TEMPLATE = 'sql-review.prod.yaml';
const DEV_TEMPLATE = 'sql-review.dev.yaml';

const mkdirAsync = promisify(mkdir);
const writeFileAsync = promisify(writeFile);

const LOCALIZATION_FOLDER = './src/locales';
const CONSOLE_VERSION_FOR_SQL_REVIEW = 'main';
const URL = 'https://raw.githubusercontent.com/bytebase/bytebase';

const input = [
  `${URL}/${CONSOLE_VERSION_FOR_SQL_REVIEW}/frontend/src/types/${SCHEMA_FILE}`,
  `${URL}/${CONSOLE_VERSION_FOR_SQL_REVIEW}/backend/plugin/advisor/config/${PROD_TEMPLATE}`,
  `${URL}/${CONSOLE_VERSION_FOR_SQL_REVIEW}/backend/plugin/advisor/config/${DEV_TEMPLATE}`,
  `${URL}/${CONSOLE_VERSION_FOR_SQL_REVIEW}/frontend/src/locales/sql-review/en-US.json`,
];

const output = [
  `./data/${SCHEMA_FILE}`,
  `./data/${PROD_TEMPLATE}`,
  `./data/${DEV_TEMPLATE}`,
  `${LOCALIZATION_FOLDER}/sql-review/en.json`,
];

async function downloadFile(inputUrl, outputFile) {
  console.log(`Start to fetch the SQL Review config file from ${inputUrl} to ${outputFile}.`);

  const response = await fetch(inputUrl);

  if (!response.ok) {
    console.error(`Failed to download the SQL Review config file from ${inputUrl}.`);
    process.exit(1);
  }

  const buffer = await response.buffer();

  await writeFileAsync(outputFile, buffer);
}

async function main() {
  try {
    await mkdirAsync(`${LOCALIZATION_FOLDER}/sql-review`, { recursive: true });
    await mkdirAsync(`${LOCALIZATION_FOLDER}/subscription`, { recursive: true });

    const promises = input.map((inputUrl, index) => downloadFile(inputUrl, output[index]));

    // eslint-disable-next-line no-undef
    await Promise.all(promises);

    console.log('Successfully updated the SQL Review config file.');
  } catch (error) {
    console.error(error);
  }
}

main();
