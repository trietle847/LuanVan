package com.CT553.demo.mapper;

import com.CT553.demo.dto.request.SportCenterRequest;
import com.CT553.demo.dto.response.SportCenterResponse;
import com.CT553.demo.entity.SportCenter;
import org.mapstruct.*;

@Mapper(componentModel = "spring")
public interface SportCenterMapper {
    @Mapping(source = "userId", target = "user.id")
    SportCenter toEntity(SportCenterRequest request);

    @Mapping(source = "user.id", target = "userId")
//    @Mapping(target = "courtIds", expression = "java(sportCenter.getCourts() != null ? sportCenter.getCourts().stream().map(c -> c.getId()).toList() : null)")
    SportCenterResponse toResponse(SportCenter sportCenter);

    @Mapping(target = "id", ignore = true)
    @Mapping(source = "userId", target = "user.id")
    void updateEntityFromRequest(SportCenterRequest request, @MappingTarget SportCenter entity);
}
