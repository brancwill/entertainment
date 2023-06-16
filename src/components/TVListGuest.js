import React, { useEffect, useState } from 'react';
import { db } from '../firebaseConfig';
import { collection, query, where, getDocs } from 'firebase/firestore';
import MovieGuest from './MovieGuest';

const TVListGuest = () => {
    const [ shows, setShows ] = useState(null)

    useEffect(() => {
        const mt = query(collection(db, "data"), where("category", "==", "TV Series"));
        const getShows = async () => {
            await getDocs(mt)
                    .then((snapshot) => {
                        let results = []
                        snapshot.docs.forEach(doc => {
                            results.push({id: doc.id, ...doc.data()})
                        })
                        setShows(results)
                    })
        }
        getShows()
    }, [])

    
    return (
        <div className='content'>
            <h1 className='sectionTitle headingM'>TV Shows</h1>
            <div className="tvList">
            { shows ? 
                    shows.map((title, index) => {
                        return <MovieGuest key={index}
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

export default TVListGuest;