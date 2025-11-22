import { createUserWithEmailAndPassword } from "firebase/auth";
import { useState, type FormEvent } from "react";
import { useLocation, useNavigate } from "react-router-dom"
import { auth, db } from "../../firebase";
import { doc, setDoc } from "firebase/firestore";


export default function Signup() {
    const location = useLocation();
    const {email:defaultEmail, pw:defaultPw} = location.state || {email:"", pw:""};
    const [email, setEmail] = useState<string>(defaultEmail);
    const [pw, setPw] = useState<string>(defaultPw);
    const [showPw, setShowPw] = useState<boolean>(false);
    const nav = useNavigate();

    const handleSubmit = async(e: FormEvent<HTMLFormElement>)=>{
        e.preventDefault();
        try{
            const result = await createUserWithEmailAndPassword(auth,email.trim(),pw);
            const user = result.user;
            await setDoc(doc(db,"users4",user.uid),{
                name:"",
                email:email,
                createdAt: new Date(),
            });
            nav("/setname");
        }catch(err:any){
            alert("新規登録に失敗しました。"+err.code);
        }
    }


  return (
    <div className='signup'>
        <h2 className="title">新規登録</h2>

        <form action="" className="form" onSubmit={(e)=>handleSubmit(e)}>
            <input type="email" className="email" value={email} onChange={e=>setEmail(e.target.value)} placeholder="メール"/>
            <input type={showPw ? "text" : "password"} value={pw} onChange={e => setPw(e.target.value)} placeholder="パスワード" className="pw"/>
                <button type="button" className="button" onClick={() => setShowPw(!showPw)}>{showPw ? "非表示" : "表示"}</button>
                <input type="submit" value="新規登録" className="submit"/>
        </form>
    </div>
  )
}
