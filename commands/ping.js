const Command = require("../modules/command");

module.exports = new Command({
    name: "ping",
    aliases: ["p"],
    description: "Check the bot's ping",
    run(api, field, args) {
        const { threadID } = field;
        api.sendMessage(`Pong`, threadID);
    },
});
