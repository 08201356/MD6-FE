import {createContext, useEffect, useState} from 'react';

const WorkspaceContext = createContext();

export const WorkspaceProvider = ({ children }) => {
    const [workspace, setWorkspace] = useState(() => {
        const storedWorkspace = JSON.parse(localStorage.getItem('workspace'));
        return storedWorkspace || null;
    });

    useEffect(() => {
        localStorage.setItem('workspace', JSON.stringify(workspace));
    }, []);

    const updateWorkspace = (newWorkspace) => {
        setWorkspace(newWorkspace);
    };

    return (
        <WorkspaceContext.Provider value={{ workspace, updateWorkspace }}>
            {children}
        </WorkspaceContext.Provider>
    );
};

export default WorkspaceContext;