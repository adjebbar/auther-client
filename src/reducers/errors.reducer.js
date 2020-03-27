import types from '../constants/actions.types.constants'

const initialState = {
  errors: []
}

export default (state = initialState, action) => {
  switch (action.type) {
    case types.CREATE_ERROR:
    case types.GET_AUTH_ERROR:
    case types.SET_PASSWORD_ERROR:
    case types.VALIDATE_PASSWORD_ERROR:
    case types.CREATE_ISSUER_ERROR:
    case types.GET_ISSUER_ERROR:
    case types.UPDATE_ISSUER_ERROR:
    case types.CREATE_MODEL_ERROR:
    case types.DESTROY_MODEL_ERROR:
    case types.GET_ALL_MODELS_ERROR:
    case types.GET_ONE_MODEL_ERROR:
    case types.GET_ALL_SIGNATURES_ERROR:
    case types.GET_ONE_SIGNATURE_ERROR:
    case types.CREATE_SIGNATURE_ERROR:
    case types.DESTROY_SIGNATURE_ERROR:
    case types.UPDATE_SIGNATURE_ERROR:
    case types.GET_BATCH_ERROR:
    case types.CREATE_BATCH_ERROR:
    case types.GET_ALL_BATCHES_ERROR:
    case types.SET_BATCH_ERROR:
    case types.SIGN_BATCH_ERROR:
    case types.SEND_TRANSACTION_ERROR:
    case types.CREATE_JOB_ERROR:
    case types.DESTROY_JOB_ERROR:
    case types.GET_JOBS_ERROR:
    case types.RUN_JOB_ERROR:
    case types.CREATE_REVOKED_ERROR:
    case types.DESTROY_REVOKED_ERROR:
    case types.GET_REVOKED_ERROR:
    case types.GET_CERTIFICATES_ERROR:
    case types.DESTROY_CERTIFICATE_ERROR:
    case types.GET_CERTIFICATE_ERROR:
    case types.GET_SHARED_CERTIFICATE_ERROR:
    case types.UPDATE_CERTIFICATE_ERROR:
      return {
        ...state,
        errors: [...state.errors, action.error]
      }

    case types.RESET_ERRORS:
      return initialState

    default:
      return state
  }
}
