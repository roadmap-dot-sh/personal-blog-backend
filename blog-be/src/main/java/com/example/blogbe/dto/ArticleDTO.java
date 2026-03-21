/*
 * ArticleDTO.java
 *
 * Copyright (c) 2025 Nguyen. All rights reserved.
 * This software is the confidential and proprietary information of Nguyen.
 */

package com.example.blogbe.dto;

import lombok.Data;

import java.time.LocalDate;

/**
 * ArticleDTO.java
 *
 * @author Nguyen
 */
@Data
public class ArticleDTO {
    private String id;
    private String title;
    private String content;
    private LocalDate publishDate;
    private LocalDate createdAt;
}
