export const buildApiUrl = (params) => {
	let url = "";
	if (params && Object.keys(params).length > 0) {
		Object.keys(params).forEach((key, i) => {
			let prefix = i === 0 ? `?` : `&`;
			url += `${prefix}${key}=${params[key]}`;
		});
	}
	return url;
};
