import React, { useEffect, useState } from 'react';
import { db } from '../firebaseConfig';
import { getDoc, getDocs, doc, collection, where, query } from 'firebase/firestore';
import { useAuthContext } from "../hooks/useAuthContext";
import Movie from './Movie';

const BookmarkList = () => {
    const [ bookmarks, setBookmarks ] = useState(null)
    const { user } = useAuthContext()

    useEffect(() => {
        const userDoc = doc(db, "users", user.uid)
        const array = []
        const array2 = []
        const getBookmarks = async () => {
            //Search for bookmarked title in user document
            const bookmarkCheck = await getDoc(userDoc)
            //If it exists in the list, set bookmarked to true
            if (bookmarkCheck.exists()) {
                for (let i = 0; i < bookmarkCheck.data().bookmarks.length; i++) {
                    const bookmark = query(collection(db, "data"), where("title", "==", bookmarkCheck.data().bookmarks[i]))
                    const querySnapshot = await getDocs(bookmark);
                    querySnapshot.forEach((doc) => {
                        array2.push({id: doc.id, ...doc.data()});
                    })
                }
                setBookmarks(array2)
            }
        }
        getBookmarks()
    }, [])

    
    return (
        <div className='content'>
            <h1 className='sectionTitle headingM'>Bookmarks</h1>
            <div className="bookmarkList">
            { bookmarks ? 
                    bookmarks.map((title, index) => {
                        return <Movie key={index} 
                        title={title.title} 
                        year={title.year} 
                        rating={title.rating}
                        type={title.category}
                        image={title.thumbnail.regular.large} />
                    })
                : bookmarks !== null && bookmarks.length < 1 ?
                    <h1 className="headingL">No results found</h1>
                :
                <h1 className="headingL">Loading...</h1>
            }
            </div>
        </div>
    );
};

export default BookmarkList;