import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import { Provider } from 'react-redux'
import { makeStore } from './store'

import { addUserAction } from "../src/actions";
import { User } from "../src/domain/User";

const store = makeStore()
store.dispatch(addUserAction(new User("Joe", "joe@email.com")))
store.dispatch(addUserAction(new User("Huan", "huan@email.com")))

ReactDOM.render(<Provider store={store}>
	<App />
</Provider>, document.getElementById('root'));
registerServiceWorker();
