import { useState } from 'react';
import axios from 'axios';

const useRequest = ({ url, method, body, onSuccess }) => {
  const [errors, setErrors] = useState(null);

  const doRequest = async () => {
    try {
      setErrors(null);

      const response = await axios[method](url, body);
      const { data } = response;

      if (onSuccess) {
        onSuccess(data);
      }

      return data;
    } catch (err) {
      const errorsToRender = err.response && err.response.data ? err.response.data.errors : [];

      setErrors(
        <div className="alert alert-danger">
          <h4>Whoops!</h4>
          <ul className="my-0">
            {errorsToRender.map((err) => (
              <li key={err.message}>{err.message}</li>
            ))}
          </ul>
        </div>
      );
    }
  };

  return { doRequest, errors };
};

export default useRequest;
