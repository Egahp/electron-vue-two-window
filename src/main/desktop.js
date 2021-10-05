/**
  ******************************************************************************
  * @file          desktop.js
  * @brief         桌面窗口
  * @author        Egahp
  * @email         2687434412@qq.com
  * @version       1.0
  * @date          2021.06.23
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
  * 1.0|Egahp|2021.06.23|创建文件
  ******************************************************************************
  */


/* 模块引入 ------------------------------------------------------------------*/
import { BrowserWindow, ipcMain, screen } from 'electron'
import '../renderer/store'

/* 变量定义 ------------------------------------------------------------------*/
let desktopWindow = null;

const desktopURL = process.env.NODE_ENV === 'development' 
    ? 'http://localhost:9080/desktop' 
    : `file://${__dirname}/desktop/index.html`


/* 函数原型 ------------------------------------------------------------------*/

function DesktopWindow_Creat(displayID) {

    desktopWindow = new BrowserWindow({
        width:1280,
        height:720,
        frame: true,
        transparent:false,
        show: true,
        resizable:false,
        useContentSize: true,
        webPreferences: {
            devTools: false,
            webSecurity: true,
            nodeIntegration: true,
            enableRemoteModule: true,
        }
    });

    desktopWindow.loadURL(desktopURL);

    // desktopWindow.once('ready-to-show', () => {
    //     desktopWindow.show();
    // });

    desktopWindow.on('close', () => {
        desktopWindow = null;
    });

    global.desktopWindow = {id : desktopWindow.id};
}

/* 过程执行 ------------------------------------------------------------------*/


ipcMain.on('open-desktop-window', (event,arg) => {
    console.log("[IPC Main RX] open-desktop-window");

    if (desktopWindow) {
        if (desktopWindow.isVisible()) {
            DesktopWindow_Creat(arg);
        } else {
            desktopWindow.showInactive(arg);
        }
    } else {
        DesktopWindow_Creat(arg);
    }
});

ipcMain.on('restart-desktop-window', (event,arg) =>{
    console.log("[IPC Main RX] restart-desktop-window");
    if (desktopWindow){
        desktopWindow = null;
        DesktopWindow_Creat(arg);
    }
    else {
        DesktopWindow_Creat(arg);
    }
});

ipcMain.on('hide-desktop-window', (event,arg) => {
    console.log("[IPC Main RX] hide-desktop-window");
    if (desktopWindow) {
        desktopWindow.hide();
    }
});

ipcMain.on('close-desktop-window', (event,arg) => {
    console.log("[IPC Main RX] close-desktop-window");
    if (desktopWindow) {
        desktopWindow.hide();
        desktopWindow = null;
    }
});


/************************ © COPYRIGHT 2020 Egahp *****END OF FILE*************/