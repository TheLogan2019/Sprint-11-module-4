import axios from "axios";

import {
  MOVE_CLOCKWISE,
  MOVE_COUNTERCLOCKWISE,
  SET_QUIZ_INTO_STATE,
  SET_SELECTED_ANSWER,
  SET_INFO_MESSAGE,
  INPUT_CHANGE,
  RESET_FORM,
} from "./action-types";

export function moveClockwise() {
  return { type: MOVE_CLOCKWISE };
}

export function moveCounterClockwise() {
  return { type: MOVE_COUNTERCLOCKWISE };
}

export function selectAnswer(answer) {
  return { type: SET_SELECTED_ANSWER, payload: answer };
}

export function setMessage(message) {
  return { type: SET_INFO_MESSAGE, payload: message };
}

export function setQuiz(quiz) {
  return { type: SET_QUIZ_INTO_STATE, payload: quiz };
}

export function inputChange(payload) {
  return { type: INPUT_CHANGE, payload };
}

export function resetForm() {
  return { type: RESET_FORM };
}

// ❗ Async action creators
export function fetchQuiz() {
  return function (dispatch) {
    dispatch(setQuiz(null));
    axios
      .get("http://localhost:9000/api/quiz/next")
      .then((res) => {
        dispatch(setQuiz(res.data));
      })
      .catch((err) => {
        dispatch(setMessage(err));
      });
  };
}
export function postAnswer(quiz_id, answer_id) {
  return function (dispatch) {
    axios
      .post("http://localhost:9000/api/quiz/answer", {
        quiz_id: quiz_id,
        answer_id: answer_id,
      })
      .then((res) => {
        dispatch(selectAnswer(null));
        dispatch(setMessage(res.data.message));
        dispatch(fetchQuiz());
      })
      .catch((err) => {
        dispatch(setMessage(err));
      });
  };
}
export function postQuiz(question, trueAnswer, falseAnswer) {
  return function (dispatch) {
    axios
      .post("http://localhost:9000/api/quiz/new", {
        question_text: question,
        true_answer_text: trueAnswer,
        false_answer_text: falseAnswer,
      })
      .then((res) => {
        dispatch(
          setMessage(`Congrats: "${res.data.question}" is a great question!`)
        );
        dispatch(resetForm());
      })
      .catch((err) => {
        dispatch(setMessage(err));
      });
  };
}
