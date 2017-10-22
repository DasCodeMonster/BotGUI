const electron = require("electron");
const {app, BrowserWindow, Menu} = electron;
const path = require("path");
const url = require("url");
var mainwindow
var menuTemplate = [
    {
        label: "file",
        submenu: [
            {
                label: "test",
                click() {
                    console.log("test");
                }
            }, {
                label: "quit",
                accelerator: process.platform === "darwin" ? "Command+Q":"Ctrl+Q",
                click() {
                    app.quit();
                }
            }, {
                label: "new",
                click() {
                    createWindow("add.html", 300, 200, "add Item", false, mainwindow);
                }
            }
        ]
    }
];
if (process.platform === "darwin") {
    menuTemplate.unshift({});
}
app.on("ready", ()=> {
    mainwindow = createWindow("discord.html", 1480, 760, "main", false, false);
    // mainwindow = createWindow("discord.html", 100, 100, "main", false, false);
    const mainMenu = Menu.buildFromTemplate(menuTemplate);
    Menu.setApplicationMenu(mainMenu);
    mainwindow.on("ready-to-show", () => {
        resizeTo(screen.width, screen.height);
        mainwindow.show();  
    });
});

function createWindow(html, width, height, title, frame, parent, show) {
    const window = new BrowserWindow({
        width: width,
        height: height,
        title: title,
        frame: frame,
        parent: parent,
        show: show
    });
    window.loadURL(url.format({
        pathname: path.join(__dirname, html),
        protocol: "file",
        slashes: true
    }));
    window.on("close", ()=>{
        delete window;
    });
    return window;
}
function hidewindow() {
    app.hide();
}