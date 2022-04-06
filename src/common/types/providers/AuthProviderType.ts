import { User } from 'firebase/auth'

export type AuthContextType = {
  /**
   * {User | null | undefined}
   * ログイン中のユーザー
   * nullは初期状態。
   * 取得後、ユーザーが存在しない場合はundefinedになる
   * 存在する場合はfirebasemのUser型を返す
   */
  user: User | null | undefined
  /**
   * ログイン済みか否かを返す。
   * ログイン中の場合はtrue
   * 未ログインの場合はfalseを返す
   */
  isLogin: boolean
  /**
   * メールアドレスが認証済みであるか。
   * trueの場合は認証済み。未認証はfalse
   */
  isEmailVerified: boolean
  /**
   * メールアドレスとパスワードでの新規「本登録」の場合に利用する。
   * @param {string} email 新規登録に利用するメールアドレス
   * @param {string} password
   * @returns {Promise<void>} 何も返さない
   */
  signUpWithEmail: (email: string, password: string) => Promise<void>
  /**
   * googleアカウントでログインする
   * @returns {void} void
   */
  signUpWithGoogle: () => Promise<void>
  /**
   * googleアカウントでログインする
   * @returns {void} void
   */
  signUpWithTwitter: () => void
  /**
   * メールアドレスとパスワードでのログインの場合に利用する。
   * @param {string} email 新規登録に利用するメールアドレス
   * @param {string} password
   * @returns {Promise<void>} 何も返さない
   */
  signInWithEmail: (email: string, password: string) => Promise<void>
  /**
   * ログアウトを実行する
   * @returns {void} void
   */
  logOut: () => void
  /**
   * 引数のメールアドレスに仮登録メールを送信する
   * 送信が完了すると/sendmail
   * @param {string} email
   * @returns {Promise<void>} void
   */
  createTemporarilyRegister: (email: string) => void
  /**
   * 仮登録IDから対象のメールアドレスを取得する
   * @param {string | undefined | string[]} id 仮登録のID、URLクエリから取得する
   * @returns {Promise<string>} メールアドレスを返す
   */
  getEmailByRegisterId: (id: string | undefined | string[]) => Promise<string>
  /**
   * 引数のメールアドレスが既に利用されているか確認する
   * @param email
   * @returns {boolean} true: 既に存在する false: 存在しない
   */
  getIsEmailUserExsits: (email: string) => Promise<boolean>
}
