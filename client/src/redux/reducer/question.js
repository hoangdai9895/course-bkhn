import {
  SET_QUESTION_LOADING,
  QUESTION_GET_ALL,
  QUESTION_GET_ALL_FAILED,
  QUESTION_ADD_NEW_FAILED,
  QUESTION_ADD_NEW,
  QUESTION_REMOVE,
  QUESITON_UPDATE,
} from "../actions/type";

const initialState = {
  loadingQuestions: false,
  questions: [],
  err: null,
};

export default function (state = initialState, action) {
  switch (action.type) {
    case SET_QUESTION_LOADING:
      return { ...state, loadingQuestions: true };
    case QUESTION_GET_ALL:
      return {
        ...state,
        loadingQuestions: false,
        questions: action.payload,
        err: null,
      };
    case QUESITON_UPDATE:
   
      return {
        ...state, questions: state.questions.map(e=>{
          if(+e._id === +action.payload._id){
            return action.payload
          } else {
            return e
          }
        })
      }
    case QUESTION_GET_ALL_FAILED:
      return {
        ...state,
        err: action.payload,
        loadingQuestions: false,
        questions: [],
      };

    case QUESTION_ADD_NEW:
      return {
        ...state,
        loadingQuestions: false,
        questions: [...state.questions, action.payload[0]],
        err: null,
      };

    case QUESTION_ADD_NEW_FAILED:
      return {
        ...state,
        loadingQuestions: false,
        err: action.payload,
      };

    case QUESTION_REMOVE:
      return {
        ...state,
        questions: state.questions.filter((e) => e._id !== action.payload),
      };
    default:
      return state;
  }
}
