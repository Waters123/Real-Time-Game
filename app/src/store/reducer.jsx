const initialState = {
  login: {
    data: {
      token: null,
      name: null,
      tokenExpiration: null,
      userID: null
    }
  },
  auth: false
};

export const reducer = (state = initialState, action) => {
  switch (action.type) {
    case 'login':
      return {
        ...state,
        login: { ...action.payload }
      };
      break;
    case 'logout':
      return {
        ...state,
        login: {
          data: {
            token: null,
            name: null,
            tokenExpiration: null,
            userID: null
          }
        }
      };
      break;
  }

  return state;
};
