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