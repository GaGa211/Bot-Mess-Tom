const { readdirSync } = require("fs");
const Event = require("../modules/event");
const path = require("path");

module.exports = async function (api, client) {
    const eventsPath = path.join(__dirname, "..", "events");
    const events = readdirSync(eventsPath).filter((f) => f.endsWith(".js"));
    for (const event of events) {
        const eventModule = require(path.join(eventsPath, event));
        if (!(eventModule instanceof Event)) continue;
        api.listenMqtt((error, event) => {
            if (event.type && event.type === eventModule.type) {
                eventModule.run(api, client, event);
            }
        });
    }
    console.log("Events loaded successfully.");
};
