export const login = (args) => {
  return {
    type: 'login',
    payload: args
  };
};

export const logOut = () => {
  return {
    type: 'logout'
  };
};
