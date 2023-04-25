import { GET } from './api.datasource';

const getMe = async () => {
	return await GET('/private/user/me', {}, {}, true);
};

export default { getMe };
