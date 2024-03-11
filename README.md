Clone the Repository: Open your terminal or command prompt and navigate to the directory where you want to clone the repository. Then run the following command to clone the repository:

bash
Copy code
git clone https://github.com/sateesh0030/movieslist.git
Install Dependencies: Navigate into the cloned directory and run the following command to install the project dependencies specified in the package.json file:

bash
Copy code
cd movieslist
npm install
Create MongoDB Connection: Open the server.js file in your code editor. Locate the following line where the MongoDB connection is established:

javascript
Copy code
mongoose.connect('mongodb+srv://sateeshpachamatla:*******@cluster0.5zym0vb.mongodb.net/', {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
Replace the placeholder (*******) with your actual MongoDB password.

Run the Server: After installing dependencies and setting up the MongoDB connection, you can start the server by running the following command:

bash
Copy code
npm start
Access the API: Once the server is running, you can access the API endpoints using tools like Postman or by making HTTP requests from your frontend application.

To list all movies: Send a GET request to http://localhost:3000/movies.
To search for movies: Send a GET request to http://localhost:3000/search?q=<query>, replacing <query> with your search term.
To add a new movie: Send a POST request to http://localhost:3000/movies with the movie data in the request body.
To update an existing movie: Send a PUT request to http://localhost:3000/movies/:id with the movie ID in the URL and the updated data in the request body.
To delete a movie: Send a DELETE request to http://localhost:3000/movies/:id with the movie ID in the URL.
