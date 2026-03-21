/*
 * ArticleRepository.java
 *
 * Copyright (c) 2025 Nguyen. All rights reserved.
 * This software is the confidential and proprietary information of Nguyen.
 */

package com.example.blogbe.repository;

import com.example.blogbe.model.Article;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.util.List;

/**
 * ArticleRepository.java
 *
 * @author Nguyen
 */
@Repository
public interface ArticleRepository extends JpaRepository<Article, String> {
    List<Article> findAllByOrderByPublishDateDesc();

    Page<Article> findAllByOrderByPublishDateDesc(Pageable pageable);

    @Query("SELECT a FROM Article a WHERE a.title LIKE %:keyword% OR a.content LIKE %:keyword% ORDER BY a.publishDate DESC")
    List<Article> findByTitleContainingOrContentContainingOrderByPublishDateDesc(@Param("keyword") String titleKeyword, @Param("keyword") String contentKeyword);

    List<Article> findByPublishDateBetweenOrderByPublishDateDesc(LocalDate startDate, LocalDate endDate);

    @Query("SELECT a FROM Article a WHERE YEAR(a.publishDate) = :year ORDER BY a.publishDate DESC")
    List<Article> findByYear(@Param("year") int year);

    @Query("SELECT a FROM Article a WHERE MONTH(a.publishDate) = :month ORDER BY a.publishDate DESC")
    List<Article> findByMonth(@Param("month") int month);

    long countByPublishDateAfter(LocalDate date);
}
