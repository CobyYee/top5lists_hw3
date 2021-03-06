import { React, useContext, useState } from "react";
import { GlobalStoreContext } from '../store'
/*
    This React component represents a single item in our
    Top 5 List, which can be edited or moved around.
    
    @author McKilla Gorilla
*/
function Top5Item(props) {
    const { store } = useContext(GlobalStoreContext);
    const [draggedTo, setDraggedTo] = useState(0);
    const [text, setText] = useState(props.text);
    const [editActive, setItemEdit] = useState(false);

    function handleDragStart(event) {
        event.dataTransfer.setData("item", event.target.id);
    }

    function handleDragOver(event) {
        event.preventDefault();
    }

    function handleDragEnter(event) {
        event.preventDefault();
        setDraggedTo(true);
    }

    function handleDragLeave(event) {
        event.preventDefault();
        setDraggedTo(false);
    }

    function handleDrop(event) {
        event.preventDefault();
        let target = event.target;
        let targetId = target.id;
        targetId = targetId.substring(target.id.indexOf("-") + 1);
        let sourceId = event.dataTransfer.getData("item");
        sourceId = sourceId.substring(sourceId.indexOf("-") + 1);
        setDraggedTo(false);

        // UPDATE THE LIST
        store.addMoveItemTransaction(sourceId, targetId);
    }

    function handleToggleEdit(event) {
        event.stopPropagation();
        document.getElementById("close-button").className = "top5-button-disabled";
        document.getElementById("close-button").disabled = true;
        setText(props.text);
        toggleEdit();
    }

    function toggleEdit() {
        let newActive = !editActive;
        if(newActive) {
            store.setItemEditActive();
        }
        setItemEdit(newActive);
    }

    function handleChange(event) {
        setText(event.target.value);
    }

    function handleKeyPress(event) {
        if(event.code === "Enter") {
            toggleEdit();
            let id = event.target.id.substring("item-".length);
            store.addRenameItemTransaction(id, text);
            document.getElementById("close-button").className = "top5-button";
            document.getElementById("close-button").disabled = false;
        }
    }

    function blur(event) {
        toggleEdit();
        let id = event.target.id.substring("item-".length);
        store.addRenameItemTransaction(id, text);
        document.getElementById("close-button").className = "top5-button";
        document.getElementById("close-button").disabled = false;
    }

    let editDisabled = false;
    if(store.isItemEditActive) {
        editDisabled = true;
    }

    let dragStatus = true;
    if(store.isItemEditActive) {
        dragStatus = false;
    }

    let { index } = props;
    let itemClass = "top5-item";
    if (draggedTo) {
        itemClass = "top5-item-dragged-to";
    }
    let item = 
        <div
            id={'item-' + (index + 1)}
            className={itemClass}
            onDragStart={handleDragStart}
            onDragOver={handleDragOver}
            onDragEnter={handleDragEnter}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
            draggable={dragStatus}
        >
            <input
                disabled = {editDisabled}
                type="button"
                id={"edit-item-" + index + 1}
                className="list-card-button"
                value={"\u270E"}
                onClick = {handleToggleEdit}
            />
            {props.text}
        </div>
    if(editActive) {
        item = 
            <input
                id = {'item-' + (index + 1)}
                className = {itemClass}
                type = 'text'
                onKeyPress = {handleKeyPress}
                onChange = {handleChange}
                defaultValue = {props.text}
                autoFocus
                onBlur={blur}
            >
            </input>
    }
    return item;
}

export default Top5Item;