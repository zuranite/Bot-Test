const path = require("path")

const getAllEventFiles = require("../utils/getAllEventFiles")

module.exports = (client) => {
    const eventFolders = getAllEventFiles(path.join(__dirname, "..", "events"), true)

    for (const eventFolder of eventFolders) {
        const eventFiles = getAllEventFiles(path.join(eventFolder))

        const eventName = eventFolder.replace(/\\/g, '/').split('/').pop()

        client.on(eventName, async (args) => {
            for (const eventFile of eventFiles) {
                
                const event = require(eventFile)

                await event(client, args)
            }

        })
    }
}