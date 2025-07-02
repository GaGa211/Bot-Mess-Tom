const { readFile } = require("fs/promises");
const login = require("./fca-horizon-remastered");

const client = {
    commands: new Map(),
};

const loginHandle = (error, api) => {
    if (error) return console.error("Error during login:", error);
    console.log("\nLogged in successfully!");

    ["event", "command"].forEach((handler) => {
        require(`./handlers/${handler}`)(api, client);
    });
};

async function main() {
    const appState = await readFile("./appstate.json", "utf-8");
    login({ appState: JSON.parse(appState) }, loginHandle);
}

main();
//   {
//   type: 'message',
//   senderID: '100063801026792',
//   threadID: '8072489162853545',
//   messageID: 'mid.$gAByt4tkBTKmd-oCwFGXyTtnIXwKv',
//   args: [ 'Hhh' ],
//   body: 'Hhh',
//   attachments: [],
//   mentions: {},
//   timestamp: '1751427803156',
//   isGroup: true,
//   participantIDs: [ '100082616674011', '61556821182282', '100063801026792' ]
// }
