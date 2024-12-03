import Editor from "./editor";
import Toolbar from "./toolbar";

const Document = () => {
  return (
    <div className="min-h-screen bg-slate-50">
      <Toolbar />
      <Editor />
    </div>
  );
};

export default Document;
