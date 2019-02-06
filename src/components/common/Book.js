import React from 'react'
import { PropTypes } from 'prop-types';
import '../../assets/App.css'
import BookShelfChanger from './BookShelfChanger'

  


  const Book = (props) => {
   
    const { booksItems } = props;
      
    const changeShelf = (event) => {
       const params = event.target.value.split(' ');
       props.onShelfChange(...params);
    };

    const books = booksItems.map((book)=>(

                  <div key={book.id}>

                    {book.imageLinks && book.authors!==undefined?(
                       <li>
                         
                            <div className='book'>
                                <div className='book-top'>

                                   <div className='book-cover' 
                                      style={{ width: 128, height: 193, backgroundImage: 
                                            `url( ${book.imageLinks && book.imageLinks.thumbnail})`}}>
                                    </div>

                                    <BookShelfChanger  onChange={changeShelf} value={book} />
                                </div>
                                <div className='book-title'>{book.title}</div>
                                     { book.authors.map((author)=>(
                                        <div key={author} className='book-authors'>{author}</div>
                                      ))
                                     }                             
                             </div>
                          </li>
                     ):null}     
                   </div>
                ))

        return (
             <ol className='books-grid'>
                {books}        
             </ol>
            )
  };


  Book.propTypes = {
    booksItems: PropTypes.arrayOf(PropTypes.any),
    books: PropTypes.arrayOf(PropTypes.any),
    onShelfChange: PropTypes.func.isRequired
  };


export default Book