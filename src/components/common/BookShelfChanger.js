import React from 'react'
import '../../assets/App.css'


const BookShelfChanger = (props) => {

     const {value = ''} = props;
   
     return (
              <div className='book-shelf-changer'>
                <select onChange={props.onChange} value={`${value.shelf} ${value.id}`}>
                  <option value='move' disabled>Move to...</option>
                  <option value={`currentlyReading ${value.id}`}>Currently Reading</option>
                  <option value={`wantToRead ${value.id}`}>Want to Read</option>
                  <option value={`read ${value.id}`}>Read</option>
                  <option value={`none ${value.id}`}>None</option>
                </select>
              </div>
            )
  
}

export default BookShelfChanger