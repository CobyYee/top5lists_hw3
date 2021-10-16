import jsTPS_Transaction from "../common/jsTPS.js"


export default class MoveItem_Transaction extends jsTPS_Transaction {
    constructor(initStore, initIndex, initOldName, initNewName) {
        super();
        this.store = initStore;
        this.itemIndex = initIndex;
        this.oldName = initOldName;
        this.newName = initNewName;
    }

    doTransaction() {
        this.store.renameItem(this.oldName, this.newName, this.itemIndex);
    }
    
    undoTransaction() {
        this.store.renameItem(this.newName, this.oldName, this.itemIndex);
    }
}