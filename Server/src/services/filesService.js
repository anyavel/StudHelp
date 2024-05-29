// const path = require('path');
// const { v4 } = require('uuid');
// const fs = require('fs/promises');
import path from 'path';
import  { v4 } from 'uuid';
import fs from 'fs/promises';


class FilesService {
    //files - array of files from body, returns array with filenames
    constructor(directory = 'static') {
        this.filesDirPath = path.join(process.cwd(), directory);
    }

    async saveFiles(files = []) {
        const fileNames = [];
        for (const f of files) {
            try {
                const path = await this.saveFile(f);
                fileNames.push(path);
            } catch {
                return fileNames;
            }
        }
        return fileNames;
    }

    //fileNames - string[]
    async deleteFiles(fileNames) {
        try {
            const filesDirPath = path.join(process.cwd(), 'static');
            for (const f of fileNames) {
                const filePath = path.join(filesDirPath, f);
                await this.deleteFile(filePath);
            }
        } catch {
            return;
        }
    }

    deleteFile(fileName) {
        return fs.unlink(fileName);
    }

    getRandomFileName(mimetype) {
        const ext = mimetype.split('/')[1];
        return v4() + '.' + ext;
    }

    async saveFile(file) {
        const fileName = this.getRandomFileName(file.mimetype);
        const filePath = path.join(this.filesDirPath, fileName);
        await file.mv(filePath);
        return fileName;
    }
}

export const filesService = new FilesService();