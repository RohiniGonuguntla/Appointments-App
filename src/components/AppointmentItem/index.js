// Write your code here
import {Component} from 'react'
import {format} from 'date-fns'
import './index.css'

class AppointmentItem extends Component {
  render() {
    const {appointment, toggleStar} = this.props
    const {title, date, isStarred} = appointment
    const formattedDate = format(new Date(date), 'dd MMMM yyyy, EEEE')

    return (
      <li className="appointment-item">
        <div className="appointment-details">
          <p className="appointment-title">{title}</p>
          <p className="appointment-date">{formattedDate}</p>
        </div>
        <button
          type="button"
          className={`star-button ${isStarred ? 'starred' : ''}`}
          onClick={() => toggleStar(appointment.id)}
          data-testid="star"
        >
          <img
            src={
              isStarred
                ? 'https://assets.ccbp.in/frontend/react-js/appointments-app/filled-star-img.png'
                : 'https://assets.ccbp.in/frontend/react-js/appointments-app/star-img.png'
            }
            alt="star"
          />
        </button>
      </li>
    )
  }
}

export default AppointmentItem
