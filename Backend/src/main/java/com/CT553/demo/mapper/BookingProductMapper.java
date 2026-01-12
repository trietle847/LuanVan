package com.CT553.demo.mapper;

import com.CT553.demo.dto.request.BookingProductRequest;
import com.CT553.demo.dto.request.CourtRequest;
import com.CT553.demo.dto.response.BookingProductResponse;
import com.CT553.demo.dto.response.CourtResponse;
import com.CT553.demo.entity.BookingProduct;
import com.CT553.demo.entity.Court;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.MappingTarget;

@Mapper(componentModel = "spring")
public interface BookingProductMapper {

    @Mapping(target = "id", ignore = true)
    @Mapping(target = "bookingDetail", ignore = true)
    @Mapping(target = "product", ignore = true)
    BookingProduct toEntity(BookingProductRequest request);

    @Mapping(source = "product.id", target = "productId")
    BookingProductResponse toResponse(BookingProduct bookingProduct);

    @Mapping(target = "id", ignore = true)
    @Mapping(source = "productId", target = "product.id")
//    @Mapping(source = "bookingDetailId", target = "bookingDetail.id")
    void updateEntityFromRequest(BookingProductRequest request, @MappingTarget BookingProduct entity);
}
