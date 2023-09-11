import { useEffect, useRef, useState} from "react";
import api from '../../api/axiosConfig';
import { useParams } from "react-router-dom";
import { Container, Row, Col } from "react-bootstrap";
import ReviewForm from "../reviewForm/ReviewForm";

const Reviews = ({ getMovieData, movie}) => {
    const revText = useRef();
    const params = useParams();
    const movieId = params.movieId;
    const [reviews, setReviews] = useState([]);

    useEffect(() => {
        // Fetch reviews for the movie using IMDb ID
        const fetchReviews = async () => {
            try {
                const response = await api.get(`/api/v1/movies/reviews/${movieId}`);
                setReviews(response.data);
            } catch (err) {
                console.error(err);
            }
        };

        fetchReviews(); // Call the fetchReviews function when the component mounts
    }, [movieId]);

    useEffect(() => {
        getMovieData(movieId);
    }, [movieId]);

    const addReview = async (e) => {
        e.preventDefault();

        const rev = revText.current;

        try {
            const response = await api.post('/api/v1/reviews', { reviewBody: rev.value, imdbId: movieId });

            const updatedReviews = [...(reviews || []), { body: rev.value }]; // Ensure reviews is an array

            rev.value = '';

            setReviews(updatedReviews);
        } catch (err) {
            console.error(err);
        }
    }

    return (
        <Container>
            <Row>
                <Col><h3>Reviews</h3></Col>
            </Row>
            <Row className='mt-2'>
                <Col>
                    <img src={movie?.poster} alt='' />
                </Col>
                <Col>
                    <>
                        <Row>
                            <Col>
                                <ReviewForm handleSubmit={addReview} revText={revText} labelText='Write a Review?' />
                            </Col>
                        </Row>
                        <Row>
                            <Col>
                                <hr />
                            </Col>
                        </Row>
                    </>
                    {reviews && reviews.length > 0 ? (
                        reviews.map((r, index) => (
                            <div key={index}>
                                <Row>
                                    <Col>{r.body}</Col>
                                </Row>
                                <Row>
                                    <Col>
                                        <hr />
                                    </Col>
                                </Row>
                            </div>
                        ))
                    ) : (
                        <p>No reviews available.</p>
                    )}
                </Col>
            </Row>
            <Row>
                <Col>
                    <hr />
                </Col>
            </Row>
        </Container>
    )
}

export default Reviews;
