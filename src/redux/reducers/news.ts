import initialState from '../initialState';
// Actions

const SET_NEWS = 'news/SET_NEWS';
const RESET_NEWS =  'news/RESET_NEWS';

type ACTION_TYPE =
   { type: 'news/SET_NEWS'; payload: [] } |
   { type: 'news/RESET_NEWS' }
 


// Reducer
export default function reducer(state = initialState.news, action : ACTION_TYPE) {
  switch (action.type) {
    case SET_NEWS:
      return {
        ...state,
        data: action.payload,
      };

    case RESET_NEWS:
      return {
        ...state,
        data: []
      };
    default:
      return state;
  }
}

// Action Creators

export function setNews(data: []) {
  return {
    type: SET_NEWS,
    payload: data,
  };
}


export function resetNews() {
  return {
    type: RESET_NEWS,
  };
}
