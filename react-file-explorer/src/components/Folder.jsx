import { useState } from "react";

function Folder({ explorer }) {
  const [expand, setExpand] = useState(false);
  const [showInput, setShowInput] = useState({
    visible: false,
    isFolder: null,
  });

  const handleNewFolder = (e, isFolder) => {
    e.stopPropagation();
    setExpand(true);
    setShowInput({
      visible: true,
      isFolder,
    });
  };

  const onAddFolder = (e) => {
    if (e.keyCode === 13 && e.target.value) {
      // add logic
      setShowInput({ ...showInput, visible: false });
    }
  };

  if (explorer.isFolder) {
    return (
      <div style={{ marginTop: "5px" }}>
        <div className="folder" onClick={() => setExpand(!expand)}>
          <span>
            {!expand ? "📁" : "📂"}
            {explorer.name}
          </span>
          <div>
            <button onClick={(e) => handleNewFolder(e, false)}>📝</button>
            <button onClick={(e) => handleNewFolder(e, true)}>🗂️</button>
          </div>
        </div>
        <div
          style={{ display: expand ? "block" : "none", paddingLeft: "10px" }}
        >
          {showInput.visible && (
            <div className="inputContainer">
              <span>{showInput.isFolder ? "📁" : "📄"}</span>
              <input
                onKeyDown={onAddFolder}
                onBlur={() => setShowInput({ ...showInput, visible: false })}
                autoFocus
                className="inputContainer__input"
                type="text"
              />
            </div>
          )}
          {explorer.items.map((exp, index) => {
            return <Folder explorer={exp} key={index} />;
          })}
        </div>
      </div>
    );
  } else {
    return <span className="file">📄{explorer.name}</span>;
  }
}
export default Folder;
