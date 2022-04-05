export type UseMail = {
  /**
   * 仮登録時にメールを送信する処理
   * 認証用IDを発行しDBに保存したあと、メール送信を行う
   * @module sendSignUpMail
   * @param {string} email - メールを送信する対象のアドレス
   * @return {void}
   */
  sendSignUpMail: (email: string) => Promise<void>
}
