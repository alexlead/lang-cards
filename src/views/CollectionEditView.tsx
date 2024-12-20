import React, { useState } from 'react';
import CollectionSidebarView from '../components/collections/CollectionSidebarView';
import { Outlet } from 'react-router-dom';


interface ICollectionEditViewProps {
}

const CollectionEditView: React.FunctionComponent<ICollectionEditViewProps> = () => {

    const [sidebarStatus, setSidebarStatus] = useState<string>('hide');

    const handleSidebarStatus = (status: string) => {
        setSidebarStatus(status);
    }

    return (
        <>
            <div className="position-fixed top-0 start-0 d-inline-block">

                <button className="btn btn-success " type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasExample" aria-controls="offcanvasExample" onClick={() => handleSidebarStatus('show')} style={{ transform: "rotate(90deg)", transformOrigin: "left bottom" }}>
                    <i className="bi bi-box-arrow-in-up"></i> Show Collections
                </button>
            </div>
            <div className='container-fluid'>

                <div className="row">
                    <CollectionSidebarView sidebarStatus={sidebarStatus} handleSidebarStatus={handleSidebarStatus} />
                </div>
                <div className="row">
                    <div className="container">

                        <Outlet />

                    </div>
                </div>

            </div>

        </>
    );
}
export default CollectionEditView;