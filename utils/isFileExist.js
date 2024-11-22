import { promises as fs } from 'fs';

export default async function isFileExist(filePath) {
    try {
        await fs.access(filePath);
        return true;
    } catch (err) {
        return false;
    }
}