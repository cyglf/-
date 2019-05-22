
// 帧工具类-> 获得每秒真实的fps 总的帧数
(function () {
    window.FrameUtil = Class.extend({
        init : function () {
            // 1.当前总帧数
            this.currentFrame = 0;
            // 2.起始的帧数
            this.sFrame = 0;
            // 3.起始的时间
            this.sTime = new Date();
            // 4.真实的fps
            this.realFps = 0;

        },

        // 每一帧都要执行
        render : function () {

            // 记录总的帧数
            this.currentFrame += 1;
            // 当前的时间
            var currentTime = new Date();
            if (currentTime - this.sTime >= 1000) { //走过了1秒
                // 求出每秒真实的帧数
                this.realFps = this.currentFrame - this.sFrame;
                // 更新开始的帧数
                this.sFrame = this.currentFrame;
                // 更新开始的时间
                this.sTime = currentTime;
            }
        }
    });
})();
