import { useEffect } from 'react';
import { Router } from 'next/router';

import useRequest from '../../hooks/use-request';

const SignOut = () => {
	const { doRequest } = useRequest({
		url: '/api/users/signout',
		method: 'post',
		body: {},
		onSuccess: () => {
			return Router.push('/');
		}
	});

	useEffect(() => {
		doRequest();
	}, []);

	return null;
	//return <h1>Saindo do sistema...</h1>;
};

export default SignOut;
