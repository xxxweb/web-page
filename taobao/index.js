(function() {
	var screenList = document.getElementById('screen-list');
	var maketItem = document.getElementsByClassName('maket-item');

	for(var i = 0; i < maketItem.length; i++) {
		maketItem[i].addEventListener('mouseleave', outHiddenGoods);
	}
	if(screenList.addEventListener) {
		screenList.addEventListener('mouseover', hoverShowGoods);

	} else {
		screenList.attachEvent("onmouseover", hoverShowGoods);

	}

	function outHiddenGoods(event) {

		var ev = window.event || event;

		var target = ev.srcElement || ev.target;
		if(target.className == 'maket-item') {

			var goodsIndex = target.getAttribute("data-index");
			var goodsId = "goods" + goodsIndex;

			var goodsItem = document.getElementById(goodsId);

			goodsItem.style.display = "none";

		}
		return false;

	}

	function hoverShowGoods(event) {

		var ev = window.event || event;

		var target = ev.srcElement || ev.target;
		if(target.className == 'maket-item') {

			var goodsIndex = target.getAttribute("data-index");
			var goodsId = "goods" + goodsIndex;

			var goodsItem = document.getElementById(goodsId);

			goodsItem.style.display = "block";

		}
		return false;
	}

})();



(function(){

	var screenList = document.getElementById('notice');
	var maketItem = document.getElementsByClassName('notice-item');

	for(var i = 0; i < maketItem.length; i++) {
		maketItem[i].addEventListener('mouseleave', outHiddenGoods);
	}
	if(screenList.addEventListener) {
		screenList.addEventListener('mouseout', hoverShowGoods);
		screenList.addEventListener('mouseleave', setDefaultShow);

	} else {
		screenList.attachEvent("onmouseleave", hoverShowGoods);

	}
	function setDefaultShow(){
		console.log(666);
		var notice1=document.getElementById('notice1');
		notice1.style.display='block';
	}

	function outHiddenGoods(event) {

		var ev = window.event || event;

		var target = ev.srcElement || ev.target;
		
		if(target.className == 'notice-item') {

			var goodsIndex = target.getAttribute("data-index");
			
			var goodsId = "notice" + goodsIndex;

			var goodsItem = document.getElementById(goodsId);

			goodsItem.style.display = "none";
			
		}

		
		return false;

	}

	function hoverShowGoods(event) {

		var ev = window.event || event;

		var target = ev.srcElement || ev.target;
		
		if(target.className == 'notice-item') {

			var goodsIndex = target.getAttribute("data-index");
			var goodsId = "notice" + goodsIndex;

			var goodsItem = document.getElementById(goodsId);

			goodsItem.style.display = "block";

		}
		return false;
	}

	
	
})();


(function() {
	var lunBoxItem = document.getElementsByClassName('lun-box')[0];
	var promoNavItem = document.getElementsByClassName('promo-nav-item');

	var tmall = document.getElementsByClassName('tmall-box')[0];
  
	LunBo(lunBoxItem, promoNavItem, 520);

	LunBo(tmall, null, 520);

	function LunBo(lunBox, promoNavItems, itemWidth) {
		var wherePromo = 0;
		var firstChild = lunBox.firstChild;
		var firstChildClone = lunBox.firstChild.cloneNode(true);

		lunBox.appendChild(firstChildClone);

		var timer = null;
		var i = 0;
		var imgLen = lunBox.childNodes.length;
		var everyTimer = null;

		timer = setTimeout(everyLun, 1000);

		function everyLun() {
			everyTimer = setInterval(lunBoRun, 50);
		}

		function lunBoRun() {

			i -= 10;


			lunBox.style.left = i + 'px';
			if(i % itemWidth == 0) {
				if(promoNavItems) {
					 wherePromo++;
					if(wherePromo == promoNavItems.length) {
						wherePromo = 0;
					}
					var promoClass = promoNavItems[wherePromo].className;

					promoNavItems[wherePromo].className = promoClass + ' active';

					for(var where = 0; where < promoNavItems.length; where++) {
						if(where == wherePromo) {
							continue;
						}
						promoNavItems[where].className = promoClass;
						
					}

				}

				clearInterval(everyTimer);
				timer = setTimeout(everyLun, 1500);
			}

			if(i <= -(imgLen - 1) * itemWidth) {
				i = 0;
			}
		}
	}
})();


(function(){
//	瀑布流

window.onload=function(){
	  WaterFull('water-full','box',5);
   function WaterFull(parent,box,cols){
   	var parent= document.getElementsByClassName(parent)[0];
   	var boxs= document.getElementsByClassName(box);
  
   	var arr=[];
   	var boxWidth= boxs[0].offsetWidth;
   	 	parent.style.width=(boxWidth*cols)+'px';
   	parent.style.margin="0 auto";
   	for(var i= 0;i < boxs.length; i++){
   		if(i < cols){
   			arr.push(boxs[i].offsetHeight);
   			
   			boxs[i].style.top= 0;
   			boxs[i].style.left= (i*boxWidth) + "px";
   		}else{
   			var minHeight= Math.min.apply(Math,arr);
   			
   			
   			var minHeightIndex= getminHeightIndex(minHeight,arr);
   			
   			boxs[i].style.left= (minHeightIndex*boxWidth) + "px";
   			
   		
   			boxs[i].style.top= arr[minHeightIndex] + "px";
   			arr[minHeightIndex] += boxs[i].offsetHeight;
   			
   		}
   	}
   
 
   }

  function getminHeightIndex(minHeight,arr){
  	for(var j= 0;j < arr.length; j++){
  		if(minHeight === arr[j]){
  			return j;
  		}
  	}
  	return 0;
  }
}
})();
(function(){
	
		function throttle(fn, delay, atleast) {
	    var timeout = null,
		startTime = new Date();
	    return function() {
		var curTime = new Date();
		clearTimeout(timeout);
		if(curTime - startTime >= atleast) {
		    fn();
		    startTime = curTime;
		}else {
		    timeout = setTimeout(fn, delay);
		}
	    }
	}
	function lazyload() {
	    var images = document.getElementsByTagName('img');
	    var len    = images.length;
	    var n      = 0;      //存储图片加载到的位置，避免每次都从第一张图片开始遍历		
	    return function() {
		var seeHeight = document.documentElement.clientHeight;
		var scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
		for(var i = n; i < len; i++) {
		    if(images[i].offsetTop < seeHeight + scrollTop) {
		        if(images[i].getAttribute('src') === 'images/loading.jpg') {
			     images[i].src = images[i].getAttribute('data-src');
		        }
			n = n + 1;
		     }
		}
	    }
	}
	var loadImages = lazyload();
	loadImages();          //初始化首页的页面图片
	window.addEventListener('scroll', throttle(loadImages, 500, 1000), false);
})();
