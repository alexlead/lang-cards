import React, { useEffect, useState } from 'react';
import { IFolderDb, ISelectOption, playOptions, WordItem } from '../../models/model';
import { useParams } from 'react-router-dom';
import { folderDB, folderOptionDB, wordDB } from '../../repository/db';
import CardItem from './CardItem';
import { speakText } from '../../utils/voiceFunctions';
import PlayButtonsGroup from '../UI/playOptions/PlayButtonsGroup';


interface ICardsCollectionShowProps {
}

const CardsCollectionShow: React.FunctionComponent<ICardsCollectionShowProps> = () => {

     const { slug } = useParams();
     const [collectionWords, setCollectionWords] = useState<WordItem[]>([]);
     const [currentFolder, setCurrentFolder] = useState<IFolderDb>();
     const [hideTable, setHideTable] = useState<boolean>(false)

     const [currentWord, setCurrentWord] = useState<WordItem | null>(null)
     const [currentWordId, setCurrentWordId] = useState<number>(0);

     const [wordVoiceOption, setWordVoiceOption] = useState<ISelectOption | null>(null);
     const [translationVoiceOption, setTranslationVoiceOption] = useState<ISelectOption | null>(null);

     const [collectionPlayOptions, setCollectionPlayOptions ] = useState<playOptions>({
          isAutoPlay: false,
          isWordTurnedOn: false,
          isTranslationTurnedOn: false,
      
     })

     const handleNextWord = () => {
          if (collectionWords.length === 0) {
               return;
          }
          const max = collectionWords.length - 1;
          if (currentWordId < max) {
               collectionPlayOptions.isWordTurnedOn ? playWordVoice(collectionWords[currentWordId + 1].word) : "";
               collectionPlayOptions.isTranslationTurnedOn ? playTranslationVoice(collectionWords[currentWordId + 1].translation) : "";
               setCurrentWord({ ...collectionWords[currentWordId + 1] })
               setCurrentWordId(currentWordId + 1)
          } else {
               collectionPlayOptions.isWordTurnedOn ? playWordVoice(collectionWords[0].word) : "";
               collectionPlayOptions.isTranslationTurnedOn ? playTranslationVoice(collectionWords[0].translation) : "";
               setCurrentWord({ ...collectionWords[0] })
               setCurrentWordId(0)
          }

     }

     const handlePreviousWord = () => {
          if (collectionWords.length === 0) {
               return;
          }

          const max = collectionWords.length - 1;
          if (currentWordId < 1) {
               collectionPlayOptions.isWordTurnedOn ? playWordVoice(collectionWords[max].word): "";
               collectionPlayOptions.isTranslationTurnedOn ? playTranslationVoice(collectionWords[max].translation) : "";
               setCurrentWord({ ...collectionWords[max] })
               setCurrentWordId(max)
          } else {
               collectionPlayOptions.isWordTurnedOn ? playWordVoice(collectionWords[currentWordId - 1].word) : "";
               collectionPlayOptions.isTranslationTurnedOn ? playTranslationVoice(collectionWords[currentWordId - 1].translation) : "";
               setCurrentWord({ ...collectionWords[currentWordId - 1] })
               setCurrentWordId(currentWordId - 1)
          }

     }

     const playWordVoice = async (word: string) => {
          if (wordVoiceOption ) {
               await speakText(word, {
                    lang: wordVoiceOption.lang,
                    voiceName: wordVoiceOption.value
               });
          }
     }

     const playTranslationVoice = async (word: string) => {
          if (translationVoiceOption ) {
              const res = await speakText(word, {
                    lang: translationVoiceOption.lang,
                    voiceName: translationVoiceOption.value
               });

               console.log( res );
          }
     }


     const handleActing = (option: string) => {

          const options = { ...collectionPlayOptions };

          switch(option){
               case "isAutoPlay":
                    options.isAutoPlay = !options.isAutoPlay;
                    break;
               case "isWordTurnedOn":
                    options.isWordTurnedOn = !options.isWordTurnedOn;
                    break;
               case "isTranslationTurnedOn":
                    options.isTranslationTurnedOn = !options.isTranslationTurnedOn;
                    break;
               case "playWord":
                    currentWord ? playWordVoice( currentWord.word ):""; 
                    break;
               case "playTranslation":
                    currentWord ? playTranslationVoice( currentWord.translation ):"";   
                    break;
          }

          setCollectionPlayOptions( {...options } );

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

     const getCollectionOptions = async () => {
          if (!currentFolder) {
               return;
          }

          try {
               const res = await folderOptionDB.getByFolderId(currentFolder.id);
               console.log("options: ", res)
               res.forEach(item => {
                    const voiceOption = item.value.split(": ");
                    if (item.option === "translationVoice") {
                         setTranslationVoiceOption({ label: item.value, value: voiceOption[1], lang: voiceOption[0] })
                    }
                    if (item.option === "wordVoice") {
                         setWordVoiceOption({ label: item.value, value: voiceOption[1], lang: voiceOption[0] })
                    }
               })
          } catch (error) {

          }
     }

     useEffect(() => {
          setWordVoiceOption(null);
          setTranslationVoiceOption(null);
          setCurrentWord(null)
          setCurrentWordId(0)
          getCollectionDetails();
          getCollectionOptions();
     }, [slug])
     useEffect(() => {
          getAllCollectionWords();
     }, [currentFolder])

     useEffect(() => {
          if (collectionWords.length) {
               setCurrentWordId(0)
               setCurrentWord(collectionWords[0])
          }
     }, [collectionWords])


     
     useEffect( () => {
          if ( collectionPlayOptions.isAutoPlay) { 
               setTimeout(()=> handleNextWord() , 3000);
          }
     }, [collectionPlayOptions, currentWordId])

     return (
          <>

               {
                    collectionWords.length > 0 ?
                         <>
                              <div className="container my-3 text-center">
                                   <h1>{currentFolder?.folder}</h1>
                              </div>
                              <div className="container my-3 text-center">
                                   <PlayButtonsGroup options={collectionPlayOptions} handleActing={handleActing}/>
                              </div>
                              <div className="container ">
                                   <div className='d-flex align-items-center justify-content-between text-primary mb-5' style={{ minHeight: "60vH" }}>
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
export default CardsCollectionShow;