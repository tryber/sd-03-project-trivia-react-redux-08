import SET_USER_LOGGIN from '../actions/actions';

const initialInfo = {
  email: '',
  name: '',
  isLogged: false,
  token: '',
};

const userInfoReducer = (state = initialInfo, action) => {
  const { type, data } = action;
  switch (type) {
    case SET_USER_LOGGIN:
      return {
        ...state,
        email: data.email,
        name: data.name,
        isLogged: true,
      };

    default:
      return state;
  }
};

export default userInfoReducer;
