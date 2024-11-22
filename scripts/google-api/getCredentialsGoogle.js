import { promises as fs } from 'fs';
import * as path from 'path';

import { google } from 'googleapis';
import { authenticate } from '@google-cloud/local-auth';

// utils
import isFileExist from '../../utils/isFileExist.js';

// settings
const ROOT_DIR = process.cwd();
const GOOGLE_CREDENTIALS_PATH = path.join(ROOT_DIR, './googleCredentials');
const TOKEN_PATH = path.join(GOOGLE_CREDENTIALS_PATH, 'token.json');
const CREDENTIALS_PATH = path.join(GOOGLE_CREDENTIALS_PATH, 'credentials.json')

// If modifying these scopes, delete token.json.
const SCOPES = ['https://www.googleapis.com/auth/spreadsheets'];
// The file token.json stores the user's access and refresh tokens, and is
// created automatically when the authorization flow completes for the first
// time.

/**
 * Reads previously authorized credentials from the save file.
 *
 * @return {Promise<OAuth2Client|null>}
 */
async function loadSavedCredentialsIfExist() {
  try {
    const content = await fs.readFile(TOKEN_PATH);
    const credentials = JSON.parse(content);
    return google.auth.fromJSON(credentials);
  } catch (err) {
    return null;
  }
}

/**
 * Serializes credentials to a file compatible with GoogleAuth.fromJSON.
 *
 * @param {OAuth2Client} client
 * @return {Promise<void>}
 */
async function saveCredentials(client) {
  const content = await fs.readFile(CREDENTIALS_PATH);
  const keys = JSON.parse(content);
  const key = keys.installed || keys.web;
  const payload = JSON.stringify({
    type: 'authorized_user',
    client_id: key.client_id,
    client_secret: key.client_secret,
    refresh_token: client.credentials.refresh_token,
  });
  await fs.writeFile(TOKEN_PATH, payload);
}

/**
 * Load or request or authorization to call APIs.
 *
 */
export default async function authorize() {
  let client = await loadSavedCredentialsIfExist();
  if (client) {
    return client;
  } 

  const isCredentialsExist = await isFileExist(CREDENTIALS_PATH);
  if(!isCredentialsExist) {
    throw new Error(`
        Credentials not found.
        need google credentials into this path: ${CREDENTIALS_PATH}.
        how to get credentials: 'https://habr.com/ru/sandbox/191038/'
    `);
  }

  client = await authenticate({
    scopes: SCOPES,
    keyfilePath: CREDENTIALS_PATH,
  });
  console.log('client ',  client)
  if (client.credentials) {
    await saveCredentials(client);
  }
  return client;
}

