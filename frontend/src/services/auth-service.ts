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


const signOut = async () => {
    const {error} = await supabase.auth.signOut();

    if (error) throw error;

}

const getUser = async () => {
    const {data, error} = await supabase.auth.getSession();
    
    if (error) throw error;

    return data.session?.user;
}

const configure = async () => {
        const {data, error} = await supabase.auth.mfa.enroll({
            factorType: 'totp',
            issuer: 'SEG-2024',
            friendlyName: 'SEG-2024'
        })
        


        if (error) throw error;

        return data;
}

const getFactoryId = async () =>{
    const {error} = await supabase.auth.mfa.listFactors();

    if (error) throw error;

    return { factorID: data.totp.lenght > 0 ? data.totp(0).id : ''}
}

const verifyCode = async (factorID: string, code: string) => { 
    const {data, error} = await supabase.auth.mfa.challengeAndVerify((
        code: code,
        factorId: factorId,
    ));


    if (error) throw error;

    return data;
}

const remove = async (factorID: string) => {
    const {data, error} = await supabase.auth.mfa.unenroll((

    

    ));

    if (error) throw error;
}

const mfa = {
    configure,
    getFactoryId
}

export const AuthService = {
    signIn,
    signUp,
    getUser,
    signOut,
    mfa,
    verifyCode
}