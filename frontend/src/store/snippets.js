import { fetch } from './csrf.js';

const SET_SNIPPETS = 'snippets/setsnippets';
const REMOVE_SNIPPETS = 'snippets/removesnippets';

const setSnippets = (snippets) => ({
  type: SET_SNIPPETS,
  payload: snippets
});

const removeSnippets = () => ({
  type: REMOVE_SNIPPETS
});

export const giveSnippets = ({ snippets}) => async (dispatch) => {
  dispatch(setSnippets(snippets));
  return snippets;
};

export const deleteSnippets = (snippets) => async (dispatch) => {
  dispatch(removeSnippets())
  return snippets
 
};




const initialState = { snippets:null };

function reducer(state = initialState, action) {
  let newState;
  switch (action.type) {
    case SET_SNIPPETS:
      newState = Object.assign({}, state, { snippets: action.payload.snippets});
      return newState;
    case REMOVE_SNIPPETS:
      newState = Object.assign({}, state, { snippets: null });
      return newState;
    default:
      return state;
  }
}

export default reducer;
