//作用：需要将所有的DOM元素对象以及相关的资源全部都加载完毕之后，再来实现的事件函数
window.onload = function () {
    /**
     * 思路：
     * 1、先获取路径导航的页面元素（navPath）
     * 2、再来获取所需要的数据（data.js->goodData.path）
     * 3、由于数据是需要动态产生的，那么相应的DOM元素也应该是动态产生的，含义需要根据数据的数量来进行创建DOM元素
     * 4、在遍历数据创建DOM元素的最后一条，只创建a标签，而不创建i标签
     */

    //大图图片
    let number = 0;

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
            var arr =goodData.imagessrc
            //创建蒙版元素
            var mask =document.createElement('div');
            mask.className="mask";

            //创建大图框
            var bigPic =document.createElement('bigPic');
            bigPic.id='bigPic';

            //5.创建大图片元素
            var img =document.createElement('img');
            img.src=arr[number].b;

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


    sltdtxr();
    //缩略图的动态渲染
    function sltdtxr(){
        //获取li元素
        //获取图片数组
        //创建元素并追加
        var ul =document.querySelector("#piclist ul");
        console.log(ul);
        var arr =goodData.imagessrc


        for(let i=0;i<arr.length;i++){
            li =document.createElement('li');
            li.addEventListener('click',function(){
                let smallimg =document.querySelector('#smallPic img');
                console.log(smallimg)
                smallimg.src=arr[i].s;
                number=i;
            })
            img =document.createElement('img');
            img.src=arr[i].s;
            li.appendChild(img)
            ul.appendChild(li)
        }

    }


    //点击缩略图左右箭头的效果
    thumbnailLeftRightClick();
    function thumbnailLeftRightClick(){
        /**
         * 思路：
         * 1、先获取左右两端的箭头按钮
         * 2、在获取可视的div以及ul元素和所有的li元素
         * 3、计算（发生起点、步长、总体运动的距离值）
         * 4、然后再发生点击事件
         */
        const prev = document.querySelector('.prev');
        const next = document.querySelector('.next');
        const piclist =document.querySelector("#piclist ul");
        const linode =document.querySelectorAll("#piclist ul li");
        console.log(linode[0].offsetWidth)

        //发生起点
        var start = 0;

        //步长
        var step = (linode[0].offsetWidth+20)*2

        //总体运动的距离值 = ul的宽度 - div框的宽度 = (图片的总数 - div中显示的数量) * （li的宽度 + 20）
        var endPostion = (linode.length - 5 )*(linode[0].offsetWidth+20);
        console.log(endPostion)

        prev.onclick=function(){
            start=start-step;
            if(start<0){
                start=0;
            }
            piclist.style.left=-start+'px';
        }

        next.onclick=function(){
            start=start+step;
            if(start>endPostion){
                start=endPostion;
            }
            piclist.style.left=-start+'px';
        }

    }


}
