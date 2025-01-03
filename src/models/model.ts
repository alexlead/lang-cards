export interface IFolderDb {
    folder: string;
    id: number;
    parentId: number | null;
    slug: string;
}

export interface WordItem {
    id: number;
    word: string;
    transcription: string;
    translation: string;

  }
export interface WordRow extends WordItem  {
    newItem: boolean; 
  }

 export interface IQuizSet {
    word: string;
    correct: string;
    answers: string[];
}



export interface IVoiceOption {
  name: string;
  lang: string;
  // @ts-ignore
  [key: string]: any; 
}

export interface SpeakOptions {
  rate?: number; // Voice Speed
  pauseBetweenSentences?: number; 
  lang?: string; 
  voiceName?: string;
}

export interface playOptions {
    isAutoPlay: boolean;
    isWordTurnedOn: boolean;
    isTranslationTurnedOn: boolean;

}

export interface playCollectionOptions extends playOptions {
  isAutoPlayTurnedOn: boolean;
  isPlayTranslation: boolean; 
}

export interface playQuizOptions{
  isAutoPlay: boolean;
  isWordTurnedOn: boolean;
}

export interface ISelectOption {
  value: string;
  label: string;
  lang?: string;
}

export interface IFolderOption {

  id: number;
  option: string;
  value: string;

}