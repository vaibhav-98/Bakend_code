const app = require('./app.js')


const PORT = process.env.PORT || 5010
app.listen(PORT, () => {
    console.log(`App is running at http:localhost:${PORT}`);
})