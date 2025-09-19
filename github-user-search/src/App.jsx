// src/App.jsx
import './index.css'; // tailwind styles
import Search from './components/Search';

export default function App(){
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-5xl mx-auto py-10">
        <h1 className="text-3xl font-bold text-center mb-6">GitHub User Search — Advanced</h1>
        <Search />
      </div>
    </div>
  );
}
