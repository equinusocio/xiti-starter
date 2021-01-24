/**
 * Welcome to your Workbox-powered service worker!
 *
 * You'll need to register this file in your web app and you should
 * disable HTTP caching for this file too.
 * See https://goo.gl/nhQhGp
 *
 * The rest of the code is auto-generated. Please don't update this file
 * directly; instead, make changes to your Workbox build configuration
 * and re-run your build process.
 * See https://goo.gl/2aRDsh
 */

importScripts("workbox-v4.3.1/workbox-sw.js");
workbox.setConfig({modulePathPrefix: "workbox-v4.3.1"});

workbox.core.setCacheNameDetails({prefix: "eleventy-plugin-pwa"});

workbox.core.skipWaiting();

workbox.core.clientsClaim();

/**
 * The workboxSW.precacheAndRoute() method efficiently caches and responds to
 * requests for URLs in the manifest.
 * See https://goo.gl/S9QRab
 */
self.__precacheManifest = [
  {
    "url": "404.html",
    "revision": "3deee7b22cb4e489d973e82fb69291ce"
  },
  {
    "url": "blog/index.html",
    "revision": "56ecdf243bdae0d12e9e1e1c8e84926c"
  },
  {
    "url": "blog/native-elements/index.html",
    "revision": "3d72d4acfe3dacb160a78db54ad7298f"
  },
  {
    "url": "blog/post-with-embeds-and-images/index.html",
    "revision": "1a98f6e3fe3c0e4e49af762ccd5225a8"
  },
  {
    "url": "blog/simple-blog-post/index.html",
    "revision": "aa4f2557a8d9da24b6a62729047fb1d6"
  },
  {
    "url": "blog/tag/all/index.html",
    "revision": "c989723385a410c076d072cf7a1107c0"
  },
  {
    "url": "blog/tag/code/index.html",
    "revision": "9afbaf8ead043151a80defe411f3a8da"
  },
  {
    "url": "blog/tag/content/index.html",
    "revision": "cad9b7b1c9d055be9c9d540b453dcdae"
  },
  {
    "url": "blog/tag/css/index.html",
    "revision": "47f6ac41476e63275f16f5214046ca16"
  },
  {
    "url": "blog/tag/embeds/index.html",
    "revision": "1d59244edc527179c1d0588dd72ecdea"
  },
  {
    "url": "blog/tag/html/index.html",
    "revision": "07f56d311bb44d805d397bed2c5dc8f4"
  },
  {
    "url": "blog/tag/images/index.html",
    "revision": "0704caca09c97689973273d173ef4d29"
  },
  {
    "url": "blog/tag/native-elements/index.html",
    "revision": "9567a347f30dd985ac58a2d58faa8402"
  },
  {
    "url": "blog/tag/posts/index.html",
    "revision": "c1c971608ad77082d9917f14671ae904"
  },
  {
    "url": "blog/tag/sample-content/index.html",
    "revision": "48af63535e40da0a1a6640f637f930e8"
  },
  {
    "url": "cover.jpg",
    "revision": "7f551e3c3140de0bbc18a9f88fd80298"
  },
  {
    "url": "favicon.png",
    "revision": "af09a4edeaaa2ff1aa27654582f55b5a"
  },
  {
    "url": "index.html",
    "revision": "68a799accb59430b9c89e03ea759eaaf"
  },
  {
    "url": "logo.svg",
    "revision": "f81c07b61b9e4eb116e36357725d0418"
  },
  {
    "url": "sample-page/index.html",
    "revision": "9bf3a0d1af7670cb6e22a780d397444d"
  }
].concat(self.__precacheManifest || []);
workbox.precaching.precacheAndRoute(self.__precacheManifest, {});

workbox.routing.registerRoute(/^.*\.(html|jpg|png|gif|webp|ico|svg|woff2|woff|eot|ttf|otf|ttc|json)$/, new workbox.strategies.StaleWhileRevalidate(), 'GET');
workbox.routing.registerRoute(/^https?:\/\/fonts\.googleapis\.com\/css/, new workbox.strategies.StaleWhileRevalidate(), 'GET');
