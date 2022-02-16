import fileSystem from 'fs';

/**
 * @function deleteFileSync
 */
export const deleteFileSync = (filePath: string) =>
  fileSystem.unlinkSync(filePath);
