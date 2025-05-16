import { Routes, Route } from 'react-router-dom';

import {
  SampleBlogPage,
  SampleFluidPage,
  SampleFillPage,
  SampleFullPage,
  SampleAutoplayPage,
  SampleAdsPage,
  SampleLazyLoadPage,
} from './pages';

function App() {
  return (
    <Routes>
      <Route path='/fluid' element={<SampleFluidPage />} />
      <Route path='/fill' element={<SampleFillPage />} />
      <Route path='/full' element={<SampleFullPage />} />
      <Route path='/autoplay' element={<SampleAutoplayPage />} />
      <Route path='/ads' element={<SampleAdsPage />} />
      <Route path='/lazyload' element={<SampleLazyLoadPage />} />
      <Route path={'/'} index={true} element={<SampleBlogPage />} />
    </Routes>
  );
}

export default App;
