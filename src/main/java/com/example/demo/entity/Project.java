package com.example.demo.entity;

import java.util.List;

public class Project {
    private String name;
    private int id;
    private List<ProjectList> lists;

    // Getters and Setters
    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public List<ProjectList> getLists() {
        return lists;
    }

    public void setLists(List<ProjectList> lists) {
        this.lists = lists;
    }
}
