package com.CT553.demo.mapper;

import com.CT553.demo.dto.response.BookingResponse;
import com.CT553.demo.entity.Booking;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

@Mapper(componentModel = "spring" ,uses = {BookingDetailMapper.class})
public interface BookingMapper {
    @Mapping(source = "user.id", target = "userId")
    BookingResponse toResponse(Booking entity);
}
