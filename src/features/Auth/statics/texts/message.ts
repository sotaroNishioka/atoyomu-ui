/* eslint-disable import/prefer-default-export */
export const INVALID_TEMPORALY_REGISTER = {
  type: 'error',
  message:
    'ご登録いただいた内容が確認できませんでした。新規登録を再度行ってください。'
}

export const EXPIRED_TEMPORALY_REGISTER = {
  type: 'error',
  message: '仮登録の有効期限が切れています。新規登録を再度行ってください。'
}

export const EMAIL_ALREADY_IN_USE = {
  type: 'error',
  message:
    'このメールアドレスは既に登録されています。ログインを行うか、別のメールアドレスをお試しください。'
}

export const SIGNUP_UNEXPECTED_ERROR = {
  type: 'error',
  message:
    'プロフィール登録に失敗しました。画面をリロードして再度お試しください。'
}

export const INVALID_LOGIN_DATA = {
  type: 'error',
  message: 'ログインに失敗しました。時間をおいて再度お試しください。'
}
