/*
 * ArticleMapper.java
 *
 * Copyright (c) 2025 Nguyen. All rights reserved.
 * This software is the confidential and proprietary information of Nguyen.
 */

package com.example.blogbe.mapper;

import com.example.blogbe.dto.ArticleDTO;
import com.example.blogbe.dto.ArticleRequest;
import com.example.blogbe.dto.ArticleResponse;
import com.example.blogbe.model.Article;
import org.springframework.stereotype.Component;

import java.util.List;
import java.util.stream.Collectors;

/**
 * ArticleMapper.java
 *
 * @author Nguyen
 */
@Component
public class ArticleMapper {
    public ArticleDTO toDto(Article article) {
        if (article == null) return null;

        ArticleDTO dto = new ArticleDTO();
        dto.setId(article.getId());
        dto.setTitle(article.getTitle());
        dto.setContent(article.getContent());
        dto.setPublishDate(article.getPublishDate());
        dto.setCreatedAt(article.getCreatedAt());

        return dto;
    }

    public Article toEntity(ArticleDTO dto) {
        if (dto == null) return null;

        Article article = new Article();
        article.setId(dto.getId());
        article.setTitle(dto.getTitle());
        article.setContent(dto.getContent());
        article.setPublishDate(dto.getPublishDate());
        article.setCreatedAt(dto.getCreatedAt());

        return article;
    }

    public Article toEntity(ArticleRequest request) {
        if (request == null) return null;

        Article article = new Article();
        article.setTitle(request.getTitle());
        article.setContent(request.getContent());
        article.setPublishDate(request.getPublishDate());

        return article;
    }

    public ArticleResponse toResponse(Article article) {
        if (article == null) return null;

        return ArticleResponse.builder()
                .id(article.getId())
                .title(article.getTitle())
                .content(article.getContent())
                .publishDate(article.getPublishDate())
                .createdAt(article.getCreatedAt())
                .build();
    }

    public List<ArticleDTO> toDtoList(List<Article> articles) {
        return articles.stream()
                .map(this::toDto)
                .collect(Collectors.toList());
    }

    public List<ArticleResponse> toResponseList(List<Article> articles) {
        return articles.stream()
                .map(this::toResponse)
                .collect(Collectors.toList());
    }

    public void updateEntityFromRequest(ArticleRequest request, Article article) {
        if (request == null || article == null) return;

        article.setTitle(request.getTitle());
        article.setContent(request.getContent());
        article.setPublishDate(request.getPublishDate());
    }
}
