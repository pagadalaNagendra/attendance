import { Component } from "react";
import AttendeeRow from "../attendeeRow";
import "./index.css"
import {Link} from "react-router-dom"

class StudentAttendance extends Component{

    state= {
        attendanceArray : [],
        students : [],
        date:`${new Date().getFullYear()}-${new Date().getMonth()+1}-${new Date().getDate()}`
    }

    async componentDidMount(){
        // const {date} = this.state
        const myDate= new Date()
        const toDayDate= myDate.getDate()
        const updatedDate = toDayDate<10?`0${toDayDate}`:toDayDate
        const toDayMonth= myDate.getMonth()+1
        const updatedMonth = toDayMonth<10?`0${toDayMonth}`:toDayMonth
        const students= await this.getStudentsData()
        console.log(students)
        
        const attendanceList = students.map(item=>(
            {
                name:item.name,
                rollnum:item.rollnum,
                date:`${new Date().getFullYear()}-${updatedMonth}-${updatedDate}`,
                attendance:"NA"
            }
        ))
            console.log(attendanceList)
        this.setState({
            attendanceArray:attendanceList,
            date: `${new Date().getFullYear()}-${updatedMonth}-${updatedDate}`
        })
        
    }

    getStudentsData = async()=>{
        const fetching = await fetch("http://localhost:5000/getStudentsData")
        const response = await fetching.json()
        const data = await response
        this.setState({
            students: data
        })
        return data
    }

    changeStudentAttendance=(person_details)=>{
        const {rollnum,attendance}= person_details
        const {attendanceArray,date} =this.state
        const updatedArray=attendanceArray.map(item=>(
            item.rollnum===rollnum? {
                name:item.name,
                rollnum:item.rollnum,
                date,
                attendance:attendance,
            } :  item
        ))
        this.setState({
            attendanceArray:updatedArray
        })
    }

    changeDate=(e)=>{
        this.setState({
            date:e.target.value
        })
    }

    submitAttendance = ()=>{
        const {attendanceArray} =this.state
        console.log(attendanceArray)

        fetch("http://localhost:5000/AddAttendance",{
            method:"POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(attendanceArray)

        })
        .then(response=>response.json())
        .then(data=>console.log(data))

    }



    render(){

        const {date,students} =this.state
        return(
            <div className="attendance-page-body">
                <input className="attendance-date" value={date} onChange={this.changeDate} type="date" id="input"  />
                <table className="attendance-table">
                    <thead>
                        <tr className="attendance-table-head tr">
                            <th>Student Name</th>
                            <th>Roll Number</th>
                            <th>Attendance</th>
                        </tr>
                    </thead>
                    <tbody>
                        {students.map(item=>(
                            <AttendeeRow changeStudentAttendance={this.changeStudentAttendance} attendeeDetails={item} key={item.rollnum} />                            
                        ))}
                    </tbody>
                </table>
                <div className="attendance-submit-container">
                    <button onClick={this.submitAttendance} className="attendance-submit">Submit Attendance</button>
                    <Link className="link" to="/showAttendance"><button className="link-button attendance-submit">Show Attendance</button></Link>
                </div>
            </div>
        )
    }
}

export default StudentAttendance