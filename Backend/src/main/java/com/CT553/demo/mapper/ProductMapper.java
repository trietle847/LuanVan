package com.CT553.demo.mapper;

import com.CT553.demo.dto.request.ProductRequest;
import com.CT553.demo.dto.response.ProductResponse;
import com.CT553.demo.entity.Product;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.MappingTarget;

@Mapper(componentModel = "spring")
public interface ProductMapper {
    @Mapping(source = "serviceId", target = "service.id")
    Product toEntity(ProductRequest request);

    @Mapping(source = "service.id", target = "serviceId")
    ProductResponse toResponse(Product product);

    @Mapping(source = "serviceId", target = "service.id")
    void updateEntityFromRequest(ProductRequest request, @MappingTarget Product entity);
}