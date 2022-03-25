import { homedir } from 'os';
import { join } from 'path';
import { promises } from 'fs';

const filePath = join(homedir(), 'weather-data.json');

const TOKEN_DICTIONARY = {
  token: 'token',
  city: 'city',
};

const saveKeyValue = async (key, value) => {
  const data = await readData();
  data[key] = value;

  await promises.writeFile(filePath, JSON.stringify(data));
};

const getKeyValue = async key => {
  const data = await readData();
  if (data) return data[key];

  return undefined;
};

const isExist = async path => {
  try {
    await promises.stat(path);
    return true;
  } catch (e) {
    return false;
  }
};

const readData = async () => {
  if (await isExist(filePath)) {
    const data = await promises.readFile(filePath, { encoding: 'utf8' });
    return JSON.parse(data);
  }
};

export { saveKeyValue, getKeyValue, readData, TOKEN_DICTIONARY };
