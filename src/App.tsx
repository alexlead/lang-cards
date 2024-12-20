import { HashRouter, Navigate, Route, Routes } from 'react-router-dom'
import CollectionEditView from './views/CollectionEditView'
import CardsCollectionEdit from './components/cards/CardsCollectionEdit'
import CardsCollectionShow from './components/cards/CardsCollectionShow'
import DefaultPage from './components/DefaultPage'
import CardsCollectionQuiz from './components/cards/CardsCollectionQuiz'
import AppAbout from './components/AppAbout'

function App() {


  return (
    <>
      <HashRouter>
        <Routes>
          <Route path="/" element={<CollectionEditView />} >
          <Route index element={<AppAbout />} />
          <Route path="/edit/:slug" element={<CardsCollectionEdit />} />
          <Route path="/show/:slug" element={<CardsCollectionShow />} />
          <Route path="/quiz/:slug" element={<CardsCollectionQuiz />} />
          <Route path="/404" element={<DefaultPage />} />
          <Route path="/*" element={<Navigate to="/404" replace />} />
          </Route>
          <Route path="*" element={<Navigate to="/#/" replace />} />
        </Routes>
      </HashRouter>
    </>
  )
}

export default App
