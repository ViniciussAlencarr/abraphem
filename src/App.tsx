import { ToastContainer } from 'react-toastify';

import './App.css'
import './routes/css/media-layout.css'
import 'react-toastify/dist/ReactToastify.css';
import { Screens } from './routes';


function App() {
  return (
    <div className='container-app'>
      <Screens />
      <ToastContainer />
    </div>
  )
}

export default App
