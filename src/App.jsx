import React, { useState } from 'react';
import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar';
import BoardNavbar from './components/BoardNavbar';
import Board from './components/Board';
import './App.css';

// 工厂函数用于创建新项目
function createNewProject(projectName, projectId) {
  return {
    name: projectName,
    id: projectId,
    lists: [
      {
        id: 1,
        title: `${projectName} - 待办事项`,
        cards: [],
      },
      {
        id: 2,
        title: `${projectName} - 进行中`,
        cards: [],
      },
      {
        id: 3,
        title: `${projectName} - 已完成`,
        cards: [],
      },
    ],
  };
}

function App() {
  // 初始化时包含一个默认项目
  const [projects, setProjects] = useState([createNewProject('默认项目', 0)]);
  const [selectedProjectIndex, setSelectedProjectIndex] = useState(0); // 默认选中第一个项目

  const createProject = () => {
    const newProjectName = `项目 ${projects.length + 1}`;
    const newProject = createNewProject(newProjectName, projects.length);
    setProjects([...projects, newProject]);
    setSelectedProjectIndex(projects.length); // 自动选择新创建的项目
  };

  const handleProjectSelect = (index) => {
    setSelectedProjectIndex(index);
  };

  const updateProjectLists = (index, updatedLists) => {
    const updatedProjects = projects.map((project, i) =>
      i === index ? { ...project, lists: updatedLists } : project
    );
    setProjects(updatedProjects);
  };

  return (
    <div className="app">
      <Navbar onCreate={createProject} />
      <div className="main-content">
        <Sidebar projects={projects} onSelect={handleProjectSelect} />
        <div className="content-area">
          {selectedProjectIndex !== null && (
            <>
              <BoardNavbar project={projects[selectedProjectIndex]} />
              <Board
                project={projects[selectedProjectIndex]}
                updateLists={(updatedLists) =>
                  updateProjectLists(selectedProjectIndex, updatedLists)
                }
              />
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
