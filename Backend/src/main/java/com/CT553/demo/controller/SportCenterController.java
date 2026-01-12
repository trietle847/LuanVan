package com.CT553.demo.controller;

import com.CT553.demo.dto.request.SportCenterRequest;
import com.CT553.demo.dto.response.SportCenterResponse;
import com.CT553.demo.service.SportCenterService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/center")
public class SportCenterController {
    @Autowired
    private SportCenterService sportCenterService;

    @PostMapping
    @PreAuthorize("hasAnyRole('MANAGER','ADMIN')")
    public SportCenterResponse createCenterSport(@RequestBody SportCenterRequest request) {
        return sportCenterService.createSportCenter(request);
    }

    //    lấy danh sách các sportcentter
    @GetMapping
    public List<SportCenterResponse> getSportCenter() {
        return sportCenterService.getSportCenterByUser();
    }

    //    lấy danh sách sân theo user
    @GetMapping("/my")
    public List<SportCenterResponse> getSportCenterByUser() {
        return sportCenterService.getSportCenterByUser();
    }

    //    lấy sport center theo id
    @GetMapping("/{id}")
    public SportCenterResponse getSportCenterById(@PathVariable Long id) {
        return sportCenterService.getSportCenterById(id);
    }

    //    cập nhật
    @PutMapping("/{id}")
    public SportCenterResponse updateSportCenter(@PathVariable Long id, @RequestBody SportCenterRequest request) {
        return sportCenterService.updateSportCenter(id, request);
    }

//    xóa
    @DeleteMapping("/{id}")
    public void delete(@PathVariable Long id) {
        sportCenterService.delete(id);
    }
}
