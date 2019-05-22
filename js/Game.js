
(function () {
    window.Game = Class.extend({
        // 初始化的方法
         init : function (option) {
             option = option || {};
             // 0.备份指针
             var self = this;
             // 1.fps
             this.fps = option.fps || 60;
             // 2.实例化帧工具类
             this.frameUtil = new FrameUtil();

             // 3.获取画布和上下文
             this.canvas = document.getElementById(option.canvasId);
             this.context = this.canvas.getContext('2d');

             // 4.实例化加载本地数据类
             this.staticSourceUtil = new StaticSourceUtil();
             // 5.本地所有图片数据
             this.allImageObj = {};
             // 6.加载本地数据
             // 接受:所有的dom对象,所有的图片个数,已经加载的dom对象
             this.staticSourceUtil.loadImage('r.json',function (allImageObj,allImageCount,loadImageCount) {
                 // 6.1 判断
                 if (allImageCount == loadImageCount) {

                     // 保存本地所有的图片数据
                     self.allImageObj = allImageObj;
                     // 开始游戏
                     self.run();
                 }
             });
             
             // 7.游戏是否结束
             this.isGameOver = false;

         },
        
        // 运行游戏
         run : function () {
             // 1.备份this
             var self = this;
             
             // 2.定时器
             this.timer = setInterval(function () {
                 
                 self.runLoop();
             },1000/self.fps); // fps:每秒传输的帧数 (1000/fps = 20;-->每一帧需要的时间)

             //3.创建房子
             this.fangzi =  new Background({
                 y : this.canvas.height - 256 - 100,
                 width : 300,
                 height : 256,
                 image : this.allImageObj['fangzi'],
                 speed : 2
             });

             //4.创建数
             this.shu =  new Background({
                 y : this.canvas.height - 216 - 48,
                 width : 300,
                 height : 216,
                 image : this.allImageObj['shu'],
                 speed : 3
             });

             //5.创建地板
             this.diban =  new Background({
                 y : this.canvas.height - 48,
                 width : 48,
                 height : 48,
                 image : this.allImageObj['diban'],
                 speed : 4
             });

             // this.pipe = new Pipe();
             // 6. 定义一个管道数组
             this.pipeArr = [new Pipe()];

             // 7.创建bird
             this.bird = new Bird();

         },

        // 游戏运行循环-->每一帧都需要执行
        runLoop : function () {
            // 0.清屏
            this.context.clearRect(0,0,this.canvas.width,this.canvas.height);

            // 1.计算真实的帧数
            this.frameUtil.render();

            // 2.绘制fps
            this.context.fillText('FPS /' + this.frameUtil.realFps,15,15);

            // 3.绘制总帧数
            this.context.fillText('FNO /' + this.frameUtil.currentFrame,15,30)

            // 4.更新和渲染房子
            this.fangzi.update();
            this.fangzi.render();

            // 5.更新和渲染树
            this.shu.update();
            this.shu.render();

            // 6.更新和渲染地板
            this.diban.update();
            this.diban.render();

            // 6.创建管道
            if(!this.isGameOver&&this.frameUtil.currentFrame % 100 == 0){
                this.pipeArr.push(new Pipe());
            }
            
            // 7.更新和渲染管道(遍历)--->重绘思想
            for (var i = 0; i < this.pipeArr.length; i++) {
                this.pipeArr[i].update();
            }

            for (var j = 0; j < this.pipeArr.length; j++) {
                this.pipeArr[j].render();
            }

            // 8.更新和渲染bird
            this.bird.update();
            this.bird.render();
        },
        
        // 暂停游戏
        pause : function () {
            // 停止定时器
            clearInterval(this.timer);
        },
        
        // 结束游戏
        gameOver : function () {
            
            // 游戏结束
            this.isGameOver = true;
            
            // 停止背景
            this.fangzi.pause();
            this.shu.pause();
            this.diban.pause();

            // 停止管道
            for (var i = 0; i < this.pipeArr.length; i++) {
                this.pipeArr[i].pause();
            }

            // 发出通知,鸟死亡了
            this.bird.die = true;
            
        }

    });
})();
