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
		var $private = {};
		var $protected = this;
		var $constructor = $protected.constructor;
		var $public = $constructor.prototype;
		var $super = null;

		//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
		// Public variables
		//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
		//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
		// Public functions
		//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
		$public.play = function() {
		};
		$public.pause = function() {
		};
		$public.stop = function() {
		};
		$public.gotoRandomFrame = function() {
		};
		$public.gotoAndPlay = function(frame) {
		};
		$public.gotoAndStop = function(frame) {
		};
		$public.nextFrame = function() {
		};
		$public.prevFrame = function() {
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
		// Private functions
		//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
		$private.drawImage = function(frame) {
		};
		$private.update = function() {
		};
		$private.render = function() {
		};

		// Makes it possible to access without the keyword "new"
		return $protected;
	};
}(this, this.document));
