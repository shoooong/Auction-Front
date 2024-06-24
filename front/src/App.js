import logo from './logo.svg';
import './App.css';
import Root from './router/root';
import { Provider } from 'react-redux';
import store from './store';
import ExamPage from './pages/user/ExamPage';

function App() {
  return (
    <Provider store={store}>
      <Root />
    </Provider>
  );
}

export default App;
