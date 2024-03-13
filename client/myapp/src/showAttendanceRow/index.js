import { Component } from "react";

class ShowAttendanceRow extends Component {
  state = {
    attendance: {},
  };

  componentDidMount() {
    this.getStudentAttendance();
  }

  componentDidUpdate(prevProps){
    if (prevProps.month !== this.props.month || prevProps.year !== this.props.year) {
      this.getStudentAttendance();
    }
  }

  getStudentAttendance = () => {
    const { month, year, dates, student } = this.props;
    console.log("this is month,year", month ,year)
    const updatedMonth = month < 10 ? `0${month}` : month;
    const { attendance } = this.state;
    let completedRequests = 0; 

    const newAttendance = { ...attendance };

    Promise.all(
      dates.map((date) => {
        const updatedDate = date < 10 ? `0${date}` : date;
        const Day = new Date()
        const today = Day.getDate()
        const thisYear = Day.getFullYear()
        const thisMonth = Day.getMonth()+1
        return fetch(
          `http://localhost:5000/studentAttendance?rollnum=${student.rollnum}&date=${year}-${updatedMonth}-${updatedDate}`
        )
          .then((response) => response.json())
          .then((data) => {
            if( year>=thisYear && month>=thisMonth){
              // if()
              if(date>today || month>thisMonth || year>thisYear){
                newAttendance[date]=""
              }
              else{
                if (data.length === 0) {
                  newAttendance[date] = "Holiday";
                } else if (data[0].attendance === "Absent") {
                  newAttendance[date] = "A";
                } else if (data[0].attendance === "present") {
                  newAttendance[date] = "P";
                } else if (data[0].attendance === "NA") {
                  newAttendance[date] = "NA";
                }
              }
            }
            else{
            if (data.length === 0) {
              newAttendance[date] = "Holiday";
            } else if (data[0].attendance === "Absent") {
              newAttendance[date] = "A";
            } else if (data[0].attendance === "present") {
              newAttendance[date] = "P";
            } else if (data[0].attendance === "NA") {
              newAttendance[date] = "NA";
            }
          }
            completedRequests++;

            if (completedRequests === dates.length) {
              this.setState({
                attendance: newAttendance,
              });
            }
          })
          .catch((e) => console.log(e));
      })
    );
  }

  render() {

    const { student, dates } = this.props;
    const { attendance } = this.state;
    return (
      <>
      <tr>
        <td>{student.name}</td>
        <td>{student.rollnum}</td>
        {dates.map((item) => (
          <td key={item}>{attendance[item]}</td>
        ))}
      </tr>
      </>
    );
  }
}

export default ShowAttendanceRow;
