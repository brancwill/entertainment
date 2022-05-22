import React, {useState} from 'react';
import { useLogout } from './hooks/useLogout';
import { useAuthContext } from "./hooks/useAuthContext";
import AllContent from './components/AllContent';
import MovieList from './components/MovieList';
import TVList from './components/TVList';
import BookmarkList from './components/BookmarkList';
import Search from './components/Search';

const Home = () => {
    const { logout } = useLogout()
    const [ searchTerm, setSearchTerm ] = useState("")
    const { user } = useAuthContext()

    const [ allActive, setAllActive ] = useState('active')
    const [ moviesActive, setMoviesActive ] = useState('')
    const [ tvActive, setTVActive ] = useState('')
    const [ bookmarksActive, setBookmarksActive ] = useState('')
    const [ activeFilter, setActiveFilter ] = useState('all')

    const handleClick = (category) => {
        setAllActive('')
        setMoviesActive('')
        setTVActive('')
        setBookmarksActive('')
        setActiveFilter('')

        switch(category) {
            case 'all':
                setAllActive('active')
                setActiveFilter('all')
                break
            case 'movies':
                setMoviesActive('active')
                setActiveFilter('movies')
                break
            case 'tv':
                setTVActive('active')
                setActiveFilter('tv')
                break
            case 'bookmarks':
                setBookmarksActive('active')
                setActiveFilter('bookmarks')
                break
        }
    }

    return (
        <div className="Home">
            <div className="Navbar">
                <img className="logo" src="assets/logo.svg" />
                <div className="navIcons">
                    <img onClick={() => handleClick('all')} className={"navIcon " + allActive} src="assets/icon-nav-home.svg"/>
                    <img onClick={() => handleClick('movies')} className={"navIcon " + moviesActive} src="assets/icon-nav-movies.svg"/>
                    <img onClick={() => handleClick('tv')} className={"navIcon " + tvActive} src="assets/icon-nav-tv-series.svg"/>
                    <img onClick={() => handleClick('bookmarks')} className={"navIcon " + bookmarksActive} src="assets/icon-nav-bookmark.svg"/>
                </div>
                    <img className="accountIcon" src="assets/icon-account.svg" />
            </div>
            <div className="content">
                <div className="search">
                    <img className='searchIcon' src="assets/icon-search.svg" />
                    <input value={searchTerm} onChange={e => setSearchTerm(e.target.value)} type="text" placeholder='Search for movies or TV series' />
                </div>
                {
                    searchTerm.length > 0 ? <Search filter={activeFilter} searchTerm={searchTerm} />

                    :

                    allActive === 'active' ? <AllContent />

                    :

                    moviesActive === 'active' ? <MovieList />

                    :

                    tvActive === 'active' ? <TVList />

                    :

                    bookmarksActive === 'active' ? <BookmarkList />

                    :

                    <AllContent />
                }
            </div>
        </div>
    );
};

export default Home;