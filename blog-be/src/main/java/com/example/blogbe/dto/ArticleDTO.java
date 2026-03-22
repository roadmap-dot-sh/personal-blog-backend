/*
 * ArticleDTO.java
 *
 * Copyright (c) 2025 Nguyen. All rights reserved.
 * This software is the confidential and proprietary information of Nguyen.
 */

package com.example.blogbe.dto;

import com.fasterxml.jackson.annotation.JsonFormat;
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

    @JsonFormat(pattern = "yyyy-MM-dd")
    private LocalDate publishDate;

    @JsonFormat(pattern = "yyyy-MM-dd")
    private LocalDate createdAt;
}
