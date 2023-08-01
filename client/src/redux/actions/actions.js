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
} from "../actions-types/actions-types";
import axios from 'axios';

const URL = 'http://localhost:3001';

export const getDogsRequest = () => ({
  type: GET_DOGS_REQUEST
});
export const getDogsSuccess = (dogs) => ({
  type: GET_DOGS_SUCCESS,
  payload: dogs
});
export const getDogsError = (error) => ({
  type: GET_DOGS_ERROR,
  payload: error
});
export const getDogs = () => {
  return async (dispatch) => {
    dispatch(getDogsRequest());
    try {
      const response = await axios.get(`${URL}/dogs`);
      const dogs = response.data;
      dispatch(getDogsSuccess(dogs));
    } catch (error) {
      dispatch(getDogsError(error.response.data))
    };
  };
};


export const searchDogRequest = () => ({
  type: SEARCH_DOG_REQUEST
});
export const searchDogSuccess = (name) => ({
  type: SEARCH_DOG_SUCCESS,
  payload: name
});
export const searchDogError = (error) => ({
  type: SEARCH_DOG_ERROR,
  payload: error
})
export const searchDog = (name) => async (dispatch) => {
  try {
    dispatch(searchDogRequest());
    const response = await axios.get(`${URL}/byname?name=${name}`);
    const data = await response.data;
    dispatch(searchDogSuccess(data))
  } catch (error) {
    dispatch(searchDogError(error))
  }
}


export const getTemperamentsRequest = () => ({
  type: GET_TEMPERAMENTS_REQUEST
});
export const getTemperamentsSuccess = (temperaments) => ({
  type: GET_TEMPERAMENTS_SUCCESS,
  payload: temperaments
});  
export const getTemperamentsError = (error) => ({
  type: GET_TEMPERAMENTS_ERROR,
  payload: error
});
export const getTemperaments = () => {
  return async (dispatch) => {
    dispatch(getTemperamentsRequest());
    try {
      const response = await axios.get(`${URL}/temperaments`);
      const temperaments = response.data;
      dispatch(getTemperamentsSuccess(temperaments));
    } catch (error) {
      dispatch(getTemperamentsError(error.message))
    };
  };
};


export const postUserRequest = () => ({
  type: POST_USER_REQUEST
});
export const postUserSuccess = (userData) => ({
  type: POST_USER_SUCCESS,
  payload: userData
});
export const postUserError = (error) => ({
  type: POST_USER_ERROR,
  payload: error
});
export const postUser = (userData) => {
  return async (dispatch) => {
    try {
      dispatch(postUserRequest());
      const endpoint = `${URL}/register`;
      const response = await axios.post(endpoint, userData);
      const data = response.data;
      dispatch(postUserSuccess(data));
    } catch (error) {
      dispatch(postUserError(error));
    };
  };
};


export const postFavoriteRequest = () => ({
  type: POST_FAVORITE_REQUEST
});
export const postFavoriteSuccess = (dog) => ({
  type: POST_FAVORITE_SUCCESS,
  payload: dog
});
export const postFavoriteError = (error) => ({
  type: POST_FAVORITE_ERROR,
  payload: error,
});
export const postFavorite = (dog) => {
  return async (dispatch) => {
    const token = localStorage.getItem('token'); // Obtener el token actualizado cada vez que se llama a la acción
    dispatch(postFavoriteRequest());
    const endpoint = `${URL}/favorite`;
    try {
      const { data } = await axios.post(endpoint, dog, {
        headers: {
          'x-access-token': token, // Incluimos el token en el encabezado
          'Content-Type': 'application/json', // Si es necesario, ajusta el Content-Type según tu API
        },
      });
      dispatch(postFavoriteSuccess(data));
    } catch (error) {
      dispatch(postFavoriteError(error.response));
    };
  };
};


export const deleteFavoriteRequest = () => ({
  type: DELETE_FAVORITE_REQUEST
});
export const deleteFavoriteSuccess = (_id) => ({
  type: DELETE_FAVORITE_SUCCESS,
  payload: _id
});
export const deleteFavoriteError = (error) => ({
  type: DELETE_FAVORITE_ERROR,
  payload: error
});
export const deleteFavorite = (_id) => {
  return async (dispatch) => {
    const token = localStorage.getItem('token'); 
    dispatch(deleteFavoriteRequest());
    const endpoint = `${URL}/favorite/${_id}`;
    try {
      await axios.delete(endpoint,{
        headers: {
          'x-access-token': token,
          'Content-Type': 'application/json', 
      }},);
      dispatch(deleteFavoriteSuccess(_id));
    } catch (error) {
      dispatch(deleteFavoriteError(error.response))
    };
  };
};


export const getFavoriteRequest = () => ({
  type: GET_FAVORITE_REQUEST
});
export const getFavoriteSuccess = (dogs) => ({
  type: GET_FAVORITE_SUCCESS,
  payload: dogs
});
export const getFavoriteError = (error) => ({
  type: GET_FAVORITE_ERROR,
  payload: error
});
export const getFavorite = () => {
  return async (dispatch) => {
    const token = localStorage.getItem('token'); 
    dispatch(getFavoriteRequest());
    try {
      const response = await axios.get(`${URL}/favorite`,{
        headers: {
          'x-access-token': token,
          'Content-Type': 'application/json', 
        }
      });
      const dogs = response.data;
      dispatch(getFavoriteSuccess(dogs));
    } catch (error) {
      dispatch(getFavoriteError(error.response))
    };
  };
};


export const postMessageRequest = () => ({
  type: POST_MESSAGE_REQUEST
});
export const postMessageSuccess = (message) => ({
  type: POST_MESSAGE_SUCCESS,
  payload: message
});
export const postMessageError = (error) => ({
  type: POST_MESSAGE_ERROR,
  payload: error
});
export const postMessage = (message) => {
  return async (dispatch) => {
    dispatch(postMessageRequest());
    const endpoint = `${URL}/message`;
    try {
      const { data } = await axios.post(endpoint, message);
      dispatch(postMessageSuccess(data));
    } catch (error) {
      dispatch(postMessageError(error.response)); 
    };
  };
};


export const getCreateDogRequest = () => ({
  type: GET_CREATE_DOG_REQUEST
});
export const getCreateDogSuccess = (dogs) => ({
  type: GET_CREATE_DOG_SUCCESS,
  payload: dogs
})
export const getCreateDogError = (error) => ({
  type: GET_CREATE_DOG_ERROR,
  payload: error
});
export const getCreateDog = () => {
  return async (dispatch) => {
    const token = localStorage.getItem('token'); 
    dispatch(getCreateDogRequest());
    try {
      const response = await axios.get(`${URL}/mydogs`, {
        headers: {
          'x-access-token': token,
          'Content-Type': 'application/json', 
        }
      });
      const dogs = response.data;
      dispatch(getCreateDogSuccess(dogs));
    } catch (error) {
      dispatch(getCreateDogError(error.response))
    };
  };
};


export const clearUserData = () => {
  return {
    type: CLEAR_USER_DATA
  };
};
