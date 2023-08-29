import styles from '/Users/pichau/Documents/3035teach/exercicio2/useeffectapi/src/Css/Main.module.css'
import './App.css';
import MovieList from './components/List/MovieList';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>Filmes</h1>
      </header>
      <main className={styles.mainContainer}>
        <MovieList/>
      </main>
    </div>
  );
}

export default App;
