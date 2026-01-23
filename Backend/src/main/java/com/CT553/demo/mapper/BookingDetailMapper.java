package com.CT553.demo.mapper;

import com.CT553.demo.dto.request.BookingDetailRequest;
import com.CT553.demo.dto.response.BookingDetailResponse;
import com.CT553.demo.entity.BookingDetail;
import com.CT553.demo.entity.Court;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.MappingTarget;
import org.mapstruct.Named;

@Mapper(componentModel = "spring", uses = {BookingProductMapper.class})
public interface BookingDetailMapper {

    @Mapping(target = "id", ignore = true)
    @Mapping(target = "court", ignore = true)
    @Mapping(target = "user", ignore = true)
    @Mapping(target = "bookingProducts", ignore = true)
    BookingDetail toEntity(BookingDetailRequest request);

    @Mapping(source = "court.id", target = "courtId")
    @Mapping(source = "user.id", target = "userId")
    @Mapping(source = "bookingProducts", target = "products")
    @Mapping(source = "createAt", target = "createAt")
    @Mapping(source = "totalAmount", target = "totalAmount")
    @Mapping(source = "status", target = "status")
    BookingDetailResponse toResponse(BookingDetail entity);

    @Mapping(target = "id", ignore = true)
    @Mapping(target = "court", ignore = true)
    @Mapping(target = "user", ignore = true)
    @Mapping(target = "bookingProducts", ignore = true)
    void updateEntityFromRequest(BookingDetailRequest request, @MappingTarget BookingDetail entity);
}
