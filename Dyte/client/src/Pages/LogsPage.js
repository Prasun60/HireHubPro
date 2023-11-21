import React,{useEffect,useState} from 'react'
import DatePickerValue from '../components/SearchBar'
import Filters from '../components/Filters'
import Loglist from '../components/Loglist'
import dayjs from 'dayjs'

function LogsPage() {
    const [logs,setLogs]=useState([])
    // const [search,setSearch]=useState('')

    const [filters, setFilters] = useState({
      level: '',
      message: '',
      resourceId: '',
      timestamp: '',
      traceId: '',
      spanId: '',
      commit: '',
      parentResourceId: '',
      todate:'',
      fromdate:''
    });

  //  const [fromdate, setFromdate] = React.useState("");
  // const [todate, setTodate] = React.useState(dayjs(""));


    console.log(filters)


    useEffect(() => {
        fetch('http://localhost:3000/api/logs').then(res => res.json()).then(data =>{
            //  console.log(data.logs)
            setLogs(data.logs)

    })
    }, [])

    useEffect(() => {
        fetch('http://localhost:3000/api/logs?level='+filters.level+'&message='+filters.message+'&resourceId='+filters.resourceId+'&timestamp='+filters.timestamp+'&traceId='+filters.traceId+'&spanId='+filters.spanId+'&commit='+filters.commit+'&parentResourceId='+filters.parentResourceId+'&fromdate='+filters.fromdate+'&todate='+filters.todate).then(res => res.json()).then(data =>{
            //  console.log(data.logs)
            setLogs(data.logs)

    })
    }, [filters])

    // useEffect(() => {
    //     fetch('http://localhost:3000/api/logs?level='+filters.level+'&message='+filters.message+'&resourceId='+filters.resourceId+'&timestamp='+filters.timestamp+'&traceId='+filters.traceId+'&spanId='+filters.spanId+'&commit='+filters.commit+'&parentResourceId='+filters.parentResourceId+'&fromdate='+fromdate+'&todate='+todate).then(res => res.json()).then(data =>{
    //         //  console.log(data.logs)
    //         setLogs(data.logs)
    //     console.log("fromdate"+fromdate)
    //     console.log("todate"+todate)

    // })
    // }, [fromdate,todate])

  return (
    <div>
        {/* <DatePickerValue fromdate={fromdate} todate={todate} setFromdate={setFromdate} setTodate={setTodate} /> */}
        <Filters filters={filters} setFilters={setFilters}/>
        <Loglist logs={logs}
        filters={filters} setFilters={setFilters}
        />
    </div>
  )
}

export default LogsPage