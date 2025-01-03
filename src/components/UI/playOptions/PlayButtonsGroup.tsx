import React from 'react';
import { playOptions } from '../../../models/model';


interface IPlayButtonsGroupProps {
    options: playOptions;
    handleActing: (option: string) => void;
}

const PlayButtonsGroup: React.FunctionComponent<IPlayButtonsGroupProps> = ({options, handleActing}) => {

    return (
        <>
            <div className="btn-group" role="group">
                <button type="button" className="btn btn-primary border border-1 fs-3" onClick={()=>handleActing("isAutoPlay")}>
                    {
                        options.isAutoPlay ?
                        <i className="bi bi-pause-fill"></i>
                        :
                        <i className="bi bi-play-fill"></i>
                    }
                    </button>
                <button type="button" className="btn btn-primary border border-1 fs-3" onClick={()=>handleActing("playWord")}><i className="bi bi-repeat"></i> <i className="bi bi-postcard"></i></button>
                <button type="button" className="btn btn-primary border border-1 fs-3" onClick={()=>handleActing("isWordTurnedOn")}>
                    {
                        options.isWordTurnedOn ?
                        <i className="bi bi-volume-down-fill"></i> 
                        :
                        <i className="bi bi-volume-mute-fill"></i>

                    }
                    <i className="bi bi-postcard"></i></button>
                <button type="button" className="btn btn-primary border border-1 fs-3" onClick={()=>handleActing("playTranslation")}><i className="bi bi-repeat"></i> <i className="bi bi-postcard-fill"></i></button>
                <button type="button" className="btn btn-primary border border-1 fs-3" onClick={()=>handleActing("isTranslationTurnedOn")}>
                {
                        options.isTranslationTurnedOn ?
                        <i className="bi bi-volume-down-fill"></i> 
                        :
                        <i className="bi bi-volume-mute-fill"></i>
                    } 
                    <i className="bi bi-postcard-fill"></i></button>
            </div>
        </>
    );
}
export default PlayButtonsGroup;