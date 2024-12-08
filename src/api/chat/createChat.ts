import { collection, addDoc } from 'firebase/firestore';
import { db } from '@/utils/firebase';

export const createChat = async (deliveryPersonId: string, userId: string) => {
  try {
    const chatRef = collection(db, 'chats');
    const newChat = await addDoc(chatRef, {
      type: 'deliveryPerson-user',
      participants: [deliveryPersonId, userId],
    });
    return newChat.id;
  }
  catch(error){
    console.error('Error creating chat: ', error);
  }
};
