import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export const useErrorMessageHooks = () => {
  const [errorMessagesList, setErrorMessagesList] = useState([]);
  const [errMsg, setErrMsg] = useState('');
  const [data, setData] = useState({});
  const navigate = useNavigate();

  const handleErrorMessagesList = (key:any) => {
    if (errorMessagesList[0]?.field) {
      let message = errorMessagesList.filter((e) =>
        e?.field.toLowerCase().includes(key.toLowerCase())
      );
      return (
        <div className="mt-2">
          {message.map((e) => (
            <p className="text-red-600 text-xs" key={e}>
              {e?.message.replaceAll('Path ', '').replaceAll('`', '')}
            </p>
          ))}
        </div>
      );
    } else if (typeof errorMessagesList === 'string') {
      return (
        <div className="mt-2">
          <p className="text-red-600 text-xs">
            {errorMessagesList?.toLowerCase().includes(key.toLowerCase()) &&
              errorMessagesList?.replaceAll(',', ' ')}
          </p>
        </div>
      );
    } else {
      let message = errorMessagesList.filter((e) =>
        e?.toLowerCase().includes(key?.toLowerCase())
      );
      return (
        <div className="mt-2">
          {message.map((e) => (
            <p className="text-red-600 text-xs" key={e}>
              {e}
            </p>
          ))}
        </div>
      );
    }
  };

  const handleError = (err: { status: number; data: { message: any; }; }, name: string) => {
    if (err?.status >= 400 && err?.status < 500) {
      setErrorMessagesList(err?.data?.message || []);
    } else if (err?.status >= 500) {
      setErrMsg(name + ' failed');
    } else {
      setErrMsg(name + ' failed');
    }
  };

  const handleChange = (e:any) => {
    const newData = Object.assign({}, data, {
      [e.target.name]: e.target.value,
    });
    setData(newData);
  };

  return {
    errorMessagesList,
    setErrorMessagesList,
    handleErrorMessagesList,
    setErrMsg,
    errMsg,
    handleError,
    handleChange,
    navigate,
    setData,
    data,
  };
};

export default useErrorMessageHooks;
