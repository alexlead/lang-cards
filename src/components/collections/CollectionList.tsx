import React, { useEffect, useState } from 'react';
import { folderDB, folderOptionDB, wordDB } from '../../repository/db';
import { Link } from 'react-router-dom';


interface ICollectionListProps {
    collectionsListUpdated: boolean;
    handleCollectionsListStatus: ( status: boolean ) => void;
}

const CollectionList: React.FunctionComponent<ICollectionListProps> = ({collectionsListUpdated, handleCollectionsListStatus }) => {
    const [folders, setFolders] = useState<any[]>([]);
    const [ searchValue, setSearchValue ] = useState<string>("");
    const [foldersVisibleList, setFoldersVisibleList ] = useState<any[]>([]);

    const loadFolders = async () => {
        const data = await folderDB.getAll();
        setFolders(data);
        setFoldersVisibleList(data);
      };

      
      const deleteFolder = async (id: number) => {

        const res = await wordDB.getByFolderId(id);
        const wordsIds = [ ...res.map(item=>item.id)];
        await wordDB.deleteMultiple( wordsIds );
        const foldOpt = await folderOptionDB.getByFolderId(id);
        const foldOptIds = [ ...foldOpt.map(item=>item.id)];
        await folderOptionDB.deleteMultiple( foldOptIds );
        await folderDB.delete(id);
        loadFolders();
      };

      const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchValue( e.target.value );
        setFoldersVisibleList( [...folders.filter( item => item.folder.includes(e.target.value))])
      }

      useEffect(() => {
        if ( collectionsListUpdated ) {
            loadFolders();
            handleCollectionsListStatus( false );
        }
      }, [collectionsListUpdated]);



return(
     <>
     <input type='text' className="form-control mb-1" value={searchValue} onChange={handleSearch} placeholder='Search...'/>
    {
        foldersVisibleList.length > 0 &&
        foldersVisibleList.map( (item, index) =><div key={`folder_${index}`} className='d-flex justify-content-between parent-hover text-primary fw-bold fs-6' ><span className='clickable'><Link to={`/show/${item.slug}`} className=' text-primary text-decoration-none' >{item.folder}</Link></span> <span className='child-hover'><Link to={`/quiz/${item.slug}`} className='text-primary'><i className="bi bi-card-list clickable" ></i></Link> <Link to={`/edit/${item.slug}`} className='text-primary'><i className="bi bi-pencil-square clickable" ></i></Link> <i className="bi bi-trash clickable" onClick={()=>deleteFolder(item.id)}></i></span></div>)
    }

     </>
);
}
export default CollectionList;