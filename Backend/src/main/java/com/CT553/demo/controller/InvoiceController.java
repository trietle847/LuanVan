package com.CT553.demo.controller;

import com.CT553.demo.dto.request.InvoiceRequest;
import com.CT553.demo.dto.response.InvoiceResponse;
import com.CT553.demo.dto.response.statistics.InvoiceStatistic;
import com.CT553.demo.service.InvoiceService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/invoice")
public class InvoiceController {
    @Autowired
    private InvoiceService invoiceService;

    @PostMapping
    public InvoiceResponse createInvoice(@RequestBody InvoiceRequest request){
        return invoiceService.createInvoice(request);
    }

    @GetMapping
    public List<InvoiceResponse> getAllInvoice() {
        return invoiceService.getAllInvoice();
    }

}
