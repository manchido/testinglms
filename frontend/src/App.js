import React, {lazy, Suspense} from 'react';
const RoutesList = lazy(() => import('./RoutesList'))
import ('./App.css')

const App = () => {
  return(
    <div>
      <Suspense fallback={<div>Loading...</div>}>
        <RoutesList />
      </Suspense>
    </div>
  )
}

export default App;
