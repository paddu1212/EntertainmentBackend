const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const { UserModel, videosModel, bookmarkModel, tvModel, reviewsModel } = require('./model/User'); // Corrected the VideosModel import
const multer = require('multer');
const path = require('path')
const jwt = require('jsonwebtoken');
const { default: axios } = require('axios');

require('dotenv').config();
const port = process.env.PORT || 3001;
const dbUrl = process.env.DB_URL;
const SECRET_KEY = process.env.SECRET;
const API_KEY = process.env.API_KEY;


const app = express();
app.use(cors());
app.use(express.json()); 
app.use(express.static('public'));

// Connect to MongoDB
mongoose.connect(`${dbUrl}`, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('Connected to MongoDB'))
    .catch(err => console.error('Could not connect to MongoDB:', err));



app.post('/videos/insert', async (req, res) => {
  const {length} = req.body;
  // console.log(req.body); return
  try {
      // Fetch data from TMDB API for movies
      const movieResponse = await axios.get(`https://api.themoviedb.org/3/discover/movie?api_key=${API_KEY}&page=${length}`);
      const tmdbMovies = movieResponse.data.results.map(movie => ({
          ...movie,
          type: 'movie' // Add a 'type' field to identify it as a movie
      }));

      // Fetch data from TMDB API for TV series
      const tvResponse = await axios.get(`https://api.themoviedb.org/3/discover/tv?api_key=${API_KEY}&page=${length}`);
      const tmdbTVSeries = tvResponse.data.results.map(tvSeries => ({
          ...tvSeries,
          type: 'tv' // Add a 'type' field to identify it as a TV series
      }));

      // Fetch data from TMDB API for kannada movie
      const kannadaResponse = await axios.get(`https://api.themoviedb.org/3/discover/movie?api_key=${API_KEY}&language=en-US&with_original_language=kn&sort_by=popularity.&page=${length}`);
        const tmdbKannada = kannadaResponse.data.results.map(kannada => ({
          ...kannada,
          type: 'movie' // Add a 'type' field to identify it as a movie
        }));

      // Fetch data from TMDB API for hindi movie
      const hindiResponse = await axios.get(`https://api.themoviedb.org/3/discover/movie?api_key=${API_KEY}&language=en-US&with_original_language=hi&sort_by=popularity.&page=${length}`);
        const tmdbHindi = hindiResponse.data.results.map(kannada => ({
          ...kannada,
          type: 'movie' // Add a 'type' field to identify it as a movie
        }));

      // Fetch data from TMDB API for telagu movie
      const telaguResponse = await axios.get(`https://api.themoviedb.org/3/discover/movie?api_key=${API_KEY}&language=en-US&with_original_language=te&sort_by=popularity.&page=${length}`);
        const tmdbTelagu = telaguResponse.data.results.map(kannada => ({
          ...kannada,
          type: 'movie' // Add a 'type' field to identify it as a movie
        }));

      // Fetch data from TMDB API for malayalam movie
      const malayalamResponse = await axios.get(`https://api.themoviedb.org/3/discover/movie?api_key=${API_KEY}&language=en-US&with_original_language=ml&sort_by=popularity.&page=${length}`);
        const tmdbMalayalam = malayalamResponse.data.results.map(kannada => ({
          ...kannada,
          type: 'movie' // Add a 'type' field to identify it as a movie
        }));

      // Insert movie data into MongoDB
      await videosModel.insertMany(tmdbMovies);

      // Insert TV series data into MongoDB
      await tvModel.insertMany(tmdbTVSeries);
      
      // if (length === 1) {
        // Insert kannada data into MongoDB
        await videosModel.insertMany(tmdbKannada);

        // Insert Hindi movie data into MongoDB
        await videosModel.insertMany(tmdbHindi);

        // Insert Telagau movie data into MongoDB
        await videosModel.insertMany(tmdbTelagu);

        // Insert Malaya;am movie data into MongoDB
        await videosModel.insertMany(tmdbMalayalam);
      // }

      res.json({ message: 'TMDB movie and TV series data inserted into MongoDB' });
  } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Server Error' });
  }
});

app.delete('/api/admin/video/delete/:id', (req, res) => {
  const {id} = req.params;
  videosModel.findByIdAndDelete(id)
    .then((result) => {
      if (result) {
        res.status(200).json({ message: 'Video deleted successfully', data: result });
      } else {
        res.status(404).json({ message: 'Video not found' });
      }
    })
    .catch((err) => {
      res.status(500).json({ message: 'Error deleting video', error: err });
    });
})

