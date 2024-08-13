import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import Navbar from './Navbar';
import Sidebar from './Sidebar';
import BoardNavbar from './BoardNavbar';
import Board from './Board';
import '../styles/BoardPage.css';

// 工厂函数用于创建新项目
function createNewProject(projectName, projectId) {
    return {
        name: projectName,
        id: projectId,
        lists: [],
    };
}

function BoardPage() {
    const location = useLocation();
    const username = location.state?.username || 'Guest';  // 接收传递的 username
    const navigate = useNavigate();
    const [projects, setProjects] = useState([]);
    const [selectedProjectIndex, setSelectedProjectIndex] = useState(0);

    // 获取项目数据
    useEffect(() => {
        fetch("http://localhost:8080/api/projects")
            .then(response => response.json())
            .then(data => {
                setProjects(data);
                if (data.length > 0) {
                    setSelectedProjectIndex(0); // 默认选择第一个项目
                }
            })
            .catch(error => {
                console.error("获取项目数据时出错：", error);
            });
    }, []);

    // 创建新项目
    const createProject = (newProjectName) => {
        const newProject = createNewProject(newProjectName, projects.length);

        fetch("http://localhost:8080/api/projects", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(newProject)
        })
            .then(response => response.json())
            .then(data => {
                setProjects([...projects, data]);
                setSelectedProjectIndex(projects.length); // 自动选择新创建的项目
            });
    };

    // 选择项目
    const handleProjectSelect = (index) => {
        setSelectedProjectIndex(index);
    };

    // 更新项目列表
    const updateProjectLists = (index, updatedLists) => {
        const updatedProject = { ...projects[index], lists: updatedLists };

        fetch(`http://localhost:8080/api/projects/${updatedProject.id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(updatedProject)
        })
            .then(response => response.json())
            .then(data => {
                const updatedProjects = projects.map((project, i) =>
                    i === index ? data : project
                );
                setProjects(updatedProjects);
            })
            .catch(error => {
                console.error("更新项目列表时出错：", error);
            });
    };
    // 处理退出逻辑
    const handleLogout = () => {
        navigate('/login');  // 重定向到登录页面
    };
    // 搜索项目
    const handleSearch = (searchTerm) => {
        const projectIndex = projects.findIndex(project =>
            project.name.toLowerCase() === searchTerm.toLowerCase()
        );
        if (projectIndex !== -1) {
            handleProjectSelect(projectIndex);
        } else {
            alert('未找到对应的项目');
        }
    };

    return (
        <div className="board-page">
            <Navbar username={username} onCreate={createProject} onLogout={handleLogout} onSearch={handleSearch} />
            <div className="main-content">
                <Sidebar projects={projects} onSelect={handleProjectSelect} selectedProjectIndex={selectedProjectIndex} />
                <div className="content-area">
                    {selectedProjectIndex !== null && (
                        <>
                            <BoardNavbar project={projects[selectedProjectIndex]} />
                            <Board
                                project={projects[selectedProjectIndex]}
                                updateLists={(updatedLists) =>
                                    updateProjectLists(selectedProjectIndex, updatedLists)
                                }
                                username={username}
                            />
                        </>
                    )}
                </div>
            </div>
        </div>
    );
}

export default BoardPage;
