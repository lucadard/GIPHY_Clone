import { Route } from 'wouter'

import './styles/App.css'

import NavBar from './components/NavBar'
import Carousel from './components/Carousel'
import Stories from './components/Stories'
import GifList from './components/GifList'
import GifDetail from './components/GifDetail'
import Message from './components/Message'
import GifCategories from './components/GifCategories'

import { GifsContextProvider } from './context/GifsContext'
import { CategoriesContextProvider } from './context/CategoriesContext'
import { HistoryContextProvider } from './context/HistoryContext'
import { Helmet } from 'react-helmet'


function App() {
  return (
    <div className="App">
      <Helmet>
        <title>GIPHY - Be Animated</title>
      </Helmet>
      <GifsContextProvider>
        <NavBar />
        <Message />
        <HistoryContextProvider>
          <Route path="/">
            <Carousel type='trending' />
            <Stories />
          </Route>
          <Route
            path="/search/:searchTerm"
            component={GifList}
          />
          <Route
            path="/gifs/:id"
            component={GifDetail}
          />
        </HistoryContextProvider>
        <CategoriesContextProvider>
          <Route path="/categories/:subcategory"
            component={GifCategories}>
          </Route>
        </CategoriesContextProvider>
      </GifsContextProvider>
    </div>
  )
}

export default App
