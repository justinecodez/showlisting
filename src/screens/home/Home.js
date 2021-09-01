import React, { useState, useEffect } from 'react'
import GridListTile from '@material-ui/core/GridListTile';
import GridList from '@material-ui/core/GridList';
import GridListTileBar from '@material-ui/core/GridListTileBar';
import Card from '@material-ui/core/Card';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Select from '@material-ui/core/Select';
import FormControl from '@material-ui/core/FormControl';
import MenuItem from '@material-ui/core/MenuItem';
import { makeStyles } from '@material-ui/core/styles';
import { Link } from "react-router-dom";

import './Home.css'



const useStyles = makeStyles(theme => ({
    root: {
        display: 'flex',
        flexWrap: "nowrap",
    },
    formControl: {
        margin: theme.spacing(1),
        minWidth: 240,
        maxWidth: 240,
    },
    component: {
        marginTop: theme.spacing.unit,
    },
    input: {
        width: "80%",
        margin: "10px auto"
    }
}));

const usePlaceholderStyles = makeStyles(theme => ({
    placeholder: {
        color: "#aaa"
    }
}));

const Placeholder = ({ children }) => {
    const classes = usePlaceholderStyles();
    return <div className={classes.placeholder}>{children}</div>;
};


const inputStyle = { WebkitBoxShadow: "0 0 0 1000px white inset" };

function Home() {
    const classes = useStyles();
    const [movies, setMovies] = useState([])
    // eslint-disable-next-line
    const [answer, setAnswer] = React.useState("");

    useEffect(() => {
        fetch('http://localhost:8085/api/v1/movies')
            .then(response => {
                if (response.ok) {
                    return response.json()
                }
                throw response
            })
            .then(data => {
                setMovies(data.movies)
            })
            .catch(err => {
                console.error('Error fetching data: ', err)
            })
    }, [])
    return (
        <div className="home">
            <div className="upcoming">
                <h5>Upcoming movies</h5>
                <div className="scrollbar">
                    <GridList cellHeight={250} cols={6} spacing={2} className={classes.root}>
                        {movies.map(movie => (
                            <Link to={`/movie/${movie.id}`}>
                                <GridListTile key={movie.imdbID}>
                                    <img src={movie.poster_url} alt={movie.Title} />
                                    <GridListTileBar
                                        title={movie.title}

                                    />
                                </GridListTile>
                            </Link>
                        ))}
                    </GridList>
                </div>
            </div>
            <div className="released-movies">
                <div className="movies">
                    <GridList cellHeight={350} cols={4} spacing={2}>
                        {movies.map(movie => (
                            <GridListTile key={movie.imdbID}>
                                <Link to={`/movie/${movie.id}`}>
                                    <img src={movie.poster_url} alt={movie.Title} />
                                    <GridListTileBar
                                        title={movie.title}
                                        subtitle={<span>Release Date:{movie.release_date}</span>}
                                    />
                                </Link>
                            </GridListTile>
                        ))}
                    </GridList>
                </div>
                <div className="filter">
                    <Card className={classes.formControl}>
                        <FormControl className={classes.formControl}>
                            <TextField
                                label="Movie Name"
                                variant="filled"
                                required
                                inputProps={{ style: inputStyle }}
                                className={classes.input}
                            />

                            <Select
                                value={answer}
                                displayEmpty
                                className={classes.input}
                                // onChange={event => setAnswer(event.target.value)}
                                renderValue={
                                    answer !== "" ? undefined : () => <Placeholder>Genre</Placeholder>
                                }
                            >
                                <MenuItem value={"1"}>1</MenuItem>
                                <MenuItem value={"2"}>2</MenuItem>
                                <MenuItem value={"3"}>3</MenuItem>
                            </Select>
                            <Select
                                value={answer}
                                displayEmpty
                                className={classes.input}
                                // onChange={event => setAnswer(event.target.value)}
                                renderValue={
                                    answer !== "" ? undefined : () => <Placeholder>Artist</Placeholder>
                                }
                            >
                                <MenuItem value={"1"}>1</MenuItem>
                                <MenuItem value={"2"}>2</MenuItem>
                                <MenuItem value={"3"}>3</MenuItem>
                            </Select>
                            <TextField
                                id="date"
                                label="Release Date Start"
                                type="date"
                                defaultValue="dd-mm-yyyy"
                                className={classes.input}
                                InputLabelProps={{
                                    shrink: true,
                                }}
                            />
                            <TextField
                                id="date"
                                label="Release Date End"
                                type="date"
                                defaultValue="dd-mm-yyyy"
                                className={classes.input}
                                InputLabelProps={{
                                    shrink: true,
                                }}
                            />
                            <Button
                                type="submit"
                                variant="contained"
                                color="primary"
                                className={classes.input}
                            >
                                APPLY
                            </Button>
                        </FormControl>
                    </Card>
                </div>
            </div>
        </div >
    )
}


export default Home;
