import React, {useState, useEffect} from 'react';
import { db } from '../firebaseConfig';
import { query, collection, where, getDocs, doc, getDoc } from 'firebase/firestore';
import { useAuthContext } from '../hooks/useAuthContext';
import Movie from './Movie';

const Search = (props) => {
    const [ resultsNumber, setResultsNumber ] = useState(0)
    const [ searchResults, setSearchResults ] = useState(null)
    const { user } = useAuthContext()

    useEffect(() => {
        const noFilter = query(collection(db, "data"))
        const movieFilter = query(collection(db, "data"), where("category", "==", "Movie"));
        const tvFilter = query(collection(db, "data"), where("category", "==", "TV Series"));
        const userDoc = doc(db, "users", user.uid)
        const items = []

        const performSearch = async () => {
            if (props.filter === 'all') {
                await getDocs(noFilter)
                    .then((snapshot) => {
                        const results = []
                        snapshot.docs.forEach(doc => {
                            results.push({id: doc.id, ...doc.data()})
                        })
                        const filteredData = results.filter((movie) => {
                            return movie.title.toLowerCase().includes(props.searchTerm.toLowerCase())
                        })
                        setResultsNumber(filteredData.length)
                        setSearchResults(filteredData)
                    })
            } else if (props.filter === 'movies') {
                await getDocs(movieFilter)
                    .then((snapshot) => {
                        const results = []
                        snapshot.docs.forEach(doc => {
                            results.push({id: doc.id, ...doc.data()})
                        })
                        const filteredData = results.filter((movie) => {
                            return movie.title.toLowerCase().includes(props.searchTerm.toLowerCase())
                        })
                        setResultsNumber(filteredData.length)
                        setSearchResults(filteredData)
                    })
            } else if (props.filter === 'tv') {
                await getDocs(tvFilter)
                    .then((snapshot) => {
                        const results = []
                        snapshot.docs.forEach(doc => {
                            results.push({id: doc.id, ...doc.data()})
                        })
                        const filteredData = results.filter((movie) => {
                            return movie.title.toLowerCase().includes(props.searchTerm.toLowerCase())
                        })
                        setResultsNumber(filteredData.length)
                        setSearchResults(filteredData)
                    })
            } else if (props.filter === 'bookmarks') {
                const bookmarkCheck = await getDoc(userDoc)
                if (bookmarkCheck.exists()) {
                    for (let i = 0; i < bookmarkCheck.data().bookmarks.length; i++) {
                        const bookmark = query(collection(db, "data"), where("title", "==", bookmarkCheck.data().bookmarks[i]))
                        const querySnapshot = await getDocs(bookmark);
                        querySnapshot.forEach((doc) => {
                            items.push({id: doc.id, ...doc.data()});
                        })
                    }
                    const filteredData = items.filter((movie) => {
                        return movie.title.toLowerCase().includes(props.searchTerm.toLowerCase())
                    })
                    setResultsNumber(filteredData.length)
                    setSearchResults(filteredData)
                }
            }
        }
        performSearch()
    }, [props.searchTerm, props.filter])

    return (
        <div className="content">
            <h1 className="sectionTitle headingM">Found {resultsNumber} results for {props.searchTerm}</h1>
            <div className="searchResults">
            { searchResults ? 
                    searchResults.map((title, index) => {
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

export default Search;