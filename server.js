const express = require('express');
const path = require('path');
const app = express();
const webRouter = require('./routes/web');
const apiRouter = require('./routes/api');
// environmental variable
const PORT = process.env.PORT || 3001;

// creating middleware
app.use(express.static('public'));
app.use(express.json());
app.use(webRouter);
app.use(apiRouter);

// remember to make this 404 page once done everything else
app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, 'public', '404.html')); 
});


app.listen(PORT, () => {
    console.log('app is running at http://localhost:' + PORT );
})