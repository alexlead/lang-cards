import React from 'react';
import CardsCollectionEditForm from './CardsCollectionEditForm';


interface ICardsCollectionEditProps {
}

const CardsCollectionEdit: React.FunctionComponent<ICardsCollectionEditProps> = () => {
    
    return(
     <>
        <div className="container my-3">
            <div className="row">

                <h1 className='mb-3'>Редактирование Коллекции</h1>


                <CardsCollectionEditForm />
                
            </div>
        </div>
     </>
);
}
export default CardsCollectionEdit;