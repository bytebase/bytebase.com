/* eslint-disable no-console */
/* eslint-disable @typescript-eslint/no-var-requires */
const { mkdir, writeFile } = require('fs');
const { promisify } = require('util');
const fetch = require('node-fetch');

const mkdirAsync = promisify(mkdir);
const writeFileAsync = promisify(writeFile);

const SCHEMA_FILE = 'sql-review-schema.yaml';
const PROD_TEMPLATE = 'sql-review.prod.yaml';
const DEV_TEMPLATE = 'sql-review.dev.yaml';
const LOCALIZATION_FOLDER = './src/locales';
const CONSOLE_VERSION_FOR_PRICING = 'main';
const CONSOLE_VERSION_FOR_SQL_REVIEW = 'main';
const URL = 'https://raw.githubusercontent.com/bytebase/bytebase';

const input = [
  // SQL review files
  `${URL}/${CONSOLE_VERSION_FOR_SQL_REVIEW}/frontend/src/types/${SCHEMA_FILE}`,
  `${URL}/${CONSOLE_VERSION_FOR_SQL_REVIEW}/backend/plugin/advisor/config/${PROD_TEMPLATE}`,
  `${URL}/${CONSOLE_VERSION_FOR_SQL_REVIEW}/backend/plugin/advisor/config/${DEV_TEMPLATE}`,
  `${URL}/${CONSOLE_VERSION_FOR_SQL_REVIEW}/frontend/src/locales/sql-review/en-US.json`,
  `${URL}/${CONSOLE_VERSION_FOR_SQL_REVIEW}/frontend/src/locales/sql-review/zh-CN.json`,
  // subscription files
  `${URL}/${CONSOLE_VERSION_FOR_PRICING}/frontend/src/types/plan.yaml`,
  `${URL}/${CONSOLE_VERSION_FOR_PRICING}/frontend/src/locales/subscription/en-US.json`,
  `${URL}/${CONSOLE_VERSION_FOR_PRICING}/frontend/src/locales/subscription/zh-CN.json`,
];
const output = [
  // SQL review files
  `./data/${SCHEMA_FILE}`,
  `./data/${PROD_TEMPLATE}`,
  `./data/${DEV_TEMPLATE}`,
  `${LOCALIZATION_FOLDER}/sql-review/en.json`,
  `${LOCALIZATION_FOLDER}/sql-review/zh.json`,
  // subscription files
  `./data/plan.yaml`,
  `${LOCALIZATION_FOLDER}/subscription/en.json`,
  `${LOCALIZATION_FOLDER}/subscription/zh.json`,
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

    for (let i = 0; i < input.length; i++) {
      await downloadFile(input[i], output[i]);
    }

    console.log('Successfully updated the SQL Review config file.');
  } catch (error) {
    console.error(error);
  }
}

main();
