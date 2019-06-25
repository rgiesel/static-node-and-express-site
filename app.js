const express = require('express');
const app = express();
const data = require('./data.json');

// Sets the view engine to the parameter 'pug' (templates are grabbed by pug from /views folder)
app.set('view engine', 'pug');

// Serves static files in the 'public' directory under the '/static' prefix
app.use('/static', express.static('public'));

/* Sets the 'index' route, which makes the 'projects' property of data.json
available to the view and renders the home page */
app.get('/', (req, res) => {
  res.locals = data.projects;
  res.render('index');
});

// Sets the route to render the "About" page
app.get('/about', (req, res) => {
  res.render('about');
});

app.get('/:project', (req, res) => {

});


app.use((req, res, next) => {
  const err = new Error('The page you are looking for was not found');
  err.status = 404;
  next(err);
});

// when an object/error is passed to the next function, express looks for the first function with 4 params
app.use((err, req, res, next) => {
  // can also be called as a second parameter in the render method instead;
  res.locals.error = err;
  res.status(err.status);
  res.render('error');
});



// Starts the server with app listening on port 3000 and logs a string to the console
app.listen(3000, () => {
  console.log('The application is running on localhost:3000');
});
