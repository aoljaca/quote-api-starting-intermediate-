// Add a PUT request and a DELETE request (look at project info)
//https://www.codecademy.com/practice/projects/quote-api
//https://www.codecademy.com/paths/web-development/tracks/javascript-back-end-development/modules/
//learn-express-create-a-server/lessons/learn-express-routes/exercises/using-queries
const express = require('express');
const app = express();

const { quotes } = require('./data');
const { getRandomElement } = require('./utils');

const PORT = process.env.PORT || 4001;

app.use(express.static('public'));

app.listen(PORT)

app.get('/api/quotes/random', (req, res, next) => {
    const quote = getRandomElement(quotes)
    res.send({quote: quote})
})

app.get('/api/quotes', (req, res) => {
    const reqPerson = req.query.person;
      if (reqPerson !== undefined) {
        const quoteFilter = quotes.filter(quote => quote.person === reqPerson)
        const sendQuote = {
          quotes: quoteFilter
        };
        res.send(sendQuote); 
      } else {
        const allQuotes = {
          quote: quotes
        };
        res.send(allQuotes);
      }
  });

  app.post('/api/quotes', (req, res, next) => {
      const newQuote = {
          quote: req.query.quote,
          person: req.query.person
      };
      if (newQuote.quote && newQuote.person) {
          quotes.push(newQuote);
          res.send({quote: newQuote})
      } else {
          res.status(400).send()
      }
  })
