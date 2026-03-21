/*
 * AdminController.java
 *
 * Copyright (c) 2025 Nguyen. All rights reserved.
 * This software is the confidential and proprietary information of Nguyen.
 */

package com.example.blogbe.controller;

import com.example.blogbe.dto.ApiResponse;
import com.example.blogbe.dto.ArticleRequest;
import com.example.blogbe.dto.ArticleResponse;
import com.example.blogbe.service.ArticleService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

/**
 * AdminController.java
 *
 * @author Nguyen
 */
@RestController
@RequestMapping("/api/admin")
@CrossOrigin(origins = "http://localhost:3000")
public class AdminController {
    @Autowired
    private ArticleService articleService;

    @PostMapping("/articles")
    public ResponseEntity<ApiResponse<ArticleResponse>> createArticle(
            @Valid @RequestBody ArticleRequest request
    ) {
        ArticleResponse createdArticle = articleService.createArticle(request);
        return new ResponseEntity<>(ApiResponse.success("Article created successfully", createdArticle), HttpStatus.CREATED);
    }

    @PutMapping("/articles/{id}")
    public ResponseEntity<ApiResponse<ArticleResponse>> updateArticle(
            @PathVariable String id,
            @Valid @RequestBody ArticleRequest request) {
        ArticleResponse updatedArticle = articleService.updateArticle(id, request);
        return new ResponseEntity<>(ApiResponse.success("Article updated successfully", updatedArticle), HttpStatus.OK);
    }

    @DeleteMapping("/articles/{id}")
    public ResponseEntity<ApiResponse<Void>> deleteArticle(@PathVariable String id) {
        articleService.deleteArticle(id);
        return ResponseEntity.ok(ApiResponse.success("Article deleted successfully", null));
    }

    @GetMapping("/search")
    public ResponseEntity<ApiResponse<List<ArticleResponse>>> searchArticles(@RequestParam String keyword) {
        List<ArticleResponse> articles = articleService.searchArticles(keyword);
        return ResponseEntity.ok(ApiResponse.success(articles));
    }

    @GetMapping("/date-range")
    public ResponseEntity<ApiResponse<List<ArticleResponse>>> getArticlesByDateRange(
            @RequestParam @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate startDate,
            @RequestParam @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate endDate
    ) {
        List<ArticleResponse> articles = articleService.getArticlesByDateRange(startDate, endDate);
        return ResponseEntity.ok(ApiResponse.success(articles));
    }

    @GetMapping("/stats")
    public ResponseEntity<ApiResponse<Map<String, Object>>> getArticleStats() {
        Map<String, Object> stats = new HashMap<>();
        stats.put("totalArticles", articleService.getTotalArticleCount());
        stats.put("articlesThisMonth", articleService.getArticlesByDateRange(
                LocalDate.now().withDayOfMonth(1), LocalDate.now()).size());
        return ResponseEntity.ok(ApiResponse.success(stats));
    }
}
