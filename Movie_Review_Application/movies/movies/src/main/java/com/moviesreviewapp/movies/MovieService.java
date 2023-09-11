package com.moviesreviewapp.movies;

import java.util.Collections;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class MovieService {

	@Autowired
	private MovieRepository movieRepository;

	public List<Movie> allMovies() {
		return movieRepository.findAll();
	}

	public Optional<Movie> singleMovie(String imdbId) {
		return movieRepository.findMovieByImdbId(imdbId);
	}

	public List<Review> getReviewsByImdbId(String imdbId) {
		Optional<Movie> movie = movieRepository.findMovieByImdbId(imdbId);
		return movie.map(Movie::getReviewIds).orElse(Collections.emptyList());
	}
}
