const electron = require("electron");
const {app, BrowserWindow, Menu, MenuItem} = electron;
const path = require("path");
const url = require("url");
// var mainwindow
const mainMenu = new Menu();

app.on("ready", ()=> {
    var mainwindow = createWindow("mybot_VL.html", 1480, 760, "main", false, false);
    // mainwindow = createWindow("discord.html", 100, 100, "main", false, false);
    mainwindow.setMenu(mainMenu);
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
    mainMenu.append(new MenuItem({
        label: "quit",
        accelerator: "Ctrl+q",
        visible: true,
        click: app.quit
    }));
    // mainMenu.append(new MenuItem({
    //     label: "reload",
    //     accelerator: "Ctrl+r",
    //     visible: false,
    //     click: window.reload
    // }));
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