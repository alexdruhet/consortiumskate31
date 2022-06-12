import React, { useState } from 'react'
import * as styles from './contact-form.module.css'

const ContactForm1 = () => {
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

    const response = await fetch(functionURL, {
      method: 'post',
      headers: {
        'Content-type': 'application/x-www-form-urlencoded; charset=UTF-8',
      },
      body: new FormData(form),
    })
    if (response.status === 200) {
      handleServerResponse(true, 'Votre message a bien été envoyé, merci !', form)
    } else {
      const json = await response.json()
      msg = `Désolé votre message n'a pas pu être envoyé (${json.error}).`;
        handleServerResponse(false, msg, form)
    }
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

export default ContactForm1
