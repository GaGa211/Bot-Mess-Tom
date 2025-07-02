const { readFile } = require("fs/promises");
const login = require("./fca-horizon-remastered");

const client = {
    commands: new Map(),
};

const loginHandle = (error, api) => {
    if (error) return console.error("Error during login:", error);
    console.log("\nLogged in successfully!");
    api.setOptions({
<<<<<<< HEAD
        listenEvents: true, // enable for join/leave/etc events
=======
        listenEvents: true // enable for join/leave/etc events
>>>>>>> ada5966078032d177c755e7c097d06f4c3c76ed7
    });
    ["event", "command"].forEach((handler) => {
        require(`./handlers/${handler}`)(api, client);
    });
};

async function main() {
    const appState = await readFile("./appstate.json", "utf-8");
    login({ appState: JSON.parse(appState) }, loginHandle);
}

main();
