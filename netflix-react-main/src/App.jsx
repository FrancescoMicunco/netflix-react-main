import { Component, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import "./styles/styles.css";
import { Container, Alert, Dropdown } from "react-bootstrap";
import MyNavbar from "./components/MyNavbar";
import MyFooter from "./components/MyFooter";
import MovieList from "./components/MovieList";
import { BrowserRouter, Routes, Route } from 'react-router-dom'

const App = () => {

    const [State, setState] = useState({
        gallery1: [],
        gallery2: [],
        gallery3: [],
        searchResults: [],
        loading: true,
        error: false,
    })
    // state = {
    //     gallery1: [],
    //     gallery2: [],
    //     gallery3: [],
    //     searchResults: [],
    //     loading: true,
    //     error: false,
    // };

    const OMDB_URL = "http://www.omdbapi.com/?apikey=24ad60e9";

    // componentDidMount = () => {
    //     this.fetchMovies();
    // };

    useEffect(() => {
        fetchMovies()
    }, [])

    useEffect(() => {

        fetchMovies()
    }, [State.searchResults])

    const fetchMovies = () => {
        Promise.all([
            fetch(OMDB_URL + "&s=harry%20potter")
                .then((response) => response.json())
                .then((responseObject) => {
                    if (responseObject.Response === "True") {
                        setState({ ...State, gallery1: responseObject.Search })
                        // this.setState({ gallery1: responseObject.Search });
                    } else {
                        setState({ ...State, error: true })
                        // this.setState({ error: true });
                    }
                }),
            fetch(OMDB_URL + "&s=avengers")
                .then((response) => response.json())
                .then((responseObject) => {
                    if (responseObject.Response === "True") {
                        setState({
                            ...State,
                            gallery2: responseObject.Search
                        });
                        // this.setState({ gallery2: responseObject.Search });
                    } else {
                        this.setState({
                            ...State,
                            error: true
                        });
                        // this.setState({ error: true });
                    }
                }),
            fetch(OMDB_URL + "&s=star%20wars")
                .then((response) => response.json())
                .then((responseObject) => {
                    if (responseObject.Response === "True") {
                        setState({
                            ...State,
                            gallery3: responseObject.Search
                        })
                        // this.setState({ gallery3: responseObject.Search });
                    } else {
                        setState({
                            ...State,
                            error: true
                        });
                        // this.setState({ error: true });
                    }
                }),
        ])
            .then(() => setState({
                ...State,
                loading: false
            }))
            // this.setState({ loading: false }))
            .catch((err) => {
                setState({
                    ...State,
                    error: true
                });
                // this.setState({ error: true });
                console.log("An error has occurred:", err);
            });
    };

    const showSearchResult = async (searchString) => {
        if (searchString === "") {

            setState({
                ...State,
                error: false,
                searchResults: []
            });
        } else {
            try {
                const response = await fetch(OMDB_URL + "&s=" + searchString);
                if (response.ok) {
                    const data = await response.json();
                    if (data.Response === "True") {
                        setState({
                            ...State,
                            searchResults: data.Search,
                            error: false
                        })
                        // this.setState({ searchResults: data.Search, error: false });
                    } else {
                        setState({
                            ...State,
                            error: true
                        });
                        // this.setState({ error: true });
                    }
                } else {

                    setState({
                        ...State,
                        error: true
                    });
                    // this.setState({ error: true });
                    console.log("an error occurred");
                }
            } catch (error) {
                setState({
                    ...State,
                    error: true
                });
                // this.setState({ error: true });
                console.log(error);
            }
        }
    };


    return (
        
    <div>
        
        <MyNavbar showSearchResult={this.showSearchResult} /> 
        <Container fluid className="px-4" >
            <div className="d-flex justify-content-between" >
                <div className="d-flex" >
    <BrowserRouter>
                    <Routes>
                        <Route path="/TvShows" element= {<h2 className="mb-4"> TV Shows </h2> }/>
                     </Routes>
        </BrowserRouter>
                    <div className="ml-4 mt-1" >
                        <Dropdown>
                            <Dropdown.Toggle 
                                style={{ backgroundColor: "#221f1f" }}
                                id="dropdownMenuButton"
                                className="btn-secondary btn-sm dropdown-toggle rounded-0">
                                    Genres 
                            </Dropdown.Toggle> 
                            <Dropdown.Menu bg="dark">
                                <Dropdown.Item href="#/action-1" > Comedy </Dropdown.Item> 
                                <Dropdown.Item href="#/action-2" > Drama </Dropdown.Item> 
                                <Dropdown.Item href="#/action-3" > Thriller </Dropdown.Item> 
                            </Dropdown.Menu > 
                        </Dropdown> 
                    </div> 
               
                        <div>
                            <i className="fa fa-th-large icons" > </i> 
                            <i className="fa fa-th icons" > </i> 
                        </div>
                </div> 
             {State.error && (
                                    <Alert variant="danger" className="text-center" >
                                        An error has occurred, please try again!
                                    </Alert>
                             )
            }
                    {State.searchResults ? searchResults.length > 0 && 
                                (   <MovieList title="Search results" movies={State.searchResults}/>
                                )
                    } 
                    {!State.error && !State.searchResults ? searchResults.length > 0 && 
                                (
                        <>
                               <MovieList title="Harry Potter" loading={this.state.loading} movies={this.state.gallery1.slice(0, 6)} /> 
                               <MovieList title="The Avengers" loading={this.state.loading} movies={this.state.gallery2.slice(0, 6)} /> 
                               <MovieList title="Star Wars" loading={this.state.loading} movies={this.state.gallery3.slice(0, 6)}/> 
                        </>
                                )
                    } 
                <MyFooter />
                    </div>                                                            
        </Container> 

</div >
    );


}

    export default App;