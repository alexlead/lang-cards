import React from 'react';


interface IPlayButtonsQuizGroupProps {
    handlePlayWord: () => void;
}

const PlayButtonsQuizGroup: React.FunctionComponent<IPlayButtonsQuizGroupProps> = ({  handlePlayWord }) => {

    return (
        <>
            <div className="btn-group">
                <button type="button" className="btn btn-primary border border-1" onClick={handlePlayWord}>
                    <i className="bi bi-play-fill"></i> </button>
            </div>
        </>
    );
}
export default PlayButtonsQuizGroup;