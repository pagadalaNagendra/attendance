import './App.css';
import StudentAttendance from './Attendance';
import {BrowserRouter,Route,Switch,Path} from "react-router-dom"
import ShowAttendance from './showAttendance';

function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route path='/studentAttendance' component={StudentAttendance} />
        <Route path='/showAttendance' component={ShowAttendance} />
      </Switch>
    </BrowserRouter>
  );
}

export default App;
