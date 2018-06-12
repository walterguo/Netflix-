import axios from 'axios';

function requestStart() {
    return {
      type: 'FETCH_DATA_REQUEST',
    };
  }

  function requestSuccess(response) {
    return {
      type: 'FETCH_DATA_SUCCESS',
      response,
    };
  }

  function requestFail(error) {
    return {
      type: 'FETCH_DATA_FAILURE',
      error,
    };
  }

 export const getData= (url) => {
    return (dispatch, getState) => {
      dispatch(requestStart());
      axios
        .get(url)
        .then(response => {
          dispatch(requestSuccess(response));
        })
        .catch(err => {
          dispatch(requestFail(err));
        });
    };
  }

  export const updateData = (url, _id, obj) => {
    return (dispatch,getState) => {
      axios
         .put(url+"/"+_id, obj)
         .then(response => dispatch(getData(url)))
         .catch(err => {
           dispatch(requestFail(err));
         });
    }
  }