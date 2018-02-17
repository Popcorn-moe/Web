<template>
  <pre>
    {{ messages }}
  </pre>
</template>

<script>
import { routes } from "../router";
import App from "../App";

export default {
	name: "Translations",
	data() {
		Promise.all(routes.filter(r => r.component).map(r => r.component())).then(
			components => {
				const messages = [this.$i18n.messages];
				const collectMessages = elem => {
					if (elem.i18n) messages.push(elem.i18n.messages);
					if (elem.components)
						Object.values(elem.components).forEach(collectMessages);
				};
				components.map(e => e.default).forEach(collectMessages);
				collectMessages(App);
				this.messages = mergeDeep({}, ...messages);
			}
		);
		return {
			messages: "Loading"
		};
	}
};

function isObject(item) {
	return item && typeof item === "object" && !Array.isArray(item);
}
function mergeDeep(target, ...sources) {
	if (!sources.length) return target;
	const source = sources.shift();

	if (isObject(target) && isObject(source)) {
		for (const key in source) {
			if (isObject(source[key])) {
				if (!target[key]) Object.assign(target, { [key]: {} });
				mergeDeep(target[key], source[key]);
			} else {
				Object.assign(target, { [key]: source[key] });
			}
		}
	}

	return mergeDeep(target, ...sources);
}
</script>
