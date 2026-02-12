package com.CT553.demo.service;

import com.CT553.demo.dto.request.ProductRequest;
import com.CT553.demo.dto.response.ProductResponse;
import com.CT553.demo.entity.CategoryService;
import com.CT553.demo.entity.Product;
import com.CT553.demo.exception.ApiException;
import com.CT553.demo.mapper.ProductMapper;
import com.CT553.demo.repository.CategoryServiceRepsitory;
import com.CT553.demo.repository.ProductRepository;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.List;

import static org.springframework.http.HttpStatus.BAD_REQUEST;

@Service
@RequiredArgsConstructor
public class ProductService {
    private final ProductRepository productRepository;
    private final CategoryServiceRepsitory categoryServiceRepsitory;
    private final ProductMapper productMapper;

    public ProductResponse createProduct(ProductRequest request) {
        Product product = productMapper.toEntity(request);
        CategoryService categoryService = categoryServiceRepsitory.findById(request.getCategoryId())
                .orElseThrow(() -> new ApiException(BAD_REQUEST,"Category service court not found"));

        product.setCategory(categoryService);

        return productMapper.toResponse(productRepository.save(product));
    }
    public Page<ProductResponse> getAllProduct(
            Long categoryId,
            String keyword,
            Pageable pageable
    ) {
        return productRepository.search(categoryId, keyword, pageable)
                .map(productMapper::toResponse);
    }

    public ProductResponse getProductById(Long id) {
        return productRepository
                .findById(id)
                .map(productMapper:: toResponse)
                .orElseThrow(() -> new ApiException(BAD_REQUEST, "product not found"));
    }

    @Transactional
    public ProductResponse updateProduct(Long id, ProductRequest request) {
        Product product = productRepository.findById(id)
                .orElseThrow(() -> new ApiException(BAD_REQUEST, "Product not found"));

        productMapper.updateEntityFromRequest(request, product);
        return productMapper.toResponse(productRepository.save(product));

    }

    public void delete(Long id) {
        productRepository.deleteById(id);
    }
}
