import React,{useEffect} from 'react'
import '../styles/logs.css'

function Loglist({logs,filters,setFilters}) {

   console.log(logs)
    return (
        <div className='logsbox'>
            {logs.map((log)=>{
                return (
                <div class="notification">
                <div class="notiglow"></div>
                <div class="notiborderglow"></div>
                <div class="notititle"><span style={{"color":"white","marginRight":"10px", "fontSize":"15px"}}>Log message:</span> {log.message}</div>
                <div class="notibody">Level : {log.level}</div>
                <div class="notibody">ResourceID : {log.resourceId}</div>
                <div class="notibody">Timestamp : {(log.timestamp).toString().split('T')[0]}</div>
                <div class="notibody">TraceID : {log.traceId}</div>
                <div class="notibody">SpanID : {log.spanId}</div>
                <div class="notibody">Commit : {log.commit}</div>
                <div class="notibody">ParentResourceID : {log.metadata.parentResourceId}</div>
                
            </div>)
            })}
            
            
        </div>
    )
}

export default Loglist