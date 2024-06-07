import axios from "axios";
import { useEffect, useReducer, useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import { Link } from "react-router-dom";

const reducer = (state, action) => {
    switch (action.type) {
        case 'FETCH_REQUEST':
            return { ...state, loading: true };
        case 'FETCH_SUCCESS':
            return { ...state, loading: false, data: action.payload };
        case 'FETCH_FAILED':
            return { ...state, loading: false, error: action.payload };
        default:
            return state;
    }
}

function HomeScreen() {

    const [{ data }, dispatch] = useReducer((reducer), {
        loading: true,
        error: '',
        data: []
    })

    const [quote, setQuote] = useState("");
    const [author, setAuthor] = useState("");
    const [id, setId] = useState();

    const newQuote = async () => {
        const res = await axios.get("https://techplement-backend.vercel.app/api/get-quote");
        if (res.status === 200) {
            setId(res.data._id);
            setQuote(res.data.quote);
            setAuthor(res.data.author);
        }
    }

    const getAllAuthors = async () => {
        dispatch({ type: 'FETCH_REQUEST' });
        try {
            const res = await axios.get("https://techplement-backend.vercel.app/api/get-all-authors");
            dispatch({ type: 'FETCH_SUCCESS', payload: res.data });
        } catch (error) {
            dispatch({ type: 'FETCH_FAILED', payload: console.log(error) });
        }
    }

    useEffect(() => {
        getAllAuthors();
        newQuote();
    }, []);

    const handleDelete = async (id) => {
        try {
            const res = await fetch(`https://techplement-backend.vercel.app/api/delete-quote/${id}`, {
                method: "DELETE",
            })

            if (res.status === 201) {
                window.alert("Quote Deleted Successfully.");
                window.location.reload();
            } else if (res.status === 401) {
                window.alert("Quote Delete unsuccessful.");
            } else if (res.status === 405) {
                window.alert("Quote not found.");
            } else {
                window.alert("Unknown error")
            }
        } catch (err) {
            console.log(err);
        }
    }

    return (
        <Container>
            <div className="inner">
                <Row>
                    <Col md={8}>
                        <h1 className="text-white">Quote Book : </h1>
                    </Col>
                    <Col>
                        <Link className="dropdown-toggle" id="drp" data-bs-toggle="dropdown">Author Name</Link>
                        <ul className="dropdown-menu" aria-labelledby="drp">
                            {
                                data.map((data) => (
                                    <li><Link className="dropdown-item" to={`/search?author=${data}`}>{data}</Link></li>
                                ))
                            }
                        </ul>
                    </Col>
                </Row>
                <div className="box">
                    <div className="text">
                        <i className="start-quote fas fa-quote-left"></i>
                        <p id="quotes" className="quote">{quote}</p>
                        <p id="author" className="author">~ {author}</p>
                    </div>
                    <button onClick={newQuote} className="button" id="newQ">New Quotes</button>
                </div>
                <Row>
                    <Link to="/create" className="col-md-4">Create</Link>
                    <Link to={`/update/${id}`} className="col-md-4">Update</Link>
                    <button onClick={() => handleDelete(id)} className="col-md-4">Delete</button>
                </Row>
            </div>
        </Container>
    )
}

export default HomeScreen;