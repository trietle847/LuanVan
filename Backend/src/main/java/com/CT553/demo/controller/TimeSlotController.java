package com.CT553.demo.controller;

import com.CT553.demo.dto.request.TimeSlotGenerateRequest;
import com.CT553.demo.dto.request.TimeSlotRequest;
import com.CT553.demo.dto.response.TimeSlotResponse;
import com.CT553.demo.service.TimeSlotService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/time")
public class TimeSlotController {
    @Autowired
    private TimeSlotService timeSlotService;

    @PostMapping
    public List<TimeSlotResponse> createTimeSlot(@RequestBody TimeSlotGenerateRequest request) {
        return timeSlotService.createTimeSlot(request);
    }

//    @DeleteMapping
//    public  void deleteAll(){
//        timeSlotService.deleteAll();
//    }
}
