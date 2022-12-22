import React, { useContext } from 'react';
import toast from 'react-hot-toast';
import { AuthContext } from '../../contexts/AuthProvider';

const PurchaseModal = ({productDetails}) => {
    const {user} = useContext(AuthContext);

    const handleBookNow = (selectedItem) => {
        const buyerId = user.uid;
        const buyerName = user.displayName;
        const buyerEmail = user.email;
        const itemId = productDetails._id;
        const sellerId = productDetails.userId;
        const sellerName = productDetails.userName;
        const sellerEmail = productDetails.userEmail;
        const sellerVerified = productDetails.sellerVerified;
        const itemName = productDetails.productName;
        const itemCategory = productDetails.productCategory;
        const itemResalePrice = productDetails.resalePrice;
        const itemOriginalPrice = productDetails.originalPrice;
        const itemPostedOn = productDetails.created;
        const itemImage = productDetails.productImage;
        const itemCreated = productDetails.created;

        const wishListData = {
            buyerId,
            buyerName,
            buyerEmail,
            itemId,
            sellerId,
            sellerName,
            sellerEmail,
            sellerVerified,
            itemName,
            itemCategory,
            itemResalePrice,
            itemOriginalPrice,
            itemPostedOn,
            itemImage,
            itemCreated
        }

        fetch('https://b612-used-products-resale-server-side-elamonii.vercel.app/wishlists/add', {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(wishListData)
        })
        .then(res => res.json())
        .then(data => {
            console.log(data);
            console.log('Wishlist data added to mongodb');
        })
        
        console.log(selectedItem);
        toast.success('Item Booked');
    }
    return (
        <>

            <input type="checkbox" id="purchase-modal" className="modal-toggle" />
            <div className="modal">
            <div className="modal-box relative">
                <label htmlFor="purchase-modal" className="btn btn-sm btn-circle absolute right-2 top-2">✕</label>
                <h3 className="text-lg font-bold">Buyer Info</h3>
                <p className="py-2 font-semibold">Name: {user.displayName}</p>
                <p className="py-2 font-semibold">Email: {user.email}</p>
                <p className="py-2 font-semibold">Item Name: {productDetails.productName}</p>
                <p className="py-2 font-semibold">Price: {productDetails.resalePrice}</p>
                <p>
                    <div className="form-control w-full max-w-xs">
                    <label className="label">
                        <span className="label-text">Meet Location</span>
                    </label>
                    <input name='buyLocation' type="text" placeholder="Type here" className="input input-bordered w-full max-w-xs" />
                    </div>                    
                </p>
                <p>
                    <div className="form-control w-full max-w-xs">
                    <label className="label">
                        <span className="label-text">Contact Number</span>
                    </label>
                    <input name='buyerContact' type="text" placeholder="Type here" className="input input-bordered w-full max-w-xs" />
                    </div>                    
                </p>
                {/* <p><button onClick={() => handleBookNow(productDetails)} className="btn btn-sm my-8">Submit</button></p> */}
                <label onClick={() => handleBookNow(productDetails)} htmlFor="purchase-modal" className="btn btn-sm my-8">Submit</label>
            </div>
            </div>        
            
        </>
    );
};

export default PurchaseModal;