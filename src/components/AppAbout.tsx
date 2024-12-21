import React from 'react';
import imgManual1 from "../assets/images/manual001.png";
import imgManual2 from "../assets/images/manual002.png";
import imgManual3 from "../assets/images/manual003.png";
import imgManual4 from "../assets/images/manual004.png";
import imgManual5 from "../assets/images/manual005.png";
import imgManual6 from "../assets/images/manual006.png";

interface IAppAboutProps {
}

const AppAbout: React.FunctionComponent<IAppAboutProps> = () => {
   return (
      <>
         <div className="container my-5">

            <h1 className='text-center mb-5'>LANGUAGE CARDS APP</h1>
            <div className="row mx-5">
               <p>This application is designed to assist in language learning. It allows you to create flashcards for vocabulary study and test your knowledge.</p>
               <p>The application utilizes browser technologies (IndexDB), so it doesn’t require server access or user authentication. However, this also means that you cannot access your collections from other devices, as collections are stored locally on your device. If you want to use the application on another device, you'll need to recreate your collections there.</p>
            </div>
            <div className="row mx-5">
               <h3>Getting Started:</h3>
               <ol className='px-5'>
                  <li><p>Use the button in the top-left corner to open the sidebar.</p>
                     <img src={imgManual1} height={100} />
                  </li>
                  <li><p>Use the collection creation form to create your first collection.</p>
                     <img src={imgManual2} height={100} />
                  
                  </li>
                  <li><p>Each collection offers the following options:</p>
                     <ul>
                        <li><b>View Collection:</b> Browse through your flashcards.</li>
                        <li><b>Quiz Mode:</b> Test your knowledge with an interactive quiz.</li>
                        <li><b>Edit Collection:</b> Add or modify flashcards within the collection.</li>
                        <li><b>Delete Collection:</b> Remove the collection permanently.</li>
                     </ul>
                     <img src={imgManual3} height={200} />
                  </li>
                  <li><p>In <b>Edit Collection</b> mode, you can add any number of words to the current collection. This mode also supports copying and pasting rows directly from Excel for batch additions.</p>
                     <img src={imgManual4} height={300} />
                  </li>
                  <li><p>Save your collection. You can return to edit it at any time.</p></li>
                  <li><p>Explore your collection in <b>Study Mode</b> or <b>Quiz Mode</b>.</p>
                     <img src={imgManual5} height={300} />
                     <img src={imgManual6} height={300} />
                  
                  </li>
               </ol>
            </div>
            <div className="row mx-5">
               <p>This application is free to use.</p>
            </div>
         </div>
      </>
   );
}
export default AppAbout;