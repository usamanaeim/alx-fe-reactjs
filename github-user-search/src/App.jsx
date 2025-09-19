import './App.css';
import Search from './components/Search';

function App() {
  return (
    <div style={{ maxWidth: 900, margin: '24px auto', padding: 16 }}>
      <h1>GitHub User Search</h1>
      <Search />
    </div>
  );
}

export default App;
