import { fetch } from './csrf.js';

const SET_SNIPPET = 'snippet/setsnippet';
const REMOVE_SNIPPET = 'snippet/removesnippet';

const setSnippet = (snippet) => ({
  type: SET_SNIPPET,
  payload: snippet
});

const removeSnippet = () => ({
  type: REMOVE_SNIPPET
});

export const giveSnippet = (snippet) => async (dispatch) => {
  dispatch(setSnippet(snippet));
  return snippet;
};

export const deleteSnippet = (snippet) => async (dispatch) => {
  dispatch(removeSnippet())
  return snippet
 
};




const initialState = { snippet:null };

function reducer(state = initialState, action) {
  let newState;
  switch (action.type) {
    case SET_SNIPPET:
      newState = Object.assign({}, state, { snippet: action.payload});
      return newState;
    case REMOVE_SNIPPET:
      newState = Object.assign({}, state, { snippet: null });
      return newState;
    default:
      return state;
  }
}

export default reducer;
