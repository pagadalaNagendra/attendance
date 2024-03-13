import { Component } from "react";
import "./index.css"

class AttendeeRow extends Component{
    render(){

        const {attendeeDetails,changeStudentAttendance} = this.props

        const changeAttendance= (e)=>{
            const studentDetails={
                rollnum:attendeeDetails.rollnum,
                attendance:e.target.value
            }
            changeStudentAttendance(studentDetails)
        }

        return(
            <tr key={attendeeDetails.rollnum}>
                <td>
                    {attendeeDetails.name}
                </td>
                <td>
                    {attendeeDetails.rollnum}
                </td>
                <td>
                    <select onChange={changeAttendance}>
                        <option>NA</option>
                        <option>present</option>
                        <option>Absent</option>
                    </select>
                </td>
            </tr>
        )
    }
}

export default AttendeeRow