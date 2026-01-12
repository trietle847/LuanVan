package com.CT553.demo.controller;

import com.CT553.demo.dto.request.TypeCourtRequest;
import com.CT553.demo.dto.response.TypeCourtResponse;
import com.CT553.demo.service.TypeCourtService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.parameters.P;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/type")
public class TypeCourtController {
    @Autowired
    private TypeCourtService typeCourtService;

    @PostMapping
    @PreAuthorize("hasAnyRole('MANAGER', 'ADMIN')")
    public TypeCourtResponse createTypeCourt(@RequestBody TypeCourtRequest request) {
        return typeCourtService.createTypeCourt(request);
    }

    @GetMapping
    public List<TypeCourtResponse> getAllTypeCourt(){
        return typeCourtService.getAllTypeCourt();
    }

    @GetMapping("/{id}")
    public TypeCourtResponse getTypeCourtById(@PathVariable Long id) {
        return typeCourtService.getTypeCourtById(id);
    }

    @PutMapping("/{id}")
    public TypeCourtResponse updateTypeCourt(@PathVariable Long id, @RequestBody TypeCourtRequest request) {
        return typeCourtService.updateTypeCourt(id, request);
    }

    @DeleteMapping("/{id}")
    public void delete(@PathVariable Long id) {
        typeCourtService.delete(id);
    }
}
