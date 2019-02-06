import React from 'react'
import { PropTypes } from 'prop-types';
import ListBooks from './ListBooks'
import '../assets/App.css'

class BookShelf extends React.Component {


 static propTypes = {
    books: PropTypes.arrayOf(PropTypes.any),
    onShelfChange: PropTypes.func.isRequired,
  }


  render() {

    const { books, onShelfChange } = this.props 
    
    return (
          <div className='list-books'>
            <div className='list-books-title'>
              <h1>MyReads</h1>
            </div>
              
            <div className='list-books-content'>
              <div>
                <ListBooks bookShelf={books} 
                onShelfChange={onShelfChange}/>
              </div>
            </div>
         </div>
              
    )
  }
}

export default BookShelf
