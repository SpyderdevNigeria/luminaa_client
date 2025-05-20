import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export const useErrorMessageHooks = () => {
  const [errorMessagesList, setErrorMessagesList] = useState<{ field: string; message: string }[] | string>([]);
  const [errMsg, setErrMsg] = useState('');
  const [data, setData] = useState();
  const navigate = useNavigate();

const handleErrorMessagesList = (key: any) => {
  if (!key || typeof key !== 'string') return null;

  if (Array.isArray(errorMessagesList) && errorMessagesList.length > 0) {
    let message = errorMessagesList.filter((e) =>
      typeof e?.field === 'string' &&
      e.field.toLowerCase().includes(key.toLowerCase())
    );

    return (
      <div className="mt-2">
        {message.map((e) => (
          <p className="text-red-600 text-xs" key={e.field}>
            {e?.message?.replace?.(/Path /g, '').replace(/`/g, '')}
          </p>
        ))}
      </div>
    );
  }

  if (typeof errorMessagesList === 'string') {
    return (
      <div className="mt-2">
        <p className="text-red-600 text-xs">
          {typeof errorMessagesList === 'string' && errorMessagesList.toLowerCase().includes(key.toLowerCase())
            ? errorMessagesList.replace(/,/g, ' ')
            : null}
        </p>
      </div>
    );
  }

  return null;
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
