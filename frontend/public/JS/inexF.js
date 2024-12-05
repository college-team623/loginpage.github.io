
fetch('http://localhost:3000/')
    .then(response => response.text())
    .then(data => console.log(data))
    .catch(error => console.error('Error:', error));

app.use(express.static('public'));
app.post('/api/data', (req, res) => {
    const data = req.body;
    // Process data
    res.json({ message: 'Data received', data });
  });
  
