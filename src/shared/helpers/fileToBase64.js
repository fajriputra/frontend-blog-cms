export const fileToBase64 = (blob) => {
	return new Promise((resolve, _reject) => {
		const reader = new FileReader();
		reader.readAsDataURL(blob);
		reader.onload = () =>
			resolve({
				size: blob?.size,
				base64: reader.result,
				type: blob?.type,
			});
		reader.onerror = () => {
			resolve({ base64: '', size: 0, type: '' });
		};
	});
};
