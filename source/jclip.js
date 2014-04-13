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
	function jClip(source, options) {
		//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
		// Namespaces
		//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
		var $super = this,
		$static = $super,
		$constructor = $static.constructor,
		$public = $constructor.prototype,
		$private = {};

		//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
		// Public variables
		//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
		$public.totalFrames = 0; // Number of frames in sprite
		$public.fps = 18; // Frames per second
		$public.width = 0; // (optional) Set the frame width manually
		$public.height = 0; // (optional) Set the frame height manually

		//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
		// Public methods
		//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
		$public.play = function() {
		};
		$public.pause = function() {
		};
		$public.stop = function() {
			$private.drawImage(0);
			$public.pause();
		};
		$public.togglePause = function() {
		};
		$public.gotoRandomFrame = function() {
		};
		$public.gotoAndPlay = function(frame) {
			$private.drawImage(frame);
			$public.play();
		};
		$public.gotoAndStop = function(frame) {
			$private.drawImage(frame);
			$public.pause();
		};
		$public.nextFrame = function() {
			$public.jumpFrames(0 + 1);
		};
		$public.prevFrame = function() {
			$public.jumpFrames(0 - 1);
		};
		$public.jumpFrames = function(amount) {
		};
		$public.toString = function() {
		};

		//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
		// Private variables
		//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
		$private.source = null; // spritesheet
		$private.sx = null; // source x
		$private.sy = null; // source y
		$private.sw = null; // source width
		$private.sh = null; // source height
		$private.dx = null; // destination x
		$private.dy = null; // destination y
		$private.dw = null; // destination width
		$private.dh = null; // destination height

		//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
		// Private methods
		//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
		$private.drawImage = function(frame) {
		};
		$private.update = function() {
		};
		$private.render = function() {
		};

		// Makes it possible to access without the keyword "new" too
		return $static;
	};

	// Expose `jClip` globally
	window.jClip = jClip;
}(this, this.document));
