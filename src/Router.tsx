import { Route, Routes } from 'react-router-dom'

import { DefaultLayout } from './layouts/DefaultLayout'
import { Home } from './pages/Home'
import { History } from './pages/History'

export function Router() {
  return (
    <Routes>
      <Route path="/ignite-timer" element={<DefaultLayout />}>
        <Route path="/ignite-timer" element={<Home />} />
        <Route path="/ignite-timer/history" element={<History />} />
      </Route>
    </Routes>
  )
}
