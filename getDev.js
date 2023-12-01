const fs = require('fs');
const archiver = require('archiver');
const request = require('request');
const extract = require("extract-zip");

const url = 'https://clp2-panel.intredo.dev';
//const url = 'https://127.0.0.1:8000';
const urlPath = '/api/build_dev_page';
const pageId = 5;
const apiKey = 'x';
const outputDirectory = __dirname + '/dev/';

const tmpZipFilePath = __dirname + '/dev.zip';
const tmpZipOutput = fs.createWriteStream(tmpZipFilePath);

const archive = archiver('zip', {
    zlib: {level: 5}
});

tmpZipOutput.on('close', function () {
    console.log(archive.pointer() + ' total bytes');
    console.log('archiver has been finalized and the output file descriptor has closed.');

    const cookieJar = request.jar();
    const cookie = request.cookie('XDEBUG_SESSION=start');
    cookieJar.setCookie(cookie, url);

    request({
        url: url + urlPath,
        jar: cookieJar,
        method: 'POST',
        rejectUnauthorized: false,
        headers: {
            'x-api-key': apiKey
        },
        formData: {
            'pageId': pageId,
            'templateFiles': fs.createReadStream(tmpZipFilePath),
        }
    }, function (error, response, body) {
        fs.unlinkSync(tmpZipFilePath);

        if (response && response.statusCode === 200) {
            const responseData = JSON.parse(body);
            if (responseData.error) {
                throw responseData.error;
            } else {
                let data = responseData.file;
                let buff = Buffer.from(data, 'base64');
                fs.writeFile(tmpZipFilePath, buff, async function (err) {
                    if (err) {
                        throw err;
                    }
                    await extract(tmpZipFilePath, {dir: outputDirectory});
                    fs.unlinkSync(tmpZipFilePath);
                    console.log("The file was saved!");
                });
            }
        } else {
            throw 'API response HTTP code: ' + response.statusCode + ', error: ' + error;
        }
    });
});

tmpZipOutput.on('warning', function (err) {
    throw err;
});

tmpZipOutput.on('error', function (err) {
    throw err;
});

archive.on('warning', function (err) {
    throw err;
});

archive.on('error', function (err) {
    throw err;
});

archive.pipe(tmpZipOutput);

const file1 = __dirname + '/template_config.json';
archive.append(fs.createReadStream(file1), {name: 'template_config.json'});

archive.directory('dist/', 'dist');
archive.finalize();
