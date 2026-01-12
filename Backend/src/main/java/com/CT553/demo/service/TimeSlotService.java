package com.CT553.demo.service;

import com.CT553.demo.dto.request.TimeSlotGenerateRequest;
import com.CT553.demo.dto.request.TimeSlotRequest;
import com.CT553.demo.dto.response.TimeSlotResponse;
import com.CT553.demo.entity.Court;
import com.CT553.demo.entity.TimeSlot;
import com.CT553.demo.exception.ApiException;
import com.CT553.demo.mapper.TimeSlotMapper;
import com.CT553.demo.repository.CourtRepository;
import com.CT553.demo.repository.TimeSlotRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.sql.Time;
import java.time.LocalTime;
import java.util.ArrayList;
import java.util.List;

import static org.springframework.http.HttpStatus.BAD_REQUEST;

@Service
@RequiredArgsConstructor
public class TimeSlotService {
    private final TimeSlotRepository timeSlotRepository;
    private final CourtRepository courtRepsitory;
    private final TimeSlotMapper timeSlotMapper;

    public List<TimeSlotResponse> createTimeSlot(TimeSlotGenerateRequest request){
//        TimeSlot timeSlot = timeSlotMapper.toEntity(request);
//        return timeSlotMapper.toResponse(timeSlotRepository.save(timeSlot));
        Court court = courtRepsitory.findById(request.getCourtId())
                .orElseThrow(() -> new ApiException(BAD_REQUEST,"court not found"));
        List<TimeSlot> slots = new ArrayList<>();
        LocalTime current = request.getStart();
        while (current.plusMinutes(request.getStepMinutes()).isBefore(request.getEnd())
                || current.plusMinutes(request.getStepMinutes()).equals(request.getEnd())) {
            LocalTime next = current.plusMinutes(request.getStepMinutes());
            TimeSlot slot = new TimeSlot();
            slot.setCourt(court);
            slot.setStartTimeSlot(Time.valueOf(current));
            slot.setEndTimeSlot(Time.valueOf(next));

            slots.add(slot);
            current = next;
        }
        List<TimeSlot> saved = timeSlotRepository.saveAll(slots);

        return saved.stream()
                .map(timeSlotMapper::toResponse)
                .toList();
    }

    public List<TimeSlotResponse> getTimeSlotByCourt(Long courtId) {
        return timeSlotRepository.findById(courtId)
                .stream().map(timeSlotMapper::toResponse)
                .toList();
    }

    public TimeSlotResponse updateTimeSlot(Long id, TimeSlotRequest request){
        TimeSlot timeSlot = timeSlotRepository.findById(id)
                .orElseThrow(() -> new ApiException(BAD_REQUEST,"timeSlot not found"));

        timeSlotMapper.updateEntityFromRequest(request, timeSlot);
        return timeSlotMapper.toResponse(timeSlotRepository.save(timeSlot));
    }
}
