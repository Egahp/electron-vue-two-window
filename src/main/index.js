/**
  ******************************************************************************
  * @file          index.js
  * @brief         主窗口
  * @author        Egahp
  * @email         2687434412@qq.com
  * @version       1.0
  * @date          2021.06.24
  ******************************************************************************
  * @attention
  * 
  * <h2><center>&copy; Copyright 2020 Egahp.
  * All rights reserved.</center></h2>
  * 
  * @htmlonly 
  * <span style='font-weight: bold'>修订历史</span> 
  * @endhtmlonly
  * 版本|作者|时间|描述
  * ----|----|----|----
  * 1.0|Egahp|2021.06.24|创建文件
  ******************************************************************************
  */


/* 模块引入 ------------------------------------------------------------------*/
import { app, BrowserWindow, ipcMain, screen } from 'electron';
import '../renderer/store';

if (process.env.NODE_ENV !== 'development') {
    global.__static = require('path').join(__dirname, '/static').replace(/\\/g, '\\\\')
}

/* 变量定义 ------------------------------------------------------------------*/
let mainWindow;

const mainURL = process.env.NODE_ENV === 'development'
    ? `http://localhost:9080/main`
    : `file://${__dirname}/main/index.html`;

/* 函数原型 ------------------------------------------------------------------*/

function MainWindow_Creat() {

    const screenSize = screen.getPrimaryDisplay().workAreaSize;

    mainWindow = new BrowserWindow({
        width: 1280,
        height: 720,
        resizable:false,
        frame:true,
        transparent:false,
        show: false,
        useContentSize: true,
        webPreferences: {
            devTools: true,
            webSecurity: true,
            nodeIntegration: true,
            enableRemoteModule: true,
        }
    });

    const windowSize = mainWindow.getSize();

    mainWindow.loadURL(mainURL);

    mainWindow.once("ready-to-show", () => {
        mainWindow.show();
    });

    mainWindow.on("closed", () => {
        mainWindow = null
    })

    require("./desktop");

    global.mainWindow = {id : mainWindow.id};
}

/* 过程执行 ------------------------------------------------------------------*/

app.on('ready', () => {
    console.log("[System] app ready start mainwindow");
    MainWindow_Creat();
})

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit()
    }
})

app.on('activate', () => {
    if (mainWindow === null) {
        console.log("[System] restart mainwindow");
        MainWindow_Creat();
    }
})

/**
 * Auto Updater
 *
 * Uncomment the following code below and install `electron-updater` to
 * support auto updating. Code Signing with a valid certificate is required.
 * https://simulatedgreg.gitbooks.io/electron-vue/content/en/using-electron-builder.html#auto-updating
 */

/*
import { autoUpdater } from 'electron-updater'

autoUpdater.on('update-downloaded', () => {
  autoUpdater.quitAndInstall()
})

app.on('ready', () => {
  if (process.env.NODE_ENV === 'production') autoUpdater.checkForUpdates()
})
 */

/************************ © COPYRIGHT 2020 Egahp *****END OF FILE*************/