const { loadImage, registerFont } = require("canvas");
const { Canvas } = require("canvas-constructor/cairo");
const path = require("path");

registerFont(path.join(__dirname, "../../assets/fonts/Nunito-Black.ttf"), {
    family: "WelcomeText",
});

registerFont(path.join(__dirname, "../../assets/fonts/Nunito-ExtraBold.ttf"), {
    family: "NameText",
});

module.exports = async function (avatarUrl, text) {
    const canvas = new Canvas(1600, 700);

    const wallpaper = await loadImage(
        path.join(__dirname, "..", "..", "assets", "images", "wallpaper.jpg")
    );

    console.log(avatarUrl);

    const avatarResponse = await fetch(avatarUrl);
    const avatarArrayBuffer = await avatarResponse.arrayBuffer();
    const avatarImage = await loadImage(Buffer.from(avatarArrayBuffer));

    canvas
        .setColor("#ffffff")
        .printImage(wallpaper, 0, -368, 1600, 1068)

        .setColor("#ffffff")
        .printCircle(800, 260, 190)

        .printCircularImage(avatarImage, 800, 260, 180)

        .setTextAlign("center")
        .setColor("#ffffff")
        .setTextFont("90px WelcomeText")
        .printText("WELCOME!", 800, 560)

        .setTextFont("80px NameText")
        .printText(text, 800, 660);

    return canvas.toBufferAsync();
};
