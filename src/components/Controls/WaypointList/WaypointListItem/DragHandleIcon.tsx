
// file HeartIcon.tsx
import React, { ReactSVG } from "react";

function DragHandleIcon(props: any) {
    return (
        <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
            <path d="M20 9H4v2h16V9zM4 15h16v-2H4v2z" />
        </svg>
    );
}
export default DragHandleIcon;

