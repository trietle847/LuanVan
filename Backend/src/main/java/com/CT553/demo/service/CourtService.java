package com.CT553.demo.service;

import com.CT553.demo.dto.request.CourtRequest;
import com.CT553.demo.dto.response.CourtResponse;
import com.CT553.demo.entity.Court;
import com.CT553.demo.exception.ApiException;
import com.CT553.demo.mapper.CourtMapper;
import com.CT553.demo.repository.CourtRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

import static org.springframework.http.HttpStatus.BAD_REQUEST;

@Service
@RequiredArgsConstructor
public class CourtService {
    private final CourtRepository courtRepsitory;
    private final CourtMapper courtMapper;

    public CourtResponse createCourt(CourtRequest request) {

        Court court = courtMapper.toEntity(request);

        return courtMapper.toResponse(courtRepsitory.save(court));
    }

    public List<CourtResponse> getAllCourt() {
        return courtRepsitory.findAll()
                .stream()
                .map(courtMapper::toResponse)
                .toList();
    }

    public CourtResponse updateCourt(Long id, CourtRequest request) {
        Court court = courtRepsitory.findById(id)
                .orElseThrow(() -> new ApiException(BAD_REQUEST,"court not found"));

        courtMapper.updateEntityFromRequest(request, court);
        return courtMapper.toResponse(courtRepsitory.save(court));
    }

    public CourtResponse getCourtById(Long id) {
        return courtRepsitory
                .findById(id)
                .map(courtMapper::toResponse)
                .orElseThrow(() -> new ApiException(BAD_REQUEST,"court not found"));
    }

    public void delete(Long id){
        courtRepsitory.deleteById(id);
    }
}
