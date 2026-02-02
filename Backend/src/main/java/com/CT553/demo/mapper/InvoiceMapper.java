package com.CT553.demo.mapper;

import com.CT553.demo.dto.request.InvoiceRequest;
import com.CT553.demo.dto.response.InvoiceResponse;
import com.CT553.demo.entity.Invoice;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.MappingTarget;

@Mapper(componentModel = "spring", uses = {BookingDetailMapper.class})
public interface InvoiceMapper {
    @Mapping(target = "id", ignore = true)
    Invoice toEntity(InvoiceRequest request);

    @Mapping(source = "bookingDetails", target = "bookingDetailResponses")
    InvoiceResponse toResponse(Invoice entity);

    void updateEntityFromRequest(InvoiceRequest request, @MappingTarget Invoice entity);
}
