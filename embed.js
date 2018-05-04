(function() {
    if (window.ksRunnerInit) return;

    // This line gets patched up by the cloud
    var pxtConfig = {
    "relprefix": "/pxt-sample/",
    "workerjs": "/pxt-sample/worker.js",
    "monacoworkerjs": "/pxt-sample/monacoworker.js",
    "pxtVersion": "3.12.17",
    "pxtRelId": "",
    "pxtCdnUrl": "/pxt-sample/",
    "commitCdnUrl": "/pxt-sample/",
    "blobCdnUrl": "/pxt-sample/",
    "cdnUrl": "/pxt-sample/",
    "targetVersion": "0.0.0",
    "targetRelId": "",
    "targetUrl": "",
    "targetId": "ASCII Art",
    "simUrl": "/pxt-sample/simulator.html",
    "partsUrl": "/pxt-sample/siminstructions.html",
    "runUrl": "/pxt-sample/run.html",
    "docsUrl": "/pxt-sample/docs.html",
    "isStatic": true
};

    var scripts = [
        "/pxt-sample/highlight.js/highlight.pack.js",
        "/pxt-sample/bluebird.min.js",
        "/pxt-sample/semantic.js",
        "/pxt-sample/marked/marked.min.js",
        "/pxt-sample/target.js",
        "/pxt-sample/pxtembed.js"
    ]

    if (typeof jQuery == "undefined")
        scripts.unshift("/pxt-sample/jquery.js")

    var pxtCallbacks = []

    window.ksRunnerReady = function(f) {
        if (pxtCallbacks == null) f()
        else pxtCallbacks.push(f)
    }

    window.ksRunnerWhenLoaded = function() {
        pxt.docs.requireHighlightJs = function() { return hljs; }
        pxt.setupWebConfig(pxtConfig || window.pxtWebConfig)
        pxt.runner.initCallbacks = pxtCallbacks
        pxtCallbacks.push(function() {
            pxtCallbacks = null
        })
        pxt.runner.init();
    }

    scripts.forEach(function(src) {
        var script = document.createElement('script');
        script.src = src;
        script.async = false;
        document.head.appendChild(script);
    })

} ())
