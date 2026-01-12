package com.CT553.demo.mapper;

import com.CT553.demo.dto.request.CategoryServiceRequest;
import com.CT553.demo.dto.response.CategoryServiceResponse;
import com.CT553.demo.entity.CategoryService;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.MappingTarget;

@Mapper(componentModel = "spring")
public interface CategoryServiceMapper {
    @Mapping(source = "sportCenterId", target = "sportCenter.id")
    CategoryService toEntity(CategoryServiceRequest request);

    @Mapping(source = "sportCenter.id", target = "sportCenterId")
    CategoryServiceResponse toResponse(CategoryService categoryService);

    @Mapping(source = "sportCenterId", target = "sportCenter.id")
    void updateEntityFromRequest(CategoryServiceRequest request, @MappingTarget CategoryService entity);
}
