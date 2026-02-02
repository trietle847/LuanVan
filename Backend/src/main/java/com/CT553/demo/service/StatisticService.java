package com.CT553.demo.service;

import com.CT553.demo.dto.response.statistics.*;
import com.CT553.demo.entity.Court;
import com.CT553.demo.exception.ApiException;
import com.CT553.demo.repository.BookingDetailRepository;
import com.CT553.demo.repository.BookingProductRepository;
import com.CT553.demo.repository.CourtRepository;
import com.CT553.demo.repository.InvoiceRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

import static org.springframework.http.HttpStatus.BAD_REQUEST;

@Service
@RequiredArgsConstructor
public class StatisticService {
    private final InvoiceRepository invoiceRepository;
    private final BookingProductRepository bookingProductRepository;
    private final BookingDetailRepository bookingDetailRepository;
    private final CourtRepository courtRepository;

    public InvoiceStatistic getStatisticByMonth(int month, int year) {
        List<Object[]> results = invoiceRepository.statisticByMonth(month, year);

        InvoiceStatistic statistic = new InvoiceStatistic();
        statistic.setMonth(month);
        statistic.setYear(year);

        if (!results.isEmpty()) {
            Object[] row = results.get(0);

            statistic.setTotalInvoice(((Number) row[0]).longValue());
            statistic.setTotalRevenue(row[1] != null
                    ? ((Number) row[1]).doubleValue()
                    : 0);
        } else {
            statistic.setTotalInvoice(0L);
            statistic.setTotalRevenue(0);
        }

        return statistic;
    }

    public List<ProductUsageStatistic> getProductUsage(int month, int year) {
        List<Object[]> results = bookingProductRepository.statisticProductByMonth(month, year);

        List<ProductUsageStatistic> productUsageStatistics = new ArrayList<>();
        for (Object[] row : results) {
            ProductUsageStatistic dto = new ProductUsageStatistic();
            dto.setProductId(((Number) row[0]).longValue());
            dto.setName((String) row[1]);
            dto.setTotalQuantity(((Number) row[2]).longValue());
            dto.setMonth(month);
            dto.setYear(year);
            productUsageStatistics.add(dto);
        }
        return productUsageStatistics;
    }

    public List<CourtUsageStatistic> getCourtUsage(int month, int year) {
        List<Object[]> results = bookingDetailRepository.statisticCourtUsage(month, year);

        List<CourtUsageStatistic> courtUsageStatistics = new ArrayList<>();

        for (Object[] row: results) {
            CourtUsageStatistic dto = new CourtUsageStatistic();
            dto.setCourtId(((Number) row[0]).longValue());
            dto.setCourtName((String) row[1]);
            dto.setTotalBooking(((Number) row[2]).longValue());
            dto.setMonth(month);
            dto.setYear(year);
            courtUsageStatistics.add(dto);
        }
        return  courtUsageStatistics;
    }

    public List<BookingStatistic> getBookingStatisticByDay(int month, int year) {
        List<Object[]> results = bookingDetailRepository.statisticBookingByDay(month, year);
        List<BookingStatistic> bookingStatistics = new ArrayList<>();

        for (Object[] row: results) {
            BookingStatistic dto = new BookingStatistic();
            dto.setDay(((Number)row[0]).intValue());
            dto.setTotalBooking(((Number)row[1]).intValue());
            bookingStatistics.add(dto);
        }

        return bookingStatistics;
    }

    public List<TypeCourtStatistic> getTypeCourtUsage(int month, int year) {
        List<Object[]> results = bookingDetailRepository.statisticCourtTypeUsage(month, year);
        List<TypeCourtStatistic> typeCourtStatistics = new ArrayList<>();

        for (Object[] row: results) {
            TypeCourtStatistic dto = new TypeCourtStatistic();
            dto.setTypeCourtId(((Number) row[0]).intValue());
            dto.setTypeCourtName((String) row[1]);
            dto.setTotalBooking(((Number) row[2]).intValue());
            dto.setMonth(month);
            dto.setYear(year);
            typeCourtStatistics.add(dto);
        }
        return typeCourtStatistics;
    }
}
