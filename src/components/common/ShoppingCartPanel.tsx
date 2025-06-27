import React from "react";
import { numberWithCommas } from "../../utils/dashboardUtils";
import { Link } from "react-router-dom";
import useCart from "../../hooks/useCart";
import routeLinks from "../../utils/routes";
import { PiPillDuotone } from "react-icons/pi";

interface Props {
  open: boolean;
  setOpen: (val: boolean) => void;
  onCheckout?: () => void;
}

const ShoppingCartPanel: React.FC<Props> = ({ open, setOpen, onCheckout }) => {
  const { items: cartItems, update, subtotal } = useCart();

  if (!open) return null;


  const handleQuantityChange = (id: string, delta: number) => {
    const item = cartItems.find((i) => i.id === id);
    if (item) {
      const newQuantity = item.quantity + delta;
        update(id, newQuantity);
    }
  };

  return (
    <>
      <div className="w-[400px] bg-white p-6 shadow-xl overflow-y-auto fixed top-0 right-0 h-full z-50 flex flex-col justify-between">
        <div>
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-lg font-medium">Cart List</h3>
            <button onClick={() => setOpen(false)} className="text-xl">
              &times;
            </button>
          </div>

          <div className="space-y-5 max-h-[80vh] overflow-y-scroll pr-2">
            {cartItems.map((item) => (
              <div
                key={item.id}
                className="border border-gray-200 flex items-center justify-between rounded p-2"
              >
                <div className="flex items-center gap-4">
                  <div className="h-18 w-18 rounded overflow-hidden">
                     <div className=" w-full bg-gray-100 my-auto rounded-lg h-full flex items-center justify-center">
                                <PiPillDuotone className="text-primary w-10 h-10" />
                              </div>
                  </div>
                  <div className="text-sm">
                    <div className="font-[500]">{item.name}</div>
                    <div className="text-xs font-[300] text-[#ADA8A8]">
                      {item.strength} | {item.dosageForm}
                    </div>
                    <div className="text-xs font-[300] text-[#ADA8A8]">
                      NGN {numberWithCommas(item.price)} x {item.quantity}
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-2 text-base font-semibold">
                  <button
                    onClick={() => handleQuantityChange(item.id, -1)}
                  >
                    −
                  </button>
                  <span>{item.quantity}</span>
                  <button
                    onClick={() => handleQuantityChange(item.id, 1)}
                  >
                    +
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Footer */}
        <div className="pt-4 text-sm text-gray-700">
          <div className="flex justify-between mb-2">
            <span>Sub Total</span>
            <span>NGN {numberWithCommas(subtotal)}</span>
          </div>
          <div className="mt-4">
            <Link
              to={routeLinks?.patient?.checkout}
              onClick={() => {
                if (onCheckout) onCheckout();
              }}
              className="w-full py-2 bg-primary text-white rounded text-center block"
            >
              Checkout
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default ShoppingCartPanel;
