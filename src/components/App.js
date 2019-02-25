import React from 'react'
import { Route } from 'react-router-dom'
import { Link } from 'react-router-dom'
import * as BooksAPI from '../utils/BooksAPI'
import SearchBar from './SearchBar'; 
import BookShelf from './BookShelf'; 
import '../assets/App.css'


class BooksApp extends React.Component {

   state = {
      books: [],
  }


  componentDidMount() {
    BooksAPI.getAll().then(books => {
      this.updateAllShelf(books);
    });
  }


  // For Shelf Components 
  //**********************************************************************//

  updateAllShelf = (currentBooks) => {

   this.setState(()=>({ 
        books: currentBooks
    }));

  }

selectShelf = (shelf , idBook) => {
    // First of All we Need to update the state of the shelf in the BE
    // 
    BooksAPI.update({id:idBook}, shelf).then(res => {

       let currentBooks = [];
       currentBooks = this.state.books.map(book=>book)
       const result = currentBooks.find( book => book.id === idBook );

         // the case were the shelf is not in this.state.books
         // we can call BE to get the array updated
        if(result===undefined || shelf==='none') {

            BooksAPI.getAll().then(books => {
                 currentBooks = books.map(book=>book)
                 this.updateAllShelf(currentBooks);
            });

         } else {

              Object.keys(res).forEach((obj) => {                  
        
                      currentBooks.map((book) => {

                            res[obj].forEach((eleId) => {

                               if(book.id===eleId) {
                                   book.shelf=obj;
                                }
                            })
                            
                            return book
                       })        
              })

         }

          this.updateAllShelf(currentBooks);
    });
     
  }



  render(){

      return (

        <div className="app">
            <div>
                <Route  exact path='/search' render={()=>(
                  <SearchBar 
                      booksShelf={this.state.books}
                      onShelfChange={this.selectShelf} />)         
                }/>
            </div>

            <div>
               <Route  exact path='/' render={() =>
                 <BookShelf books={this.state.books}
                            onShelfChange={this.selectShelf} />
               }/>
            </div>

            <div className="open-search">
                <Link to="/search"> <button>Add a book</button></Link>
            </div>
        </div>
        
      )
  }
}

export default BooksApp