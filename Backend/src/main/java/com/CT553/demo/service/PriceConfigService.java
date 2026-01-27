package com.CT553.demo.service;

import com.CT553.demo.dto.request.PriceConfigRequest;
import com.CT553.demo.dto.response.PriceConfigResponse;
import com.CT553.demo.entity.PriceConfig;
import com.CT553.demo.exception.ApiException;
import com.CT553.demo.mapper.PriceConfigMapper;
import com.CT553.demo.repository.PriceConfigRepsitory;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;

import java.util.List;

import static org.springframework.http.HttpStatus.BAD_REQUEST;

@Service
@RequiredArgsConstructor
public class PriceConfigService {
    private final PriceConfigRepsitory priceConfigRepsitory;
    private final PriceConfigMapper priceConfigMapper;

    public PriceConfigResponse createPrice(PriceConfigRequest request) {
        PriceConfig priceConfig = priceConfigMapper.toEntity(request);

        return priceConfigMapper.toResponse(priceConfigRepsitory.save(priceConfig));
    }

    public List<PriceConfigResponse> getAllPriceByTypeId(Long typeId) {
        List<PriceConfig> priceConfigs = priceConfigRepsitory.findByTypeCourtId(typeId);

        return priceConfigMapper.toResponse(priceConfigs);
    }

    public PriceConfigResponse updatePrice(Long id, PriceConfigRequest request) {
        PriceConfig priceConfig = priceConfigRepsitory.findById(id)
                .orElseThrow(() -> new ApiException(BAD_REQUEST,"price not found"));

        priceConfigMapper.updateEntityFromRequest(request, priceConfig);
        return priceConfigMapper.toResponse(priceConfigRepsitory.save(priceConfig));
    }

    public void delete(Long id) {
        priceConfigRepsitory.deleteById(id);
    }

}
