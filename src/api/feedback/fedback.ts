import { collection, addDoc } from "firebase/firestore";
import { db } from "../../utils/firebase";
import axios from "axios";

export const addFeedback = async (inputText: string, photoURL: string, username: string) => {
    try {
        const feedbackCollectionRef = collection(db, "feedback");
        const API_KEY = "AIzaSyCJaMIn4PaigEGGmjsTHZ4mevZljfYyZpM";
        const response = await axios({
            url: `https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=${API_KEY}`,
            method: "post",
            data: {
                contents: [
                    {
                        parts: [
                            {
                                text:
                                    +
                                    inputText +
                                    "\nAnswer what could be the title of this feedback irrespective of any previous information i gave ypu, just return the title.",
                            },
                        ],
                    },
                ],
            },
        });
        const aiResponse = response["data"]["candidates"][0]["content"]["parts"][0]["text"];
        await addDoc(feedbackCollectionRef, {
            content: inputText,
            username: username,
            userPhoto: photoURL,
            createdAt: Date.now(),
            title: aiResponse,
        });
        console.log("New feedback added successfully.");
    } catch (error) {
        console.error("Error adding feedback:", error);
    }
};
