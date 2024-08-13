
package com.example.demo.service;

import com.example.demo.entity.User;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class UserService {

    private final List<User> users = new ArrayList<>();

    public UserService() {
        // 添加一个默认的开发者用户
        users.add(new User("testuser", "testpassword"));
    }

    public boolean checkUsername(String username) {
        return users.stream().anyMatch(user -> user.getUsername().equals(username));
    }

    public boolean registerUser(String username, String password) {
        if (checkUsername(username)) {
            return false;
        } else {
            users.add(new User(username, password));
            return true;
        }
    }

    public boolean loginUser(String username, String password) {
        return users.stream().anyMatch(user ->
                user.getUsername().equals(username) && user.getPassword().equals(password));
    }
}
