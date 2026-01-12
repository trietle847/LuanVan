package com.CT553.demo.mapper;

import com.CT553.demo.dto.request.TimeSlotRequest;
import com.CT553.demo.dto.response.TimeSlotResponse;
import com.CT553.demo.entity.TimeSlot;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.MappingTarget;

@Mapper(componentModel = "spring")
public interface TimeSlotMapper {
    @Mapping(source = "courtId", target = "court.id")
    TimeSlot toEntity(TimeSlotRequest request);

    @Mapping(source = "court.id", target = "courtId")
    TimeSlotResponse toResponse(TimeSlot timeSlot);

    @Mapping(target = "id", ignore = true)
    @Mapping(source = "courtId", target = "court.id")
    void updateEntityFromRequest(TimeSlotRequest request, @MappingTarget TimeSlot entity);
}
