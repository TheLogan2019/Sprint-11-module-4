import React from "react";
import { connect } from "react-redux";

function Message(props) {
  const { message } = props;
  return <div id="message">{message}</div>;
}

const mapStateToProps = (state) => {
  return {
    message: state.infoMessage,
  };
};

export default connect(mapStateToProps)(Message);
