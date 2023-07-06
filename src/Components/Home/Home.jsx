import React, { useEffect, useState } from "react";
import "./Home.scss";
import axios from "axios";
import { BiPlay } from "react-icons/bi"
import { AiOutlinePlus } from "react-icons/ai"

const apiKey = "280c73b0a5a7797e9298eb9f82a9e63d";
const url = "https://api.themoviedb.org/3";
const imgUrl = "https://image.tmdb.org/t/p/original";
const upcoming = "upcoming";
const nowPlaying = "now_playing";
const popular = "popular";
const topRated = "top_rated";
const time_window = "week";

const Card = ({ img }) => <img className="card" src={img} alt="cover" />;

const Row = ({ title, arr = [] }) => (
    <div className="row">
        <h2>{title}</h2>

        <div>
            {arr.map((item, index) => (
                <Card key={index} img={`${imgUrl}/${item.poster_path}`} />
            ))}
        </div>
    </div>
);

const Home = () => {
    const [upcomingMovies, setUpcomingMovies] = useState([]);
    const [nowPlayingMovies, setNowPlayingMovies] = useState([]);
    const [popularMovies, setPopularMovies] = useState([]);
    const [topRatedMovies, setTopRatedMovies] = useState([]);
    const [trending, setTrending] = useState([]);

    useEffect(() => {
        const fetchUpcoming = async () => {
            const {
                data: { results },
            } = await axios.get(`${url}/movie/${upcoming}?api_key=${apiKey}`);
            setUpcomingMovies(results);
        };
        const fetchNowPlaying = async () => {
            const {
                data: { results },
            } = await axios.get(`${url}/movie/${nowPlaying}?api_key=${apiKey}`);
            setNowPlayingMovies(results);
        };
        const fetchPopular = async () => {
            const {
                data: { results },
            } = await axios.get(`${url}/movie/${popular}?api_key=${apiKey}`);
            setPopularMovies(results);
        };
        const fetchTopRated = async () => {
            const {
                data: { results },
            } = await axios.get(`${url}/tv/${topRated}?api_key=${apiKey}`);
            setTopRatedMovies(results);
        };
        const fetchTrending = async () => {
            const {
                data: { results },
            } = await axios.get(`${url}/trending/movie/${time_window}?api_key=${apiKey}`);
            setTrending(results);
        };
        
        fetchTrending();
        fetchUpcoming();
        fetchNowPlaying();
        fetchPopular();
        fetchTopRated();
    }, []);

    return (
        <section className="home">
            <div
                className="banner"
                style={{
                    backgroundImage: popularMovies[1]
                        ? `url(${`${imgUrl}/${popularMovies[1].poster_path}`})`
                        : "rgb(16, 16, 16)",
                }}
            >
                {popularMovies[1] && <h1>{popularMovies[1].original_title}</h1>}
                {popularMovies[1] && <p>{popularMovies[1].overview}</p>}

                <div>
                    <button><BiPlay /> Play  </button>
                    <button>My List <AiOutlinePlus /> </button>
                </div>
            </div>

            <Row title={"Upcoming"} arr={upcomingMovies} />
            <Row title={"Now Playing"} arr={nowPlayingMovies} />
            <Row title={"Popular"} arr={popularMovies} />
            <Row title={"Top Rated"} arr={topRatedMovies} />
            <Row title={"Trending"} arr={trending} />

        </section>
    );
};

export default Home;