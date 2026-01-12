package com.CT553.demo.controller;

import com.CT553.demo.dto.request.CategoryServiceRequest;
import com.CT553.demo.dto.response.CategoryServiceResponse;
import com.CT553.demo.service.CategoryServiceService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/category")
public class CategoryServiceController {
    @Autowired
    private CategoryServiceService categoryServiceService;

    @PostMapping
    public CategoryServiceResponse createCategory(@RequestBody CategoryServiceRequest request) {
        return categoryServiceService.createCategoryService(request);
    }

    @GetMapping
    public List<CategoryServiceResponse> getAllCategory() {
        return categoryServiceService.getAllCategory();
    }
}
