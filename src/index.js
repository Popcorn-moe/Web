import("./main.js").catch(console.error); // Async load

if ("serviceWorker" in navigator && navigator.serviceWorker.controller) {
	Promise.all([
		navigator.serviceWorker.ready,
		fetch("/VERSION").then(res => res.text())
	]).then(([reg, version]) => {
		if (version !== VERSION) {
			console.log(
				"Updating service worker old:",
				version,
				"new:",
				VERSION,
				"..."
			);
			return reg.update().then(() => console.log("Service worker updated"));
		}
	});
}
