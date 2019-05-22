
// 加载本地数据->图片,数据,音频

(function () {
    window.StaticSourceUtil = Class.extend({
        init : function () {
            // 所有的dom对象
           this.allImageObj = {};
        },
        
        // 加载图片数据
        // 返回:所有的dom对象,所有的图片个数,已经加载的dom对象
        loadImage : function (jsonUrl,callBack) {
            
            // 0.备份指针
            var self = this;
            
            // 1.创建请求对象
            var xhr = new XMLHttpRequest();

            // 2.ajax三步走
            xhr.open('get',jsonUrl);
            xhr.send(null);

            // 判断请求的状态
            // 当 readyState 等于 4 且状态为 200 时，表示请求完成
            xhr.onreadystatechange = function () {
                // 请求完成
                if(xhr.readyState == 4 && xhr.status == 200){
                    // 2.1 已经加载好的dom对象
                    var loadImageCount = 0;
                    // 2.2获取请求的数据
                     var responseText = xhr.responseText;
                    // 2.3JSON解析
                    var responseJson = JSON.parse(responseText);
                    // 2.4获取数组
                    var dataArr = responseJson.images;
                    // 2.5遍历数组
                    for (var i = 0; i < dataArr.length; i++) {
                        
                        // 创建image对象
                        var image = new Image();
                        image.src = dataArr[i].src;
                        image.index = i;
                        
                        // 图片加载完毕后,保存对象
                        image.onload = function () {
                            //  已经加载好的dom对象个数
                            loadImageCount ++;
                            // 保存对象{name : image} this->image
                            self.allImageObj[dataArr[this.index].name] = this;
                            
                            // 回调
                            callBack(self.allImageObj,dataArr.length,loadImageCount);
                        }
                    }
                }
            }
        }
    });
    
})();
