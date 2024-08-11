package com.example.demo;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.*;

@RestController
@RequestMapping("/api")
public class UserController {

    @Autowired
    private UserService userService;

    @PostMapping("/register")
    public ResponseEntity<Integer> register(@RequestBody User user) {
        if (userService.checkUsername(user.getUsername())) {
            return ResponseEntity.ok(1);  // 返回 1 表示用户名已存在
        } else {
            userService.registerUser(user.getUsername(), user.getPassword());
            return ResponseEntity.ok(0);  // 返回 0 表示注册成功
        }
    }

    @GetMapping("/users")
    public ResponseEntity<List<User>> getUsers() {
        return ResponseEntity.ok(userService.getAllUsers());
    }
}
