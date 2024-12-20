import React, { useEffect, useRef, useState } from 'react';
import { useParams } from 'react-router-dom';
import { folderDB, wordDB } from '../../repository/db';
import { IFolderDb, WordRow } from '../../models/model';


interface ICardsCollectionEditFormProps {
}



const CardsCollectionEditForm: React.FunctionComponent<ICardsCollectionEditFormProps> = () => {

  const [rows, setRows] = useState<WordRow[]>([]);
  const [currentFolder, setCurrentFolder] = useState<IFolderDb>();
  const lastInputRef = useRef<HTMLInputElement | null>(null);

  const [isSavingComplete, setIsSavingComplete] = useState<boolean>(false);

  const { slug } = useParams();

  const handleInputChange = (id: number, field: keyof WordRow, value: string) => {
    setRows((prevRows) =>
      prevRows.map((row) => (row.id === id ? { ...row, [field]: value } : row))
    );
  };

  const handleKeyDown = (e: React.KeyboardEvent, id: number) => {
    if (e.key === 'Tab' || e.key === 'Enter') {
      e.preventDefault();
      if (id === rows[rows.length - 1].id) {
        addRow();
      }
    }
  };

  const addRow = () => {
    const newRow: WordRow = { id: Date.now(), word: '', transcription: '', translation: '', newItem: true };
    setRows((prevRows) => [...prevRows, newRow]);
  };

  const handlePaste = (e: React.ClipboardEvent, rowIndex: number) => {
    e.preventDefault();
    const paste = e.clipboardData.getData('text');
    const rowsToAdd = paste
      .split('\n')
      .map((line) => line.replace('\r', ''))
      .map((line) => line.split('\t'))
      .filter((cols) => cols.length >= 3);

    setRows((prevRows) => {
      const updatedRows = [...prevRows];
      rowsToAdd.forEach(([word, transcription, translation], idx) => {
        const targetIndex = rowIndex + idx;
        if (updatedRows[targetIndex]) {
          updatedRows[targetIndex] = {
            ...updatedRows[targetIndex],
            word: word || '',
            transcription: transcription || '',
            translation: translation || '',
          };
        } else {
          updatedRows.push({
            id: Date.now() + idx,
            word: word || '',
            transcription: transcription || '',
            translation: translation || '',
            newItem: true
          });
        }
      });
      return updatedRows;
    });
  };


  const handleSavingCollection = async () => {
    console.log(rows)

    const resUpdate = await Promise.all(rows.filter(item => (item.newItem !== true && item.word.trim().length > 0)).map(item => updateWord(item)))
    const resAdd = await Promise.all(rows.filter(item => (item.newItem === true && item.word.trim().length > 0)).map(item => saveNewWord(item)))
    if (resUpdate && resAdd) {
      setIsSavingComplete(true);
    }

  }

  const handleRemovingWord = (id: number) => {
    const currentWord = rows.filter(item => item.id === id)[0];
    const newWordsList = [...rows.filter(item => item.id !== id)];
    if (currentWord.newItem !== true) {
      deleteWord(currentWord.id);
    }

    setRows(newWordsList)
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
      setRows([...res.map((item: any) => ({ ...item, newItem: false }))])
    } catch (error) {

    }
  }

  const updateWord = async (word: WordRow) => {

    try {
      await wordDB.update(word.id, { word: word.word, transcription: word.transcription, translation: word.translation });
    } catch (error) {

    }
  }

  const saveNewWord = async (word: WordRow) => {
    if (!currentFolder) {
      return false;
    }
    try {
      await wordDB.add(currentFolder.id, word.word, word.transcription, word.translation);
      return true;
    } catch (error) {
      console.log(error);
      return false;
    }
  }

  const deleteWord = async (id: number) => {
    try {
      await wordDB.delete(id);
    } catch (error) {

    }
  }

  useEffect(() => {
    getCollectionDetails();
  }, [slug])

  useEffect(() => {
    if (rows.length === 0) {
      addRow();
    }
  }, [rows])


  useEffect(() => {
    if (currentFolder || isSavingComplete ) {
      setIsSavingComplete(false);
      getAllCollectionWords();
    }
  }, [currentFolder, isSavingComplete])


  return (
    <>
      {
        currentFolder &&
        <div className='h2'>{currentFolder.folder}</div>

      }
      <table className='table table-hover'>
        <thead>
          <tr>
            <th>#</th>
            <th>Word</th>
            <th>Transcription</th>
            <th>Translation</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {rows.map((row, index) => (
            <tr key={`row_${row.id}_${index}`}>
              <td>
                {index + 1}
              </td>
              <td>
                <input
                  type="text"
                  className="form-control"
                  value={row.word}
                  onChange={(e) => handleInputChange(row.id, 'word', e.target.value)}
                  onKeyDown={(e) => handleKeyDown(e, row.id)}
                  onPaste={(e) => handlePaste(e, index)}
                  ref={index === rows.length - 1 ? lastInputRef : null}
                />
              </td>
              <td>
                <input
                  type="text"
                  className="form-control"
                  value={row.transcription}
                  onChange={(e) => handleInputChange(row.id, 'transcription', e.target.value)}
                  onKeyDown={(e) => handleKeyDown(e, row.id)}
                />
              </td>
              <td>
                <input
                  type="text"
                  className="form-control"
                  value={row.translation}
                  onChange={(e) => handleInputChange(row.id, 'translation', e.target.value)}
                  onKeyDown={(e) => handleKeyDown(e, row.id)}
                />
              </td>
              <td>
                <i className="bi bi-trash clickable" onClick={() => handleRemovingWord(row.id)}></i>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <button type="button" className='btn btn-success' onClick={handleSavingCollection}>Сохранить</button>
    </>
  );
}
export default CardsCollectionEditForm;