import { HTTPFetchNetworkInterface, printAST } from "apollo-client";

export class UploadHTTPFetchNetworkInterface extends HTTPFetchNetworkInterface {
	fetchFromRemoteEndpoint({ request, options }) {
		options.credentials = "include";

		if (request.variables) {
			const files = [];
			findFiles(request.variables, files);

			if (files.length) {
				const formData = new FormData();
				formData.append("query", printAST(request.query));
				formData.append("variables", JSON.stringify(request.variables));
				files.forEach(([name, value]) => formData.append(name, value));

				options.headers = options.headers || {};
				options.headers["x-graphql-files"] = files
					.map(([name]) => name)
					.join(",");

				return fetch(this._uri, {
					method: "POST",
					body: formData,
					...options
				});
			}
		}

		return super.fetchFromRemoteEndpoint({ request, options });
	}
}

export function createNetworkInterface({ uri, opts = {} }) {
	return new UploadHTTPFetchNetworkInterface(uri, opts);
}

function findFiles(object, array, prefix = "") {
	const files = Object.entries(object).forEach(([name, value]) => {
		if (value instanceof File) {
			delete object[name];
			array.push([prefix + name, value]);
		} else if (value && typeof value === "object") {
			findFiles(value, array, name + ".");
		}
	});
}
