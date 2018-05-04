(function() {
    if (window.ksRunnerInit) return;

    // This line gets patched up by the cloud
    var pxtConfig = {
    "relprefix": "/makecode-ascii-art/",
    "workerjs": "/makecode-ascii-art/worker.js",
    "monacoworkerjs": "/makecode-ascii-art/monacoworker.js",
    "pxtVersion": "3.12.17",
    "pxtRelId": "",
    "pxtCdnUrl": "/makecode-ascii-art/",
    "commitCdnUrl": "/makecode-ascii-art/",
    "blobCdnUrl": "/makecode-ascii-art/",
    "cdnUrl": "/makecode-ascii-art/",
    "targetVersion": "0.0.0",
    "targetRelId": "",
    "targetUrl": "",
    "targetId": "ASCII Art",
    "simUrl": "/makecode-ascii-art/simulator.html",
    "partsUrl": "/makecode-ascii-art/siminstructions.html",
    "runUrl": "/makecode-ascii-art/run.html",
    "docsUrl": "/makecode-ascii-art/docs.html",
    "isStatic": true
};

    var scripts = [
        "/makecode-ascii-art/highlight.js/highlight.pack.js",
        "/makecode-ascii-art/bluebird.min.js",
        "/makecode-ascii-art/semantic.js",
        "/makecode-ascii-art/marked/marked.min.js",
        "/makecode-ascii-art/target.js",
        "/makecode-ascii-art/pxtembed.js"
    ]

    if (typeof jQuery == "undefined")
        scripts.unshift("/makecode-ascii-art/jquery.js")

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
