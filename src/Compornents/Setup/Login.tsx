import { collection, doc, getDoc, getDocs, query, where } from "firebase/firestore";
import { useState, type FormEvent } from "react"
import { useNavigate } from "react-router-dom";
import { auth, db } from "../../firebase";
import { GoogleAuthProvider, signInWithEmailAndPassword, signInWithPopup } from "firebase/auth";


export default function Login() {
    const [email, setEmail] = useState<string>("");
    const [pw, setPw] = useState<string>("");
    const [showPw, setShowPw] = useState<boolean>(false);
    const nav = useNavigate();

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            const q = query(collection(db, "users4"),
                where("email", "==", email.trim()));
            const snap = await getDocs(q);

            if (snap.empty) {
                alert("このメールアドレスは登録されていません。新規登録に進みます。");
                nav("/signup", { state: { email, pw } });
                return
            }
            await signInWithEmailAndPassword(auth, email.trim(), pw);
            alert("ログインしました！");
            nav("/");
        } catch (err: any) {
            alert("ログインに失敗しました。" + err.code);
        }
    }


    const handleGoogle = async () => {
        try {
            const googleProvider = new GoogleAuthProvider();
            const result = await signInWithPopup(auth, googleProvider);
            const user = result.user;
            const ref = doc(db, "users4", user.uid);
            const snap = await getDoc(ref);
            if (!snap.exists()) {
                nav("/setname");
                return;

            }
            alert("ログインしました！");
            nav("/");

        } catch (err: any) {
            alert("ログインに失敗しました。" + err.code);
        }
    }

    const handleSet = () => {
        nav("/signup");
    }

    return (
        <div className="login">
            <h2 className="title">Login</h2>
            <form action="" className="form" onSubmit={(e) => handleSubmit(e)}>
                <input type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="メール" className="email" />
                <input type={showPw ? "text" : "password"} value={pw} onChange={e => setPw(e.target.value)} placeholder="パスワード" className="pw" />

                <button type="button" className="button" onClick={() => setShowPw(!showPw)}>{showPw ? "非表示" : "表示"}</button>
                <input type="submit" value="ログイン" className="submit" />
            </form>

            <div className="btn">
                <button onClick={handleGoogle}>Googleでログイン</button>
                <button onClick={handleSet}>新規登録</button>

            </div>



        </div>
    )
}
