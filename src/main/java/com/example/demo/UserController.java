
package com.example.demo;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api")
public class UserController {

    @Autowired
    private UserService userService;

    @PostMapping("/register")
    public ResponseEntity<String> register(@RequestBody User user) {
        boolean success = userService.registerUser(user.getUsername(), user.getPassword());
        if (success) {
            return ResponseEntity.ok("0");  // 注册成功
        } else {
            return ResponseEntity.ok("1");  // 用户名已存在
        }
    }

    @PostMapping("/login")
    public ResponseEntity<String> login(@RequestBody User user) {
        boolean success = userService.loginUser(user.getUsername(), user.getPassword());
        if (success) {
            return ResponseEntity.ok("0");  // 登录成功
        } else {
            return ResponseEntity.ok("1");  // 用户名或密码错误
        }
    }
}
