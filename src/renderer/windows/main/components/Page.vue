<template>
    <div >
        <h1>主页面</h1>
        <button v-on:click="DesktopWindow_Toggle()">{{title}}</button>
    </div>
</template>

<script>

export default {
    components:{
        
    },
    data(){
        return {
            isShowDesktopWindow: 0,
            title: "启动桌面窗口",
        };
    },
    methods:{
        DesktopWindow_Toggle() {
            if (this.isShowDesktopWindow == 0) {
                this.title = "隐藏桌面窗口";
                this.isShowDesktopWindow = 1;
                console.log("[IPC Renderer TX] open-desktop-window");
                this.$electron.ipcRenderer.send("open-desktop-window",0);
            }
            else if (this.isShowDesktopWindow == 1)  {
                this.title = "显示桌面窗口",
                this.isShowDesktopWindow = 2;
                console.log("[IPC Renderer TX] hide-desktop-window");
                this.$electron.ipcRenderer.send("hide-desktop-window");
            }
            else if (this.isShowDesktopWindow == 2)  {
                this.title = "关闭桌面窗口",
                this.isShowDesktopWindow = 3;
                console.log("[IPC Renderer TX] open-desktop-window");
                this.$electron.ipcRenderer.send("open-desktop-window");
            }
            else if (this.isShowDesktopWindow == 3)  {
                this.title = "启动桌面窗口",
                this.isShowDesktopWindow = 0;
                console.log("[IPC Renderer TX] close-desktop-window");
                this.$electron.ipcRenderer.send("close-desktop-window");
            }
        },
    }
}
</script>

<style>

</style>
