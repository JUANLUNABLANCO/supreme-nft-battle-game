const express = require('express');
const app = express();

require('dotenv').config();
const PORT = process.env.PORT;

app.use(express.static(__dirname + '/public'));

const server = app.listen(PORT, () => {
	console.log(`Servidor web iniciado in port: ${PORT}`);
	console.log(`http://127.0.0.1:${PORT}`);
});
