// storageService.js

const fs = require('fs').promises;
const path = require('path');

module.exports = {
  saveFile: async (fileData, destination) => {
    try {
      // Generate a unique filename by appending the current timestamp and the original file extension
      const filename = Date.now() + '-' + fileData.originalname;

      // Convert ArrayBuffer to Buffer
      const buffer = Buffer.from(fileData.buffer);

      // Save the file to the specified destination
      const filePath = path.join(destination, filename);

      await fs.writeFile(filePath, buffer);

      return filePath;
    } catch (error) {
      throw error;
    }
  },
};
