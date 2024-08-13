package com.example.demo.controller;

import com.example.demo.entity.Project;
import com.example.demo.entity.ProjectList;
import com.example.demo.entity.Card;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;

@RestController
@RequestMapping("/api/projects")
public class BoardController {

    private List<Project> projects = new ArrayList<>();

    // 获取所有项目
    @GetMapping
    public List<Project> getAllProjects() {
        return projects;
    }

    // 创建新项目
    @PostMapping
    public Project createProject(@RequestBody Project project) {
        project.setId(projects.size()); // 设置项目ID为当前项目数量
        projects.add(project);
        System.out.println("Created project: " + project.getName());
        return project;
    }

    // 更新项目
    @PutMapping("/{id}")
    public Project updateProject(@PathVariable int id, @RequestBody Project updatedProject) {
        for (Project project : projects) {
            if (project.getId() == id) {
                project.setLists(updatedProject.getLists());
                return project;
            }
        }
        return null;
    }

    // 向项目中添加新列表
    @PostMapping("/{projectId}/lists")
    public Project addListToProject(@PathVariable int projectId, @RequestBody ProjectList newList) {
        for (Project project : projects) {
            if (project.getId() == projectId) {
                newList.setId(project.getLists().size() + 1); // 给新列表设置ID
                project.getLists().add(newList); // 添加新列表到项目中
                System.out.println(newList.getName());
                return project;
            }
        }
        return null; // 如果项目未找到，可以返回错误或抛出异常
    }

    // 更新列表中的卡片

    @PutMapping("/{projectId}/lists/{listId}")
    public Project updateListCards(@PathVariable int projectId, @PathVariable int listId, @RequestBody List<Card> updatedCards) {
        for (Project project : projects) {
            if (project.getId() == projectId) {
                for (ProjectList list : project.getLists()) {
                    if (list.getId() == listId) {
                        list.setCards(updatedCards);
                        return project;
                    }
                }
            }
        }
        return null;
    }
}
