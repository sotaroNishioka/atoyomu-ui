import {
  addDoc,
  collection,
  serverTimestamp,
  Timestamp
} from 'firebase/firestore'
import { registerMail } from '../../static/mail'
import { addTemporarilyRegisterConverter } from '../firebase/converter'
import { db } from '../firebase/firebaseInit'
import { addTime } from '../util/uuid'

const useMail = () => {
  /**
   * 仮登録時にメールを送信する処理
   * 認証用IDを発行しDBに保存したあと、メール送信を行う
   * @module sendSignUpMail
   * @param {string} email - メールを送信する対象のアドレス
   * @return {void}
   */
  const sendSignUpMail = async (email: string) => {
    const { id: registerId } = await addDoc(
      collection(db, 'temporarilyRegister').withConverter(
        addTemporarilyRegisterConverter
      ),
      {
        email,
        expiredAt: Timestamp.fromDate(addTime({ date: new Date(), hour: 1 })),
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp()
      }
    )
    addDoc(collection(db, 'mail'), {
      to: [email],
      message: {
        subject: '【ATOYOMU】仮登録完了のお知らせ',
        text: registerMail(email, registerId)
      },
      registerId
    })
  }
  return { sendSignUpMail }
}
export default useMail
