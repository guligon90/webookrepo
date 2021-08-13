import { useState } from 'react';
import axios from 'axios';

const useRequest = ({ url, method, body, onSuccess }) => {
	const [errors, setErrors] = useState([]);

	const doRequest = async () => {
		try {
			setErrors([]);

			const response = await axios[method](url, body);
			const { data } = response;

			if (onSuccess) {
				onSuccess(data);
			}

			return data;
		} catch (err) {
			setErrors(err.response && err.response.data ? err.response.data.errors : []);
		}
	};

	return { doRequest, errors };
};

export default useRequest;
