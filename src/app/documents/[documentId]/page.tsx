import Editor from "./editor";
import Navbar from "./navbar";
import Toolbar from "./toolbar";

const Document = () => {
  return (
    <div className="min-h-screen bg-slate-50">
      <div className="flex flex-col gap-y-2 fixed top-0 left-0 right-0 z-10 bg-slate-100 print:hidden px-4">
        <Navbar />
        <Toolbar />
      </div>

      <div className="z-0 pt-[114px] print:pt-0">
        <Editor />
      </div>
    </div>
  );
};

export default Document;
