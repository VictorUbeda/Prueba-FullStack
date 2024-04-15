package com.prueba.app.controller;

import org.springframework.cache.annotation.Cacheable;
import org.springframework.http.*;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.reactive.function.client.WebClient;
import reactor.core.publisher.Mono;

import java.util.Collections;

@RestController
@RequestMapping("/api/movies")
public class MovieController {

    private static final String API_URL = "https://api.themoviedb.org/3/search/movie";
    private static final String API_KEY = "86de72af62258d5e1e5c97cf75bf340c";

    private final WebClient webClient;

    public MovieController(WebClient.Builder webClientBuilder) {
        this.webClient = webClientBuilder.baseUrl(API_URL)
                .defaultHeader(HttpHeaders.CONTENT_TYPE, MediaType.APPLICATION_JSON_VALUE)
                .defaultUriVariables(Collections.singletonMap("url", API_URL))
                .build();
    }


    @GetMapping("/{name}")
    @Cacheable("movies")
    public Mono<String> getMoviebyName(@PathVariable String name) {
        return this.webClient.get()
                .uri(uriBuilder -> uriBuilder.queryParam("api_key", API_KEY)
                        .queryParam("query", name)
                        .build())
                .retrieve()
                .bodyToMono(String.class);
    }
}