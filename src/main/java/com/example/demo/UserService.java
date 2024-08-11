package com.example.demo;

import org.springframework.stereotype.Service;

import java.util.*;

@Service
public class UserService {

    private List<User> users = new ArrayList<>();

    // 检查用户名是否已经存在
    public boolean checkUsername(String username) {
        return users.stream().anyMatch(user -> user.getUsername().equals(username));
    }

    // 注册新用户
    public void registerUser(String username, String password) {
        User user = new User();
        user.setUsername(username);
        user.setPassword(password);  // 注意：实际应用中应对密码进行加密处理
        users.add(user);
    }

    // 获取所有用户（可选）
    public List<User> getAllUsers() {
        return users;
    }
}
