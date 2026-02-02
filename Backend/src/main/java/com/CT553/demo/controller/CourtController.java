package com.CT553.demo.controller;

import com.CT553.demo.dto.request.CourtRequest;
import com.CT553.demo.dto.response.CourtResponse;
import com.CT553.demo.dto.response.ProductResponse;
import com.CT553.demo.service.CourtService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
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
    public Page<CourtResponse> getAllProduct(
            @RequestParam(required = false) Long typeCourtId,
            @RequestParam(required = false) String keyword,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size
    ) {
        Pageable pageable = PageRequest.of(page, size, Sort.by("name").ascending());
        return courtService.getAllProduct(typeCourtId, keyword, pageable);
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
