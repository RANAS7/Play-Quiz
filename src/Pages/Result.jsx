import { Button } from "@material-ui/core";
import { useEffect } from "react";
// import { useHistory } from 'react-router-dom';
// import { useHistory } from 'react-router-dom';

import { useNavigate } from "react-router-dom";
import "../Styles/Result.css";

const Result = ({ name, score }) => {
  const navigateTo = useNavigate();
  const history = navigateTo();

  useEffect(() => {
    if (!name) {
      history.push("/");
    }
  }, [name, history]);

  return (
    <div className="result">
      <span className="title">Final Score : {score}</span>
      <Button
        variant="contained"
        color="secondary"
        size="large"
        style={{ alignSelf: "center", marginTop: 20 }}
        href="/"
      >
        Go to homepage
      </Button>
    </div>
  );
};

export default Result;
