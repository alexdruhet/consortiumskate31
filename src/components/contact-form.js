import React from 'react'
import * as styles from './contact-form.module.css'

const ContactForm = () => {
  return (
    <form
      className={styles.form}
      method="post"
      action="https://server.consortiumskate31.org"
    >
      <label className={styles.fieldName}>
        Nom <input type="text" name="name" id="name" />
      </label>
      <label className={styles.fieldEmail}>
        Email <input type="email" name="email" id="email" />
      </label>
      <label className={styles.fieldSubject}>
        Sujet <input type="text" name="subject" id="subject" />
      </label>
      <label className={styles.fieldMessage}>
        Message <textarea name="message" id="message" rows="5" />
      </label>
      <div className={styles.buttons}>
        <button type="submit" className={styles.buttonSubmit}>
          Envoyer
        </button>
        <input
          type="reset"
          value="Réinitialiser"
          className={styles.buttonReset}
        />
      </div>
    </form>
  )
}

export default ContactForm
