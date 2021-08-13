import { useState } from 'react';
import Router from 'next/router';
import cx from 'clsx';

import useRequest from '../hooks/use-request';

import { CheckSVG, CloseSVG, PersonAddSVG } from '../icons';

const authFormLabel = (authResource) => {
	const switcher = {
		signup: {
			label: 'Registrar',
			svg: <PersonAddSVG />
		},
		signin: {
			label: 'Entrar',
			svg: <CheckSVG />
		}
	};

	return switcher[authResource] || '';
};

const renderInput = (errors, field, label, value, valueSetter) => {
	const error = errors.filter((item) => item.field === field)[0];

	return (
		<div className="form__element">
			<label className={cx('label', error && 'label--error')} htmlFor={field}>
				{error ? (
					`${error.message}`
				) : (
					<>
						{label}&nbsp;<span className="label__required">*</span>
					</>
				)}
			</label>
			<input
				id={field}
				value={value}
				type={field === 'password' ? 'password' : 'text'}
				className={cx('input', error && 'input--error')}
				onChange={(e) => valueSetter(e.target.value)}
			/>
		</div>
	);
};

const CredentialsInput = ({ authResource }) => {
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');

	const { doRequest, errors } = useRequest({
		url: `/api/users/${authResource.trim()}`,
		method: 'post',
		body: { email, password },
		onSuccess: () => Router.push('/')
	});

	const { label, svg } = authFormLabel(authResource);

	const onSubmit = async (event) => {
		event.preventDefault();
		await doRequest();
	};

	return (
		<form className="form" onSubmit={onSubmit}>
			<h1>{label}</h1>
			{renderInput(errors, 'email', 'E-mail', email, setEmail)}
			{renderInput(errors, 'password', 'Password', password, setPassword)}
			<div className="form__action">
				<button
					className="btn btn__icon btn__cancel"
					type="button"
					onClick={() => Router.push('/')}>
					<CloseSVG /> Cancelar
				</button>
				<button className="btn btn__primary btn__icon" type="submit">
					{svg}
					{label}
				</button>
			</div>
		</form>
	);
};

export default CredentialsInput;
