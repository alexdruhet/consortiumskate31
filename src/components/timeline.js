import React from 'react'
import * as styles from './timeline.module.css'
import moment from 'moment'
import 'moment/locale/fr'
import TimelinePost from './timeline-post'

const Timeline = ({ milestones }) => {
  if (!milestones) return null
  if (!Array.isArray(milestones)) return null
  moment.locale('fr')

  return (
    <div className={styles.timeline}>
      <h2 className={styles.title}>Chronologie</h2>
      <ul className={styles.milestoneList}>
        {milestones.map((milestone) => {
          return (
            <li key={milestone.id} className={styles.milestoneItem}>
              <time className={styles.milestoneDate} datetime={milestone.date}>
                {moment(milestone.date).format('LL')}
              </time>
              <div className={styles.milestoneContent}>
                <h3 className={styles.milestoneTitle}>{milestone.title}</h3>
                {milestone.post && <TimelinePost posts={milestone.post} />}
              </div>
            </li>
          )
        })}
      </ul>
    </div>
  )
}

export default Timeline
