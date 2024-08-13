

package com.example.demo.controller;

import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.bind.annotation.*;
import java.io.File;
import java.io.IOException;
import java.util.HashMap;
import java.util.Map;

@RestController
public class FileUploadController {

    @PostMapping("/api/upload")
    public Map<String, String> handleFileUpload(@RequestParam("file") MultipartFile file) {
        Map<String, String> response = new HashMap<>();

        if (!file.isEmpty()) {
            try {
                // 假设上传的文件存储在服务器的 "uploads" 目录下
                String uploadDir = "D:/Code/Web/File/";
                String fileName = file.getOriginalFilename();
                String filePath = uploadDir + fileName;
                File dest = new File(filePath);
                file.transferTo(dest);

                String fileUrl = "/uploads/" + fileName;
                response.put("message", "File uploaded successfully");
                response.put("filePath", fileUrl); // 返回相对URL路径
                return response;
            } catch (IOException e) {
                e.printStackTrace();
                response.put("message", "File upload failed: " + e.getMessage());
                return response;
            }
        } else {
            response.put("message", "File is empty!");
            return response;
        }
    }
}
