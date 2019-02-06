import React, { Component } from 'react';
import { PropTypes } from 'prop-types';
import Book from './common/Book'
import '../assets/App.css'


class ListBooks extends Component {

   static propTypes = {
      ObjComp: PropTypes.arrayOf(PropTypes.any),
      bookShelf: PropTypes.arrayOf(PropTypes.any),
      onShelfChange: PropTypes.func.isRequired,
    }


    render() {

        const { bookShelf, onShelfChange } = this.props;
           
         // This Object can be passed from BookSelf
         let ObjComp =  {
            currentlyReading:[{'typeRead':'Currently Reading', 'items':[]}],
            wantToRead: [{'typeRead':'Want To Read', 'items':[]}],
            read: [{'typeRead':'Read', 'items':[]}]
         }


          bookShelf.forEach((elem) => {
        
                Object.keys(ObjComp).forEach((booksTypeRed) => {
              
                    if(elem.shelf===booksTypeRed){
                      
                      ObjComp[booksTypeRed][0].items.push(elem);
                    } 
                })
          });

        
        return (
                <div className='bookshelf'>
                    { Object.keys(ObjComp).map((booksTypeRed)=>(
                      <div key={booksTypeRed}>
                        <h2 className='bookshelf-title'>{ObjComp[booksTypeRed][0].typeRead}</h2>
                          <div className='bookshelf-books'>
                            <ol className='books-grid'>
                            <Book  booksItems={ObjComp[booksTypeRed][0].items}  
                                   onShelfChange={onShelfChange}  />
                            </ol>
                          </div>
                        </div>
                    ))}
                     
                 </div>          
                )
    }
}

export default ListBooks