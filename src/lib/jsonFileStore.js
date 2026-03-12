import fs from 'node:fs/promises';
import path from 'node:path';

const ensureParentDir = async (filePath) => {
  await fs.mkdir(path.dirname(filePath), { recursive: true });
};

export const readJsonFile = async (filePath) => {
  try {
    const raw = await fs.readFile(filePath, 'utf8');
    return JSON.parse(raw);
  } catch (error) {
    if (error.code === 'ENOENT' || error.name === 'SyntaxError') {
      return null;
    }
    throw error;
  }
};

export const writeJsonFile = async (filePath, payload) => {
  await ensureParentDir(filePath);
  const tempFile = `${filePath}.${Date.now()}.tmp`;
  await fs.writeFile(tempFile, JSON.stringify(payload, null, 2), 'utf8');
  await fs.rename(tempFile, filePath);
};
