import React,{useState} from 'react';
import '../styles/addlogs.css';

function AddLogs() {

    const handleaddlog = (e)=>{
        e.preventDefault()
    const level = document.getElementById('level').value;
    const message = document.getElementById('message').value;
    const resourceId = document.getElementById('resourceId').value;
    const timestamp = document.getElementById('timestamp').value;
    const traceId = document.getElementById('traceId').value;
    const spanId = document.getElementById('spanId').value;
    const commit = document.getElementById('commit').value;
    const parentResourceId = document.getElementById('parentResourceId').value;

        // const formattedTimestamp = new Date(document.getElementById('timestamp').value).toISOString();
        // setTimestamp(formattedTimestamp)
        // setTraceId(document.getElementById('traceId').value)
        // setSpanId(document.getElementById('spanId').value)
        // setCommit(document.getElementById('commit').value)
        // setParentResourceId(document.getElementById('parentResourceId').value)

        console.log(level)
        console.log(message)
        console.log(resourceId)
        console.log(timestamp)
        console.log(traceId)
        console.log(spanId)
        console.log(commit)
        console.log(parentResourceId)


        fetch('http://localhost:3000/api/logs/',{
            method:'POST',
            headers:{
                'Content-Type':'application/json'
            },
            body:JSON.stringify({
                level: level,
                message: message,
                resourceId: resourceId,
                timestamp: timestamp,
                traceId: traceId,
                spanId: spanId,
                commit: commit,
                metadata: {
                    parentResourceId: parentResourceId,
                },
            })
        }).then(res => res.json()).then(data =>{
            console.log(data)
            // window.location.reload(false);
            window.location.href = "http://localhost:3001/";
        })
    }
    


  return (
    <div className='centered-form'>
      <div className="custom-form-container">
      <form className="addlogformform">
        <div className="form-group">
            <label for="level">Level</label>
            <input type="text" className="form-control" id="level" placeholder="Level"  />
        </div>
        <div className="form-group">
            <label for="message">Message</label>
            <input type="text" className="form-control" id="message" placeholder="Message" />
        </div>
        <div className="form-group">
            <label for="resourceId">ResourceID</label>
            <input type="text" className="form-control" id="resourceId" placeholder="ResourceID" />
        </div>
        <div className="form-group">
            <label for="timestamp">Timestamp</label>
            <input type="text" className="form-control" id="timestamp" placeholder="Timestamp" />
        </div>
        <div className="form-group">
            <label for="traceId">TraceID</label>
            <input type="text" className="form-control" id="traceId" placeholder="TraceID" />
        </div>
        <div className="form-group">
            <label for="spanId">SpanID</label>
            <input type="text" className="form-control" id="spanId" placeholder="SpanID" />
        </div>

        <div className="form-group">
            <label for="commit">Commit</label>
            <input type="text" className="form-control" id="commit" placeholder="Commit" />
        </div>
        <div className="form-group">
            <label for="parentResourceId">ParentResourceID</label>
            <input type="text" className="form-control" id="parentResourceId" placeholder="ParentResourceID" />
        </div>

        
        <button type="submit" className="form-submit-btn" onClick={handleaddlog} >Submit</button>
      </form>
    </div>
    </div>
  );
}

export default AddLogs;
