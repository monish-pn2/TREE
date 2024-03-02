import React from 'react';
import ProjectDetails from './ProjectDetails';
import jsonData from './jsonData'; // Assuming you have the JSON data in a file named jsonData.js

const App = () => {
    return (
        <div className="App">
            <ProjectDetails data={jsonData} />
        </div>
    );
};

export default App;
