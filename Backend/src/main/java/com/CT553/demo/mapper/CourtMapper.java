package com.CT553.demo.mapper;

import com.CT553.demo.dto.request.CourtRequest;
import com.CT553.demo.dto.request.CourtUpdateRequest;
import com.CT553.demo.dto.response.CourtResponse;
import com.CT553.demo.entity.Court;
import org.mapstruct.*;

@Mapper(componentModel = "spring",uses = ImageMapper.class, nullValuePropertyMappingStrategy = NullValuePropertyMappingStrategy.IGNORE)
public interface CourtMapper {
    @Mapping(source = "sportCenterId", target = "sportCenter.id")
    @Mapping(source = "typeCourtId", target = "typeCourt.id")
    Court toEntity(CourtRequest request);

//    @Mapping(source = "sportCenter.name", target = "sportCenterName")
    @Mapping(source = "typeCourt.name", target = "nameTypeCourt")
    @Mapping(source = "sportCenter.id", target = "sportCenterId")
    @Mapping(source = "typeCourt.id", target = "typeCourtId")
    CourtResponse toResponse(Court court);

    @Mapping(target = "id", ignore = true)
    void updateEntityFromRequest(CourtUpdateRequest request, @MappingTarget Court entity);
}
