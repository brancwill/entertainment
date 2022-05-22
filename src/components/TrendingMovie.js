import React from 'react';

const TrendingMovie = (props) => {
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
        <div className='trendingTitle title' style={{backgroundImage: `url(${props.image})`}}>
            {props.isBookmarked ?
                <div className="bookmarkCircle">
                    <img className="bookmark isBookmarked" src="assets/icon-bookmark-full.svg" />
                </div> 
            :   
                <div className="bookmarkCircle">
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
    );
};

export default TrendingMovie;