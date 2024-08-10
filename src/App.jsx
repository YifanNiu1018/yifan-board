import React, { useState } from 'react';
import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar';
import BoardNavbar from './components/BoardNavbar';
import Board from './components/Board';
import './App.css';

function App() {
  const [projects, setProjects] = useState([]);

  const createProject = () => {
    const newProjectName = `项目 ${projects.length + 1}`;
    setProjects([
      ...projects,
      {
        name: newProjectName,
        id: projects.length,
        lists: [
          {
            id: 1,
            title: `${newProjectName} - 待办事项`,
            cards: [], // 初始化卡片数组
          },
          {
            id: 2,
            title: `${newProjectName} - 进行中`,
            cards: [],
          },
          {
            id: 3,
            title: `${newProjectName} - 已完成`,
            cards: [],
          },
        ],
      },
    ]);
  };

  const [selectedProjectIndex, setSelectedProjectIndex] = useState(null);

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
