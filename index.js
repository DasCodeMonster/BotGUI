const electron = require("electron");
const {app, BrowserWindow, Menu, MenuItem} = electron;
const path = require("path");
const url = require("url");
// var mainwindow
if (process.platform === "darwin") {
    menuTemplate.unshift({});
}
app.on("ready", ()=> {
    var mainwindow = createWindow("mybot_VL.html", 1480, 760, "main", false, false);
    // mainwindow = createWindow("discord.html", 100, 100, "main", false, false);
    const mainMenu = new Menu();
    mainMenu.append(new MenuItem({
        label: "quit",
        accelerator: process.platform === "darwin" ? "Command+Q":"Ctrl+Q",
        visible: false
    }))
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
        show: show,
        minHeight: 600,
        minWidth: 1092
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