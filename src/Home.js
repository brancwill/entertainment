import React, {useState} from 'react';
import AllContent from './components/AllContent';
import MovieList from './components/MovieList';
import TVList from './components/TVList';
import BookmarkList from './components/BookmarkList';
import Search from './components/Search';
import Modal from 'react-modal/lib/components/Modal';
import AccountInfo from './components/AccountInfo';

Modal.setAppElement(document.querySelector("#content"))

const Home = () => {
    const [ searchTerm, setSearchTerm ] = useState("")
    const [ open, setOpen ] = useState(false)

    const [ allActive, setAllActive ] = useState('active')
    const [ moviesActive, setMoviesActive ] = useState('')
    const [ tvActive, setTVActive ] = useState('')
    const [ bookmarksActive, setBookmarksActive ] = useState('')
    const [ activeFilter, setActiveFilter ] = useState('all')

    const closeModal = () => {
        setOpen(false)
    }

    const modalStyles = {
        overlay: {
            backgroundColor: "rgba(0, 0, 0, 0.5)"
        },
        content: {
            width: "80vw",
            height: "80vh",
            backgroundColor: "#161D2F",
            color: "#FFFFFF",
            borderRadius: "10px",
            textAlign: "center",
            margin: "5% auto 0",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-evenly",
            gap: "20%"
        }
    }

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
                    <img onClick={() => setOpen(true)} className="accountIcon" src="assets/icon-account.svg" />
            </div>
            <div id="content" className="content">
                <Modal className="accountModal" isOpen={open} onRequestClose={closeModal} style={modalStyles} shouldCloseOnOverlayClick={true} >
                    <AccountInfo closeModal={closeModal}/>
                </Modal>
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