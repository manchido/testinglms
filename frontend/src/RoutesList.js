import React, {lazy, Suspense} from 'react'
import {Routes, Route, BrowserRouter} from 'react-router-dom'

const Landing = lazy(() => import('./components/Landing'))
const Register = lazy(() => import('./components/Register'))
const ParentMain = lazy(() => import('./components/Parent/ParentMain'))

const RoutesList = () => {
    return(
        <BrowserRouter>
            <Suspense fallback={<div>Loading...</div>}>
                <Routes>
                    <Route path='/' element={<Landing/>} />
                    <Route path='/register' element={<Register/>} />
                    <Route path='/home' element={<ParentMain/>} />
                </Routes>
            </Suspense>
        </BrowserRouter>
    )
}

export default RoutesList