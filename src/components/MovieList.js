import React, { useEffect, useState } from 'react';
import { db } from '../firebaseConfig';
import { collection, query, where, getDocs } from 'firebase/firestore';
import Movie from './Movie';

const MovieList = () => {
    const [ movies, setMovies ] = useState(null)

    useEffect(() => {
        const mt = query(collection(db, "data"), where("category", "==", "Movie"));
        const getMovies = async () => {
            await getDocs(mt)
                    .then((snapshot) => {
                        let results = []
                        snapshot.docs.forEach(doc => {
                            results.push({id: doc.id, ...doc.data()})
                        })
                        setMovies(results)
                    })
        }
        getMovies()
    }, [])

    
    return (
        <div className='content'>
            <h1 className='sectionTitle headingM'>Movies</h1>
            <div className='movieList'>
            { movies ? 
                    movies.map((title, index) => {
                        return <Movie key={index}
                        id={title.id} 
                        title={title.title} 
                        year={title.year} 
                        rating={title.rating}
                        type={title.category}
                        image={title.thumbnail.regular.large} />
                    })
                :
                    <h1 className="headingL">Loading...</h1>}
            </div>
        </div>
    );
};

export default MovieList;