import { Route } from 'wouter'

import './App.css'
import NavBar from './components/NavBar'
import Carousel from './components/Carousel'
import GifList from './components/GifList'
import GifDetail from './components/GifDetail'
import { GifsContextProvider } from './context/GifsContext'

function App() {
  return (
    <div className="App">
      <NavBar />
      <GifsContextProvider>
        <Route path="/">
          <Carousel type='trending' />
        </Route>
        <Route
          path="/search/:searchTerm"
          component={GifList}
        />
        <Route
          path="/gifs/:searchTerm/:id"
          component={GifDetail}
        />
      </GifsContextProvider>
    </div>
  )
}

export default App
