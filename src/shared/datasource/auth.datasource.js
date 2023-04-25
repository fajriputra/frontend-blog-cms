import { coreConfig } from '../config/core.config';
import { POST } from './api.datasource';
import localStorage from './localstorage.datasource';

const Login = async (param) => {
	return await POST('/auth/login', param, false);
};

const Register = async (param) => {
	return await POST('/auth/register', param, false);
};

const storeToken = async (param) => {
	return localStorage.setData(coreConfig.APP.AUTH_STORAGE, param);
};

const deleteToken = async () => {
	return localStorage.removeData(coreConfig.APP.AUTH_STORAGE);
};

const getToken = async () => {
	return localStorage.getData(coreConfig.APP.AUTH_STORAGE);
};

export default { Login, Register, storeToken, deleteToken, getToken };
