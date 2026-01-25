package com.CT553.demo.mapper;

import com.CT553.demo.dto.response.ImageResponse;
import com.CT553.demo.entity.Image;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

import java.util.List;

@Mapper(componentModel = "spring")
public interface ImageMapper {

    @Mapping(source = "court.id", target = "courtId")
    ImageResponse toResponse(Image image);

    List<ImageResponse> toResponse(List<Image> images);
}
