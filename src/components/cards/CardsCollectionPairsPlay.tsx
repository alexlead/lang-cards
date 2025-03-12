import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { IFolderDb, WordItem } from '../../models/model';
import { folderDB, wordDB } from '../../repository/db';
import { getRandomNumbers, shuffleArray } from '../../utils/randomGenerators';
interface ICardsCollectionPairsPlayProps {
}

interface IQuestionAnswerWord {
     id: number;
     word: string;
     answered: boolean;
}

const CardsCollectionPairsPlay: React.FunctionComponent<ICardsCollectionPairsPlayProps> = () => {
     const { slug } = useParams();
     const [collectionWords, setCollectionWords] = useState<WordItem[]>([]);
     const [currentFolder, setCurrentFolder] = useState<IFolderDb>();
     const [hideTable, setHideTable] = useState<boolean>(false)

     const [questions, setQuestions] = useState<IQuestionAnswerWord[]>([]);
     const [answers, setAnswers] = useState<IQuestionAnswerWord[]>([]);

     const [selectedQuestion, setSelectedQuestion] = useState<number>(0);
     const [selectedAnswer, setSelectedAnswer] = useState<number>(0);

     const [isCorrectAnswer, setIsCorrectAnswer] = useState<string>("");



     const generateNumbers = () => {
          const newNumbers = getRandomNumbers(0, (collectionWords.length - 1), 5);
          setQuestions(shuffleArray([...newNumbers.map(item => ({ id: collectionWords[item].id, word: collectionWords[item].word, answered: false }))]))
          setAnswers(shuffleArray([...newNumbers.map(item => ({ id: collectionWords[item].id, word: collectionWords[item].translation, answered: false }))]))
     };


     const getCollectionDetails = async () => {
          if (!slug) {
               return;
          }
          try {
               const res = await folderDB.getBySlug(slug)
               setCurrentFolder(res);

          } catch (error) {

          }
     }

     const handleQuestion = (id: number) => {

          const questionItem = [...questions].filter(item => item.id === id)[0];
          if (!questionItem.answered) {
               setSelectedQuestion(id);
          }
     }

     const handleAnswer = (id: number) => {
          const answerItem = [...answers].filter(item => item.id === id)[0];
          if (!answerItem.answered) {
               setSelectedAnswer(id)
          }
     }



     const getAllCollectionWords = async () => {
          if (!currentFolder) {
               return;
          }
          try {
               const res = await wordDB.getByFolderId(currentFolder.id);
               setCollectionWords([...res.map((item: any) => ({ ...item }))])
          } catch (error) {

          }
     }

     useEffect(() => {
          getCollectionDetails();
     }, [slug])

     useEffect(() => {
          getAllCollectionWords();
     }, [currentFolder])

     useEffect(() => {
          if (collectionWords.length > 4 && answers.length === 0 ) {
               generateNumbers();
          }          
          
          if ( answers.length === 5 && [...answers].filter(item => item.answered === false).length === 0) {

               setTimeout(() => {
                    generateNumbers();
               }, 1000)
          }

     }, [collectionWords, questions, answers])

     useEffect(() => {
          if (selectedQuestion > 0 && selectedAnswer > 0) {
               if (selectedQuestion === selectedAnswer) {
                    setIsCorrectAnswer("Correct")
                    const questionIndex = [...questions].findIndex(item => item.id === selectedQuestion);
                    const questionList = [...questions]
                    questionList[questionIndex] = { ...questionList[questionIndex], answered: true }
                    setQuestions([...questionList])

                    const answerIndex = [...answers].findIndex(item => item.id === selectedAnswer);
                    const answerList = [...answers]
                    answerList[answerIndex] = { ...answerList[answerIndex], answered: true }
                    setAnswers([...answerList])
               } else {
                    setIsCorrectAnswer("Incorrect")
               }
               setSelectedQuestion(0);
               setSelectedAnswer(0);
          }
     }, [selectedQuestion, selectedAnswer])

     useEffect(() => {
          if (isCorrectAnswer.length > 0) {
               setTimeout(() => {
                    setIsCorrectAnswer("");
               }, 1000)
          }
     }, [isCorrectAnswer])

     return (
          <>

               {
                    collectionWords.length > 0 ?
                         <>
                              <div className="container my-2 text-center">
                                   <h1>{currentFolder?.folder}</h1>
                              </div>
                              <div className="container my-3 text-center">
                                   <p>connect word-translation pairs </p>
                              </div>
                              <div className="container ">
                                   <div className='d-flex align-items-center justify-content-between text-black border border-1 px-2 py-3 shadow' >

                                        <div className="col px-3">
                                             {
                                                  questions &&
                                                  questions.map(item =>
                                                       <div className={"card my-2 " + (!item.answered ? " clickable " : "") + (item.id === selectedQuestion ? " bg-warning-subtle " : "") + (item.answered ? "bg-secondary-subtle" : "")} key={`word_${item.id}`} onClick={() => handleQuestion(item.id)}>
                                                            <div className="card-body p-2">
                                                                 {item.word}
                                                            </div>
                                                       </div>
                                                  )
                                             }
                                        </div>
                                        <div className="col px-3">
                                             {
                                                  answers &&
                                                  answers.map(item =>
                                                       <div className={"card my-2 " + (!item.answered ? " clickable " : "") + (item.id === selectedAnswer ? " bg-warning-subtle " : "") + (item.answered ? "bg-secondary-subtle" : "")} key={`translation_${item.id}`} onClick={() => handleAnswer(item.id)}>
                                                            <div className="card-body p-2" >
                                                                 {item.word}
                                                            </div>
                                                       </div>
                                                  )
                                             }
                                        </div>


                                   </div>
                                   <div className={'d-flex align-items-center justify-content-start text-black mb-5 border border-1 px-4 py-3 shadow ' + (isCorrectAnswer === "Correct" ? " bg-success-subtle " : isCorrectAnswer === "Incorrect" ? " bg-danger-subtle " : "")} >
                                        <i className="bi bi-clock me-3"></i> {isCorrectAnswer}
                                   </div>
                              </div>
                              <div className="container">
                                   {
                                        hideTable ?
                                             <span className='fs-1 m-3 text-primary clickable' onClick={() => setHideTable(false)}><i className="bi bi-eye-fill"></i></span>
                                             :
                                             <span className='fs-1 m-3 text-primary clickable' onClick={() => setHideTable(true)}><i className="bi bi-eye-slash-fill"></i></span>
                                   }
                                   {
                                        !hideTable &&
                                        <table className='table table-hover'>
                                             <thead>
                                                  <tr>
                                                       <th>#</th>
                                                       <th>Word</th>
                                                       <th>Transcription</th>
                                                       <th>Translation</th>
                                                  </tr>
                                             </thead>
                                             <tbody>


                                                  {
                                                       collectionWords &&
                                                       collectionWords.map((item, index) => <tr key={`word_${index}_${item.id}`}>
                                                            <td>{index + 1}</td>
                                                            <td>{item.word}</td>
                                                            <td>{item.transcription}</td>
                                                            <td>{item.translation}</td>
                                                       </tr>)

                                                  }

                                             </tbody>
                                        </table>
                                   }
                              </div>
                         </>
                         :
                         <div className='d-flex align-items-center justify-content-center text-danger' style={{ height: "100vH" }}>
                              <h1 >Collection is Empty!</h1>
                         </div>
               }
          </>
     );
}
export default CardsCollectionPairsPlay;