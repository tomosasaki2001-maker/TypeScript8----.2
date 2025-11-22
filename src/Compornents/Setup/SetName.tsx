import { useState, type FormEvent } from "react"
import { useNavigate } from "react-router-dom";
import { auth, db } from "../../firebase";
import { doc, setDoc } from "firebase/firestore";


export default function SetName() {
    const [name, setName] = useState<string>("");
    const nav = useNavigate();
    const user = auth.currentUser;

    const handleSubmit = async(e: FormEvent<HTMLFormElement>)=>{
        e.preventDefault();
        if(!user){
            alert("ログイン情報がありません。");
            return;
        }
        await setDoc(doc(db,"users4",user.uid),{
            name:name,
            email:user.email,
            createdAt: new Date(),
        });
        alert("ユーザー名を登録しました！");
        nav("/",{state:{name}});
    }

    
  return (
    <div className="setname">
        <h2 className="title">ユーザー名を決めてください</h2>
        <form action="" className="form" onSubmit={(e)=>handleSubmit(e)}>
            <input type="text"  className="text" value={name} onChange={e=>setName(e.target.value)} placeholder="ユーザー名"/>
            <input type="submit" className="submit" value="決定"/>
        </form>
    </div>
  )
}
