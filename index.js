const fs = require("fs");
const login = require("./fca-horizon-remastered");

login(
  { appState: JSON.parse(fs.readFileSync("appstate.json", "utf8")) },
  (err, api) => {
    if (err) return console.error(err);
    console.log("Login success!");

    api.sendMessage("Xin chào từ bot!", "8072489162853545");
  }
);
