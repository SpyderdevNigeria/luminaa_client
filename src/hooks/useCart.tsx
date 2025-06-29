import { useState } from "react";
import PatientApi from "../api/PatientApi";
import { useToaster } from "../components/common/ToasterContext";
import {
  addToCart,
  clearCart,
  removeFromCart,
  updateQuantity,
} from "../reducers/cartSlice";
import { useAppDispatch, useAppSelector } from "./reduxHooks";

export default function useCart() {
  const dispatch = useAppDispatch();
  const [cartItemLoading, setCartItemLoading] = useState(false);
  const items = useAppSelector((state) => state.cart.items);
  const { showToast } = useToaster();
  const totalItems = items.reduce(
    (acc: any, item: { quantity: any }) => acc + item.quantity,
    0
  );
  const subtotal = items.reduce(
    (acc: number, item: { price: number; quantity: number }) =>
      acc + item.price * item.quantity,
    0
  );

  const add = async (item: any) => {
    setCartItemLoading(true);
    try {
      if (!item?.requiresPrescription) {
        dispatch(addToCart(item));
        showToast("Medication added to Cart", "success");
      } else {
        const prescriptionCheck = await PatientApi.getMedicationsCheck(item.id);
        if (!prescriptionCheck?.data?.hasPrescription) {
          showToast(
            `${item?.name} requires prescription from a doctor`,
            "error"
          );
          return;
        }
        dispatch(addToCart(item));
        showToast("Medication added to Cart", "success");
      }
    } catch (error) {
      showToast("something went wrong", "error");
    }finally {
      setCartItemLoading(false);
    }
  };
  const remove = (id: any) => dispatch(removeFromCart(id));
  const update = (id: any, quantity: any) =>
    dispatch(updateQuantity({ id, quantity }));
  const clear = () => dispatch(clearCart());

  return {
    items,
    totalItems,
    subtotal,
    add,
    remove,
    update,
    clear,
    cartItemLoading,
  };
}
