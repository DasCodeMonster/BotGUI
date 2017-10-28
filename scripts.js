const electron = require("electron");
const {app, BrowserWindow, Menu} = electron;
const {spawn} = require("child_process");
var botRunning;
var child;
var oldwidth;
var oldheigth;
var oldX;
var oldY;
function myalert () {
    window.alert("moinsen!");
}
function closewindow() {
    if (botRunning === true) {
        stopBot();
    }
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
    botRunning = true;
    child = spawn("node", ["bot_index.js"], {stdio: [ 'pipe', 'pipe', 'pipe', 'ipc' ]});
    document.getElementById("start").id = "stop";
    document.getElementById("stop").onclick = stopBot;
    document.getElementById("circle").setAttribute("class", "stop");
    var rect = document.createElementNS("http://www.w3.org/2000/svg", "rect");
    rect.setAttribute("x", "18");
    rect.setAttribute("y", "17");
    rect.setAttribute("width", "65");
    rect.setAttribute("height", "65");
    rect.setAttribute("stroke", "black");
    rect.setAttribute("fill", "lime");
    rect.setAttribute("id", "rect");
    rect.setAttribute("class", "stop");
    document.getElementById("stop").replaceChild(rect, document.getElementById("polygon"));
    const linebreak = document.createElement("br");
    child.stdout.on("data", (data) => {
        document.getElementById("output").innerHTML+=data.toString().fontcolor("green");
        document.getElementById("output").appendChild(linebreak);

    });
    child.stderr.on("data", (data) => {
        console.log(data.toString());
        document.getElementById("output").innerHTML+=data.toString().fontcolor("red");
        document.getElementById("output").appendChild(linebreak);
        document.getElementById("output").scrollTop = document.getElementById("output").scrollHeight;
    });
    child.on("exit", (code) => {
        if (code === 0) var color = "green";
        else var color = "red";
        document.getElementById("output").innerHTML+="exitcode: ".fontcolor(color)+code.toString().fontcolor(color);
        document.getElementById("output").appendChild(linebreak); 
    });
    child.on("message", (message)=>{
        if (message.message === "guilds")
        {
            message.guilds.forEach((guild)=>{
                document.getElementById("guilds").innerHTML+=`${guild.name}`.fontcolor("#bababa").fontsize(5);
                document.getElementById("guilds").appendChild(linebreak);
            });
        }else if(message.message === "ready") {
            child.send("getGuilds");
        }
    });
}
function stopBot() {
    document.getElementById("stop").id="start";
    document.getElementById("start").onclick=startbot;
    var polygon = document.createElementNS("http://www.w3.org/2000/svg", "polygon");
    polygon.setAttribute("id", "polygon");
    polygon.setAttribute("class", "start");
    polygon.setAttribute("points", "20,15 20,85 95,50");
    polygon.setAttribute("stroke", "black");
    polygon.setAttribute("fill", "lime");
    document.getElementById("start").replaceChild(polygon, document.getElementById("rect"));    
    child.send("stop");
    botRunning = false;
}
electron.remote.app.on("before-quit", ()=>{
    if(botRunning) child.send("stop");
});