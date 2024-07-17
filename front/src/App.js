import { Provider } from 'react-redux';

import 'styles/style.css';

import Root from './router/root';
import store from './store/store';


function App() {
	return (
		<Provider store={store}>
			<h1>{process.env.REACT_APP_HOST}</h1>
			<Root />
		</Provider>
	);
}

export default App;
