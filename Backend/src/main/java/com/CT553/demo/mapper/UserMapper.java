package com.CT553.demo.mapper;

import com.CT553.demo.dto.request.UserRequest;
import com.CT553.demo.dto.response.UserResponse;
import com.CT553.demo.entity.User;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.MappingTarget;
import org.mapstruct.NullValuePropertyMappingStrategy;

@Mapper(componentModel = "spring", nullValuePropertyMappingStrategy = NullValuePropertyMappingStrategy.IGNORE)
public interface UserMapper {

    @Mapping(target = "id", ignore = true)
    User toEntity(UserRequest request);

    UserResponse toResponse(User user);

    @Mapping(target = "id", ignore = true)
    void updateUser(@MappingTarget User user, UserRequest request);
}