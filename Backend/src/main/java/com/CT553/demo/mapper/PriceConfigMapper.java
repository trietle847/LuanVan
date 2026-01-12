package com.CT553.demo.mapper;

import com.CT553.demo.dto.request.PriceConfigRequest;
import com.CT553.demo.dto.response.PriceConfigResponse;
import com.CT553.demo.entity.PriceConfig;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.MappingTarget;

import java.util.ArrayList;
import java.util.List;

@Mapper(componentModel = "spring")
public interface PriceConfigMapper {
    @Mapping(target = "days", expression = "java(toBitmask(request.getDays()))")
    @Mapping(source = "typeCourtId", target = "typeCourt.id")
    PriceConfig toEntity(PriceConfigRequest request);

    @Mapping(target = "days", expression = "java(fromBitmask(priceConfig.getDays()))")
    @Mapping(source = "typeCourt.id", target = "typeCourtId")
    PriceConfigResponse toResponse(PriceConfig priceConfig);

    List<PriceConfigResponse> toResponse(List<PriceConfig> priceConfigs);


    @Mapping(target = "id", ignore = true)
    @Mapping(target = "days", expression = "java(toBitmask(request.getDays()))")
    @Mapping(source = "typeCourtId", target = "typeCourt.id")
    void updateEntityFromRequest(PriceConfigRequest request, @MappingTarget PriceConfig entity);

    default Integer toBitmask(List<Integer> days) {
        if(days == null  || days.isEmpty()) {
            return 0;
        }

        return days.stream().reduce(0, Integer::sum);
    }

    default List<Integer> fromBitmask(Integer mask) {
        List<Integer> result = new ArrayList<>();
        if (mask == null) return result;

        for (int i = 0; i < 7; i++) {
            int bit = 1 << i;
            if ((mask & bit) != 0) {
                result.add(bit);
            }
        }
        return result;
    }

//    bitmask
//    t2 -> 1, t3 -> 2, t4 -> 4, t5 -> 8, t6 -> 16, t7 -> 32, cn -> 64
}
