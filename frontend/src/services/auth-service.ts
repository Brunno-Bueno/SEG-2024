import { supabase } from "../@libs/supabase";
import { ICredential, IUSer} from "../@libs/types";

const signIn = async (credential: ICredential) => {
    const {data, error} = await supabase.auth.signInWithPassword({
        email: credential.username,
        password: credential.password
    });

    if (error) throw error;

    return data;
}

const signUp = async (user: IUSer)=>{
    const {data, error} = await supabase.auth.admin.createUser({
        user_metadata: { name: user.name},
        email: user.email,
        password: user.password,
        email_confirm: true
    });

    
    if (error) throw error;

    return data;
}

const getUser = async () => {
    const {data, error} = await supabase.auth.getSession();
    
    if (error) throw error;

    return data.session?.user;
}

export const AuthService = {
    signIn,
    signUp,
    getUser
}