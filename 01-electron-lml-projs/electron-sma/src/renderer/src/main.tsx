import './assets/main.css'

import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'

//#region 给react配置路由
import { Suspense } from 'react'
import { HashRouter as Router, Routes, Route } from 'react-router-dom'

import Win1 from './windows/win1'
import Win2 from './windows/win2'
import Win3 from './windows/win3'

const routes = [
  { path: '/', component: App },
  { path: '/win1', component: Win1 },
  { path: '/win2', component: Win2 },
  { path: '/win3', component: Win3 },
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
  // <React.StrictMode>
    <AppRouter />
  // </React.StrictMode>
)

//#endregion
