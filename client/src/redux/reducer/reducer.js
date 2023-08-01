import {
  GET_DOGS_REQUEST, GET_DOGS_SUCCESS, GET_DOGS_ERROR, 
  SEARCH_DOG_REQUEST, SEARCH_DOG_SUCCESS, SEARCH_DOG_ERROR, 
  GET_TEMPERAMENTS_REQUEST, GET_TEMPERAMENTS_SUCCESS, GET_TEMPERAMENTS_ERROR, 
  POST_USER_REQUEST, POST_USER_SUCCESS, POST_USER_ERROR, 
  POST_FAVORITE_REQUEST, POST_FAVORITE_SUCCESS, POST_FAVORITE_ERROR, 
  DELETE_FAVORITE_REQUEST, DELETE_FAVORITE_SUCCESS, DELETE_FAVORITE_ERROR, 
  GET_FAVORITE_REQUEST, GET_FAVORITE_SUCCESS, GET_FAVORITE_ERROR, 
  POST_MESSAGE_REQUEST, POST_MESSAGE_SUCCESS, POST_MESSAGE_ERROR, 
  GET_CREATE_DOG_REQUEST, GET_CREATE_DOG_SUCCESS, GET_CREATE_DOG_ERROR, CLEAR_USER_DATA
} from '../actions-types/actions-types';

const initialState = {
  dogs: [],
  search: [],
  temperaments: [],

  loadingGetDogs: false,
  errorGetDogs: false,
  successGetDogs: false,

  loadingSearchDogs: false,
  errorSearchDogs: false,
  successSearchDogs: false,

  loadingRegister: false,
  errorgRegister: false,
  successRegister: false,

  myFavorites: [],

  loadingPostFavorite: false,
  errorPostFavorite: false,
  successPostfavorite: false,

  loadingDeleteFavorite: false,
  errorDeleteFavorite: false,
  successDeleteFavorite: false,

  loadingGetFavorite: false,
  errorGetFavorite: false,
  successGetFavorite: false,

  loadingPostMessage: false,
  errorPostMessage: false,
  successPostMessage: false,

  loadingGetCreateDog: false,
  errorgGetCreateDog: false,
  successGetCreateDog: false,
  myCreateDogs: [],
};

