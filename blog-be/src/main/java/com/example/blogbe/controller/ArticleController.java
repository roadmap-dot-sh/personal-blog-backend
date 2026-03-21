/*
 * ArticleController.java
 *
 * Copyright (c) 2025 Nguyen. All rights reserved.
 * This software is the confidential and proprietary information of Nguyen.
 */

package com.example.blogbe.controller;

import com.example.blogbe.dto.ApiResponse;
import com.example.blogbe.dto.ArticleResponse;
import com.example.blogbe.dto.PageResponse;
import com.example.blogbe.service.ArticleService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

/**
 * ArticleController.java
 *
 * @author Nguyen
 */
@RestController
@RequestMapping("/api/articles")
@CrossOrigin(origins = "http://localhost:3000")
public class ArticleController {
    @Autowired
    private ArticleService articleService;

    @GetMapping
    public ResponseEntity<ApiResponse<List<ArticleResponse>>> getAllArticles() {
        List<ArticleResponse> articles = articleService.getAllArticles();
        return ResponseEntity.ok(ApiResponse.success(articles));
    }

    @GetMapping("/paginated")
    public ResponseEntity<ApiResponse<PageResponse<ArticleResponse>>> getArticlesPaginated(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size,
            @RequestParam(defaultValue = "publishDate") String sortBy,
            @RequestParam(defaultValue = "desc") String direction
    ) {
        Sort.Direction sortDirection = direction.equalsIgnoreCase("desc")
                ? Sort.Direction.DESC : Sort.Direction.ASC;
        Pageable pageable = PageRequest.of(page, size, Sort.by(sortDirection, sortBy));

        Page<ArticleResponse> articlePage = articleService.getAllArticlesPaginated(pageable);

        PageResponse<ArticleResponse> pageResponse = PageResponse.<ArticleResponse>builder()
                .content(articlePage.getContent())
                .pageNumber(articlePage.getNumber())
                .pageSize(articlePage.getSize())
                .totalElements(articlePage.getTotalElements())
                .totalPages(articlePage.getTotalPages())
                .first(articlePage.isFirst())
                .last(articlePage.isLast())
                .build();
        return ResponseEntity.ok(ApiResponse.success(pageResponse));
    }

    @GetMapping("/{id}")
    public ResponseEntity<ApiResponse<ArticleResponse>> getArticleById(@PathVariable String id) {
        ArticleResponse article = articleService.getArticleById(id);
        return ResponseEntity.ok(ApiResponse.success(article));
    }

}
