import React from 'react'
import Container from './container'
import * as styles from './timeline.module.css'

const Timeline = ({ milestones }) => {
  if (!milestones) return null
  if (!Array.isArray(milestones)) return null

  return (
    <Container>
      <ul className={styles.milestoneList}>
        {milestones.map((milestone) => {
          return (
            <li key={milestone.id}>
              <h2 className={styles.title}>{milestone.title}</h2>
              <div className={styles.meta}>
                <small className="meta">{milestone.date}</small>
              </div>
            </li>
          )
        })}
      </ul>
    </Container>
  )
}

export default Timeline
