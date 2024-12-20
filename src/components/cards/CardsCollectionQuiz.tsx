import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { IFolderDb, IQuizSet, WordItem } from '../../models/model';
import { folderDB, wordDB } from '../../repository/db';
import { getRandomNumbers, shuffleArray } from '../../utils/randomGenerators';
import QuizItem from './QuizItem';


interface ICardsCollectionQuizProps {
}



const CardsCollectionQuiz: React.FunctionComponent<ICardsCollectionQuizProps> = () => {

     const { slug } = useParams();
     const [collectionWords, setCollectionWords] = useState<WordItem[]>([]);
     const [currentFolder, setCurrentFolder] = useState<IFolderDb>();
     const [ hideTable, setHideTable ] = useState<boolean>(false)
     const [ quiz, setQuiz ] = useState<IQuizSet | null >(null)
   
     const generateNumbers = () => {
          const newNumbers = getRandomNumbers(0, (collectionWords.length - 1) , 4);
          
          const answers: string[] = [ ...newNumbers.map( item => collectionWords[item].translation )];

          const newQuiz: IQuizSet = {
               word: collectionWords[ newNumbers[0]].word,
               correct: collectionWords[ newNumbers[0]].translation,
               answers: shuffleArray(answers)
          }

          setQuiz( newQuiz )

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

     const handleAnswer = ( isCorrect: boolean ) => {

          setTimeout( () => {
               generateNumbers()
          }, 1000 )
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

     useEffect( () => {
          if( collectionWords.length > 4 ) {
               generateNumbers();
          }
     }, [collectionWords])
return(
     <>
                      {
                              collectionWords.length > 0 ? 
<>
               <div className="container my-5 text-center">
                    <h1>{currentFolder?.folder}</h1>
                    </div>
               <div className="container ">
                    <div className='d-flex align-items-center justify-content-between text-black mb-5' style={{minHeight: "60vH"}}>

                         { quiz &&
                              <QuizItem question={quiz} handleAnswer={handleAnswer}/>

                         }

                    </div>
               </div>
               <div className="container">
                    {
                         hideTable ?
                         <span className='fs-1 m-3 text-success clickable' onClick={()=>setHideTable(false)}><i className="bi bi-eye-fill"></i></span>
                         :
                         <span className='fs-1 m-3 text-success clickable' onClick={()=>setHideTable(true)}><i className="bi bi-eye-slash-fill"></i></span>
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
                    <div className='d-flex align-items-center justify-content-center text-danger' style={{height: "100vH"}}>
                         <h1 >Collection is Empty!</h1>
                         </div>
                         }
     </>
);
}
export default CardsCollectionQuiz;