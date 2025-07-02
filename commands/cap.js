const fs = require("fs");
const https = require("https");
const { URL } = require("url");
const path = require("path");
const Command = require("../modules/command"); // Sửa đúng theo cấu trúc bot bạn

function urlHopLe(input) {
    try {
        const url = new URL(input);
        return url.protocol === "http:" || url.protocol === "https:";
    } catch (err) {
        return false;
    }
}

module.exports = new Command({
    name: "cap",
    description: "Chụp ảnh màn hình website",
    aliases: ["capture", "screenshot"],

    run(api, event, args) {
        let url = args[0];

        if (!url) {
            return api.sendMessage(
                "Vui lòng nhập URL.\nVí dụ: .cap vnexpress.net",
                event.threadID
            );
        }

        // Thêm https:// nếu thiếu
        if (!/^https?:\/\//i.test(url)) {
            url = "https://" + url;
        }

        if (!urlHopLe(url)) {
            return api.sendMessage("URL không hợp lệ!", event.threadID);
        }

        const apiUrl = `https://image.thum.io/get/width/1920/crop/400/fullpage/noanimate/${url}`;
        const filename = path.join(__dirname, "cache", "screenshot.jpeg");

        const dir = path.dirname(filename);
        if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });

        api.sendMessage("Đang tải ảnh...", event.threadID, () => {
            https
                .get(apiUrl, (res) => {
                    if (res.statusCode !== 200) {
                        console.error("Mã lỗi HTTP:", res.statusCode);
                        return api.sendMessage(
                            `Lỗi tải ảnh: ${res.statusCode}`,
                            event.threadID
                        );
                    }

                    const file = fs.createWriteStream(filename);
                    res.pipe(file);

                    file.on("finish", () => {
                        file.close();

                        const stream = fs.createReadStream(filename);
                        stream.on("error", (err) => {
                            console.error("Lỗi khi đọc file:", err.message);
                            return api.sendMessage(
                                "Không thể gửi ảnh.",
                                event.threadID
                            );
                        });

                        api.sendMessage(
                            {
                                body: "Ảnh đã chụp từ website:",
                                attachment: stream,
                            },
                            event.threadID,
                            () => {
                                fs.unlink(filename, (err) => {
                                    if (err)
                                        console.error(
                                            "Không thể xóa file:",
                                            err
                                        );
                                });
                            }
                        );
                    });
                })
                .on("error", (err) => {
                    console.error("Lỗi HTTPS:", err.message);
                    api.sendMessage(
                        "Đã xảy ra lỗi khi tải ảnh.",
                        event.threadID
                    );
                });
        });
    },
});
