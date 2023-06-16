import React, {useState} from 'react';
import AllContentGuest from './components/AllContentGuest';
import SearchGuest from './components/SearchGuest';
import Modal from 'react-modal/lib/components/Modal';
import MovieListGuest from './components/MovieListGuest';
import TVListGuest from './components/TVListGuest';
import { Link } from 'react-router-dom';

Modal.setAppElement(document.querySelector("#content"))

const Guest = () => {
    const [ searchTerm, setSearchTerm ] = useState("")

    const [ allActive, setAllActive ] = useState('active')
    const [ moviesActive, setMoviesActive ] = useState('')
    const [ tvActive, setTVActive ] = useState('')
    const [ activeFilter, setActiveFilter ] = useState('all')


    const handleClick = (category) => {
        setAllActive('')
        setMoviesActive('')
        setTVActive('')
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
        }
    }

    return (
        <div className="Guest">
            <div className="Navbar">
                <img className="logo" src="assets/logo.svg" />
                <div className="navIcons">
                    <img onClick={() => handleClick('all')} className={"navIcon " + allActive} src="assets/icon-nav-home.svg"/>
                    <img onClick={() => handleClick('movies')} className={"navIcon " + moviesActive} src="assets/icon-nav-movies.svg"/>
                    <img onClick={() => handleClick('tv')} className={"navIcon " + tvActive} src="assets/icon-nav-tv-series.svg"/>
                </div>
                <div className="Reg">
                    <Link to="../signup"><h6 className="headingS">Sign Up</h6></Link>
                    <Link to="../login"><h6 className="headingS">Log In</h6></Link>
                </div>
            </div>
            <div id="content" className="content">
                <div className="search">
                    <img className='searchIcon' src="assets/icon-search.svg" />
                    <input value={searchTerm} onChange={e => setSearchTerm(e.target.value)} type="text" placeholder='Search for movies or TV series' />
                </div>
                {
                    searchTerm.length > 0 ? <SearchGuest filter={activeFilter} searchTerm={searchTerm} />

                    :

                    allActive === 'active' ? <AllContentGuest />

                    :

                    moviesActive === 'active' ? <MovieListGuest />

                    :

                    tvActive === 'active' ? <TVListGuest />

                    :

                    <AllContentGuest />
                }
            </div>
        </div>
    );
};

export default Guest;