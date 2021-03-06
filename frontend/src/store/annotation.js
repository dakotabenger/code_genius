
const SET_ANNOTATION = 'annotation/setAnnotation';
const REMOVE_ANNOTATION = 'annotation/removeAnnotation';

const setAnnotation = (annotation) => ({
  type: SET_ANNOTATION,
  payload: annotation
});

const removeAnnotation = () => ({
  type: REMOVE_ANNOTATION
});

export const giveAnnotation = ({ annotation}) => async (dispatch) => {
  dispatch(setAnnotation(annotation));
  return annotation;
};

export const deleteAnnotation = (annotation) => async (dispatch) => {
  dispatch(removeAnnotation())
  return annotation
 
};




const initialState = { annotation: null};

function reducer(state = initialState, action) {
  let newState;
  switch (action.type) {
    case SET_ANNOTATION:
      newState = Object.assign({}, state, { annotation: action.payload});
      return newState;
    case REMOVE_ANNOTATION:
      newState = Object.assign({}, state, { annotation: null});
      return newState;
    default:
      return state;
  }
}

export default reducer;
