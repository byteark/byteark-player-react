import React from 'react'
import {
  HashRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import SampleBlogPage from './SampleBlogPage.js'
import SampleFluidPage from './SampleFluidPage.js'
import SampleFillPage from './SampleFillPage.js'
import SampleBeforeInteractiveScriptLoadPage from './SampleBeforeInteractiveScriptLoadPage.js'
import SampleLazyOnLoadScriptLoadPage from './SampleLazyOnLoadScriptLoadPage.js';

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
        <Route path="/beforeInteractive">
          <SampleBeforeInteractiveScriptLoadPage />
        </Route>
        <Route path="/lazyOnLoad">
          <SampleLazyOnLoadScriptLoadPage />
        </Route>
        <Route path="/">
          <SampleBlogPage />
        </Route>
      </Switch>
    </Router>
  )
}

export default App
