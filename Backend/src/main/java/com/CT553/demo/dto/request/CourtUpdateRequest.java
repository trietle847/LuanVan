package com.CT553.demo.dto.request;

import lombok.Data;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@Data
public class CourtUpdateRequest {
    private String name;
    private String description;
    private Long sportCenterId;
    private Long typeCourtId;
    private List<MultipartFile> newImage;
    private List<Long> deleteImageIds;
}
