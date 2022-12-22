import { useEffect, useState } from "react";

// ========================CUSTOM HOOK FOR GET JWT
const useToken = (email) => {
    const [token, setToken] = useState('');

    useEffect(() => {
        if(email){
            fetch(`https://b612-used-products-resale-server-side-elamonii.vercel.app/jwt?email=${email}`)
            .then(res => res.json())
            .then(data => {
                if(data.accessToken){
                    console.log('got jwt');
                    console.log(data.accessToken);
                    localStorage.setItem('accessToken', data.accessToken);
                    setToken(data.accessToken);
                }
            })            
        }
    }, [email])
    return [token];
}

export default useToken;
