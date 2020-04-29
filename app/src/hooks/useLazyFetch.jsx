import { useCallback, useReducer } from 'react';

const initialState = {
  data: null,
  loading: true,
  errors: null
};

const reducer = (state, action) => {
  switch (action.type) {
    case 'setData':
      return { ...state, data: action.data, loading: false, errors: null };
    case 'error':
      return {
        ...state,
        data: null,
        errors: action.error,
        loading: false
      };
    default:
      return state;
  }
};

export function useLazyFetch(endpoint) {
  const [state, dispatch] = useReducer(reducer, initialState);

  const fetcher = useCallback(
    (options) => {
      (async () => {
        try {
          const response = await fetch(endpoint, {
            method: 'POST',
            body: JSON.stringify(options),
            headers: {
              'Content-Type': 'application/json'
            }
          });
          const res = await response.json();

          dispatch({ type: 'setData', data: res.data.login });
        } catch (err) {
          dispatch({ type: 'error', error: 'username or password is incorrect' });
        }
      })();
    },
    [endpoint]
  );

  return [
    fetcher,
    {
      data: state.data,
      loading: state.loading,
      errors: state.errors
    }
  ];
}
