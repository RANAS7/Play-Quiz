import axios from "axios";
import { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import Footer from "./Components/Footer";
import Header from "./Components/Header";
import Home from "./Pages/Home";
import PlayQuiz from "./Pages/PlayQuiz";
import Result from "./Pages/Result";

function App() {
  const [questions, setQuestions] = useState();
  const [name, setName] = useState();
  const [score, setScore] = useState(0);

  const fetchQuestions = async (category = "", difficulty = "") => {
    const { data } = await axios.get(
      `https://opentdb.com/api.php?amount=20${
        category && `&category=${category}`
      }${difficulty && `&difficulty=${difficulty}`}&type=multiple`
    );

    setQuestions(data.results);
  };

  return (
    <Router>
      <div className="app" >
        <Header />
        <Routes>
          <Route path="/" element={
            <Home
              name={name}
              setName={setName}
              fetchQuestions={fetchQuestions}
            />}/>
          
          <Route path="/playQuiz" element={
            <PlayQuiz
              name={name}
              questions={questions}
              score={score}
              setScore={setScore}
              setQuestions={setQuestions}
            />}/>

          <Route path="/result" element={<Result name={name} score={score} />}/>
        </Routes>
      </div>
      <Footer />
    </Router>
  );
}

export default App;