const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_DOGS_REQUEST:
      return{
        ...state,
        loadingGetDogs: true,
        errorGetDogs: false,
        successGetDogs: false
      };
    case GET_DOGS_SUCCESS:
      return{
        ...state,
        loadingGetDogs: false,
        errorGetDogs: false,
        successGetDogs: true,
        dogs: action.payload
      };
    case GET_DOGS_ERROR:
      return{
        ...state,
        loadingGetDogs: false,
        errorGetDogs: action.payload,
        successGetDogs: false
      }
      
    case SEARCH_DOG_REQUEST:
      return{
        ...state,
        loadingSearchDogs: true,
        errorSearchDogs: false,
        successSearchDogs: false
      }
    case SEARCH_DOG_SUCCESS:
      return{
        ...state,
        loadingSearchDogs: false,
        errorSearchDogs: false,
        successSearchDogs: true,
        search: action.payload
      }
    case SEARCH_DOG_ERROR:
      return{
        ...state,
        loadingSearchDogs: false,
        errorSearchDogs: action.payload,
        successSearchDogs: false,
      }

    case GET_TEMPERAMENTS_REQUEST:
      return{
        ...state,
        loading: true,
        error: false,
        success: false
      };
    case GET_TEMPERAMENTS_SUCCESS:
      return{
        ...state,
        loading: false,
        error: false,
        success: true,
        temperaments: action.payload
      };
    case GET_TEMPERAMENTS_ERROR:
      return{
        ...state,
        loading: false,
        error: action.payload,
        success: false
      }

    case POST_USER_REQUEST:
      return{
        ...state,
        loadingRegister: true,
        errorgRegister: false,
        successRegister: false
      }
    case POST_USER_SUCCESS:
      return{
        ...state,
        loadingRegister: false,
        errorgRegister: false,
        successRegister: true
      }
    case POST_USER_ERROR:
      return{
        ...state,
        loadingRegister: false,
        errorgRegister: action.payload,
        successRegister: false
      }

    case POST_FAVORITE_REQUEST: 
    return{
      ...state,
      loadingPostFavorite: true,
      errorPostFavorite: false,
      successPostfavorite: false
    }
    case POST_FAVORITE_SUCCESS:
      return{
        ...state,
        loadingPostFavorite: false,
        errorPostFavorite: false,
        successPostfavorite: true,
      }
    case POST_FAVORITE_ERROR:
      return{
        ...state,
        loadingPostFavorite: false,
        errorPostFavorite: action.payload,
        successPostfavorite: false
      }

    case DELETE_FAVORITE_REQUEST:
      return{
        ...state,
        loadingDeleteFavorite: true,
        errorDeleteFavorite: false,
        successDeleteFavorite: false
      }
    case DELETE_FAVORITE_SUCCESS:
      const deletedFavoriteId = action.payload; // Id del favorito eliminado
      const updatedFavorites = state.myFavorites.filter(favorite => favorite._id !== deletedFavoriteId); // Verifica el _id del perro, no el id
      
      return {
        ...state,
        loadingDeleteFavorite: false,
        errorDeleteFavorite: false,
        successDeleteFavorite: true,
        myFavorites: updatedFavorites
      };
    case DELETE_FAVORITE_ERROR:
      return{
        ...state,
        loadingDeleteFavorite: false,
        errorDeleteFavorite: action.payload,
        successDeleteFavorite: false
      }

    case GET_FAVORITE_REQUEST:
      return{
        ...state,
        loadingGetFavorite: true,
        errorGetFavorite: false,
        successGetFavorite: false
      }
    case GET_FAVORITE_SUCCESS:
      return{
        ...state,
        loadingGetFavorite: false,
        errorGetFavorite: false,
        successGetFavorite: true,
        myFavorites: action.payload
      }
    case GET_FAVORITE_ERROR:
      return{
        ...state,
        loadingGetFavorite: false,
        errorGetFavorite: action.payload,
        successGetFavorite: false
      }

    case POST_MESSAGE_REQUEST:
      return{
        ...state,
        loadingPostMessage: true,
        errorPostMessage: false,
        successPostMessage: false,
      }
    case POST_MESSAGE_SUCCESS:
      return{
        ...state,
        loadingPostMessage: false,
        errorPostMessage: false,
        successPostMessage: true,
      }
    case POST_MESSAGE_ERROR:
      return{
        ...state,
        loadingPostMessage: false,
        errorPostMessage: action.payload,
        successPostMessage: false,
      }

    case GET_CREATE_DOG_REQUEST:
      return{
        ...state,
        loadingGetCreateDog: true,
        errorgGetCreateDog: false,
        successGetCreateDog: false,
      }
    case GET_CREATE_DOG_SUCCESS:
      return{
        ...state,
        loadingGetCreateDog: false,
        errorgGetCreateDog: false,
        successGetCreateDog: true,
        myCreateDogs: action.payload
      }
    case GET_CREATE_DOG_ERROR:
      return{
        ...state,
        loadingGetCreateDog: false,
        errorgGetCreateDog: action.payload,
        successPostMessage: false,
      }

    case CLEAR_USER_DATA:
      return{
        ...state,
        dogs: [],
        search: [],
        temperaments: [],
        loadingGetDogs: false,
        errorGetDogs: false,
        successGetDogs: false,
        loadingSearchDogs: false,
        errorSearchDogs: false,
        successSearchDogs: false,
        loadingRegister: false,
        errorgRegister: false,
        successRegister: false,
        myFavorites: [],
        loadingPostFavorite: false,
        errorPostFavorite: false,
        successPostfavorite: false,
        loadingDeleteFavorite: false,
        errorDeleteFavorite: false,
        successDeleteFavorite: false,
        loadingGetFavorite: false,
        errorGetFavorite: false,
        successGetFavorite: false,
        loadingPostMessage: false,
        errorPostMessage: false,
        successPostMessage: false,
        loadingGetCreateDog: false,
        errorgGetCreateDog: false,
        successGetCreateDog: false,
        myCreateDogs: [],
      }

    default:
      return{...state};
  };
};

export default rootReducer;