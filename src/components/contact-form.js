import React from 'react'
import * as styles from './contact-form.module.css'

const functionURL = 'https://server.consortiumskate31.org'

class ContactForm extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      buttonDisabled: true,
      message: { fromEmail: '', subject: '', body: '' },
      submitting: false,
      error: null,
    }
  }

  onClick = async (event) => {
    event.preventDefault()
    this.setState({ submitting: true })
    const { fromEmail, subject, body } = this.state.message

    const response = await fetch(functionURL, {
      method: 'post',
      headers: {
        'Content-type': 'application/x-www-form-urlencoded; charset=UTF-8',
      },
      body: new URLSearchParams({ fromEmail, subject, body }).toString(),
    })
    if (response.status === 200) {
      this.setState({
        error: null,
        submitting: false,
        message: {
          fromEmail: '',
          subject: '',
          body: '',
        },
      })
    } else {
      const json = await response.json()
      this.setState({
        error: json.error,
        submitting: false,
      })
    }
  }

  onChange = (event) => {
    const name = event.target.getAttribute('name')
    this.setState({
      message: { ...this.state.message, [name]: event.target.value },
    })
  }
  render() {
    return (
      <div className={styles.formWrapper}>
        <div>{this.state.error}</div>
        <form className={styles.form} method="post" action={functionURL}>
          <div className={styles.group}>
            <label htmlFor="fromEmail">Email</label>
            <input
              type="email"
              name="fromEmail"
              id="fromEmail"
              value={this.state.message.fromEmail}
              onChange={this.onChange}
            />
          </div>
          <div className={styles.group}>
            <label htmlFor="subject">Sujet</label>
            <input
              type="text"
              name="subject"
              id="subject"
              value={this.state.message.subject}
              onChange={this.onChange}
            />
          </div>
          <div className={styles.group}>
            <label htmlFor="body">Message</label>
            <textarea
              style={{
                height: `125px`,
              }}
              name="body"
              id="body"
              value={this.state.message.body}
              onChange={this.onChange}
            />
          </div>
          <button
            className="button"
            type="submit"
            disabled={this.state.submitting}
            onClick={this.onClick}
          >
            Envoyer
          </button>
        </form>
      </div>
    )
  }
}

export default ContactForm
