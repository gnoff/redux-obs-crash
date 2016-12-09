// import { combineEpics } from 'redux-observable'
import { combineEpics, combineEpics2 } from './combineEpics'
import { combineReducers } from 'redux'
import { Observable } from 'rxjs'
import request from 'superagent'

const myReducer = (state, action) => {
  return {
    action,
  }
}

const someSuccessMapperWithTick = tick => payload => ({ type: 'SUCCESS_ACTION', payload, tick })

const myEpic = (
  action$,
) => {
  return action$
    .ofType('AN_ACTION')
    .switchMap(action => {
      return Observable.timer(0, 1000)
        .switchMap(tick => {
          return Observable.from(fetch('http://api.fubo.tv/heartbeat').then(res => 'all done' + tick))
            .map(someSuccessMapperWithTick(tick))
            .catch(error => {
              console.log('error in Observable.from')
              return Observable.empty()
            })
        })
        .catch(error => {
          console.log('error in Observable.timer')
          return Observable.empty()
        })
    })
    .catch(error => {
      console.log('error in Observable.ofType')
      return Observable.empty()
    })
}



// export const rootEpic = combineEpics(
//   myEpic,
// )

export const rootEpic = combineEpics2(
  myEpic,
)

export const rootReducer = combineReducers({
  myReducer,
})
