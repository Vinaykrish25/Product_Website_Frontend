import React from "react";
import "./Styles/ConfirmDelete.css"

const ConfirmDelete = ({ deleteRef,deleteClose }) => {

    function close(){
        deleteClose()
    }

    return (
        <div className='dialog-container'>
            <dialog ref={deleteRef}>
                <p>
                    Are you sure you want to remove this user?
                </p>
                <div className="but">
                    <button onClick={close}>Delete</button>
                </div>

            </dialog>
        </div>
    );
}

export default ConfirmDelete