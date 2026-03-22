/*
 * ArticleResponse.java
 *
 * Copyright (c) 2025 Nguyen. All rights reserved.
 * This software is the confidential and proprietary information of Nguyen.
 */

package com.example.blogbe.dto;

import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;

/**
 * ArticleResponse.java
 *
 * @author Nguyen
 */
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class ArticleResponse {
    private String id;
    private String title;
    private String content;

    @JsonFormat(pattern = "yyyy-MM-dd")
    private LocalDate publishDate;

    @JsonFormat(pattern = "yyyy-MM-dd")
    private LocalDate createdAt;
    private String summary;
    private int wordCount;

    public String getSummary() {
        if (content != null && content.length() > 150) {
            return content.substring(0, 150) + "...";
        }
        return content;
    }

    public int getWordCount() {
        if (content != null) {
            return content.split("\\s+").length;
        }
        return 0;
    }
}
