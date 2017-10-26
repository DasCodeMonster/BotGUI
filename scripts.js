const electron = require("electron");
const {app, BrowserWindow, Menu} = electron;
const {spawn} = require("child_process");
var child;
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
    child = spawn("node", ["bot_index.js"]);
    document.getElementById("start").id = "stop";
    document.getElementById("stop").onclick = stopBot;
    var rect = document.createElementNS("http://www.w3.org/2000/svg", "rect");
    rect.setAttribute("x", "20");
    rect.setAttribute("y", "15");
    rect.setAttribute("width", "60");
    rect.setAttribute("height", "70");
    rect.setAttribute("stroke", "black");
    rect.setAttribute("fill", "lime");
    rect.setAttribute("id", "rect");
    rect.setAttribute("class", "start");
    document.getElementById("stop").replaceChild(rect, document.getElementById("polygon"));
    child.stdout.on("data", (data) => {
        const linebreak = document.createElement("br");
        document.getElementById("output").innerHTML+=data.toString().fontcolor("green");
        document.getElementById("output").appendChild(linebreak);

    });
    child.stderr.on("data", (data) => {
        console.log(data.toString());
        const linebreak = document.createElement("br");        
        document.getElementById("output").innerHTML+=data.toString().fontcolor("red");
        document.getElementById("output").appendChild(linebreak);
    });
    child.on("exit", (code) => {
        console.log(code);
    });
}
function stopBot() {
    child.kill("SIGINT");
    document.getElementById("stop").id="start";
    document.getElementById("start").onclick=startbot;
    var polygon = document.createElementNS("http://www.w3.org/2000/svg", "polygon");
    polygon.setAttribute("id", "polygon");
    polygon.setAttribute("class", "start");
    polygon.setAttribute("points", "20,15 20,85 95,50");
    polygon.setAttribute("stroke", "black");
    polygon.setAttribute("fill", "lime");
    document.getElementById("start").replaceChild(polygon, document.getElementById("rect"));

}