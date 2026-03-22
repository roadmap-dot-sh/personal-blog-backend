/*
 * ArticleRequest.java
 *
 * Copyright (c) 2025 Nguyen. All rights reserved.
 * This software is the confidential and proprietary information of Nguyen.
 */

package com.example.blogbe.dto;

import com.fasterxml.jackson.annotation.JsonFormat;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.Data;

import java.time.LocalDate;

/**
 * ArticleRequest.java
 *
 * @author Nguyen
 */
@Data
public class ArticleRequest {
    @NotBlank(message = "Title is required")
    @Size(min = 3, max = 200, message = "Title must be between 3 and 200 characters")
    private String title;

    @NotBlank(message = "Content is required")
    @Size(min = 10, message = "Content must be at least 10 characters")
    private String content;

    @NotNull(message = "Publishing date is required")
    @JsonFormat(pattern = "yyyy-MM-dd")
    private LocalDate publishDate;
}
