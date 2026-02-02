package com.CT553.demo.service;

import com.CT553.demo.dto.request.InvoiceRequest;
import com.CT553.demo.dto.response.InvoiceResponse;
import com.CT553.demo.dto.response.statistics.InvoiceStatistic;
import com.CT553.demo.entity.BookingDetail;
import com.CT553.demo.entity.Invoice;
import com.CT553.demo.entity.enums.BookingStatus;
import com.CT553.demo.mapper.InvoiceMapper;
import com.CT553.demo.repository.BookingDetailRepository;
import com.CT553.demo.repository.InvoiceRepository;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.Date;
import java.util.List;

@Service
@RequiredArgsConstructor
public class InvoiceService {
    private final InvoiceRepository invoiceRepository;
    private final InvoiceMapper invoiceMapper;
    private final BookingDetailRepository bookingDetailRepository;

    @Transactional
    public InvoiceResponse createInvoice(InvoiceRequest request){
        Invoice invoice = invoiceMapper.toEntity(request);
        invoice.setCreateAt(new Date());

        List<BookingDetail> bookingDetails = bookingDetailRepository.findAllById(request.getBookingDetailIds());

        Double totalAmount = 0.0;
        for (BookingDetail bd: bookingDetails) {
            bd.setInvoice(invoice);
            bd.setStatus(BookingStatus.PAID);

            Double fee = 0.0;
            fee += bd.getFeeService() + bd.getFeeCourt();

            totalAmount+= fee;
        }

        invoice.setTotalAmount(totalAmount);
        invoice.setBookingDetails(bookingDetails);

        return invoiceMapper.toResponse(invoiceRepository.save(invoice));
    }

    public List<InvoiceResponse> getAllInvoice() {
        return invoiceRepository.findAll()
                .stream()
                .map(invoiceMapper::toResponse)
                .toList();
    }

}