import "./App.css";
import { Sidebar } from "./components/Sidebar/Sidebar";
import { CaseList } from "./components/CaseList/CaseList";
import { DocList } from "./components/DocList/DocList";
import { UploadDetails } from "./components/UploadDetails/UploadDetails";
import Icon from "./components/universal/Icon/Icon";
import Badge from "./components/universal/Badge/Badge";
import Button from "./components/universal/Button/Button";

function App() {
  return (
    <div className="app">
      <Sidebar />
      <div className="work-zone">
        <CaseList />
        <div className="upload-zone">
          <UploadDetails />
          <DocList />
        </div>
      </div>
    </div>
  );
}

export default App;
