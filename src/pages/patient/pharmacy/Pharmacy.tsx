import { useState } from 'react';
import HeaderTab from '../../../components/common/HeaderTab';
import Modal from '../../../components/modal/modal';
import { Link } from 'react-router-dom';
import { numberWithCommas } from '../../../utils';
import routeLinks from '../../../utils/routes';
import Success from '../../../assets/images/patient/success.webp'
import DrugsCard from '../../../components/common/DrugsCard';

const medications = Array.from({ length: 12 }, () => ({
  name: 'Homatrophine - Eye Drop ' + Math.floor(Math.random() * 100),
  dosage: '500mg',
  packSize: '10 Tablets',
  price: '10000',
  quantity: 0,
}));


export default function Pharmacy() {
  const [cartOpen, setCartOpen] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [cartItems, setCartItems] = useState<{ name: string; dosage: string; packSize: string; price: string; quantity: number }[]>([]);

  const handleAddToCart = (med: { name: string; dosage: string; packSize: string; price: string; }) => {
      setCartItems((prev) => {
        const existingIndex = prev.findIndex((item) => item?.name === med.name);
        if (existingIndex !== -1) {
          const updatedCart = [...prev];
          updatedCart[existingIndex]!.quantity += 1;
          return updatedCart;
        }
        
        return [...prev, { ...med, quantity: 1 }];
      });
      
      setCartOpen(true); 
    };

  return (
    <div>
      <div className="flex-1">
        <HeaderTab title={'pharmacy'} />
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 2xl:grid-cols-5 gap-4">
          {medications.map((med) => (
            <DrugsCard med={med} handleAddToCart={handleAddToCart} />
          ))}
        </div>
      </div>

      {/* Shopping Cart Panel */}
      {cartOpen && (
        <div className="w-[400px] bg-white p-6 shadow-xl overflow-y-auto fixed top-0 right-0 h-full z-10 flex flex-col justify-between">
         
         <div>
         <div className="flex justify-between items-center mb-6">
            <h3 className="text-lg font-medium">Order List</h3>
            <button onClick={() => setCartOpen(false)} className="text-xl">
              &times;
            </button>
          </div>
          <div className="space-y-5  max-h-[80vh] overflow-y-scroll">
            {cartItems.map((item, idx) => (
              <div
                key={idx}
                className="flex items-center gap-4 border border-gray-light rounded p-2"
              >
                <div className="h-18 w-18 rounded overflow-hidden">
                  <img
                    src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRBUDGLxFQRMqqO23P_Hsymc5AkrEIvUKflXA&s"
                    alt=""
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="text-sm">
                  <div className="font-[400]">{item?.name}</div>
                  <div className="text-xs font-[300] text-[#ADA8A8]">
                    {item?.dosage} | {item?.packSize}
                  </div>
                  <div className="text-xs font-[300] text-[#ADA8A8]">
                    NGN {numberWithCommas(item?.price)} x {item?.quantity}
                  </div>
                </div>
              </div>
            ))}
          </div>

          </div> 
          {/* Footer */}
          <div className=" pt-4 text-sm text-gray-700">
            <div className="flex justify-between mb-2">
              <span>Sub Total</span>
              <span>
                NGN{' '}
                {numberWithCommas(
                  cartItems.reduce(
                    (acc, item) => acc + Number(item.price) * item.quantity,
                    0
                  )
                )}
              </span>
            </div>
            <div className="flex justify-between gap-2 mt-4">
              <button className="flex-1 py-2 bg-black text-white rounded">View cart</button>
              <button
                onClick={() => setModalOpen(true)}
                className="flex-1 py-2 bg-primary text-white rounded"
              >
                Checkout
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Checkout Modal */}
      <Modal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        title=""
        hideCancel={true}
        style="!md:max-w-xl !md:mx-4 !md:mx-0"
        buttonText=""

      >
        <div className='flex flex-col items-center justify-center gap-2 '>
          <img src={Success} alt="" className='w-[200px] ' />
          <div className='text-center '>
            <h2 className="text-2xl font-[600] leading-6 max-w-[300px] mx-auto ">Your order has been placed successfully</h2>
            <p className="text-text-muted text-xs md:text-sm  font-[400] text-center mt-4 px-4 max-w-[360px] mx-auto ">
              Thank you for choosing us! Feel free to continue shopping and explore our wide range of products. Happy Shopping!
            </p>
          </div>

          <div className="w-full flex flex-col text-center mt-6">
            <Link
              to={routeLinks?.patient?.dashboard}
              className=" text-xs md:text-sm bg-primary text-white px-4  py-3 font-semibold w-full rounded-md"
            >
              back to dashboard
            </Link>
          </div>
        </div>
      </Modal>
    </div>
  );
}
