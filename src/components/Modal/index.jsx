import React, { Children } from 'react'

const BACKGROUND_STYLE = {
    position : 'fixed',
    top : '0',
    bottom : '0',
    left : '0',
    right : '0',
    backgroundColor : 'rgb(0,0,0,0.7)',
    zIndex : '1000'
}

const MODAL_STYLE = {
    position : 'fixed',
    top : '50%',
    left : '50%',
    transform : 'translate(-50%, -50%)',
    // padding : '5px',
    border: "8px solid rgb(0, 0, 0)",
    backgroundColor : 'rgb(62 29 0)',
    borderRadius : '10px',
    color : 'black',
}

export default function Modal({isOpen, children}) {

    if(isOpen) {
        return (
            <div style={BACKGROUND_STYLE}>
                <div style={MODAL_STYLE}>
                    <div>
                        {children}
                    </div>
                </div>
            </div>
        )
    }

    return null
}
