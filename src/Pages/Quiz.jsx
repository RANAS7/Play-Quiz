import { useEffect, useState } from "react"
import "../Styles/Quiz.css"
import { Button } from "@mui/material"
import axios from 'axios';

function Quiz(){
  const[quizData, setQuizData] = useState([]);
  const[userAnswers, setUserAnswer] = useState(new Map());
  const[result, setResult] = useState(0);
  const[isFinishQuiz, setIsFInishQuiz] = useState(false);

    useEffect( () =>{
      getQuizData();
    },[true])


    const shuffle = (array)=>{
      return array.sort(()=>Math.random()-0.5);
    };

    const getQuizData=()=>{
      axios.get('https://opentdb.com/api.php?amount=10&category=9&difficulty=easy&type=multiple')
      .then(function (response) {
      // handle success
      const data=[];
      response.data['results'].forEach((item, index)=>{
        let answers = item.incorrect_answers;
        answers.push(item.correct_answer);
        item.answers = shuffle(answers);
        item.id = `que_${index}`
        data.push(item); 
      })
      setQuizData(data)
  })
      .catch(function (error) {
        // handle error
      console.log(error);
  })
      .finally(function () {
      // always executed
  });
    }

    const onCalculateResult =()=>{
      let result = 0;
      quizData.forEach((que) =>{
         if(userAnswers.get(que.id)===que.correct_answer){
           result = result+1;
         }
      })
      setResult(result);
        setIsFInishQuiz(true);
    }


    return(
            <div className="quizContainer" >
            <div style={{background:"#2e3244"}}>1</div>
            {isFinishQuiz?
            <div>{result}</div>:
            <div>
              {quizData.map((item)=> 
              <div>
                <div className="quesTitle">{item.question} </div>
                <div className="answerContainer">
                {item.answers.map((ans)=>
                <Button onClick={() =>{
                  userAnswers.set(item.id, ans);
                  setUserAnswer(new Map (userAnswers));
                }}
                variant="contained" style = {{  background : userAnswers.get(item.id)=== ans? 'green': '#fff'}}><div className = "circle">A</div>{ans}</Button> 
                )}
                 </div>
                
              </div>
              )}
              <Button onClick={() => onCalculateResult()} className="nxtbtn">Finish</Button>
            </div>
            }
            <div style={{background:"#2e3244"}}>3</div>
        </div>
    )
}
export default Quiz;