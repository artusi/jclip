
/*
EXAMPLE

	var jclip = jClip("clipLoop", "imgs/bullet.png", 105);
	var onready = function(){
		jclip.event("start", function(){console.log("complete"); });
		jclip.event("complete", function(){console.log("complete"); });
		jclip.event("update", function(e){console.log("update", e.currentFrame, e.totalFrames);});
	
		jclip.loop();
		// jclip.reverse(true);
		// jclip.gotoAndPlay(6);
		// jclip.gotoAndStop(5);
		// jclip.play();
	}

	jclip.event("ready", onready);

*/
var jClip = function(element, url, frameWidth, options){
	
	//Get Element
	var el = document.getElementById(element);
	if(!el) return {error:"element not found"}
	if(!options) options = {}
	
	
	//Props
	var totalFrames;
	var frameOn = 0;
	var pos = 0;
	var fWidth = frameWidth;
	var w = 0;
	var h = 0;
	
	var renderInterval;
	
	//Add Background
	var props = function(){
		totalFrames = w/fWidth;
		//build clip
		el.style.background = "url('"+ url +"') no-repeat scroll top left";
		el.style.display = "block";
		el.style.width = fWidth+"px";
		el.style.height = h+"px";
	}
	

	
	if(options.frameRate) options.frameRate = Math.ceil(1000 / options.frameRate );
	
	var rate = options.frameRate || 40
	var loop = false;
	var reverse = false;
	
	// EVENTS
	var onReadyEvent;
	var onInitEvent;
	var onCompleteEvent;
	var onUpdateEvent;
	// event.customData = getYourCustomData();
	
	//IMG
	var img =  new Image()
	img.src = url;
	img.onload = function(){ 
		w = img.width;
		h = img.height;
		props();
		if(onReadyEvent) onReadyEvent();
	}
	
  
	
	//
	var start = function(options){
		if(!options) options = {}
		if(onInitEvent) onInitEvent();
		
		if(options.startFrame){
			frameOn = options.startFrame;
			el.style.backgroundPosition = (-(frameOn*fWidth))+ "px" ;
			
		}
		
		if(options.loop) loop = options.loop;
		
		// console.log("LOOP", loop, options.loop)
		// return
		clearInterval(renderInterval);
		renderInterval = setInterval(render, rate);
	}
	
	
	var render = function(options){
		el.style.backgroundPosition = (-(frameOn*fWidth))+ "px" ;
		var dir = (!reverse)? 1 : -1;
		frameOn += dir;

		if(onUpdateEvent){ 
			onUpdateEvent({currentFrame:frameOn, totalFrames:totalFrames});
		}

		if(frameOn > totalFrames-1 || frameOn < 0){ 
			stop();
			return;
		}
		
		// console.log("el.style.backgroundPosition", el.style.backgroundPosition)
	}
	
	var stop  = function(options){

		if(!options){ 
			options = {} 
		}
		if(loop){ 
			frameOn = (!reverse)? 0 : totalFrames;
			return;
		}else{
			clearInterval(renderInterval);
		}

		if(!options.clear && onCompleteEvent){ 
			onCompleteEvent();
		}
		

	}
	
	
	var clip = {
		
		play:function(){
			start()
		},
		
		gotoAndPlay:function(goFrame){
			frameOn = goFrame;
			start();
		},
		
		gotoAndStop:function(goFrame){
			start({startFrame:goFrame});
			stop({clear:true});
		},
		
		loop:function(){
			// console.log("loop", render)
			start({loop:true});
			
		},
		clear:function(){
			// console.log("loop", render)
			loop = false;
			stop({clear:true});
			
		},
		reverse:function(type){
			// console.log("loop", render)
			if(type && !frameOn) frameOn = totalFrames-1;
			reverse = type;
			// stop({clear:true});
			
		},
		event:function(type, callback){
			switch(type){
				case"init":
					onInitEvent = callback;
				break;
				
				case"update":
					onUpdateEvent = callback;
				break;
				
				case"ready":
					onReadyEvent = callback;
				break;
				
				case"complete":
					onCompleteEvent = callback;
				break;
			}
		},
		error:''
		
	}
	
	
	return clip;
}