import {Component} from "react"
import ShowAttendanceRow from "../showAttendanceRow"

class ShowAttendance extends Component{

    state={
        studentsList:[],
        month:new Date().getMonth()+1,
        year:new Date().getFullYear(),

    }

    componentDidMount(){
        this.getStudentsList()
    }

    getStudentsList = ()=>{
        fetch("http://localhost:5000/getStudentsData")
        .then(response=>response.json())
        .then(data=>{
            this.setState({
                studentsList:data
            })
        })
        .catch(e=>console.log(e))
    }

    getDaysInMonth = (month,year)=>{
        const lastDay = new Date(year,month+1,0)
        return lastDay.getDate()
    }

    getTableDates = ()=>{
        const {month,year} = this.state
        console.log(month, year)
        const n =this.getDaysInMonth(month,year)
        const dates=[]
        for(let i=1;i<=n;i++){
            dates.push(i)
        }
        return dates;
    }

    onChangeMonth = (e)=>{
        const chosenMonth = e.target.value
        const date = new Date(chosenMonth)
        const month= date.getMonth()+1
        const updatedMonth = month>1? month : `0${month}`
        const year = date.getFullYear()
        this.setState({
            month:updatedMonth,
            year:year

        })
    }

    render(){
        const {studentsList,month,year} = this.state

        const dates = this.getTableDates()
        const tableBody=(studentsList.map(item=>(
            <ShowAttendanceRow key={item._id} year={year} month={month} student={item} dates={dates} />
        )))
        return(
            <div>
                <input onChange={this.onChangeMonth} type="month"  className="attendance-date" defaultValue={`${year}-${month > 9 ? month : `0${month}`}`} />
                <table className="attendance-table">
                    <thead>
                        <th>Student Name</th>
                        <th>Roll Number</th>
                        {dates.map(item=> <th key={item}>{item}</th>)}
                    </thead>
                    <tbody>
                        {tableBody}
                    </tbody>
                </table>
            </div>

        )
    }
}

export default ShowAttendance