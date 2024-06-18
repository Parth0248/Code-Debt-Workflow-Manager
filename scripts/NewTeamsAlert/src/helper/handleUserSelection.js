const handleUserSelection = (editor) => {
  let editorUrl;
  switch (choice) {
    case "vscode":
      editorUrl = `vscode://file/${task.file}`;
      break;
    case "sublime":
      editorUrl = `subl://open?url=file://${task.file}`;
      break;
    case "atom":
      editorUrl = `atom://core/open/file?filename=${task.file}`;
      break;
    case "notepad++":
        editorUrl = `notepad++://openFile/${task.file}`;
        break;
    case "intellij":
        editorUrl = `idea://open?file=${task.file}`;
        break;
    default:
      editorUrl = `vscode://file/${task.file}`; // Default to VS Code
  }
  return editorUrl;
};

export default handleUserSelection;