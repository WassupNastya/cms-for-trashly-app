import { applyMiddleware, createStore } from 'redux';
import { createEpicMiddleware } from 'redux-observable';

import { rootReducer } from './rootReducer';
import { rootEpic } from './rootEpic';

const epicMiddleware = createEpicMiddleware<any, any, any>();
export const store = createStore(rootReducer, applyMiddleware(epicMiddleware));
epicMiddleware.run(rootEpic);
