import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom"

interface Quiz {
  quistion:string,
  select:string[],
  answer:string,
}

export default function Quiz() {
  const location = useLocation();
  const {genre} = location.state || {genre:"onePiece"};
  const {difficulty} = location.state || {difficulty:"easy"};
  const [quizData, setQuizData] = useState<Quiz[]>([]);
  const [answers, setAnswers] = useState<boolean[]>([]);
  const [current, setCurrent] = useState<number>(0);


  const shuffle = (array:string[])=>{
    const result = [...array];
    for(let i=result.length-1; i>0; i--){
      const j = Math.floor(Math.random()*(i+1));
      [result[i],result[j]] = [result[j],result[i]];
    }
    return(result);
  }


  useEffect(()=>{
    const fetchQuiz = async()=>{
      const url = ``;

    }
  },[genre,difficulty])
  return (
    <div className="quiz">
      <h2 className="title">Quiz</h2>
    </div>
  )
}
