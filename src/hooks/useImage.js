import { useEffect, useState } from "react";

// ========================CUSTOM HOOK FOR CHECK IF USER IS ADMIN
const useImage = (url, data) => {
    const [photoUrl, setPhotoUrl] = useState('');
    const [isImageLoading, setIsImageLoading] = useState(true);
    
    useEffect(() => {
        if(url && data){            
            fetch(url, {
                method:'POST',
                body:data
            })
            .then(res=>res.json())
            .then(imgData=> {
                console.log(imgData)
                if(imgData.success){
                    console.log('image uploaded');
                    console.log(imgData);
                    const photoUrl = imgData?.data?.url;
                    setPhotoUrl(photoUrl);
                    setIsImageLoading(false);
                }else{
                    console.log('wrong upload')
                }
            })            
            
            // fetch(`https://b612-used-products-resale-server-side-elamonii.vercel.app/users/admin/${email}`)
            // .then(res => res.json())
            // .then(data => {
            //     setIsAdmin(data.isAdmin);
            //     setIsAdminLoading(false);
            // })
        }
    }, [url, data]);
    return [photoUrl, isImageLoading];

}

export default useImage;