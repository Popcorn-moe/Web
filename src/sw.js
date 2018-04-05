workbox.clientsClaim();
workbox.skipWaiting();

workbox.routing.registerRoute(
	new RegExp("^https://fonts.(?:googleapis|gstatic).com/(.*)"),
	workbox.strategies.cacheFirst()
);

workbox.routing.registerNavigationRoute("/index.html", {
	blacklist: [/static/, /report\.html/, /VERSION|COMMITHASH/]
});

workbox.precaching.precacheAndRoute(self.__precacheManifest);
