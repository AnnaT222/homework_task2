import { appendFile, statSync } from "fs"
import { readdir } from "fs/promises"
import { resolve } from "path"
import fs from "fs";
const current = {
    count: 0,
    path: './'
}
async function findDippestDir(thisPath = './', count = 0) {
    if (current.count < count) {
        current.count = count,
            current.path = thisPath
    } else if (current.count == count) {
        current.path = [current.path, thisPath].flat()
    }
    try {
        const files = await readdir(thisPath)

        for (const file of files) {
            let isFolder = statSync(resolve(thisPath, file)).isDirectory()
            if (isFolder) {
                await findDippestDir(resolve(thisPath, file), count + 1)
            }
        }
    } catch (error) {
        console.log(error);
    }
}

await findDippestDir()
console.log(current);
fs.appendFile(resolve(current.path?.[0], 'file.txt'), "file content", (err) => {
    if (err) {
        console.log(current.path?.[0]);
        throw err
    } else {
        console.log("File added successfully in " + '  ' + current.path?.[0]);
    }
})
