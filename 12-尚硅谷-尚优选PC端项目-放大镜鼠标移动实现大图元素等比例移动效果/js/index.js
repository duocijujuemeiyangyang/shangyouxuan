//作用：需要将所有的DOM元素对象以及相关的资源全部都加载完毕之后，再来实现的事件函数
window.onload = function () {
    /**
     * 思路：
     * 1、先获取路径导航的页面元素（navPath）
     * 2、再来获取所需要的数据（data.js->goodData.path）
     * 3、由于数据是需要动态产生的，那么相应的DOM元素也应该是动态产生的，含义需要根据数据的数量来进行创建DOM元素
     * 4、在遍历数据创建DOM元素的最后一条，只创建a标签，而不创建i标签
     */


    //路径导航的数据渲染
    navPathDataBind();

    function navPathDataBind() {
        //1.获取页面导航的元素对象
        var navPath = document.querySelector('#wrapper #content .contentMain #navPath');

        //2.获取数据
        var path = goodData.path;

        //3.遍历数据
        for (var i = 0; i < path.length; i++) {
            if (i == path.length - 1) {
                //只需要创建a且没有href属性
                var aNode = document.createElement("a");
                aNode.innerText = path[i].title;
                navPath.appendChild(aNode);
            } else {
                //4.创建a标签
                var aNode = document.createElement("a");
                aNode.href = path[i].url;
                aNode.innerText = path[i].title;

                //5.创建i标签
                var iNode = document.createElement('i');
                iNode.innerText = '/';

                //6.让navPath元素来追加a和i
                navPath.appendChild(aNode);
                navPath.appendChild(iNode);
            }


        }
    }

    //放大镜的移入、移出效果
    bigClassBind();
    function bigClassBind() {
        /**
         * 思路：
         * 1、获取小图框元素对象，并且设置移入事件(onmouseenter)
         * 2、动态的创建蒙版元素以及大图框和大图片元素
         * 3、移出时(onmouseleave)需要移除蒙版元素和大图框
         */

        var smallPic =document.querySelector('#smallPic');
        var leftTop =document.querySelector('#leftTop');
        //鼠标移入事件
        smallPic.onmouseenter=function(){
            //创建蒙版元素
            var mask =document.createElement('div');
            mask.className="mask";

            //创建大图框
            var bigPic =document.createElement('bigPic');
            bigPic.id='bigPic';

            //5.创建大图片元素
            var img =document.createElement('img');
            img.src='images/b1.png'

            bigPic.append(img);

            smallPic.append(mask);

            leftTop.append(bigPic);


            //设置鼠标移动事件
            smallPic.onmousemove= function(event){
                //event.clientX: 鼠标点距离浏览器左侧X轴的值
                //getBoundingClientRect().left:小图框元素距离浏览器左侧可视left值
                //offsetWidth:为元素的占位宽度
                //原理图（详）
                var left= event.clientX- smallPic.getBoundingClientRect().left-mask.offsetWidth/2;
                var top = event.clientY-smallPic.getBoundingClientRect().top- mask.offsetHeight/2;

                //判断
                if(left<0){
                    left=0;
                }else if(left>smallPic.clientWidth-mask.offsetWidth){
                    left=smallPic.clientWidth-mask.offsetWidth;
                }

                if(top<0){
                    top=0;
                }else if(top>smallPic.clientHeight-mask.offsetHeight){
                    top=smallPic.clientHeight-mask.offsetHeight;
                }


                //设置left和top属性
                mask.style.left=left + "px";
                mask.style.top=top+ "px";

                
                //移动的比例关系 = 蒙版元素移动的距离  /  大图片元素移动的距离
                //蒙版元素移动的距离 = 小图框宽度 – 蒙版元素的宽度
                //大图片元素移动的距离 = 大图片宽度 – 大图框元素的宽度
                var scale=(smallPic.clientWidth-mask.offsetWidth)/(img.offsetWidth-bigPic.clientWidth);

                console.log(img)
                img.style.left = -left / scale + "px";
                img.style.top = -top / scale + "px";

            }


            //鼠标移出事件
            smallPic.onmouseleave=function(){
                smallPic.removeChild(mask)
    
                leftTop.removeChild(bigPic)
            }
        }

        
    }


}
