package com.CT553.demo.service;

import com.CT553.demo.dto.request.TypeCourtRequest;
import com.CT553.demo.dto.response.TypeCourtResponse;
import com.CT553.demo.entity.TypeCourt;
import com.CT553.demo.exception.ApiException;
import com.CT553.demo.mapper.TypeCourtMapper;
import com.CT553.demo.repository.SportCenterRepository;
import com.CT553.demo.repository.TypeCourtRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

import static org.springframework.http.HttpStatus.BAD_REQUEST;

@Service
@RequiredArgsConstructor
public class TypeCourtService {
    private final TypeCourtMapper typeCourtMapper;
    private final TypeCourtRepository typeCourtRepository;
//    private final SportCenterRepository sportCenterRepository;

    public TypeCourtResponse createTypeCourt(TypeCourtRequest request) {
        TypeCourt typeCourt = typeCourtMapper.toEntity(request);

        return typeCourtMapper.toResponse(typeCourtRepository.save(typeCourt));
    }

    public TypeCourtResponse updateTypeCourt(Long id, TypeCourtRequest request) {
        TypeCourt typeCourt = typeCourtRepository.findById(id)
                .orElseThrow(() -> new ApiException(BAD_REQUEST,"type court not found"));

        typeCourtMapper.updateEntityFromRequest(request, typeCourt);
        return typeCourtMapper.toResponse(typeCourtRepository.save(typeCourt));
    }

    public List<TypeCourtResponse> getAllTypeCourt() {
        return typeCourtRepository.findAll().stream()
                .map(typeCourtMapper::toResponse)
                .toList();
    }

    public TypeCourtResponse getTypeCourtById(Long id) {
        return typeCourtRepository.findById(id)
                .map(typeCourtMapper::toResponse)
                .orElseThrow(() -> new ApiException(BAD_REQUEST,"type court not found"));
    }

    public void delete(Long id){
        typeCourtRepository.deleteById(id);
    }
}
