/*
 * ArticleService.java
 *
 * Copyright (c) 2025 Nguyen. All rights reserved.
 * This software is the confidential and proprietary information of Nguyen.
 */

package com.example.blogbe.service;

import com.example.blogbe.dto.ArticleDTO;
import com.example.blogbe.dto.ArticleRequest;
import com.example.blogbe.dto.ArticleResponse;
import com.example.blogbe.exception.ResourceNotFoundException;
import com.example.blogbe.mapper.ArticleMapper;
import com.example.blogbe.model.Article;
import com.example.blogbe.repository.ArticleRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.util.Date;
import java.util.List;

/**
 * ArticleService.java
 *
 * @author Nguyen
 */
@Service
@Transactional
public class ArticleService {
    @Autowired
    private ArticleRepository articleRepository;

    @Autowired
    private ArticleMapper articleMapper;

    public List<ArticleResponse> getAllArticles() {
        List<Article> articles = articleRepository.findAllByOrderByPublishDateDesc();
        return articleMapper.toResponseList(articles);
    }

    public Page<ArticleResponse> getAllArticlesPaginated(Pageable pageable) {
        Page<Article> articles = articleRepository.findAllByOrderByPublishDateDesc(pageable);
        return articles.map(articleMapper::toResponse);
    }

    public ArticleResponse getArticleById(String id) {
        Article article = articleRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Article not found with id: " + id));
        return articleMapper.toResponse(article);
    }

    public ArticleDTO getArticleDtoById(String id) {
        Article article = articleRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Article not found with id: " + id));
        return articleMapper.toDto(article);
    }

    public ArticleResponse createArticle(ArticleRequest request) {
        Article article = articleMapper.toEntity(request);

        if (article.getPublishDate() == null) {
            article.setPublishDate(LocalDate.now());
        }

        Article saveArticle = articleRepository.save(article);
        return articleMapper.toResponse(saveArticle);
    }

    public ArticleResponse updateArticle(String id, ArticleRequest request) {
        Article article = articleRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Article not found with id: " + id));

        articleMapper.updateEntityFromRequest(request, article);
        Article updatedArticle = articleRepository.save(article);
        return articleMapper.toResponse(updatedArticle);
    }

    public void deleteArticle(String id) {
        if (!articleRepository.existsById(id)) {
            throw new ResourceNotFoundException("Article not found with id: " + id);
        }
        articleRepository.deleteById(id);
    }

    public List<ArticleResponse> searchArticles(String keyword) {
        List<Article> articles = articleRepository.findByTitleContainingOrContentContainingOrderByPublishDateDesc(keyword, keyword);
        return articleMapper.toResponseList(articles);
    }

    public List<ArticleResponse> getArticlesByDateRange(LocalDate startDate, LocalDate endDate) {
        List<Article> articles = articleRepository.findByPublishDateBetweenOrderByPublishDateDesc(startDate, endDate);
        return articleMapper.toResponseList(articles);
    }

    public long getTotalArticleCount() {
        return articleRepository.count();
    }
}
