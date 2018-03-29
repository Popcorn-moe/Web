export default getCookiesMap(document.cookie);

export function getCookiesMap(cookiesString) {
	return cookiesString
		.split(";")
		.map(cookieString => cookieString.trim().split("="))
		.reduce((acc, [name, ...values]) => {
			acc[name] = values.join("=");
			return acc;
		}, {});
}
