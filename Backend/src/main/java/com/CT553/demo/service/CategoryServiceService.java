package com.CT553.demo.service;

import com.CT553.demo.dto.request.CategoryServiceRequest;
import com.CT553.demo.dto.response.CategoryServiceResponse;
import com.CT553.demo.entity.CategoryService;
import com.CT553.demo.mapper.CategoryServiceMapper;
import com.CT553.demo.repository.CategoryServiceRepsitory;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class CategoryServiceService {
    private final CategoryServiceRepsitory categoryServiceRepsitory;
    private final CategoryServiceMapper categoryServiceMapper;

    public CategoryServiceResponse createCategoryService(CategoryServiceRequest request) {
        CategoryService categoryService = categoryServiceMapper.toEntity(request);

        return categoryServiceMapper.toResponse(categoryServiceRepsitory.save(categoryService));
    }

    public List<CategoryServiceResponse> getAllCategory() {
        return categoryServiceRepsitory.findAll()
                .stream()
                .map(categoryServiceMapper::toResponse)
                .toList();
    }
}
