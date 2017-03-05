const express = require('express');
const app = express();
const PORT = process.env.PORT || 9090;


app.get('/', (req, res) => {
  res.send('chindow.io');
});


app.listen(PORT, () => {
  console.log(`Server listening at http://127.0.0.1:${PORT}`);
});
