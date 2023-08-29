import React, { useState, useEffect, ChangeEvent } from 'react';
import styles from '../../Css/Main.module.css'

interface Movie {
  id: number;
  nome: string;
  genero: string;
  imagem: string;
}

function MovieList() {
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [movies, setMovies] = useState<Movie[]>([]);
  const [selectedMovies, setSelectedMovies] = useState<Movie[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('movies.json');
        if (!response.ok) {
          throw new Error('No response');
        }
        const data = await response.json();
        setMovies(data)
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []);

  const filteredMovies = movies.filter((movie: Movie) =>
    movie.nome.toLowerCase().includes(searchTerm.toLowerCase())
  );

  function handleChange(event: ChangeEvent<HTMLInputElement>) {
    setSearchTerm(event.target.value)
  }

  function handleCheckboxChange(movie: Movie) {
    if (selectedMovies.includes(movie)) {
      setSelectedMovies(selectedMovies.filter((m) => m !== movie));
    } else {
      setSelectedMovies([...selectedMovies, movie]);
    }
  }

  return (
    <div className='mainDiv'>
      <div>
        {selectedMovies.length > 0 && (
          <div className={styles.favMovie}>
            <h3>Filmes Selecionados:</h3>
            <ul>
              {selectedMovies.map((movie) => (
                <li key={movie.id}>{movie.nome}</li>
              ))}
            </ul>
          </div>
        )}
      </div>
      <div className={styles.formBorder}>

        <input className={styles.inputSearch}
          type="text"
          placeholder="Search by Name"
          value={searchTerm}
          onChange={handleChange}
        />
        <table className={styles.tableForm}>
          <thead>
            <tr>
              <th className={styles.tableItem}>ID</th>
              <th className={styles.tableItem}>Nome</th>
              <th className={styles.tableItem}>Gênero</th>
              <th className={styles.tableItem}>Imagem</th>
            </tr>
          </thead>
          <tbody>
            {filteredMovies.map((movie: Movie) => (
              <tr key={movie.id}>
                <td>{movie.id}</td>
                <td>{movie.nome}</td>
                <td>{movie.genero}</td>
                <td>
                  <img src={movie.imagem} alt={movie.nome} width={100} height={150} />
                </td>
                <td>
                  <input
                    type="checkbox"
                    checked={selectedMovies.includes(movie)}
                    onChange={() => handleCheckboxChange(movie)}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default MovieList;

// onChange={() =>  setFavoriteMovie(movie)} 