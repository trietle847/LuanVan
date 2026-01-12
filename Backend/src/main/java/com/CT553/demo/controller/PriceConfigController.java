package com.CT553.demo.controller;

import com.CT553.demo.dto.request.PriceConfigRequest;
import com.CT553.demo.dto.response.PriceConfigResponse;
import com.CT553.demo.service.PriceConfigService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/price")
public class PriceConfigController {
    @Autowired
    private PriceConfigService priceConfigService;

    @PostMapping
    public PriceConfigResponse createPrice(@RequestBody PriceConfigRequest request) {
        return priceConfigService.createPrice(request);
    }

    @GetMapping("/{id}")
    public List<PriceConfigResponse> getPriceByTypeId(@PathVariable Long id) {
        return priceConfigService.getAllPriceByTypeId(id);
    }

    @PutMapping("/{id}")
    public PriceConfigResponse updatePrice(@PathVariable Long id, @RequestBody PriceConfigRequest request) {
        return priceConfigService.updatePrice(id, request);
    }

    @DeleteMapping("/{id}")
    public void deletePrice(@PathVariable Long id) {
         priceConfigService.delete(id);
    }
}
