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

  const handleOnSubmit = async (e) => {
    e.preventDefault()
    const form = e.target
    setServerState({ submitting: true })

    const response = await fetch('https://server.consortiumskate31.org/', {
    //const response = await fetch('http://localhost:8076', {
      method: 'post',
      mode: 'cors',
      cache: "no-cache",
      body: new FormData(form),
    })

    if (response.status === 200) {
      handleServerResponse(true, 'Votre message a bien été envoyé, merci !', form)
    } else {
      const json = await response.json()
      const msg = `Désolé votre message n'a pas pu être envoyé (${json.message}).`;
        handleServerResponse(false, msg, form)
    }
  }

  return (
    <div className={styles.formWrapper}>
      <form onSubmit={handleOnSubmit} className={styles.form}>
        {serverState.status && (
          <p className={!serverState.status?.ok ? 'error' : 'success'}>
            {serverState.status?.msg}
          </p>
        )}
        <div className={styles.group}>
          <label htmlFor="email-from" required="required">
            Email
          </label>
          <input
            type="email"
            name="email_from"
            id="email-from"
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
