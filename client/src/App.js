import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTwitter, faRedditSquare, faTumblrSquare} from '@fortawesome/free-brands-svg-icons'

import './App.scss';

import COLORS from './Colors'
  
let quoteDBURL = 'https://gist.githubusercontent.com/camperbot/5a022b72e96c4c9585c32bf6a75f62d9/raw/e3c6895ce42069f0ee7e991229064f167fe8ccdc/quotes.json'

  function App() {
   const [quote, setQuote] = useState('Click the button and the truth shall set you free')
   const [author, setAuthor] = useState('Me')
   const [randomNumber, setRandomNumber] = useState(0)
   const [quotesArray, setQuotesArray] = useState(null)
   const [color, setColor] = useState('#282c34')


  // after the app loads, we want to fetch the quotes from the db, 
  // and parse it so it's in the correct format to use the data- need an async function- useEffect
  // runs effects on our app after the app loads 

  const fetchQuotes = async (url) => {
    const res = await fetch(url)
    const parse = await res.json()
    setQuotesArray(parse.quotes) 
    console.log(parse)
  }

useEffect(() => {
  fetchQuotes(quoteDBURL)
}, [quoteDBURL])


  // linking the random number to quotes
  const fetchRandomQuote = () => {
    let randomInteger = Math.floor(quotesArray.length * Math.random())
    setRandomNumber(randomInteger)
    setQuote(quotesArray[randomInteger].quote)
    setAuthor(quotesArray[randomInteger].author)
    setColor(COLORS[randomInteger])
  }

    return (
      <div className="App">
        <header className="App-header" style={{backgroundColor:color, color:color}}>
        <div id="quote-box">          
        <h2 id="text">
        <span id="quote-icon">
        {/* <FontAwesomeIcon icon={faQuoteLeft} />  */}
        <p id="text" style={{color:color}}>"{quote}"</p>
        </span>  

        </h2>
             
          <p id="author" style={{color:color}}>-{author}</p>
          
          <div className="buttons">
          <a  className="button" id="tweet-quote" href={encodeURI(`http://www.twitter.com/intent/tweet?text=${quote} -${author}`)} 
          style={{backgroundColor:color}}>
            <FontAwesomeIcon icon={faTwitter} />
            </a>

            <a  className="button" id="tweet-quote" href={`https://www.reddit.com/r/test/submit?title=Sharing%20Random%20Quote&text=${quote} -${author}`} 
          style={{backgroundColor:color}}>
            <FontAwesomeIcon icon={faRedditSquare} />
            </a>

            {/* <a  className="button" id="tweet-quote" href={encodeURI(`https://www.tumblr.com/widgets/share/tool?shareSource=legacy&canonicalUrl=<-urlencode(share_url)->&posttype=${quote} -${author}`)} 
          style={{backgroundColor:color}}>
            <FontAwesomeIcon icon={faTumblrSquare} />
            </a> */}
    
          <button id="new-quote" onClick={()=> fetchRandomQuote()}
          style={{backgroundColor:color}}
          >Generate Random Number</button>
            </div>
          </div>       
        </header>  
      </div>
    );
}

export default App;