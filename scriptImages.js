const imageActions = require('./imagesActions')

const urlArray = [
    { address: 'google.com', name: 'google' },
    { address: 'github.com', name: 'git' },
    { address: 'discord.com', name: 'discord' }
]
const previewsFolder =  './previews'
const thumbsFolder =  './thumbs'

const run = async () => {
    try {
        await imageActions.checkFolderExistence(previewsFolder)
        await imageActions.checkFolderExistence(thumbsFolder)

        const previews = await imageActions.screenshotUrls(urlArray, previewsFolder)
        console.log(previews)

        const thumbs = await imageActions.createThumbnails(previewsFolder, thumbsFolder)
        console.log(thumbs)
    } catch(e) {
        console.log(e)
    }
}

run()