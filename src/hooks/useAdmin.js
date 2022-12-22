import { useEffect, useState } from "react";

// ========================CUSTOM HOOK FOR CHECK IF USER IS ADMIN
const useAdmin = (email) => {
    // console.log(email);
    const [isAdmin, setIsAdmin] = useState(false);

    const [isAdminLoading, setIsAdminLoading] = useState(true);
    
    useEffect(() => {
        if(email){
            fetch(`https://b612-used-products-resale-server-side-elamonii.vercel.app/users/admin/${email}`)
            .then(res => res.json())
            .then(data => {
                setIsAdmin(data.isAdmin);
                setIsAdminLoading(false);
            })
        }
    }, [email]);
    return [isAdmin, isAdminLoading];

}

export default useAdmin;