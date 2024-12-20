import React, { useState } from 'react';
import CollectionList from './CollectionList';
import CollectionAddItemForm from './CollectionAddItemForm';


interface ICollectionSidebarViewProps {
    sidebarStatus: string;
    handleSidebarStatus: (status: string) => void;

}

const CollectionSidebarView: React.FunctionComponent<ICollectionSidebarViewProps> = ({ sidebarStatus, handleSidebarStatus }) => {

    const [ collectionsListUpdated, setSollectionsListUpdated ] = useState<boolean>(true);

    const handleCollectionsListStatus = ( status: boolean ) => {
        setSollectionsListUpdated( status );
    }

    return (
        <>


            <div className={`offcanvas offcanvas-start ${sidebarStatus}`} tabIndex={-1} id="offcanvasExample" aria-labelledby="offcanvasExampleLabel">
                <div className="offcanvas-header">
                    <h5 className="offcanvas-title" id="offcanvasExampleLabel">Collections</h5>
                    <button type="button" className="btn-close" data-bs-dismiss="offcanvas" aria-label="Close" onClick={() => handleSidebarStatus('hide')}></button>
                </div>
                <div className="offcanvas-body">
                    <div style={{height: "70vH", overflow: "auto"}}>
                        <CollectionList collectionsListUpdated={collectionsListUpdated} handleCollectionsListStatus={handleCollectionsListStatus}/>
                    </div>
                    <div>
                     <CollectionAddItemForm handleCollectionsListStatus={handleCollectionsListStatus} />   
                    </div>
                </div>
            </div>

        </>
    );
}
export default CollectionSidebarView;