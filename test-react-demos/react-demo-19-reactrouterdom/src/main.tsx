//import './assets/main.css'

import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'

import { Suspense } from 'react'
import { HashRouter as Router, Routes, Route } from 'react-router-dom'

import Comp1 from './comps/comp1'
import Comp2 from './comps/comp2'
import Comp3 from './comps/comp3'

const routes = [
  { path: '/', component: App },
  { path: '/route1', component: Comp1 },
  { path: '/route2', component: Comp2 },
  { path: '/route3', component: Comp3 },
  // 添加更多路由
];

const AppRouter: React.FC = () => (
  <Router>
    <Suspense fallback={<div>Loading...</div>}>
      <Routes>
        {routes.map(route => (
          <Route key={route.path} path={route.path} Component={route.component} />
        ))}
      </Routes>
    </Suspense>
  </Router>
);

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <AppRouter />
  </React.StrictMode>
)
