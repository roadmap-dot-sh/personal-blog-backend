/*
 * Article.java
 *
 * Copyright (c) 2025 Nguyen. All rights reserved.
 * This software is the confidential and proprietary information of Nguyen.
 */

package com.example.blogbe.model;

import com.fasterxml.jackson.annotation.JsonFormat;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;

/**
 * Article.java
 *
 * @author Nguyen
 */
@Entity
@Table(name = "article")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Article {
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private String id;

    @Column(nullable = false)
    private String title;

    @Column(nullable = false, columnDefinition = "TEXT")
    private String content;

    @Column(name = "publishing_date", nullable = false)
    @JsonFormat(pattern = "yyyy-MM-dd")
    private LocalDate publishDate;

    @Column(name = "created_at")
    @JsonFormat(pattern = "yyyy-MM-dd")
    private LocalDate createdAt;

    @PrePersist
    protected void onCreate() {
        if (createdAt == null) {
            createdAt = LocalDate.now();
        }
        if (publishDate == null) {
            publishDate = LocalDate.now();
        }
    }
}
