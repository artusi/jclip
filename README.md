# jclip [![build status][travis_build_status_image]][travis_build_status_url] [![dependencies status][david_dependencies_status_image]][david_dependencies_status_url] [![devDependency status][david_devdependencies_status_image]][david_devdependencies_status_url]

<!-- travis -->
[travis_build_status_image]: https://travis-ci.org/artusi/jclip.png?branch=master
[travis_build_status_url]: https://travis-ci.org/artusi/jclip "build status"

<!-- david dependencies -->
[david_dependencies_status_image]: https://david-dm.org/artusi/jclip.png?theme=shields.io
[david_dependencies_status_url]: https://david-dm.org/artusi/jclip "dependencies status"

<!-- david devDependencies -->
[david_devdependencies_status_image]: https://david-dm.org/artusi/jclip/dev-status.png?theme=shields.io
[david_devdependencies_status_url]: https://david-dm.org/artusi/jclip#info=devDependencies "devDependencies status"

> _jClip_ is like a _Flash Movieclip_. It takes an element, and changes the background position to create an animation effect.

### Dependencies
_jClip_ has no dependencies.

### Compatibility
Works everywhere.

### Usage
```javascript
var jclip = jClip('clipLoop', 'imgs/bullet.png', 105);
jclip.event('ready', function () {
    jclip.event('start', function() {
        console.log('start');
    });
    jclip.event('update', function(ev) {
        console.log('update', ev.currentFrame, ev.totalFrames);
    });
    jclip.event('complete', function() {
        console.log('complete');
    });
    jclip.loop();
});
```

### Examples
* [See Demo page][demo_page]

### Support
Bugs and issues should be reported via the [issue tracker][issue_tracker].

<!-- Browser icons -->
[chrome_bullet]: http://i.imgur.com/00rPodY.png "Google Chrome"
[firefox_bullet]: http://i.imgur.com/GVlcFSd.png "Mozilla Firefox"
[opera_bullet]: http://i.imgur.com/jBjQ0KP.png "Opera Software"
[safari_bullet]: http://i.imgur.com/QVIVAut.png "Apple Safari"
[ie_bullet]: http://i.imgur.com/x0i57ps.png "Microsoft Internet Explorer"
[issue_tracker]: http://github.com/artusi/jclip/issues "Issue tracker"

[demo_page]: https://github.com/artusi/jclip/examples "Demo page"
