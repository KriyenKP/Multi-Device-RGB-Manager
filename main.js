// Modules to control application life and create native browser window 
const {app, BrowserWindow,dialog,ipcMain, remote} = require('electron')
const colorManager = require('./colorManagement.js');

//Yeelight Setup

  const yeelight = require('yeelight-led'); 
  var roomLight = new yeelight("room",55443,"192.168.8.102",{})

//LEDStrip Setup

  const MagicHomeControl = require('magic-home').Control;
  var light = new MagicHomeControl("192.168.8.100");

//Razer Setup

var Chroma = require('razerchroma');
const application = {
  "title": "Razer Chroma SDK RESTful Test Application",
  "description": "This is a REST interface test application",
  "author": {
      "name": "Kriyen",
      "contact": ""
  },
  "device_supported": [
      "keyboard",
      "mouse",
      "headset",
      "mousepad",
      "keypad",
      "chromalink"],
  "category": "application"
};

const colorMain = [0,0,255]; 

ipcMain.on('change-color', (event, arg) => {  
  // Print 1
  //console.log(arg);
  // Reply on async message from renderer process
  //messageBox("Message received!");
  var hexVal = arg;
  var RGBVal = colorManager.hexToRgb(arg);
  colorMain[0] = RGBVal.r;
  colorMain[1] = RGBVal.g;
  colorMain[2] = RGBVal.b;

  GlobalStaticColor(colorMain[0],colorMain[1],colorMain[2]);
  RazerStaticColor(colorMain[0],colorMain[1],colorMain[2])

});

//const colorMain = [0,0,255]; 




// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let mainWindow



function messageBox(msg)
{
  dialog.showMessageBox({ message: msg, buttons: ["OK"] });
}

function createWindow () {
  mainWindow = new BrowserWindow({width: 800, height: 600})
  mainWindow.loadFile('index.html')

  // Open the DevTools.
  // mainWindow.webContents.openDevTools()

  // Emitted when the window is closed.
  mainWindow.on('closed', function () {
    // Dereference the window object, usually you would store windows
    // in an array if your app supports multi windows, this is the time
    // when you should delete the corresponding element.
    mainWindow = null
  })

 //var colorStaticYeelight = colorManager.RGBtoBGR(colorMain[0],colorMain[1],colorMain[2]);
//  var colorStaticRazer = colorManager.RGBtoBGR(colorMain[2],colorMain[1],colorMain[0]);

//  const static_color = {
//   "effect": "CHROMA_STATIC",
//   "param": {
//       "color": colorStaticRazer,
//   },
// }

// let chroma;
// Chroma.initialize(application)
//     .then(config =>{
//         chroma = new Chroma(config)
//     })
//     .then(() => chroma.set({
//         device: 'keyboard',
//         body: static_color
//     }))
//     .then(() => chroma.set({
//       device: 'mouse',
//       body: static_color
//   }))
//    /* .then(()=>{
//         setTimeout(
//             ()=>chroma.cleanup(),
//             5000
//         )
//     })*/
//     ;

    //GlobalStaticColor(colorMain[0],colorMain[1],colorMain[2]);
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', createWindow)

// Quit when all windows are closed.
app.on('window-all-closed', function () {
  // On OS X it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', function () {
  // On OS X it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (mainWindow === null) {
    createWindow()
  }
})





function YeelightOn()
{
  roomLight.sendCommand('set_power',"on",
  function(err, success) 
  {
    if(err != null)
    {
      dialog.showMessageBox({ message: "error = " + err, buttons: ["OK"] });
    }
  });
}

function YeelightOff()
{
  roomLight.sendCommand('set_power',"off",
  function(err, success) 
  {
    if(err != null)
    {
      dialog.showMessageBox({ message: "error = " + err, buttons: ["OK"] });
    }
  });
}

function MagicHomeOn()
{
  light.turnOn(function(err, success) 
  {
    if(err != null)
    {
      dialog.showMessageBox({ message: "error = " + err, buttons: ["OK"] });
    }
  });
}
function YeelightStaticColor(r,g,b)
{
  var colorStaticYeelight = colorManager.RGBtoBGR(r,g,b);

  roomLight.sendCommand('set_rgb',colorStaticYeelight,
  function(err, success) 
  {
    if(err != null)
    {
      dialog.showMessageBox({ message: "error = " + err, buttons: ["OK"] });
    }
  })
}
function MagicHomeStaticColor(r,g,b)
{
  MagicHomeOn();
  light.setColor(r,g,b,
  function(err, success) 
  {
    if(err != null)
    {
      dialog.showMessageBox({ message: "error = " + err, buttons: ["OK"] });
    }
  })
}
function RazerStaticColor(r,g,b)
{
  var colorStaticRazer = colorManager.RGBtoBGR(b,g,r);

  const static_color = {
   "effect": "CHROMA_STATIC",
   "param": {
       "color": colorStaticRazer,
   },
 }
 
 let chroma;
 Chroma.initialize(application)
     .then(config =>{
         chroma = new Chroma(config)
     })
     .then(() => chroma.set({
         device: 'keyboard',
         body: static_color
     }))
     .then(() => chroma.set({
       device: 'mouse',
       body: static_color
   }))
    /* .then(()=>{
         setTimeout(
             ()=>chroma.cleanup(),
             5000
         )
     })*/
     ;      
}

function GlobalStaticColor(r,g,b)
{
  YeelightStaticColor(r,g,b);
  MagicHomeStaticColor(r,g,b);

}


// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.
