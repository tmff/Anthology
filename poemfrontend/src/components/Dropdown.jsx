import React, { useState } from "react";
import Dropdown from 'react-bootstrap/Dropdown'
import { withRouter } from 'react-router-dom';

import '../css/Dropdown.css';

const DropDown = () => {
    const [isOpen, setIsOpen] = useState(false);

    const handleOpen = () => {
        setIsOpen(!isOpen);
    }

    <div className="dropdown">
        <button onClick={handleOpen} class="dropbtn"></button>
    </div>
}

export default Dropdown;










