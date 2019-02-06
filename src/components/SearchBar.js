import React from 'react'
import { Link } from 'react-router-dom'
import { PropTypes } from 'prop-types';
import * as BooksAPI from '../utils/BooksAPI'
import   Book  from  './common/Book'
import { debounce } from 'throttle-debounce';
import '../assets/App.css'



class SearchBar extends React.Component {


   static propTypes = {
    booksItems: PropTypes.arrayOf(PropTypes.any),
    onShelfChange: PropTypes.func.isRequired,
    }


    state = {
      booksItems:[],
      query: ''
    }


    updateQuery = (query) => {

        this.setState(() => ({
          query: query
        }))
     
        this.SearchBooks(query);
    }



    SearchBooks = debounce( 400 , (query) => {

      if(query.length>0) {

              BooksAPI.search(query, 10).then((booksItems) => {

                if(booksItems.hasOwnProperty('error')) {
                     
                      this.setState(()=>({
                          booksItems:[]
                      }))
                   
                 } else {
                    
                      this.setState(()=>({
                        booksItems
                      }))
                 }
              })

      } else {
            
            this.setState(()=>({
                  booksItems:[]
             }))

      }
    }); 


  render() {

    const { booksItems, query } = this.state
    const { onShelfChange, booksShelf } = this.props

       
        booksItems.map((elemItems)=> {
            
              elemItems.shelf='none';

                booksShelf.forEach((elemShelf) => {

                   if(elemShelf.id===elemItems.id) {
                       elemItems.shelf = elemShelf.shelf;
                    } 
                })
            
              return elemItems;

          });

    return (
      
          <div className='search-books'>
            <div className='search-books-bar'>

             <Link to='/'><button className='close-search'>Close</button></Link>
              <div className='search-books-input-wrapper'>
                 
                 <input type='text'
                        placeholder='Search by title or author'
                        value={query}
                        onChange={(event) => this.updateQuery(event.target.value)}/>

              </div>
            </div>
            <div className='search-books-results'>
                 {booksItems[0]!==undefined?(<Book  onShelfChange={onShelfChange} 
                                                    booksItems={booksItems}/>):null}          
            </div>
          </div>

        )
  }
}

export default SearchBar  