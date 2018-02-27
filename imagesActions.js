const webshot = require('webshot') //handle dependency injection
const thumb = require('node-thumbnail').thumb //handle dependency injection
const fs = require('fs') //handle dependency injection

const takeScreenShot = (url, name, folder) => {
    const options = {
        screenSize: {
            width: 1080,
            height: 768
        },
        shotSize: {
            width: 'all',
            height: 'all'
        }
    }

    return new Promise((resolve, reject) => {
        webshot(url, folder + '/' + name + '.png', options, function (err) {
            if(err) reject(err)
            resolve()
        })
    })
}


const createThumb = async (source, destination) => {
    const options = {
        source: source,
        destination: destination,
        concurrency: 4,
        width: 48,
        quiet: true,
        overwrite: true
    }

    try {
        return await thumb(options)
    } catch(e){
        throw (e)
    }
}

const getPreviews = (folder) => {
    return new Promise( (resolve, reject) => {
        fs.readdir(folder, (err, files) => {
            if(err) reject(err)
            resolve(files)
        })
    })
}

const screenshotUrls = async (urls, folder) => {
    try{
        for (let url of urls) {
            console.log('Taking screenshot from ' +url.address)
            await takeScreenShot(url.address, url.name, folder)
        }

        return 'Done'
    }catch(e){
        throw(e)
    }
}

const createThumbnails = async (previewFolder, thumbFolder) => {
    try {
        let previews = await getPreviews(previewFolder)
        previews = previews.filter( i => i.indexOf('p__') == -1 )

        for (let preview of previews) {
            console.log('Saving thumbnail of ' +preview)
            await createThumb(previewFolder+'/'+preview, thumbFolder)
            fs.renameSync(previewFolder+'/'+preview, previewFolder+'/p__'+preview);
        }

        return 'Done'
    } catch(e) {
        throw (e)
    }
}

const checkFolderExistence = (folder) => {
    return new Promise(resolve => {
        if (!fs.existsSync(folder)) {
            fs.mkdirSync(folder)
            resolve()
        }
        resolve()
    })
}

module.exports = {
    checkFolderExistence,
    screenshotUrls,
    createThumbnails
}

//screenshotUrls([ { address: 'google.com', name: 'google1' }, { address: 'google.com', name: 'google2' }, ], './previews')
//.then(console.log)
//createThumbnails('./previews', './thumb')
//.then(console.log)