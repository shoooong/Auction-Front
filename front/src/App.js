import { Provider } from 'react-redux';

import 'styles/style.css';

import Root from './router/root';
import store from './store/store';


function App() {
	return (
		<Provider store={store}>
			<Root />
		</Provider>
	);
}

export default App;
