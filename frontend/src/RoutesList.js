import React, {lazy, Suspense} from 'react'
import {Routes, Route, BrowserRouter} from 'react-router-dom'

const Landing = lazy(() => import('./components/Landing'))
const ParentMain = lazy(() => import('./components/Parent/ParentMain'))

const RoutesList = () => {
    return(
        <BrowserRouter>
            <Suspense fallback={<div>Loading...</div>}>
                <Routes>
                    <Route path='/' element={<Landing/>} />
                    <Route path='/home' element={<ParentMain/>} />
                </Routes>
            </Suspense>
        </BrowserRouter>
    )
}

export default RoutesList