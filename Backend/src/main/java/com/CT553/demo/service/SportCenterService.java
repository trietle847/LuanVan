package com.CT553.demo.service;

import com.CT553.demo.dto.request.SportCenterRequest;
import com.CT553.demo.dto.response.SportCenterResponse;
import com.CT553.demo.entity.SportCenter;
import com.CT553.demo.entity.User;
import com.CT553.demo.exception.ApiException;
import com.CT553.demo.mapper.SportCenterMapper;
import com.CT553.demo.repository.SportCenterRepository;
import com.CT553.demo.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.context.SecurityContextHolderStrategy;
import org.springframework.stereotype.Service;
import org.springframework.security.core.context.SecurityContextHolder;

import java.util.List;

import static org.springframework.http.HttpStatus.BAD_REQUEST;

@Service
@RequiredArgsConstructor
public class SportCenterService {
    private final SportCenterRepository sportCenterRepository;
    private final SportCenterMapper sportCenterMapper;
    private final UserRepository userRepository;

//    tạo sportCenter
    public SportCenterResponse createSportCenter(SportCenterRequest request) {
        String username = SecurityContextHolder
                .getContext()
                .getAuthentication()
                .getName();

        User user = userRepository.findByUsername(username)
                .orElseThrow(() ->
                        new RuntimeException("not found user")
                );

        SportCenter sportCenter = sportCenterMapper.toEntity(request);

        sportCenter.setUser(user);

        return sportCenterMapper.toResponse(sportCenterRepository.save(sportCenter));
    }

//    láy tất cả sportCenter
    public List<SportCenterResponse> getSportCenter() {
        return sportCenterRepository.findAll()
                .stream()
                .map(sportCenterMapper::toResponse)
                .toList();
    }

//    lấy dánh sách các sport theo user
    public List<SportCenterResponse> getSportCenterByUser() {
        String username = SecurityContextHolder
                .getContext()
                .getAuthentication()
                .getName();

        User user = userRepository.findByUsername(username)
                .orElseThrow(() ->
                        new RuntimeException("Invalid username or password")
        );

        List<SportCenter> sportCenters = sportCenterRepository.findByUser(user);

        return sportCenters
                .stream()
                .map(sportCenterMapper::toResponse)
                .toList();
    }

    public SportCenterResponse updateSportCenter(Long id, SportCenterRequest request) {
        SportCenter sportCenter = sportCenterRepository.findById(id)
                .orElseThrow(() -> new ApiException(BAD_REQUEST,"sport center not found"));

        sportCenterMapper.updateEntityFromRequest(request, sportCenter);
        return sportCenterMapper.toResponse(sportCenterRepository.save(sportCenter));
    }

    public SportCenterResponse getSportCenterById(Long id){
        return sportCenterRepository.findById(id)
                .map(sportCenterMapper::toResponse)
                .orElseThrow(() -> new ApiException(BAD_REQUEST,"sport center not found"));
    }

    public void delete(Long id) {
        sportCenterRepository.deleteById(id);
    }
}
