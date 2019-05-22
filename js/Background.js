
(function () {
    window.Background = Class.extend({
        init : function (option) {
            option = option || {};
            //绘制的图片数据
            this.image = option.image;
            this.x = 0;
            this.y = option.y || 0;
            this.width = option.width || 0;
            this.height = option.height || 0;

            // 绘制的总个数
            this.count = parseInt(game.canvas.width/this.width) + 1;

            // 更新的速度
            this.speed = option.speed || 1;
        },
        
        // 更新->每一帧都要更新
        update : function () {
            // 更新x值
            this.x -= this.speed;
            // 判断
            if(this.x < -this.count * this.width) {
                this.x = 0;
            }

        },

        // 暂定
        pause : function () {
            this.speed = 0;
        },

        // 绘制
        render : function () {
            for (var i = 0; i < this.count * 2; i++) {
                game.context.drawImage(this.image,this.x+i*this.width,this.y,this.width,this.height);
            }
        }

    });
})();
