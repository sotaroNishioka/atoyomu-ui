/* eslint-disable import/prefer-default-export */
import {
  DocumentData,
  FirestoreDataConverter,
  QueryDocumentSnapshot,
  SnapshotOptions
} from 'firebase/firestore'
import { TemporarilyRegister } from '../type/db'

/**
 * fireStoreでtemporarilyRegisterを追加する場合のコンバータ
 * fireStoreからの取得時にservertimestamp型をdateに変換する
 * @module addTemporarilyRegisterConverter
 */
export const addTemporarilyRegisterConverter: FirestoreDataConverter<TemporarilyRegister> =
  {
    toFirestore(temporarilyRegister): DocumentData {
      return temporarilyRegister
    },
    fromFirestore(
      snapshot: QueryDocumentSnapshot,
      options: SnapshotOptions
    ): TemporarilyRegister {
      const data = snapshot.data(options)
      return {
        email: data.email,
        expiredAt: data.expiredAt.toDate(),
        createdAt: data.createdAt.toDate(),
        updatedAt: data.updatedAt.toDate()
      }
    }
  }