app.get('/api/videos/:id', async (req, res) => {
  try {
    const tmdbId = req.params.id;
    
    const response = await axios.get(
      `https://api.themoviedb.org/3/movie/${tmdbId}/videos?api_key=${API_KEY}`
    );
    const videoKey = response.data.results[0]; // Assuming the first video is the trailer
    res.json({ videoKey });
  } catch (error) {
    console.error('Error fetching video:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.get('/api/tv/:id', async (req, res) => {
  try {
    const tmdbId = req.params.id;
    
    const response = await axios.get(
      `https://api.themoviedb.org/3/tv/${tmdbId}/videos?api_key=${API_KEY}`
    );
    const videoKey = response.data.results[0]; // Assuming the first video is the trailer
    res.json({ videoKey });
  } catch (error) {
    console.error('Error fetching video:', error);
    // res.status(500).json({ error: 'Internal server error' });
  }
});

app.get('/api/video/genre/:id', async (req, res) => {
  try {
    const tmdbId = req.params.id;
    
    const response = await axios.get(
      `https://api.themoviedb.org/3/movie/${tmdbId}?api_key=${API_KEY}`
    );
    const videoKey = response.data.genres; // Assuming the first video is the trailer
    res.json({ videoKey });
  } catch (error) {
    console.error('Error fetching video:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});




app.post('/signUp', (req, res) => {
  UserModel.create(req.body)
      .then(result => res.json(result))
      .catch(err => console.log(err))
  // console.log(req.body);
})

app.get('/check-token-validity', async (req, res) => {
  // Extract the token from the request headers
  const token = req.headers.authorization && req.headers.authorization.split(' ')[1];
  
  if (!token) {
    return res.status(401).json({ message: 'Token not provided' });
  }

  try {
    // Verify the token using the secret key
    const decodedToken = jwt.verify(token, SECRET_KEY);
    
    // Optionally, you can perform additional checks on the decoded token here
    // For example, check if the user exists in the database or if the token has expired
    
    res.status(200).json({'decodedToken' : decodedToken, valid: true });
  } catch (error) {
    console.error('Invalid token:', error);
    res.status(401).json({ message: 'Invalid token' });
  }
});

// Login route
app.post('/login', async (req, res) => {
    const { userName, password } = req.body;

  try {
    // Find the user in the database
    const user = await UserModel.findOne({ Email : userName });
    if (!user) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    // Compare passwords
    const passwordMatch = await UserModel.findOne({ Password : password });
    if (!passwordMatch) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    // Generate JWT token
    const token = jwt.sign({ userId: user._id }, SECRET_KEY, { expiresIn: '1h' });
    
    res.cookie('token', token, { maxAge: 3600000, httpOnly: true });
    
    res.status(200).json({ token, userName });
  } catch (error) {
    console.error('Error during login:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});





app.get('/', (req, res) => {
    UserModel.find()
        .then(users => res.json(users))
        .catch(err => res.json(err));
});


app.get('/admin/video', (req, res) => {
  videosModel.find()
      .then(users => res.json(users))
      .catch(err => res.json(err));
});


app.get('/videos/:userName', async (req, res) => {
  const { userName } = req.params;

  try {
    const videos = await videosModel.aggregate([
      {
        $lookup: {
          from: bookmarkModel.collection.name,
          let: { videoId: { $toString: '$_id' } },
          pipeline: [
            {
              $match: {
                $expr: {
                  $and: [
                    { $eq: ['$$videoId', '$video_id'] },
                    { $eq: [userName, '$email'] } // Assuming 'email' is the field in bookmarkModel that stores user's email
                  ]
                }
              }
            }
          ],
          as: 'joinedData'
        }
      },
      // Additional stages of the aggregation pipeline can be added here as needed
    ]);

    res.json(videos);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.get('/tv/:userName', async (req, res) => {
  const { userName } = req.params;

  try {
    const videos = await tvModel.aggregate([
      {
        $lookup: {
          from: 'bookmarks',
          let: { videoId: { $toString: '$_id' } },
          pipeline: [
            {
              $match: {
                $expr: {
                  $and: [
                    { $eq: ['$$videoId', '$video_id'] },
                    // { $eq: [userName, '$email'] } // Assuming 'email' is the field in bookmarkModel that stores user's email
                  ]
                }
              }
            }
          ],
          as: 'joinedData'
        }
      },
      // Additional stages of the aggregation pipeline can be added here as needed
    ]);
    // console.log(videos);
    res.json(videos);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});





app.post('/bookmark', (req, res) => {
  bookmarkModel.create(req.body)
    .then(result => res.json(result))
    .catch(err => console.log(err));
})

app.get('/bookmark/:userName', async(req, res) => {
  const {userName} = req.params;
  // res.json(userName)
  try {
    const videos = await videosModel.aggregate([
      {
        $lookup: {
          from: bookmarkModel.collection.name, // Get the actual collection name from bookmarkModel
          let: { videoId: { $toString: "$_id" } }, // Convert _id to string
          pipeline: [
              {
                  $match: {
                      $expr: {
                        $and: [
                          { $eq: ["$$videoId", "$video_id"] }, // Compare converted _id with video_id
                          { $eq : [userName, "$email"] }
                        ]
                      }
                  }
              }
              
          ],
          as: 'joinedData' // Name of the field to store the joined data
        }
      },
      { $match: { joinedData: { $ne: [] } } }
      
      // Add more stages of the aggregation pipeline as needed
    ]);

    const tv = await tvModel.aggregate([
      {
        $lookup: {
          from: bookmarkModel.collection.name, // Get the actual collection name from bookmarkModel
          let: { videoId: { $toString: "$_id" } }, // Convert _id to string
          pipeline: [
              {
                $match: {
                  $expr: {
                    $and: [
                      { $eq: ["$$videoId", "$video_id"] }, // Compare converted _id with video_id
                      { $eq : [userName, "$email"] }
                    ]
                  }
                }
              }
          ],
          as: 'joinedData' // Name of the field to store the joined data
        }
      },
      { $match: { joinedData: { $ne: [] } } }
    ]);
    const combinedData = [...videos, ...tv]
    res.json(combinedData);
  } catch (err) {
    res.json(err);
  }

});

app.delete('/bookmark/:value', async (req, res) => {
  const { value } = req.params;
  try {
    // Use await to wait for the deletion operation to complete
    await bookmarkModel.findOneAndDelete({ 'video_id': value });
    
    // Send a success response back to the client
    res.status(200).json({ 'video_id': value, 'message': 'Bookmark deleted successfully' });
  } catch (error) {
    console.error('Error deleting bookmark:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});



app.get('/all/movies/:userName', async (req, res) => {
  const { userName } = req.params;

  try {
    const videos = await videosModel.aggregate([
      // { $sample: { size: 10 } },
      {
        $lookup: {
          from: bookmarkModel.collection.name,
          let: { videoId: { $toString: '$_id' } },
          pipeline: [
            {
              $match: {
                $expr: {
                  $and: [
                    { $eq: ['$$videoId', '$video_id'] },
                    { $eq: [userName, '$email'] } // Assuming 'email' is the field in bookmarkModel that stores user's email
                  ]
                }
              }
            }
          ],
          as: 'joinedData'
        }
      },
      // Additional stages of the aggregation pipeline can be added here as needed
    ]);

    res.json(videos);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});



app.get('/trending/:userName', async (req, res) => {
  const { userName } = req.params;

  try {
    const videos = await videosModel.aggregate([
      { $sample: { size: 10 } },
      {
        $lookup: {
          from: bookmarkModel.collection.name,
          let: { videoId: { $toString: '$_id' } },
          pipeline: [
            {
              $match: {
                $expr: {
                  $and: [
                    { $eq: ['$$videoId', '$video_id'] },
                    { $eq: [userName, '$email'] } // Assuming 'email' is the field in bookmarkModel that stores user's email
                  ]
                }
              }
            }
          ],
          as: 'joinedData'
        }
      },
      // Additional stages of the aggregation pipeline can be added here as needed
    ]);

    res.json(videos);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.get('/recommend/:userName', async (req, res) => {
  const { userName } = req.params;

  try {
    const videos = await videosModel.aggregate([
      { $sample: { size: 14 } },
      {
        $lookup: {
          from: bookmarkModel.collection.name,
          let: { videoId: { $toString: '$_id' } },
          pipeline: [
            {
              $match: {
                $expr: {
                  $and: [
                    { $eq: ['$$videoId', '$video_id'] },
                    { $eq: [userName, '$email'] } // Assuming 'email' is the field in bookmarkModel that stores user's email
                  ]
                }
              }
            }
          ],
          as: 'joinedData'
        }
      },
      // Additional stages of the aggregation pipeline can be added here as needed
    ]);

    res.json(videos);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});


app.post('/api/reviews', (req, res) => {
  // const {userName, videoName} = req.body
  reviewsModel.create(req.body)
      .then(result => res.json(result))
      .catch(err => console.log(err))
  // console.log(req.body);
})


app.get('/api/reviews', async (req, res) => {
  try {
      const reviews = await reviewsModel.find();
      res.status(200).json(reviews);
  } catch (error) {
      res.status(500).json({ error: 'Error fetching reviews' });
  }
});


app.listen(port, () => {
    console.log("server is running on ", port);
});
