import React, { useEffect, useState } from 'react';
import { IFolderDb, WordItem } from '../../models/model';
import { useParams } from 'react-router-dom';
import { folderDB, wordDB } from '../../repository/db';
import CardItem from './CardItem';


interface ICardsCollectionShowProps {
}

const CardsCollectionShow: React.FunctionComponent<ICardsCollectionShowProps> = () => {

     const { slug } = useParams();
     const [collectionWords, setCollectionWords] = useState<WordItem[]>([]);
     const [currentFolder, setCurrentFolder] = useState<IFolderDb>();
     const [ hideTable, setHideTable ] = useState<boolean>(false)

     const [ currentWord, setCurrentWord ] = useState<WordItem | null>( null )
     const [ currentWordId, setCurrentWordId ] = useState<number>(0)

     const handleNextWord = () => {
          if ( collectionWords.length === 0 ){
               return;
          }
          const max = collectionWords.length - 1;
          if ( currentWordId < max ) {
               setCurrentWord( { ...collectionWords[ currentWordId + 1 ]} )
               setCurrentWordId( currentWordId + 1 ) 
          } else {
               setCurrentWord( { ...collectionWords[ 0 ]} )
               setCurrentWordId( 0 ) 
          }

     }
     const handlePreviousWord = () => {
          if ( collectionWords.length === 0 ){
               return;
          }

          const max = collectionWords.length - 1;
          if ( currentWordId < 1 ) {
               setCurrentWord( { ...collectionWords[ max ]} )
               setCurrentWordId( max ) 
          } else {
               setCurrentWord( { ...collectionWords[ currentWordId - 1 ]} )
               setCurrentWordId( currentWordId - 1  ) 
          }

     }

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
          setCurrentWord(null)
          setCurrentWordId( 0 )
          getCollectionDetails();
     }, [slug])
     useEffect(() => {
          getAllCollectionWords();
     }, [currentFolder])

     useEffect( () => {
          if( collectionWords.length ) {
               setCurrentWordId( 0 )
               setCurrentWord(collectionWords[0])
          }
     }, [collectionWords])

     return (
          <>

                         {
                              collectionWords.length > 0 ? 
<>
               <div className="container my-5 text-center">
                    <h1>{currentFolder?.folder}</h1>
                    </div>
               <div className="container ">
                    <div className='d-flex align-items-center justify-content-between text-success mb-5' style={{minHeight: "60vH"}}>
                         {
                              currentWord !== null &&
                              <>
                              <div className="clickable" onClick={handlePreviousWord}><i className="bi bi-arrow-left-circle-fill fs-1"></i></div>
                                   <CardItem word={currentWord} />
                              <div className="clickable" onClick={handleNextWord}><i className="bi bi-arrow-right-circle-fill fs-1"></i></div>
                              </>

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
export default CardsCollectionShow;