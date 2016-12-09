import { merge } from 'rxjs/observable/merge'
import { Observable, Scheduler } from 'rxjs'

/**
  Merges all epics into a single one.
 */
export const combineEpics = (...epics) => (...args) =>
  merge(
    ...epics.map(epic => {
      const output$ = epic(...args).catch(error => {
        console.log('an error in merged epic obs', error)
        return Observable.empty()
      })
      if (!output$) {
        throw new TypeError(`combineEpics: one of the provided Epics "${epic.name || '<anonymous>'}" does not return a stream. Double check you're not missing a return statement!`)
      }
      return output$
    })
  ).catch(error => {
    console.log('an error in root epic obs', error)
    return Observable.empty()
  })

export const combineEpics2 = (...epics) => (...args) =>
  merge(
    ...epics.map(epic => {
      const output$ = epic(...args).catch(error => {
        console.log('an error in merged epic obs', error)
        return Observable.empty()
      })
      if (!output$) {
        throw new TypeError(`combineEpics: one of the provided Epics "${epic.name || '<anonymous>'}" does not return a stream. Double check you're not missing a return statement!`)
      }
      return output$
    })
  )
  .catch((error, source) => {
    console.log('catching in root epic obs')
    Observable.throw(error, Scheduler.async).subscribe()
    return source
  })
