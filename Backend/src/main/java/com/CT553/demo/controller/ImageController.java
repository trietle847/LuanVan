package com.CT553.demo.controller;

import com.CT553.demo.dto.response.ImageResponse;
import com.CT553.demo.entity.Court;
import com.CT553.demo.entity.Image;
import com.CT553.demo.entity.User;
import com.CT553.demo.mapper.ImageMapper;
import com.CT553.demo.repository.CourtRepository;
import com.CT553.demo.repository.ImageRepository;
import com.CT553.demo.repository.UserRepository;
import com.CT553.demo.service.ImageService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.Map;

@RestController
@RequestMapping("/images")
public class ImageController {

    @Autowired
    private ImageService imageService;

    @Autowired
    private ImageRepository imageRepository;

    @Autowired
    private CourtRepository courtRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private ImageMapper imageMapper;

    @PostMapping("/upload")
    public ImageResponse upload(@RequestParam MultipartFile file,@RequestParam Long courtId) {
        return imageService.upload(file,courtId);
    }
//    public ImageResponse upload(
//            @RequestParam MultipartFile file
////            @RequestParam String courtId,   // "court" hoặc "user"
////            @RequestParam Long ownerId,
////            @RequestParam(defaultValue = "false") Boolean isThumbnail
//    ) {
//        Map result = imageService.upload(file);
//
//        Image image = new Image();
//        image.setUrl(result.get("secure_url").toString());
//        image.setPublicId(result.get("public_id").toString());
//
////        if (type.equals("court")) {
////            Court court = courtRepository.findById(ownerId).orElseThrow();
////            image.setCourt(court);
////        }
//
//        Image saved = imageRepository.save(image);
//        return imageMapper.toResponse(saved);
//    }
}
