/* eslint-disable no-console */
import { mkdir, writeFile } from 'fs';
import fetch from 'node-fetch';
import { promisify } from 'util';

const SCHEMA_FILE = 'sql-review-schema.yaml';
const PROD_TEMPLATE = 'sql-review.prod.yaml';
const DEV_TEMPLATE = 'sql-review.dev.yaml';

const mkdirAsync = promisify(mkdir);
const writeFileAsync = promisify(writeFile);

const FILES_FOLDER = './data/sql-review';
const LOCALIZATION_FOLDER = './data/locales';
const CONSOLE_VERSION_FOR_SQL_REVIEW = 'main/frontend/src';
const URL = 'https://raw.githubusercontent.com/bytebase/bytebase';

const input = [
  `${URL}/${CONSOLE_VERSION_FOR_SQL_REVIEW}/types/${SCHEMA_FILE}`,
  `${URL}/${CONSOLE_VERSION_FOR_SQL_REVIEW}/types/${PROD_TEMPLATE}`,
  `${URL}/${CONSOLE_VERSION_FOR_SQL_REVIEW}/types/${DEV_TEMPLATE}`,
  `${URL}/${CONSOLE_VERSION_FOR_SQL_REVIEW}/locales/sql-review/en-US.json`,
];

const output = [
  `${FILES_FOLDER}/${SCHEMA_FILE}`,
  `${FILES_FOLDER}/${PROD_TEMPLATE}`,
  `${FILES_FOLDER}/${DEV_TEMPLATE}`,
  `${LOCALIZATION_FOLDER}/sql-review/en.json`,
];

async function downloadFile(inputUrl, outputFile) {
  console.log(`Start to fetch the SQL Review config file from ${inputUrl} to ${outputFile}.`);

  const response = await fetch(inputUrl);

  if (!response.ok) {
    console.error(`Failed to download the SQL Review config file from ${inputUrl}.`);
    process.exit(1);
  }

  const arrayBuffer = await response.arrayBuffer();
  const buffer = Buffer.from(arrayBuffer);

  await writeFileAsync(outputFile, buffer);
}

async function main() {
  try {
    await mkdirAsync(FILES_FOLDER, { recursive: true });
    await mkdirAsync(`${LOCALIZATION_FOLDER}/sql-review`, { recursive: true });

    const promises = input.map((inputUrl, index) => downloadFile(inputUrl, output[index]));

    // eslint-disable-next-line no-undef
    await Promise.all(promises);

    console.log('Successfully updated the SQL Review config file.');
  } catch (error) {
    console.error(error);
  }
}

main();
