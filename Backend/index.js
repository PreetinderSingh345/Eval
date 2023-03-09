const express = require('express');
const cors = require('cors');
const app = express();

const port = 4000;

const contentRouter = require('./src/routers/content');

app.use(cors());
app.use(express.json());
app.use('/', contentRouter);

app.get('/', (req, res) => {
	res.send('We have a request at the root route of the backend service');
});

app.listen(port, () => {
	console.log(`Server is listening on port ${port}`);
});
