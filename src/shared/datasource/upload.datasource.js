import { UPLOAD } from './api.datasource';

const Uploader = async (param) => {
	return await UPLOAD('/private/upload-image', param, true);
};

export default { Uploader };
