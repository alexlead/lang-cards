import React, { useState } from 'react';
import { folderDB } from '../../repository/db';


interface ICollectionAddItemFormProps {
    handleCollectionsListStatus: ( status: boolean ) => void;
}

const CollectionAddItemForm: React.FunctionComponent<ICollectionAddItemFormProps> = ({handleCollectionsListStatus}) => {

    const [ newCollectionName, setNewCollectionName ] = useState<string>("");


      const addFolder = async () => {
        if ( newCollectionName.trim().length < 1) {
            return;
        }
        try {
          await folderDB.add(newCollectionName.trim());
          setNewCollectionName('');
          handleCollectionsListStatus(true);
        } catch (error) {
          console.log(error);
        }
      };



    return (
        <>
            <div className="input-group input-group-sm mb-3">
                <input type="text" className="form-control" value={newCollectionName} onChange={ e => setNewCollectionName( e.target.value )} />
                <span className="input-group-text" onClick={addFolder} >Add Collection</span>
            </div>
        </>
    );
}
export default CollectionAddItemForm;