package com.CT553.demo.mapper;

import com.CT553.demo.dto.request.TypeCourtRequest;
import com.CT553.demo.dto.response.TypeCourtResponse;
import com.CT553.demo.entity.TypeCourt;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.MappingTarget;

@Mapper(componentModel = "spring")
public interface TypeCourtMapper {
    TypeCourt toEntity(TypeCourtRequest request);

    TypeCourtResponse toResponse(TypeCourt typeCourt);

    @Mapping(target = "id", ignore = true)
    void updateEntityFromRequest(TypeCourtRequest request, @MappingTarget TypeCourt entity);
}
