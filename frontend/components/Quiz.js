import React, { useEffect } from "react";
import { selectAnswer, postAnswer, fetchQuiz } from "../state/action-creators";
import { connect } from "react-redux";

function Quiz(props) {
  const { selectAnswer, postAnswer, fetchQuiz, quiz, select } = props;

  useEffect(() => {
    select === null ? fetchQuiz() : "";
  }, []);

  return (
    <div id="wrapper">
      {quiz !== null ? (
        <>
          <h2 id={quiz.quiz_id}>{quiz.question}</h2>

          <div id="quizAnswers">
            {quiz.answers.map((answer) => {
              return (
                <div
                  key={answer.answer_id}
                  className={
                    select !== answer.answer_id ? "answer" : "answer selected"
                  }
                  onClick={() => selectAnswer(answer.answer_id)}
                >
                  {answer.text}
                  <button>
                    {select !== answer.answer_id ? "Select" : "SELECTED"}
                  </button>
                </div>
              );
            })}
          </div>

          {select !== null ? (
            <button
              id="submitAnswerBtn"
              onClick={() => postAnswer(quiz.quiz_id, select)}
            >
              Submit answer
            </button>
          ) : (
            <button
              id="submitAnswerBtn"
              disabled
              onClick={() => postAnswer(quiz.quiz_id, select)}
            >
              Submit answer
            </button>
          )}
        </>
      ) : (
        "Loading next quiz..."
      )}
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    quiz: state.quiz,
    select: state.selectedAnswer,
  };
};

export default connect(mapStateToProps, {
  selectAnswer,
  postAnswer,
  fetchQuiz,
})(Quiz);
