import React from 'react';
import Rating from '../Rating/Rating';
import './BookmarkItem.css';
import config from '../config';
import BookmarksContext from '../BookmarksContext';
import PropTypes from 'prop-types'; //14.17
import { Link, BrowserRouter } from 'react-router-dom';


function deleteBookmarkRequest(bookmarkId, callback) {
  fetch(config.API_ENDPOINT + `/${bookmarkId}`, {
    method: 'DELETE',
    headers: {
      'authorization': `bearer ${config.API_KEY}`
    }
  })
    .then(res => {
      if (!res.ok) {
        // get the error message from the response,
        return res.json().then(error => {
          // then throw it
          throw error
        })
      }
      return res.json()
    })
    .then(data => {
      // call the callback when the request is successful
      // this is where the App component can remove it from state
      callback(bookmarkId)
    })
    .catch(error => {
      console.error(error)
    })
}

export default function BookmarkItem(props) {
  return (
    <BookmarksContext.Consumer>
      {(context) => (
        <li className='BookmarkItem'>
          <div className='BookmarkItem__row'>
            <h3 className='BookmarkItem__title'>
              <a
                href={props.url}
                target='_blank'
                rel='noopener noreferrer'>
                {props.title}
              </a>
            </h3>
            {/* Rating */}
            <Rating value={props.rating} /> 
          </div>
          <p className='BookmarkItem__description'>
            {props.description}
          </p>
          
          <BrowserRouter>
            <Link to={`/update-bookmark/${props.id}`}>
              Update Bookmark
            </Link>
          </BrowserRouter>

          <div className='BookmarkItem__buttons'>
            <button
              className='BookmarkItem__description'
              onClick={() => {
                deleteBookmarkRequest(
                  props.id,
                  context.deleteBookmark,
                )
              }}
            >
              Delete
            </button>
          </div>
        </li>
      )}
   </BookmarksContext.Consumer>
  )
}

BookmarkItem.defaultProps = {
  title: "",
  url: "https://",
  onClickDelete: () => {},
  rating: 1, //14.17
  description: "" //14.17
}

//14.17
BookmarkItem.propTypes = {
  title: PropTypes.string.isRequired,
  //url: PropTypes.string.isRequired,
  url: (props, propName, componentName) => {
    //props = the props object
    //propName = the name of the prop under consideration
    //componentName = the name of the component itself
    // get the value of the prop
    const prop = props[propName];

    // do the isRequired check
    if(!prop) {
      return new Error(`${propName} is required in ${componentName}. Validation Failed`);
    }

    // check the type
    if (typeof prop != 'string') {
      return new Error(`Invalid prop, ${propName} is expected to be a string in ${componentName}. ${typeof prop} found.`);
    }

    // do the custom check here
    // using a simple regex
    if (prop.length < 5 || !prop.match(new RegExp(/^https?:\/\//))) {
      return new Error(`Invalid prop, ${propName} must be min length 5 and begin http(s)://. Validation Failed.`);
    }
  },
  rating: PropTypes.number,
  description: PropTypes.string
}




//Line 50: <Rating value={props.rating} /> 
