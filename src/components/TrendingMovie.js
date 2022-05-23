import React, {useEffect, useState} from 'react';
import { useAuthContext } from '../hooks/useAuthContext';
import { db } from '../firebaseConfig';
import { doc, getDoc, updateDoc, arrayRemove, arrayUnion } from 'firebase/firestore';
import { Link } from 'react-router-dom';

const TrendingMovie = (props) => {
    const { user } = useAuthContext()
    const [ bookmarked, setBookmarked ] = useState(false)

    //
    useEffect(() => {
        //Select user document
        const userDoc = doc(db, "users", user.uid)
        const getBookmarks = async () => {
            //Search for bookmarked title in user document
            const bookmarkCheck = await getDoc(userDoc)
            //If it exists in the list, set bookmarked to true
            if (bookmarkCheck.exists()) {
                if (bookmarkCheck.data().bookmarks.includes(props.title)) {
                    setBookmarked(true)
                }
            }
        }
        getBookmarks()
    }, [])

    const handleBookmark = async () => {
        const userDoc = doc(db, "users", user.uid)
        if (bookmarked === false) {
            await updateDoc(userDoc, {
                bookmarks: arrayUnion(props.title)
            })
            setBookmarked(true)
        } else if (bookmarked === true) {
            await updateDoc(userDoc, {
                bookmarks: arrayRemove(props.title)
            })
            setBookmarked(false)
        } else {
            return
        }
    }

    const mediaTypeHandler = (type) => {
        switch(type) {
            case "Movie":
                return "assets/icon-category-movie.svg"
                break;
            case "TV Series":
                return "assets/icon-category-tv.svg"
                break;
        }
    }
    const categorySource = mediaTypeHandler(props.type)
    return (
        <Link to='/sorry'>
        <div className='trendingTitle title' style={{backgroundImage: `url(${props.image})`}}>
            {bookmarked ?
                    <div onClick={handleBookmark} className="bookmarkCircle">
                        <img className="bookmark isBookmarked" src="assets/icon-bookmark-full.svg" />
                    </div> 
                :   
                    <div onClick={handleBookmark} className="bookmarkCircle">
                        <img className="bookmark notBookmarked" src="assets/icon-bookmark-empty.svg" /> 
                    </div> 
                }
            <div className="playButton">
                <img src="assets/icon-play.svg" alt=""/>
                <p className='bodyM'>Play</p>
            </div>
            <div className="titleInfo">
                <div className="info">
                    <p className="bodyS">{props.year}</p>
                    <p>&sdot;</p>
                    <img className="categoryImage" src={categorySource}/>
                    <p className="bodyS contentType">{props.type}</p>
                    <p>&sdot;</p>
                    <p className="bodyS">{props.rating}</p>
                </div>
                <h1 className="title headingXS">{props.title}</h1>
            </div>
        </div>
        </Link>
    );
};

export default TrendingMovie;