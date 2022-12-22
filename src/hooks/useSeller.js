import { useEffect, useState } from "react";

// ========================CUSTOM HOOK FOR CHECK IF USER IS ADMIN
const useSeller = (email) => {
    // console.log(email);
    const [isSeller, setIsSeller] = useState(false);

    const [isSellerLoading, setIsSellerLoading] = useState(true);
    
    useEffect(() => {
        if(email){
            fetch(`https://b612-used-products-resale-server-side-elamonii.vercel.app/users/seller/${email}`)
            .then(res => res.json())
            .then(data => {
                setIsSeller(data.isSeller);
                setIsSellerLoading(false);
            })
        }
    }, [email]);
    return [isSeller, isSellerLoading];

}

export default useSeller;