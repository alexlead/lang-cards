import React, { useEffect, useState } from 'react';
import { IQuizSet } from '../../models/model';


interface IQuizItemProps {
    question:  IQuizSet;
    handleAnswer: (isCorrect: boolean ) => void;
}

const QuizItem: React.FunctionComponent<IQuizItemProps> = ({question, handleAnswer}) => {

    const [ clickedAnswerIndex, setClickedAnswerIndex ] = useState<number>(-1);  

    const checkAnswer = ( ind: number, answer: string ) => {
        if ( clickedAnswerIndex === -1 ) {
            setClickedAnswerIndex( ind );
            handleAnswer( answer === question.correct );
        }
    }
    
    useEffect( () => {
        setClickedAnswerIndex( -1 );
    }, [question] )

return(
     <>
     
     <div className={'d-flex flex-column quiz-card w-100'}>
        
        <div className="quiz-card__question d-flex align-items-center justify-content-center fs-1 " style={{padding:" 50px 0", minHeight: "300px"}}>
            {question.word}
        </div>
        <div className="quiz-card__answers d-flex flex-wrap justify-content-center" style={{gap: "10px"}}>
            {
                question.answers.map( (item, index) => <div key={`ans_${index}`} className='d-flex align-items-stretch border border-1 border-info clickable' style={{flex: "0 0 45%"}}onClick={()=>checkAnswer(index, item)}><div className={'fs-3 p-2 me-3 text-center text-white d-flex align-items-center ' + ( clickedAnswerIndex > -1 ? (item === question.correct) ? 'bg-success' : clickedAnswerIndex === index ? 'bg-warning' : 'bg-primary' : 'bg-primary' ) }style={{ }}>{index + 1}</div><div className='fs-5 text-center align-self-center'>{item}</div></div>)
            }
        </div>
        </div>

     </>
);
}
export default QuizItem;