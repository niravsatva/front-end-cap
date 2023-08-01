import axios from 'axios';

const endPoint = process.env.REACT_APP_API_ENDPOINT;

const apiConfig = (flag = false) => {
	if (localStorage.getItem('accessToken')) {
		return {
			headers: {
				Authorization: `bearer ${localStorage.accessToken}`,
				RefreshToken: `bearer ${localStorage.refreshToken}`,
				'Content-Type': flag ? 'multipart/form-data' : 'application/json',
			},
			method: 'PUT,DELETE,POST,GET,OPTION',
			withCredentials: true,
		};
	}
	return { withCredentials: true };
};

export const getApi = (url?: string, params?: any) => {
	return axios.get(`${endPoint}${url}`, {
		params: params,
		...apiConfig(),
	});
};

export const postApi = (url: string, apiData?: any, flag?: boolean) => {
	return axios.post(`${endPoint}${url}`, apiData, apiConfig(flag));
};

export const putApi = (url: string, apiData: any, flag?: boolean) => {
	return axios.put(`${endPoint}${url}`, apiData, apiConfig(flag));
};

export const putApiNoHeader = (url: string, apiData: any) => {
	return axios.put(`${endPoint}${url}`, apiData, {
		headers: {
			Authorization: `bearer ${localStorage.accessToken}`,
			RefreshToken: `bearer ${localStorage.refreshToken}`,
		},
	});
};

export const deleteApi = (url: string) => {
	return axios.delete(`${endPoint}${url}`, apiConfig());
};

export const deleteApiWithData = (url: string, apiData: any) => {
	return axios.delete(`${endPoint}${url}`, {
		data: apiData,
		...apiConfig(),
	});
};
