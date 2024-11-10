
"use client"
import { signIn } from "next-auth/react"

export default function SignIn() {
    return (
        <div>
            <button onClick={() => signIn("google")}>hello google</button>
            <button onClick={() => signIn("mailru")}>hello mailru</button>
            <button onClick={() => signIn("yandex")}>hello yandex</button>
        </div>
    )
}
