(function () {
    window.Pipe = Class.extend({
        init : function () {
            // 1.方向 0:向下,1:向上
             this.dir = _.random(0,1);
            // 2.宽高
            this.width = 148;
            this.height = _.random(100,(game.canvas.height-48) * 0.5);
            // 3.坐标
            this.x = game.canvas.width;
            this.y = this.dir == 0 ? 0 : game.canvas.height - this.height - 48;

            // 4.速度
            this.speed = 4;

        },
        
        update : function () {
            this.x -= this.speed;
            
            // 销毁离开画布的管道
            if (this.x < -this.width){
                game.pipeArr = _.without(game.pipeArr,this);
            }

            // 管道和小鸟的碰撞检测
            if(game.bird.x + game.bird.width > this.x && game.bird.x < this.x + this.width) { // 进入管道区域

                if(this.dir == 0) { // 管道向下
                    if(game.bird.y < this.height ) {
                        game.gameOver();
                    }
                } else if (this.dir == 1){ // 管道向上
                    if((game.bird.y + game.bird.height) > this.y ) {
                        game.gameOver();
                    }
                }
                
            }
        },

        pause : function () {
            this.speed = 0;
        },

        render : function () {
            // 判断方向
            if(this.dir == 0) { // 向下

                game.context.drawImage(game.allImageObj['pipe1'],0,1664-this.height,this.width,this.height,this.x,this.y,this.width,this.height);
                
            } else if (this.dir == 1) {// 向上
                
                game.context.drawImage(game.allImageObj['pipe0'],0,0,this.width,this.height,this.x,this.y,this.width,this.height);
                
            }
        }
    });
})();
