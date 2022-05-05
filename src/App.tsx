import React from 'react';
import './App.css';
import { fakeToggles } from './Common/Data/fake-toggle-data';
import Toggles from './Components/Toggles/Toggles';

const App: React.FC = () => {
  return (
    <div className="App">
      <Toggles 
        toggles={fakeToggles}
        question='An animal cell contains'
        layoverImageUrl='job.gif'
      />
    </div>
  );
}

export default App;
