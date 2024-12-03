import Editor from "./editor";
import Toolbar from "./toolbar";

const Document = () => {
  return (
    <div className="min-h-screen bg-slate-50">
      <Toolbar />
      <div className="z-0">
        <Editor />
      </div>
    </div>
  );
};

export default Document;
