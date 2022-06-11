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
        handleServerResponse(true, 'Votre message a bien été envoyé, merci !', form)
      })
      .catch((r) => {
        console.log(r)
        let msg = r.message
        if (r.response.data && r.response.data.error) {
          msg = r.response.data.error
        }
        msg = `Désolé votre message n'a pas pu être envoyé (${msg}).`;
        handleServerResponse(false, msg, form)
      })
  }
  return (
    <div className={styles.formWrapper}>
      <form onSubmit={handleOnSubmit} className={styles.form}>
        {serverState.status && (
          <p className={!serverState.status.ok ? 'error' : 'success'}>
            {serverState.status.msg}
          </p>
        )}
        <div className={styles.group}>
          <label htmlFor="email" required="required">
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
          <label htmlFor="name" required="required">
            Nom
          </label>
          <input
            type="text"
            name="name"
            id="name"
            placeholder="Votre nom"
            required="required"
          />
        </div>
        <div className={styles.group}>
          <label htmlFor="message" required="required">
            Message
          </label>
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
          {serverState.submitting ? 'En cours de traitement…' : 'Envoyer'}
        </button>
      </form>
    </div>
  )
}

export default ContactForm
