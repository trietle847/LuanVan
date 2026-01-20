package com.CT553.demo.mapper;

import com.CT553.demo.dto.request.ProductRequest;
import com.CT553.demo.dto.response.ProductResponse;
import com.CT553.demo.entity.Product;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.MappingTarget;

@Mapper(componentModel = "spring")
public interface ProductMapper {
    @Mapping(source = "categoryId", target = "category.id")
    Product toEntity(ProductRequest request);

    @Mapping(source = "category.id", target = "categoryId")
    ProductResponse toResponse(Product product);

    @Mapping(source = "categoryId", target = "category.id")
    void updateEntityFromRequest(ProductRequest request, @MappingTarget Product entity);
}