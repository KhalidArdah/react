import { createStore, compose, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import reducer from './reducers';

declare global {
    interface Window { devToolsExtension: any; }
}

const store = createStore(reducer, compose(
    applyMiddleware(thunk),
    typeof window === "object" &&
    typeof window.devToolsExtension !== "undefined"
        ? window.devToolsExtension()
        : (f: any) => f
));

export default store;