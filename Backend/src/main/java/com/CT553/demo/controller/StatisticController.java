package com.CT553.demo.controller;

import com.CT553.demo.dto.response.statistics.*;
import com.CT553.demo.service.InvoiceService;
import com.CT553.demo.service.StatisticService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/statistic")
public class StatisticController {
    @Autowired
    private StatisticService statisticService;

    @GetMapping("/invoice")
    public InvoiceStatistic statisticInvoiceByMonth(
            @RequestParam int month,
            @RequestParam int year) {

        return statisticService.getStatisticByMonth(month, year);
    }

    @GetMapping("/product-usage")
    public List<ProductUsageStatistic>  statisticProduct(
            @RequestParam int month,
            @RequestParam int year) {
        return statisticService.getProductUsage(month, year);
    }

    @GetMapping("/court-usage")
    public List<CourtUsageStatistic> statisticCourtUsage(
            @RequestParam int month,
            @RequestParam int year) {
        return statisticService.getCourtUsage(month,year);
    }

    @GetMapping("/booking")
    public List<BookingStatistic> statisticBooking(
            @RequestParam int month,
            @RequestParam int year
    ) {
        return statisticService.getBookingStatisticByDay(month, year);
    }

    @GetMapping("/type-usage")
    public List<TypeCourtStatistic> getTypeCourtUsage(
            @RequestParam int month,
            @RequestParam int year
    ) {
        return statisticService.getTypeCourtUsage(month, year);
    }
}
