import { Filesystem, Directory } from '@capacitor/filesystem';

const filePath = "BotoesMemes/CachedAudio.wav";

export async function writeCacheFile(fileContent) {
    try {
        const result = await Filesystem.writeFile({
            path: filePath,
            data: fileContent,
            directory: Directory.Cache,
            recursive: true
        });
        console.log('File written to cache:', result.uri);
    } catch (err) {
        console.error('Error writing file to cache:', err);
    }
}

export async function readCacheFile() {
    try {
        var file = await Filesystem.readFile({
            path: filePath,
            directory: Directory.Cache
        });

        return file?.data ? file?.data : "";
    } catch (err) {
        console.log("Error while fetching cached file: " + err);
    }
}