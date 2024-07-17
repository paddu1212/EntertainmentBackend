const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    Name: String,
    Email: String,
    DOB: String,
    Password: String
})
const UserModel = mongoose.model("users", UserSchema)


const videosSchema = new mongoose.Schema({
    type: String,
    id : String,
    original_title: String,
    overview: String,
    original_language: String,
    release_date: String,
    adult: String,
    actors: String,
    genre_ids: Array,
    poster_path: String,
    backdrop_path: String,
    video: String,
    trailer: String
})
const videosModel = mongoose.model("videos", videosSchema)

const tvSchema = new mongoose.Schema({
    type: String,
    id : String,
    original_name: String,
    overview: String,
    original_language: String,
    first_air_date: String,
    adult: String,
    actors: String,
    genre_ids: Array,
    poster_path: String,
    backdrop_path: String,
    video: String,
    trailer: String
})
const tvModel = mongoose.model("tvs", tvSchema)

const bookmarkSchema = new mongoose.Schema({
    email: String,
    video_id: String,
    type: String
})
const bookmarkModel = mongoose.model('bookmark', bookmarkSchema)

const ReviewsSchema = new mongoose.Schema({
    reviews: String,
    rating: String,
    userName: String,
    videoName: String
})
const reviewsModel = mongoose.model("reviews", ReviewsSchema)

module.exports = {UserModel, videosModel, tvModel, bookmarkModel, reviewsModel};
