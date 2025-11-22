import { useEffect, useState, type FormEvent } from "react"
import { useNavigate } from "react-router-dom";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth, db } from "../firebase";
import Login from "./Setup/Login";
import { doc, getDoc } from "firebase/firestore";


export default function Home() {

    const [genre, setGenre] = useState<string>("onePiece");
    const [difficulty, setDifficulty] = useState<string>("easy");
    const nav = useNavigate();
    const [user] = useAuthState(auth);
    const [userName, setUserName] = useState<string>("");

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        nav("quiz", { state: { genre, difficulty } });
    }
    useEffect(() => {
        const fetchName = async () => {
            if (!user) return;
            const ref = doc(db, "users4", user.uid);
            const snap = await getDoc(ref);
            if (snap.exists()) {
                setUserName(snap.data().name);
            }
        }
        fetchName();
    }, [user]);

    if (!user) {
        return <Login />
    }
    return (
        <div className="home">
            <h2 className="name">こんにちは{userName}さん！</h2>
            <h2 className="title">Home</h2>

            <form action="" className="form" onSubmit={(e) => handleSubmit(e)}>
                <label htmlFor="">
                    ジャンルを選択：
                    <select name="" id="" value={genre} onChange={e => setGenre(e.target.value)}>
                        <option value="onePiece">ワンピース</option>
                    </select>
                </label>

                <label htmlFor="">
                    難易度を選択：
                    <select name="" id="" value={difficulty} onChange={e => setDifficulty(e.target.value)}>
                        <option value="easy">Easy</option>
                        <option value="normal">Normal</option>
                        <option value="hard">Hard</option>
                    </select>
                </label>
                <input type="submit" className="submit" value="START" />
            </form>

            <button className="btn" onClick={() => auth.signOut()}>ログアウト</button>


        </div>
    )
}
