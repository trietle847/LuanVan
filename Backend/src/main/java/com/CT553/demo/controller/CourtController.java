package com.CT553.demo.controller;

import com.CT553.demo.dto.request.CourtRequest;
import com.CT553.demo.dto.response.CourtResponse;
import com.CT553.demo.service.CourtService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/court")
public class CourtController {
    @Autowired
    private CourtService courtService;

    @PostMapping
    @PreAuthorize("hasAnyRole('MANAGER', 'ADMIN')")
    public CourtResponse createCourt(@RequestBody CourtRequest request) {
        return courtService.createCourt(request);
    }

    @GetMapping
    public List<CourtResponse> getAllCourt() {
        return courtService.getAllCourt();
    }

    @GetMapping("/{id}")
    public CourtResponse getCourtById(@PathVariable Long id) {
        return courtService.getCourtById(id);
    }

    @PutMapping("/{id}")
    public CourtResponse updateCourt(@PathVariable Long id, @RequestBody CourtRequest request){
        return courtService.updateCourt(id, request);
    }

    @DeleteMapping("/{id}")
    public void delete(@PathVariable Long id) {
        courtService.delete(id);
    }
}
