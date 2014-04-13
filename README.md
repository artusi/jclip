# jclip

_jClip_ is a new way to make animations and control jpegs, you can use as a "gif" file or control like a _Flash Movieclip_.

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

### Browsers
![IE][ie_bullet] | ![Safari][safari_bullet] | ![Opera][opera_bullet] | ![Firefox][firefox_bullet] | ![Chrome][chrome_bullet]
--- | --- | --- | --- | --- |
IE 8+ ✓ | Latest ✓ | Latest ✓ | Latest ✓ | Latest ✓ |

<!-- Browser icons -->
[chrome_bullet]: http://i.imgur.com/00rPodY.png "Google Chrome"
[firefox_bullet]: http://i.imgur.com/GVlcFSd.png "Mozilla Firefox"
[opera_bullet]: http://i.imgur.com/jBjQ0KP.png "Opera Software"
[safari_bullet]: http://i.imgur.com/QVIVAut.png "Apple Safari"
[ie_bullet]: http://i.imgur.com/x0i57ps.png "Microsoft Internet Explorer"

[See Demo page][demo_page]

[demo_page]: https://github.com/artusi/jclip/examples "Demo page"
