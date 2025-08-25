import React from "react";
import { numberWithCommas } from "../../utils/dashboardUtils";
import { useNavigate } from "react-router-dom";
import useCart from "../../hooks/useCart";
import routeLinks from "../../utils/routes";
import { PiPillDuotone } from "react-icons/pi";

interface Props {
  open: boolean;
  setOpen: (val: boolean) => void;
  onCheckout?: () => void;
}

const ShoppingCartPanel: React.FC<Props> = ({ open, setOpen,  }) => {
  const { items: cartItems, update, subtotal } = useCart();
  const navigate = useNavigate();
  if (!open) return null;

  const handleQuantityChange = (id: string, delta: number) => {
    const item = cartItems.find((i) => i.id === id);
    if (item) {
      const newQuantity = item.quantity + delta;
       update(id, newQuantity);
      // if (newQuantity >= 1) {
      //   update(id, newQuantity);
      // }
    }
  };

  return (
    <div className="w-[400px] bg-white  p-6 shadow-xl overflow-y-auto fixed top-0 right-0 h-full z-50 flex flex-col justify-between">
      {/* Header */}
      <div>
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-lg font-semibold">Cart</h3>
          <button onClick={() => setOpen(false)} className="text-xl">
            &times;
          </button>
        </div>

        {/* Cart Items */}
        <div className="space-y-5 max-h-[65vh] overflow-y-auto pr-2">
          {cartItems.length === 0 ? (
            <p className="text-sm text-gray-500 text-center">Your cart is empty</p>
          ) : (
            cartItems.map((item) => (
              <div
                key={item.id}
                className="border border-gray-200 flex items-center justify-between rounded-lg p-3"
              >
                <div className="flex items-center gap-4">
                  {/* Image or Icon */}
                  <div className="h-16 w-16 rounded bg-gray-100 flex items-center justify-center overflow-hidden">
                    {item?.image?.url ? (
                      <img
                        src={item?.image?.url}
                        alt={item?.name}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <PiPillDuotone className="text-primary w-8 h-8" />
                    )}
                  </div>

                  {/* Info */}
                  <div className="text-sm">
                    <div className="font-semibold">{item?.name}</div>
                    <div className="text-xs text-gray-500">
                      {item?.strength} | {item?.dosageForm}
                    </div>
                    <div className="text-xs text-gray-500">
                      NGN {numberWithCommas(item?.price)} × {item?.quantity}
                    </div>
                  </div>
                </div>

                {/* Quantity Controls */}
                <div className="flex items-center gap-2 text-base font-semibold">
                  <button
                    onClick={() => handleQuantityChange(item?.id, -1)}
                    className="px-2 py-1 bg-gray-200 rounded text-gray-700 hover:bg-gray-300"
                  >
                    −
                  </button>
                  <span>{item?.quantity}</span>
                  <button
                    onClick={() => handleQuantityChange(item?.id, 1)}
                    className="px-2 py-1 bg-gray-200 rounded text-gray-700 hover:bg-gray-300"
                  >
                    +
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      {/* Footer */}
      <div className="pt-6 border-t mt-4 text-sm text-gray-700 w-full">
        <div className="flex justify-between mb-2 font-medium">
          <span>Sub Total</span>
          <span>NGN {numberWithCommas(subtotal)}</span>
        </div>
      <div className="w-full">
          <button
        
          onClick={() => {
          navigate(routeLinks?.patient?.checkout)
          }}
          className={`mt-4 w-full py-2 px-3 text-center text-white bg-primary rounded hover:bg-primary/90 transition ${
            cartItems?.length === 0 ? "pointer-events-none opacity-50" : ""
          }`}
        >
          Checkout
        </button>
      </div>
      </div>
    </div>
  );
};

export default ShoppingCartPanel;
