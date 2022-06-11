import React, { useState } from 'react'
import axios from 'axios'
import * as styles from './contact-form.module.css'

const ContactForm = () => {
  const [serverState, setServerState] = useState({
    submitting: false,
    status: null,
  })
  const handleServerResponse = (ok, msg, form) => {
    setServerState({
      submitting: false,
      status: { ok, msg },
    })
    if (ok) {
      form.reset()
    }
  }
  const handleOnSubmit = (e) => {
    e.preventDefault()
    const form = e.target
    setServerState({ submitting: true })
    axios({
      method: 'post',
      url: 'https://server.consortiumskate31.org',
      data: new FormData(form),
    })
      .then((r) => {
        handleServerResponse(true, 'Merci!', form)
      })
      .catch((r) => {
        handleServerResponse(false, r.response.data.error, form)
      })
  }
  return (
    <div className={styles.formWrapper}> 
      <form onSubmit={handleOnSubmit} className={styles.form}>
        <div className={styles.group}>
          <label for="email" required="required">
            Email
          </label>
          <input
            type="email"
            name="email"
            id="email"
            aria-describedby="emailHelp"
            placeholder="Votre email"
            required="required"
          />
        </div>
        <div className={styles.group}>
          <label for="name" required="required">Nom</label>
          <input
            type="text"
            name="name"
            id="name"
            placeholder="Votre nom"
            required="required"
          />
        </div>
        <div className={styles.group}>
          <label for="message" required="required">Message</label>
          <textarea
            rows="10"
            name="message"
            id="message"
            placeholder="Votre message"
            required="required"
          />
        </div>
        <button
          type="submit"
          className="button"
          disabled={serverState.submitting}
        >
          Envoyer
        </button>
        {serverState.status && (
          <p className={!serverState.status.ok ? 'errorMsg' : ''}>
            {serverState.status.msg}
          </p>
        )}
      </form>
    </div>
  )
}

export default ContactForm
