import React from 'react'
import {
  HashRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import SampleBlogPage from './SampleBlogPage.js'
import SampleFluidPage from './SampleFluidPage.js'
import SampleFillPage from './SampleFillPage.js'
import 'byteark-player-react/dist/index.css'

const App = () => {
  return (
    <Router>
      <Switch>
        <Route path="/fluid">
          <SampleFluidPage />
        </Route>
        <Route path="/fill">
          <SampleFillPage />
        </Route>
        <Route path="/">
          <SampleBlogPage />
        </Route>
      </Switch>
    </Router>
  )
}

export default App
