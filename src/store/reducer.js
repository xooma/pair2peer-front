import omit from 'object.omit';
import { actions } from 'src/store/actions';

const initialState = {
  search: {
    remote: '',
    language: '',
    country: '',
    city: '',
    it_language: '',
    level: '',
  },
  filters: {
    it_language: [],
    language: [],
    localisation: [],
  },
  usersData: {},
  loading: false,
  signupConfirm: false,
};


export default (state = initialState, action = {}) => {
  switch (action.type) {
    case actions.GET_AUTHENTIFIED: {
      return {
        ...state,
        user: action.data,
      };
    }
    case actions.GET_LOGOUT: {
      return omit({ ...state }, 'user');
    }
    case actions.GET_USERS_LIST: {
      return {
        ...state,
        usersData: action.users,
      };
    }
    case actions.GET_FILTERS_LIST: {
      return {
        ...state,
        filters: action.filters,
        usersData: {
          ...state.usersData,
          maxUser: action.maxUser,
        },
      };
    }
    case actions.SUBMIT_FILTERS_SEARCH: {
      return {
        ...state,
        usersData: actions.users,
      };
    }
    case actions.SYNC_SEARCH_INPUTS: {
      return {
        ...state,
        search: {
          ...state.search,
          [action.name]: action.value,
        },
      };
    }
    case actions.DISPLAY_ERRORS_MSG: {
      return {
        ...state,
        errors: action.errors,
      };
    }
    case actions.CLEAR_ERRORS_MSG: {
      return omit({ ...state }, 'errors');
    }
    case actions.UPDATE_USER: {
      return {
        ...state,
        user: action.data,
        loading: false,
      };
    }
    case actions.SET_LOADER: {
      return {
        ...state,
        loading: !state.loading,
      };
    }
    case actions.GET_USER_INBOX: {
      return {
        ...state,
        inbox: action.data,
      };
    }
    case actions.SELECTED_USER_DETAILS: {
      return {
        ...state,
        selectedUser: action.user,
      };
    }
    case actions.RESET_FILTERS: {
      return {
        ...state,
        search: initialState.search,
      };
    }
    case actions.SIGNUP_CONFIRM: {
      return {
        ...state,
        signupConfirm: true,
      };
    }
    case actions.NO_SIGNUP_CONFIRM: {
      return {
        ...state,
        signupConfirm: false,
      };
    }
    default: {
      return state;
    }
  }
};
