import React, { useState, useEffect } from 'react';

const QuoteCard = () => {
  const [quote, setQuote] = useState('');
  const [author, setAuthor] = useState('');

  useEffect(() => {
    const fetchQuote = async () => {
      try {
        const response = await fetch('http://api.quotable.io/random');
        const data = await response.json();
        setQuote(data.content);
        setAuthor(data.author);
      } catch (error) {
        console.error('Error fetching quote:', error);
      }
    };

    fetchQuote();
  }, []);

  return (
    
      <div className="QuoteCard">
      <blockquote>
        <p>"{quote}"</p>
        <footer>- {author}</footer>
        <hr />
      </blockquote>
    </div>
  );
};

export default QuoteCard;
