const electron = require("electron");
const {app, BrowserWindow, Menu} = electron;
const {spawn} = require("child_process");
var oldwidth;
var oldheigth;
var oldX;
var oldY;
function myalert () {
    window.alert("moinsen!");
}
function closewindow() {
    close();
}
function maximizewindow() {
    oldwidth = outerWidth;
    oldheigth = outerHeight;
    oldX = screenX;
    oldY = screenY;
    electron.remote.getCurrentWindow().maximize();
    document.getElementById("maximizebutton").onclick=normalize;
}
function hidewindow() {
    electron.remote.getCurrentWindow().minimize();
}
function normalize() {
    resizeTo(oldwidth, oldheigth);
    moveTo(oldX, oldY);
    // electron.remote.getCurrentWindow().center();
    document.getElementById("maximizebutton").onclick=maximizewindow;
    delete oldwidth;
    delete oldheigth;
    delete oldX;
    delete oldY;
}
function startbot() {
    const child = spawn("node", ["bot_index.js"]);
    child.stdout.on("data", (data) => {
        const linebreak = document.createElement("br");
        document.getElementById("main").appendChild(linebreak);
        document.getElementById("main").innerHTML+=data.toString();

    });
    child.stderr.on("data", (data) => {
        console.log(data.toString());
    });
    child.on("exit", (code) => {
        console.log(code);
    });
}