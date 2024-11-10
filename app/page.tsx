import SignIn from "@/components/sign-in";
import {auth, signOut} from "@/lib/auth";
import SignOut from "@/components/sign-out";

export default async function Home() {

    const session = await auth()

    if (!session?.user) {
        return (
            <div>

                <SignIn/>
            </div>
        );
    }

    return (
        <div>
            Hello, {session.user.name} <br/>
            <img src={session.user.image || ''}/> <br/>
            {JSON.stringify(session)} <br/>

            <SignOut/>
        </div>
    )
}