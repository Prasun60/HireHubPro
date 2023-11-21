import React,{useState} from 'react'
import '../styles/filters.css'

function Filters({filters,setFilters}) {
    const [level,setLevel]=useState('')
    const [message,setMessage]=useState('')
    const [resourceId,setResourceId]=useState('')
    const [timestamp,setTimestamp]=useState('')
    const [traceId,setTraceId]=useState('')
    const [spanId,setSpanId]=useState('')
    const [commit,setCommit]=useState('')
    const [parentResourceId,setParentResourceId]=useState('')
    const [fromdate,setFromdate]=useState('')
    const [todate,setTodate]=useState('')

    const handlesubmitclick=()=>{
        setFilters({
            level: level,
            message: message,
            resourceId: resourceId,
            timestamp: timestamp,
            traceId: traceId,
            spanId: spanId,
            commit: commit,
            parentResourceId: parentResourceId,
            todate:todate,
            fromdate:fromdate
        })

        // window.location.reload(false);

        
    }  



    return (
        <div>
            <div>
            <input placeholder="From Date" class="inputdate" name="text" type="text" id="fromdate" onChange={(e)=>setFromdate(e.target.value)} />
      <input placeholder="To Date" class="inputdate" name="text" type="text" id="todate" onChange={(e)=>setTodate(e.target.value)}/>
            </div>
            <div className='filterbuttons'>
                <input type="text" name="text" class="input" placeholder="Level" onChange={(e)=>setLevel(e.target.value)} ></input>
                <input type="text" name="text" class="input" placeholder="Message" onChange={(e)=>setMessage(e.target.value)}></input>
                <input type="text" name="text" class="input" placeholder="ResourceId" onChange={(e)=>setResourceId(e.target.value)}></input>
                <input type="text" name="text" class="input" placeholder="SpanId" onChange={(e)=>setSpanId(e.target.value)}></input>
                <input type="text" name="text" class="input" placeholder="timestamp" onChange={(e)=>setTimestamp(e.target.value)}></input>
                <input type="text" name="text" class="input" placeholder="TraceId" onChange={(e)=>setTraceId(e.target.value)}></input>
                <input type="text" name="text" class="input" placeholder="commit" onChange={(e)=>setCommit(e.target.value)}></input>
                <input type="text" name="text" class="input" placeholder="parentResourceId" onChange={(e)=>setParentResourceId(e.target.value)}></input>
            </div>
            <div>
                <button class="btn-donate" onClick={handlesubmitclick}>
                    Search
                </button>
            </div>
        </div>
    )
}

export default Filters