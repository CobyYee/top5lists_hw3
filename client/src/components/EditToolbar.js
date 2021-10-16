import { useContext } from 'react'
import { GlobalStoreContext } from '../store'
import { useHistory } from 'react-router-dom'
/*
    This toolbar is a functional React component that
    manages the undo/redo/close buttons.
    
    @author McKilla Gorilla
*/
function EditToolbar() {
    const { store } = useContext(GlobalStoreContext);
    const history = useHistory();

    function handleUndo() {
        store.undo();
    }
    function handleRedo() {
        store.redo();
    }
    function handleClose() {
        history.push("/");
        store.closeCurrentList();
    }
    let undoStatus = true;
    let undoClass = "top5-button-disabled";
    let redoStatus = true;
    let redoClass = "top5-button-disabled";
    let closeStatus = true;
    let closeClass = "top5-button-disabled";
    if(store.currentList != null) {
        if(store.canUndo()) {
            undoStatus = false;
            undoClass = "top5-button";
        }
        if(store.canRedo()) {
            redoStatus = false;
            redoClass = "top5-button";
        }
        closeStatus = false;
        closeClass = "top5-button";
    }
    return (
        <div id="edit-toolbar">
            <div
                disabled={undoStatus}
                id='undo-button'
                onClick={handleUndo}
                className={undoClass}>
                &#x21B6;
            </div>
            <div
                disabled={redoStatus}
                id='redo-button'
                onClick={handleRedo}
                className={redoClass}>
                &#x21B7;
            </div>
            <div
                disabled={closeStatus}
                id='close-button'
                onClick={handleClose}
                className={closeClass}>
                &#x24E7;
            </div>
        </div>
    )
}

export default EditToolbar;