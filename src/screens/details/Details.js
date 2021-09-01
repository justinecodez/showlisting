import React, { useEffect, useState } from 'react'
import { Link, useParams } from "react-router-dom";
import { Button, Typography, GridListTile, GridListTileBar } from '@material-ui/core';
import StarBorderIcon from '@material-ui/icons/StarBorder';
import YouTube from 'react-youtube';
import { makeStyles } from '@material-ui/core/styles';


import './Details.css'

const useStyles = makeStyles(theme => ({
    root: {
        width: "200px",
        height: "200px",
        marginBottom: "20px",
        listStyle: "none",
    },
    button: {
        boxShadow: "none",
        backgroundColor: "white",
        marginLeft: "24px",
        marginTop: " 8px",
        marginBottom: "0px",
        lineHeight: "24px",
    },
    link: {
        textDecoration: "none"
    }
}));


function Details() {
    const params = useParams();
    const classes = useStyles();
    const [movie, setMovie] = useState({ })

    function _onReady(event) {
        event.target.pauseVideo();
    }

    useEffect(() => {
        fetch(`http://localhost:8085/api/v1/movies/${params.id}`)
            .then(response => {
                if (response.ok) {
                    return response.json()
                }
                throw response
            })
            .then(data => {
                setMovie(data)
            })
    }, [])

    const { poster_url, genres, title, duration, release_date, rating, storyline, wiki_url, trailer_url, artists } = movie;

    return (
        <div>

            <Link to="/" className={classes.link}>
                <Button variant="contained" className={classes.button}>
                    <Typography>
                        {"< Back To Home"}
                    </Typography>
                </Button>
            </Link>
            <div style={{ display: "flex", flexWrap: "wrap", width: "100vw" }}>
                <div style={{ width: "20%" }}>
                    <img src={poster_url} alt="" />
                </div>
                <div style={{ width: "60%" }}>
                    <div>
                        <Typography variant="h2">
                            {title}
                        </Typography>
                    </div>
                    <div><strong>Genre:</strong> {genres}</div>
                    <div><strong>Duration:</strong> {duration}</div>
                    <div><strong>Release Date:</strong> {release_date}</div>
                    <div><strong>Rating:</strong> {rating}</div>
                    <div><strong>Plot:</strong> <Link to={wiki_url}>(wiki link)</Link> {storyline}</div>
                    <div>
                        {
                            trailer_url ? <YouTube videoId={trailer_url.match(/(?<==).*/ig)} opts={{
                                height: '390',
                                width: '640',
                                playerVars: {
                                    autoplay: 1,
                                }
                            }} onReady={_onReady} /> : null
                        }
                    </div >
                </div >
                <div style={{ width: "20%" }}>
                    <div>
                        <strong>Rate This Moivie:</strong>
                        <div>
                            <StarBorderIcon className={classes.unstar} />
                            <StarBorderIcon className={classes.unstar} />
                            <StarBorderIcon className={classes.unstar} />
                            <StarBorderIcon className={classes.unstar} />
                            <StarBorderIcon className={classes.unstar} />
                        </div>
                    </div>
                    <div>
                        <strong>Artist:</strong>
                        {
                            artists ?
                                <div>
                                    {artists.map(artist => {
                                        return (
                                            <GridListTile key={artist.id} className={classes.root}>
                                                <img src={artist.profile_url} alt="" />
                                                <GridListTileBar
                                                    title={`${artist.first_name} ${artist.last_name}`}
                                                />
                                            </GridListTile>
                                        )
                                    })}
                                </div> : null
                        }
                    </div>
                </div>

            </div >
        </div >
    )
}

export default Details
