
(function () {
    window.Bird = Class.extend({
        init : function () {
            this.width = 85;
            this.height = 60;
            this.x = (game.canvas.width - this.width) * 0.5;
            this.y = 100;

            // 小鸟翅膀的状态 合法值: 0 1 2
            this.wing = 0;

            // 煽动翅膀的频率
            this.singRate = 5;
            
            // 下落时的帧数
            this.dropFrame = game.frameUtil.currentFrame;
            // 下落的增量
            this.dy = 0;

            // 下落的角度
            this.rotateAngle = 0;

            // 小鸟的状态 0: 下 1: 上
            this.state = 0;

            // 空间的阻力
            this.deleteY = 1;

            // 调用方法绑定事件
            this.bindClick();

            // 鸟是否死亡
            this.die = false;

            // 鸟死亡动画的索引
            this.dieAnimationIndex = 0;

        },
        
        update : function () {

            // 0.更新鸟死亡的动画
            if(this.die == true) {
                this.dieAnimationIndex ++;
                if (this.dieAnimationIndex == 30){
                    // 停止定时器
                    game.pause();
                }
                return;
            }
            // 1.每5帧更新更新小鸟的状态
            if(game.frameUtil.currentFrame % this.singRate == 0){
                this.wing ++;
                if(this.wing > 2){
                    this.wing = 0;
                }
            }

            // 2.根据小鸟的状态判断是下落还是上升
            if (this.state == 0) { //下落
                // 自由落体
                this.dy = 0.001 * 0.5 * 9.8 * Math.pow(game.frameUtil.currentFrame - this.dropFrame,2);

                this.rotateAngle += 1;

            } else if (this.state == 1) { //上升
                // 阻力越来越大
                this.deleteY++;
                // 默认的冲上向上15
                this.dy = -15 + this.deleteY;

                if (this.dy >= 0) { //下落
                    // 下落的状态
                    this.state = 0;
                    //更新下落的帧数
                    this.dropFrame = game.frameUtil.currentFrame;
                }
            }

            // 3.更新Y值
            this.y += this.dy;

            // 4.封锁上空
            if (this.y <= 0 ) {
                this.y = 0;
            }

            // 5.碰到地板,游戏结束
            if(this.y >= game.canvas.height - this.height - 48) {
                game.gameOver();
            }
        },

        render : function () {

            if(this.die == true) {
                // 绘制热血
                var sWidth = 1625 / 5,sHeight = 828 / 6;
                var col = this.dieAnimationIndex % 5;
                var row = parseInt(this.dieAnimationIndex / 5);

                game.context.drawImage(game.allImageObj['blood'],col * sWidth,row * sHeight,sWidth,sHeight,this.x - 100,this.y,sWidth,sHeight);

                // 绘制游戏结束
                var gameOverX = (game.canvas.width - 626) * 0.5;
                var gameOverY = (game.canvas.height - 144) * 0.5;
                game.context.drawImage(game.allImageObj['gameover'],gameOverX,gameOverY);
                
                return;
            }

            game.context.save();
            // 位移画布到小鸟的中点
            game.context.translate(this.x + this.width * 0.5,this.y + this.height * 0.5);
            // 旋转
            game.context.rotate(this.rotateAngle * Math.PI / 180);

            // 让画布复位
            game.context.translate(-(this.x + this.width * 0.5),-(this.y + this.height * 0.5));
            
            // 绘制小鸟
            game.context.drawImage(game.allImageObj['bird'],this.wing * this.width,0,this.width,this.height,this.x,this.y,this.width,this.height);
            
            game.context.restore();

        },

        // 绑定事件
        bindClick : function () {

            // 备份指针
            var self = this;

            game.canvas.addEventListener('mousedown',function () {
                // 改变小鸟的状态
                self.state = 1;
                // 改变小鸟的角度
                self.rotateAngle = -25;
                // 归位置
                self.deleteY = 1;
            });

        }
    });
})();
