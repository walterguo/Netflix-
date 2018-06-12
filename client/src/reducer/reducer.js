const initialstate={
    _id:null,
    movieLists:{
        mylist:[],
        recommendations:[]
    }
}

const reducer = (state=initialstate,action) => {
    switch (action.type) {
        case 'FETCH_DATA_REQUEST':
        console.log('FETCH_DATA_REQUEST');
          return {
            ...state,
          };
        case 'FETCH_DATA_FAILURE':
        console.log('FETCH_DATA_FAILURE');
          return {
            ...state,
          };
        case 'FETCH_DATA_SUCCESS':
        console.log('FETCH_DATA_SUCCESS');
          return {
              ...state,
             movieLists: action.response.data[0].movieList,
             _id:action.response.data[0]._id
          };
      default: return state;
      }
}

export default reducer;