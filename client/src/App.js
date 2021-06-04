import logo from './logo.svg';
import react,{useEffect,useState} from 'react'
import './App.css';
import axios from 'axios'
function App() {
  const [state,setState] = useState(null)
  useEffect(()=>{
    axios.get("http://localhost:5000/api/posts")
    .then(response =>{
      console.log(response)
    })
    .catch(err =>{
      console.log(err)
    })
  },[])
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
