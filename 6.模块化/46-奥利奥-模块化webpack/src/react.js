import React, { lazy, Suspense } from 'react';
import { render } from 'react-dom';
import './style.css';
import './style.mobile';

import loadComponent from './loadComponent';
/* 
const App = () => <div className="cls">
  App-10
  <Suspense fallback={<>loading</>}>
    <Async />
  </Suspense>
</div>;

const Async = lazy(() => import('./Async'));
 */
const Async = loadComponent(() => import('./Async'));

const App = () => <div className="cls">
  App-1012
  <Async />
</div>;

render(
  <App />,
  document.querySelector('#app')
);

if (module.hot) {
  module.hot.accept(App, () => {
    render(<App />, document.querySelector('#app'));
  });
}