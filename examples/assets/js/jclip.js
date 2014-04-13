
/*

rafae artusi
https://github.com/artusi/jclip

EXAMPLE

	var jclip = jClip("clipLoop", "imgs/bullet.png", 105, 200);
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
    jclip.start();

*/
var jClip = function(element, url, frameWidth, frameHeight, options){

    //Get Element
    var el = document.getElementById(element);
    if(!el){
        return {error:'element not found'};
    }
    if(!frameWidth || !frameHeight){
        return {error:'you need to set the frame size'};
    }
    if(!options){
            options = {};
    }


    //PROPS
    var img;
    //Clip
    var totalFrames;
    var limit;
    var frameOn = 0;

    // Size measures
    var fWidth = frameWidth;
    var fHeight = frameHeight;
    var w = 0;
    var h = 0;
    var rows = 0;
    var collumns = 0;
    var colOn = 0;
    var rowOn = 0;

    //Anima
    var loop = (options.loop)? options.loop : false;
    var reverse = (options.reverse)? options.reverse : false;

    if(options.frameRate){
            options.frameRate = Math.ceil(1000 / options.frameRate );
    }

    var rate = options.frameRate || 40;
    var renderInterval;

    //Add Background
    var props = function(){
        if(options.totalFrames){
            totalFrames = options.totalFrames;
        }else{
            collumns = w / fWidth;
            rows = h / fHeight;
            totalFrames = collumns * rows;
        }
        if(reverse){
            colOn = collumns;
            rowOn = rows - 1;
            frameOn = totalFrames;
        }
        
        limit = totalFrames; 
 
        //build clip 
        el.style.background = 'url(\''+ url +'\') no-repeat scroll top left';
        el.style.display = 'block';
        el.style.width = fWidth + 'px';
        el.style.height = fHeight+'px';
    };

    // EVENTS
    var onReadyEvent;
    var onInitEvent;
    var onCompleteEvent;
    var onUpdateEvent;
    // event.customData = getYourCustomData();

    //IMG
    var start = function(){
        img = new Image();
        img.src = url;
        var loaded = function(){
            w = img.width;
            h = img.height;

            if(fWidth > w || fHeight > h){
                return {error:'Frame bigger than image'};
            }
            props();
            if(onReadyEvent){
                onReadyEvent({'element':el, 'clip':clip});
                // onReadyEvent = null;
            }
        };

        if(img.complete){
            loaded();
        }else{
            img.onload = loaded;
        }
    };


    //
    var play = function(options){
        if(!options){
                options = {};
        }

        if(onInitEvent){
                onInitEvent({'element':el, 'clip':clip});
        }

        if(options.startFrame){
            frameOn = options.startFrame;
            var posMatrix = getPositionByFrame(frameOn);
            colOn = posMatrix.col;
            rowOn = posMatrix.row;
            el.style.backgroundPosition = (-(colOn*fWidth))+ 'px ' + (-(rowOn*fHeight))+ 'px';
        }

        if(options.loop){
            loop = options.loop;
        }

        // return
        clearInterval(renderInterval);
        renderInterval = setInterval(render, rate);
    };


    var render = function(options){
        if(frameOn >= 0 && frameOn <= limit){
            if(!collumns){
                el.style.backgroundPosition = (-(frameOn*fWidth))+ 'px';
            }else{

                console.log('colOn', colOn, 'rowOn', rowOn, 'frameOn', frameOn);
                getPositionByFrame(frameOn);

                if(frameOn <= limit){
                    el.style.backgroundPosition = (-(colOn*fWidth))+ 'px ' + (-(rowOn*fHeight))+ 'px';
                }

                if(!reverse){
                    ++colOn;
                    if(colOn >= collumns){
                        colOn = 0;
                        ++rowOn;
                        if(rowOn >= rows){
                            rows = 0;
                        }
                    }
                }else{
                    --colOn;
                    if(colOn < 0){
                        colOn = collumns - 1;
                        --rowOn;
                        if(rowOn < 0){
                            rowOn = rows - 1;
                        }
                    }
                }


            }
        }

        var dir = (!reverse)? 1 : -1;
        frameOn += dir;
        if(frameOn > limit){
            frameOn = limit;
        }
        if(onUpdateEvent){
                onUpdateEvent({currentFrame:frameOn, totalFrames:totalFrames});
        }
        if(frameOn > limit-1 || frameOn < 0){
                stop();
                return;
        }
        // console.log("el.style.backgroundPosition", el.style.backgroundPosition)
    };

    var getPositionByFrame = function (frame) {
        var rowPos = Math.floor(frame/collumns);
        var colPos = parseInt(frame % collumns); 

        console.log( 'colPos', colPos, 'rowPos', rowPos);

        return {'col':colPos, 'row': rowPos};
    }

    var stop  = function(options){
        if(!options){
            options = {};
        }

        clearInterval(renderInterval);

        if(!options.clear && onCompleteEvent){
            onCompleteEvent();
        }
    };

    var reseter = function(){
        clearInterval(renderInterval);
    };


    var clip = {
        start:function(){
            start();
        },
        play:function(){
            play();
        },
        gotoAndPlay:function(startFrame){
            play({'startFrame': startFrame});
        },
        gotoAndStop:function(startFrame){
            play({'startFrame':startFrame});
            stop({clear:true});
        },
        loop:function(){
            // console.log("loop", render)
            play({loop:true});
        },
        clear:function(){
            // console.log("loop", render)
            loop = false;
            stop({clear:true});
        },
        reverse:function(type){
            // console.log("loop", render)
            // if(type && !frameOn) frameOn = totalFrames-1;
            reverse = type;
            // stop({clear:true});
        },
        reset:function(type){
            // console.log("loop", render)
            // if(type && !frameOn) frameOn = totalFrames-1;
            reseter();
            // stop({clear:true});
        },
        event:function(type, callback){
            switch(type){
                case'init':
                        onInitEvent = callback;
                        break;
                case'update':
                        onUpdateEvent = callback;
                        break;
                case'ready':
                        onReadyEvent = callback;
                        break;
                case'complete':
                        onCompleteEvent = callback;
                        break;
            }
        },
        totalFrames:function(){
            return limit;
        },
        about:function(){
            return {'element':el};
        },
        error:''
    };

    return clip;
};