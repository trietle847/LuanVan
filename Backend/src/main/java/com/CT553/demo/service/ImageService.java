package com.CT553.demo.service;

import com.CT553.demo.dto.response.ImageResponse;
import com.CT553.demo.entity.Court;
import com.CT553.demo.entity.Image;
import com.CT553.demo.exception.ApiException;
import com.CT553.demo.mapper.ImageMapper;
import com.CT553.demo.repository.CourtRepository;
import com.CT553.demo.repository.ImageRepository;
import com.cloudinary.Cloudinary;
import com.cloudinary.utils.ObjectUtils;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.util.Date;
import java.util.Map;

import static org.springframework.http.HttpStatus.BAD_REQUEST;

@Service
@RequiredArgsConstructor
public class ImageService {

    private final CourtRepository courtRepsitory;
    private final ImageRepository imageRepository;
    private final ImageMapper imageMapper;

    @Autowired
    private Cloudinary cloudinary;


//    public Map upload(MultipartFile file) {
//        try {
//            return cloudinary.uploader().upload(file.getBytes(), ObjectUtils.emptyMap());
//        } catch (Exception e) {
//            e.printStackTrace(); // IN RA LỖI THẬT
//            throw new RuntimeException("Upload failed: " + e.getMessage());
//        }
//    }

    public ImageResponse upload(MultipartFile file, Long courtId) {
        try {
            Map result = cloudinary.uploader().upload(file.getBytes(), ObjectUtils.emptyMap());
            Image image = new Image();
            image.setUrl(result.get("secure_url").toString());
            image.setPublicId(result.get("public_id").toString());

            Court court = courtRepsitory.findById(courtId)
                    .orElseThrow(() -> new ApiException(BAD_REQUEST,"court not found"));

            image.setCourt(court);
            image.setCreateAt(new Date());

            return imageMapper.toResponse(imageRepository.save(image));

        } catch (Exception e) {
            e.printStackTrace();
            throw new RuntimeException("Upload failed: " + e.getMessage());
        }
    }

    public void delete(String publicId) {
        try {
            cloudinary.uploader().destroy(publicId, ObjectUtils.emptyMap());
        } catch (Exception e) {
            throw new RuntimeException("Delete failed");
        }
    }
}
