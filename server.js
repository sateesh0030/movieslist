const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const movieSchema = new mongoose.Schema({
    title: String,
    genre: String,
    rating: Number,
    streamingLink: String
});


const MovieModel = mongoose.model('Movie', movieSchema);

// Connect to MongoDB
mongoose.connect('mongodb+srv://sateeshpachamatla:*******@cluster0.5zym0vb.mongodb.net/', { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('Connected to MongoDB'))
    .catch((err) => console.error('MongoDB connection error:', err));

const app = express();
const PORT = 3000;

app.use(bodyParser.json());
const isAdmin = (req, res, next) => {
    const isAdminUser = true; 
    if (isAdminUser) {
        next();
    } else {
        res.status(403).send('Unauthorized');
    }
};

// GET /movies - List all the movies in the lobby
app.get('/movies', async (req, res) => {
    try {
        const movies = await MovieModel.find();
        res.json(movies);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// GET /search?q={query} - Search for a movie by title or genre
app.get('/search', async (req, res) => {
    const query = req.query.q;
    try {
        const movies = await MovieModel.find({
            $or: [
                { title: new RegExp(query, 'i') },
                { genre: new RegExp(query, 'i') }
            ]
        });
        res.json(movies);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// POST /movies - Add a new movie to the lobby (requires "admin" role)
app.post('/movies', isAdmin, async (req, res) => {
    const movieData = req.body;
    try {
        const movie = await MovieModel.create(movieData);
        res.status(201).json(movie);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// PUT /movies/:id - Update an existing movie's information (requires "admin" role)
app.put('/movies/:id', isAdmin, async (req, res) => {
    const { id } = req.params;
    const updatedData = req.body;
    try {
        const movie = await MovieModel.findByIdAndUpdate(id, updatedData, { new: true });
        res.json(movie);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// DELETE /movies/:id - Delete a movie from the lobby (requires "admin" role)
app.delete('/movies/:id', isAdmin, async (req, res) => {
    const { id } = req.params;
    try {
        await MovieModel.findByIdAndDelete(id);
        res.status(204).send();
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
