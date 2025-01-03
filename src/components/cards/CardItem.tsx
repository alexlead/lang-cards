import React, { useEffect, useState } from 'react';
import { WordItem } from '../../models/model';


interface ICardItemProps {
    word: WordItem;
}

const CardItem: React.FunctionComponent<ICardItemProps> = ({ word }) => {
    const [displayBack, setDisplayBack] = useState<boolean>(false)

    const handleDisplayBackStatus = () => {
        setDisplayBack( !displayBack);
    }

    useEffect(() => {
        setDisplayBack(false);
    }, [word])
    return (
        <>
            <div className={'word-card clickable ' + ( displayBack ? "show" : "hide" )} style={{width: "90%" }} onClick={handleDisplayBackStatus}>
                {
                    !displayBack ?

                    <div className="word-card__front text-dark bg-primary-subtle rounded p-2 border border-1 border-primary ">
                    <div className='d-flex flex-column align-items-center justify-content-center p-5 text-white bg-primary rounded' style={{height: "450px"}}>
                        <div className='fs-1'>
                            {word.word}
                        </div>
                        {
                            word.transcription &&
                            <div className=''>
                                {word.transcription}
                            </div>
                        }
                    </div>
                </div>
                :
                <div className="word-card__back text-white bg-primary rounded p-2 border border-1 border-primary">
                    <div className='d-flex flex-column align-items-center justify-content-center  p-5 text-primary bg-primary-subtle rounded' style={{height: "450px"}}>
                        <div className='fs-1'>
                            {word.translation}
                        </div>
                    </div>
                </div>
                }
            </div>
        </>
    );
}
export default CardItem;