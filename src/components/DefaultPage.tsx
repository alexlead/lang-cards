import React from 'react';


interface IDefaultPageProps {
}

const DefaultPage: React.FunctionComponent<IDefaultPageProps> = () => {
return(
     <>
          <div className="container d-flex align-items-center justify-content-center vh-100">
               <div className='fw-bold text-danger' style={{fontSize:"155px"}}>
                    404
               </div>
          </div>
     </>
);
}
export default DefaultPage;