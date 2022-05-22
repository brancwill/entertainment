import React, { useEffect, useState } from 'react';
import { db } from '../firebaseConfig';
import { collection, query, where, getDocs } from 'firebase/firestore';
import TrendingMovie from './TrendingMovie';
import Movie from './Movie';

const AllContent = () => {
    // Create state for content
    const [ trendingTitles, setTrendingTitles ] = useState(null)
    const [ reccomendedTitles, setReccomendedTitles ] = useState(null)

    useEffect(() => {
        // Create refs to query data for "Trending" and "Reccomended"
        const tt = query(collection(db, "data"), where("isTrending", "==", true));
        const rt = query(collection(db, "data"), where("isTrending", "==", false));
        // Create functions to query data and set state to their respective content lists
        const getTrending = async () => {
            await getDocs(tt)
                    .then((snapshot) => {
                        let results = []
                        snapshot.docs.forEach(doc => {
                            results.push({id: doc.id, ...doc.data()})
                        })
                        setTrendingTitles(results)
                    })
        }
        const getReccomended = async () => {
            await getDocs(rt)
                    .then((snapshot) => {
                        let results = []
                        snapshot.docs.forEach(doc => {
                            results.push({id: doc.id, ...doc.data()})
                        })
                        setReccomendedTitles(results)
                    })
        }
        // Call functions to run on load
        getTrending()
        getReccomended()
    }, [])
    return (
        <div className='content'>
            <h1 className="sectionTitle headingM">Trending</h1>
            <div className="Trending snapsInline">
                { trendingTitles ? 
                    trendingTitles.map((title, index) => {
                        return <TrendingMovie key={index}
                        id={title.id} 
                        title={title.title} 
                        year={title.year} 
                        rating={title.rating}
                        type={title.category}
                        image={title.thumbnail.trending.large} />
                    })
                :
                    <h1 className="headingL">Loading...</h1>}
            </div>
            <h1 className="sectionTitle headingM">Reccomended for you</h1>
            <div className="Recommended">
                { reccomendedTitles ? 
                        reccomendedTitles.map((title, index) => {
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

export default AllContent;