import React from 'react';
import ReactDOM from 'react-dom';
import './ErrorModal.css';

function Backdrop(props) {
    return <div onClick={props.onDismiss} className="backdrop"></div>
};

function Modal(props) {
    return (
        <div className="modal" onClick={props.onDismiss}>
            <h2 className="modal-header">{props.title}</h2>
            <p className="modal-message">{props.message}</p>
        </div>
    );
}

export default function ErrorModal(props) {
    return (
        <>
            {ReactDOM.createPortal(<Backdrop onDismiss={props.onDismiss} />, document.getElementById('backdrop-root'))}
            {ReactDOM.createPortal(<Modal onDismiss={props.onDismiss} title={props.title} message={props.message} />, document.getElementById('overlay-root'))}
        </>
    )
}