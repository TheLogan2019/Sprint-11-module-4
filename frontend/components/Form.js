import React from "react";
import { connect } from "react-redux";
import { inputChange, postQuiz } from "../state/action-creators";

const getIsInvalid = (value = "") => value?.trim().length === 0;

export function Form(props) {
  const { postQuiz, question, trueAnswer, falseAnswer, inputChange } = props;

  const onChange = (evt) => {
    inputChange({
      [evt.target.getAttribute("name")]: evt.target.value,
    });
  };

  const onSubmit = (evt) => {
    evt.preventDefault();
    postQuiz(question, trueAnswer, falseAnswer);
  };

  return (
    <form id="form" onSubmit={onSubmit}>
      <h2>Create New Quiz</h2>
      <input
        name="newQuestion"
        value={question}
        maxLength={50}
        onChange={onChange}
        id="newQuestion"
        placeholder="Enter question"
      />
      <input
        name="newTrueAnswer"
        value={trueAnswer}
        maxLength={50}
        onChange={onChange}
        id="newTrueAnswer"
        placeholder="Enter true answer"
      />
      <input
        name="newFalseAnswer"
        value={falseAnswer}
        maxLength={50}
        onChange={onChange}
        id="newFalseAnswer"
        placeholder="Enter false answer"
      />

      <button
        id="submitNewQuizBtn"
        disabled={
          getIsInvalid(question) ||
          getIsInvalid(trueAnswer) ||
          getIsInvalid(falseAnswer)
        }
      >
        Submit new quiz
      </button>
    </form>
  );
}

const mapStateToProps = (state) => {
  return {
    question: state.form.newQuestion,
    trueAnswer: state.form.newTrueAnswer,
    falseAnswer: state.form.newFalseAnswer,
  };
};

export default connect(mapStateToProps, { inputChange, postQuiz })(Form);
