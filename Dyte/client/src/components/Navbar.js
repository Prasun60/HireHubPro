import React from 'react'

import "../styles/navbar.css"


function Navbarrect() {
    const handleclick = ()=>{
        window.location.href = "http://localhost:3001/addlogs"
    }

    return (
        <div>
            <div class="nav">
                <input type="checkbox" id="nav-check" />
                    <div class="nav-header">
                        <div class="nav-title" onClick={()=>window.location.href="http://localhost:3001/"} style={{"cursor":"pointer"}}>
                            LogLynx
                        </div>
                    </div>
                    <div class="nav-btn">
                        <label for="nav-check">
                            <span></span>
                            <span></span>
                            <span></span>
                        </label>
                    </div>

                    <div class="nav-links">
                        <a onClick={handleclick} style={{"cursor":"pointer"}}>Add Logs</a>
                        
                    </div>
            </div>
        </div>
    )
}

export default Navbarrect