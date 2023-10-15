// Write your code here
import {Component} from 'react'
import {v4 as uuidv4} from 'uuid'
import './index.css'
import AppointmentItem from '../AppointmentItem'

class Appointments extends Component {
  state = {
    title: '',
    date: '',
    appointments: [],
    isStarredFilterActive: false,
  }

  handleInputChange = event => {
    const {name, value} = event.target
    this.setState({[name]: value})
  }

  handleAddAppointment = event => {
    event.preventDefault()
    const {title, date} = this.state
    if (title && date) {
      const newAppointment = {
        id: uuidv4(),
        title,
        date,
        isStarred: false,
      }

      this.setState(prevState => ({
        title: '',
        date: '',
        appointments: [...prevState.appointments, newAppointment],
      }))
    }
  }

  toggleStar = id => {
    this.setState(prevState => ({
      appointments: prevState.appointments.map(appointment => {
        if (appointment.id === id) {
          return {...appointment, isStarred: !appointment.isStarred}
        }
        return appointment
      }),
    }))
  }

  toggleStarredFilter = () => {
    this.setState(prevState => ({
      isStarredFilterActive: !prevState.isStarredFilterActive,
    }))
  }

  render() {
    const {title, date, appointments, isStarredFilterActive} = this.state
    const filteredAppointments = isStarredFilterActive
      ? appointments.filter(appointment => appointment.isStarred)
      : appointments

    return (
      <div className="bg-container">
        <div className="appointments-app-container">
          <div className="appointments-card">
            <div className="add-appointment">
              <h1 className="heading">Add Appointment</h1>
              <form onSubmit={this.handleAddAppointment} className="form">
                <div className="input-container">
                  <label htmlFor="title" className="label">
                    Title
                  </label>
                  <br />
                  <input
                    type="text"
                    id="title"
                    name="title"
                    value={title}
                    placeholder="Title"
                    onChange={this.handleInputChange}
                    className="input"
                  />
                </div>
                <div className="input-container">
                  <label htmlFor="date" className="label">
                    Date
                  </label>
                  <br />
                  <input
                    type="date"
                    id="date"
                    name="date"
                    value={date}
                    onChange={this.handleInputChange}
                    className="input"
                  />
                </div>
                <button type="submit" className="add-button">
                  Add
                </button>
              </form>
            </div>
            <img
              src="https://assets.ccbp.in/frontend/react-js/appointments-app/appointments-img.png"
              alt="appointments"
              className="appointments-img"
            />
          </div>
          <hr className="divider" />
          <div className="appointments-list">
            <div className="list-header">
              <h1 className="heading">Appointments</h1>
              <button
                type="button"
                className={`star-filter-button ${
                  isStarredFilterActive ? 'active' : ''
                }`}
                onClick={this.toggleStarredFilter}
              >
                Starred
              </button>
            </div>
            <ul className="appointment-items">
              {filteredAppointments.map(appointment => (
                <AppointmentItem
                  key={appointment.id}
                  appointment={appointment}
                  toggleStar={this.toggleStar}
                />
              ))}
            </ul>
          </div>
        </div>
      </div>
    )
  }
}

export default Appointments
