import React from 'react';
import ReactDOM from 'react-dom';
import Form, { LOCALSTORAGE_KEY } from './Form.jsx';

let props = {};
if (window.localStorage) {
	const valueJSON = localStorage.getItem(LOCALSTORAGE_KEY);
	if (valueJSON) {
		props.values = JSON.parse(valueJSON);
	}
}
ReactDOM.render(<Form {...props} />, document.getElementById('root'));
