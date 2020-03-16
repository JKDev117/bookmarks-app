import React, { Component } from 'react';
import BookmarkItem from '../BookmarkItem/BookmarkItem';
import './BookmarkList.css';
import BookmarksContext from '../BookmarksContext';
import PropTypes from 'prop-types'; //14.17


class BookmarkList extends Component {
  static defaultProps = {
    bookmarks: []
  };

  static contextType = BookmarksContext;

  render() {
    const { bookmarks } = this.context
    return (
      <section className='BookmarkList'>
        <h2>Your bookmarks</h2>
        <ul className='BookmarkList__list' aria-live='polite'>
          {bookmarks.map(bookmark =>
            <BookmarkItem
              key={bookmark.id}
              {...bookmark}
              /*              
              id={bookmark.id}
              title={bookmark.title}
              url={bookmark.url}
              description={bookmark.description}
              rating={bookmark.rating}
              */
            />
          )}
        </ul>
      </section>
    );
  }
}


export default BookmarkList;


//14.17
BookmarkList.propTypes = {
  //bookmarks: PropTypes.arrayOf(PropTypes.object)
  bookmarks: PropTypes.arrayOf(PropTypes.shape({
    title: PropTypes.string.isRequired,
    url: PropTypes.string.isRequired,
    rating: PropTypes.number,
    description: PropTypes.string
  }))
};






