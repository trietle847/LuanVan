package com.CT553.demo.service;

import com.CT553.demo.dto.request.CourtRequest;
import com.CT553.demo.dto.request.CourtUpdateRequest;
import com.CT553.demo.dto.response.CourtResponse;
import com.CT553.demo.dto.response.ProductResponse;
import com.CT553.demo.entity.Court;
import com.CT553.demo.entity.Image;
import com.CT553.demo.entity.TypeCourt;
import com.CT553.demo.exception.ApiException;
import com.CT553.demo.mapper.CourtMapper;
import com.CT553.demo.mapper.ImageMapper;
import com.CT553.demo.repository.CourtRepository;
import com.CT553.demo.repository.ImageRepository;
import com.CT553.demo.repository.TypeCourtRepository;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

import static org.springframework.http.HttpStatus.BAD_REQUEST;

@Service
@RequiredArgsConstructor
public class CourtService {
    private final CourtRepository courtRepsitory;
    private final TypeCourtRepository typeCourtRepository;
    private final CourtMapper courtMapper;
    private final ImageService imageService;
    private final ImageRepository imageRepository;
    private final ImageMapper imageMapper;

    @Transactional
    public CourtResponse createCourt(CourtRequest request) {
        Court court = courtMapper.toEntity(request);

        TypeCourt typeCourt = typeCourtRepository.findById(request.getTypeCourtId())
                .orElseThrow(() -> new ApiException(BAD_REQUEST, "Type court not found"));

        court.setTypeCourt(typeCourt);

        Court saveCourt = courtRepsitory.save(court);

        if (request.getImages() != null &&  !request.getImages().isEmpty()) {
            for (MultipartFile file : request.getImages()) {
                imageService.upload(file, saveCourt.getId());
            }
        }

        saveCourt = courtRepsitory.findById(saveCourt.getId()).orElseThrow();

        return courtMapper.toResponse(saveCourt);
    }

    public Page<CourtResponse> getAllProduct(
            Long typeCourtId,
            String keyword,
            Pageable pageable
    ) {
        return courtRepsitory.search(typeCourtId, keyword, pageable).map(courtMapper::toResponse);
    }
    @Transactional
    public CourtResponse updateCourt(Long id, CourtUpdateRequest request) {

        Court court = courtRepsitory.findById(id)
                .orElseThrow(() -> new ApiException(BAD_REQUEST, "court not found"));

        courtMapper.updateEntityFromRequest(request, court);

        if (request.getTypeCourtId() != null) {
            TypeCourt typeCourt = typeCourtRepository.findById(request.getTypeCourtId())
                    .orElseThrow(() -> new ApiException(BAD_REQUEST, "type court not found"));
            court.setTypeCourt(typeCourt);
        }

        if (request.getDeleteImageIds() != null && !request.getDeleteImageIds().isEmpty()) {
            court.getImages().removeIf(image -> {
                if (request.getDeleteImageIds().contains(image.getId())) {
                    imageService.delete(image.getPublicId());
                    return true;
                }
                return false;
            });
        }

        if (request.getNewImage() != null && !request.getNewImage().isEmpty()) {
            for (MultipartFile file : request.getNewImage()) {
                imageService.upload(file, court.getId());
            }
        }

        Court savedCourt = courtRepsitory.save(court);
        return courtMapper.toResponse(savedCourt);
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
