package com.CT553.demo.service;

import com.CT553.demo.dto.request.ProductRequest;
import com.CT553.demo.dto.response.ProductResponse;
import com.CT553.demo.entity.Product;
import com.CT553.demo.mapper.ProductMapper;
import com.CT553.demo.repository.ProductRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class ProductService {
    private final ProductRepository productRepository;
    private final ProductMapper productMapper;

    public ProductResponse createProduct(ProductRequest request) {
        Product product = productMapper.toEntity(request);
        return productMapper.toResponse(productRepository.save(product));
    }
}
