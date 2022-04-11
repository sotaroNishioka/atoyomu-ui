import {
  addDoc,
  collection,
  serverTimestamp,
  Timestamp
} from 'firebase/firestore'
import { temporarilyRegisterConverter } from '../firebase/converter'
import { db } from '../firebase/firebaseApp'
import { registerMail } from '../static/texts/mail'
import { UseMail } from '../types/hooks/useMail'
import { addTime } from '../util/uuid'

const useMail = (): UseMail => {
  // 仮登録メール送信処理
  const sendSignUpMail = async (email: string) => {
    // 仮登録テーブルに登録履歴を追加
    const { id: registerId } = await addDoc(
      collection(db, 'temporarilyRegister').withConverter(
        temporarilyRegisterConverter
      ),
      {
        email,
        expiredAt: Timestamp.fromDate(addTime({ date: new Date(), hour: 1 })),
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp()
      }
    )
    // firebaseのtriggerMailExtentionにメール送信内容を登録する
    // SendGridからメールが送信される
    addDoc(collection(db, 'mail'), {
      to: [email],
      message: {
        subject: '【ATOYOMU】仮登録完了のお知らせ',
        text: registerMail(email, registerId)
      },
      registerId
    })
    // ただしこれらはエラーは返さないので必ずvoidなundefinedを返す
  }
  return { sendSignUpMail }
}
export default useMail
