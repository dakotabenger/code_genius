import { fetch } from './csrf.js';

const SET_LINE = 'Line/setLine';
const REMOVE_LINE = 'Line/removeLine';

const setLine = (Line) => ({
  type: SET_LINE,
  payload: Line
});

const removeLine = () => ({
  type: REMOVE_LINE
});

export const giveLine = (Line) => async (dispatch) => {
  dispatch(setLine(Line));
  return Line;
};

export const deleteLine = (Line) => async (dispatch) => {
  dispatch(removeLine())
  return Line
 
};




const initialState = { Line:null };

function reducer(state = initialState, action) {
  let newState;
  switch (action.type) {
    case SET_LINE:
      newState = Object.assign({}, state, { Line: action.payload});
      return newState;
    case REMOVE_LINE:
      newState = Object.assign({}, state, { Line: null });
      return newState;
    default:
      return state;
  }
}

export default reducer;
