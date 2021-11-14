import { call, put, takeEvery, takeLatest } from 'redux-saga/effects'

function* mySaga() {
  yield takeLatest("USER_FETCH_REQUESTED", ()=>{}));
}

export default mySaga;