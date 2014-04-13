(function (window, document, undefined) {
	'use strict';
	//|**
	//|
	//| @author Rafael Artusi
	//| @link https://github.com/artusi
	//|
	//| @author Adrian Miranda
	//| @link https://github.com/adriancmiranda
	//|
	//| @description This file is the main jClip file
	//|
	//| .-------------------------------------------------------------------.
	//| | NAMING CONVENTIONS:                                               |
	//| |-------------------------------------------------------------------|
	//| | Singleton-literals and prototype objects      | PascalCase        |
	//| |-------------------------------------------------------------------|
	//| | Functions and public variables                | camelCase         |
	//| |-------------------------------------------------------------------|
	//| | Global variables and constants                | UPPERCASE         |
	//| |-------------------------------------------------------------------|
	//| | Private variables                             | _underscorePrefix |
	//| '-------------------------------------------------------------------'
	//|
	//| Comment syntax for the entire project follows JSDoc:
	//| @see http://code.google.com/p/jsdoc-toolkit/wiki/TagReference
	//|
	//'*/
	var jClip = function (element, url, frameWidth, options) {
		// Props
		var img, renderInterval, totalFrames, onUpdateEvent,
		onReadyEvent, onInitEvent, onCompleteEvent, rate,
		el = document.getElementById(element),
		fWidth = frameWidth,
		reverse = false,
		loop = false,
		frameOn = 0,
		w = 0,
		h = 0;

		// Get element
		if (!el) {
			return { error: 'element not found' };
		}
		if (!options) {
			options = {};
		}
		if (options.frameRate) {
			options.frameRate = Math.ceil(1000 / options.frameRate);
		}
		// event.customData = getYourCustomData();

		// IMG
		rate = (options.frameRate || 40);
		img = new Image();
		img.src = url;
		img.onload = function() {
			w = img.width;
			h = img.height;
			props();
			if (onReadyEvent) {
				onReadyEvent();
			}
		};

		// Add Background
		function props() {
			totalFrames = w / fWidth;
			//build clip
			el.style.background = 'url("' + url + '") no-repeat scroll top left';
			el.style.display = 'block';
			el.style.width = fWidth + 'px';
			el.style.height = h + 'px';
		}

		//
		function start(options) {
			if (!options) {
				options = {};
			}
			if (onInitEvent) {
				onInitEvent();
			}
			if (options.startFrame) {
				frameOn = options.startFrame;
				el.style.backgroundPosition = (0 - (frameOn * fWidth)) + 'px';
			}
			if (options.loop) {
				loop = options.loop;
			}
			// console.log('LOOP', loop, options.loop);
			// return;
			window.clearInterval(renderInterval);
			renderInterval = window.setInterval(render, rate);
		}

		function render() {
			el.style.backgroundPosition = (0 - (frameOn * fWidth)) + 'px';
			var dir = (!reverse) ? 1 : -1;
			frameOn += dir;
			if (onUpdateEvent) {
				onUpdateEvent({currentFrame: frameOn, totalFrames: totalFrames});
			}
			if (frameOn > totalFrames - 1 || frameOn < 0) {
				stop();
				return;
			}
			// console.log('el.style.backgroundPosition', el.style.backgroundPosition);
		}

		function stop(options) {
			if (!options) {
				options = {};
			}
			if (loop) {
				frameOn = (!reverse) ? 0 : totalFrames;
				return;
			} else {
				clearInterval(renderInterval);
			}
			if (!options.clear && onCompleteEvent) {
				onCompleteEvent();
			}
		}

		var clip = {
			play: function() {
				start();
			},
			gotoAndPlay: function(goFrame) {
				frameOn = goFrame;
				start();
			},
			gotoAndStop: function(goFrame) {
				start({ startFrame: goFrame });
				stop({ clear: true});
			},
			loop: function() {
				// console.log('loop', render);
				start({ loop: true });
			},
			clear: function() {
				// console.log('loop', render);
				loop = false;
				stop({ clear: true });
			},
			reverse: function(type) {
				// console.log('loop', render);
				if (type && !frameOn) {
					frameOn = totalFrames - 1;
				}
				reverse = type;
				// stop({ clear: true });
			},
			event: function(type, callback) {
				switch (type) {
					case 'init': {
						onInitEvent = callback;
						break;
					}
					case 'update': {
						onUpdateEvent = callback;
						break;
					}
					case 'ready': {
						onReadyEvent = callback;
						break;
					}
					case 'complete': {
						onCompleteEvent = callback;
						break;
					}
				}
			},
			error: ''
		};
		return clip;
	};

	// Expose `jClip` globally
	window.jClip = jClip;
}(this, this.document));
