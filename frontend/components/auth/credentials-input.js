import { useState } from 'react';
import Router from 'next/router';

import useRequest from '../../hooks/use-request';

const authFormLabel = (authResource) => {
  const switcher = {
    signup: 'Registrar',
    signin: 'Entrar'
  };

  return switcher[authResource] || '';
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

  const label = authFormLabel(authResource);

  const onSubmit = async (event) => {
    event.preventDefault();
    await doRequest();
  };

  return (
    <form onSubmit={onSubmit}>
      <h1>{label}</h1>
      <div className="form-group">
        <label htmlFor="email">E-mail</label>
        <input
          id="email"
          value={email}
          className="form-control"
          onChange={(e) => setEmail(e.target.value)}
        />
        <label htmlFor="password">Senha</label>
        <input
          id="password"
          value={password}
          type="password"
          className="form-control"
          onChange={(e) => setPassword(e.target.value)}
        />
        {errors}
        <button className="btn btn-primary">{label}</button>
      </div>
    </form>
  );
};

export default CredentialsInput;
