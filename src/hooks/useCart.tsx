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
    (acc: number, item: { price: number; quantity: number }) => acc + item?.price * item?.quantity, 0
  );

  const add = async (item: any) => {
    const itembody = { ...item, price: item?.price || 0 };
    if (itembody?.price <= 0) {
      showToast("Price must be greater than 0", "error");
      return;
    }
    setCartItemLoading(true);
    try {
      if (!item?.requiresPrescription) {
        dispatch(addToCart(itembody));
        showToast("Medication added to Cart", "success");
      } else {
        const prescriptionCheck = await PatientApi.getMedicationsCheck(item.id);
        if (!prescriptionCheck?.data?.hasPrescription) {
          showToast(`${item?.name} requires prescription from a doctor`, "error");
          return;
        }
        console.log(itembody);
        dispatch(addToCart(itembody));
        showToast("Medication added to Cart", "success");
      }
    } catch (error) {
      showToast("Something went wrong", "error");
    } finally {
      setCartItemLoading(false);
    }
  };

  const addBulk = async (itemsToAdd: any[]) => {
    setCartItemLoading(true);
    try {
      const results = await Promise.allSettled(
        itemsToAdd.map(async (item) => {
          if (!item?.requiresPrescription) {
            return { item, allowed: true };
          }
          const check = await PatientApi.getMedicationsCheck(item.id);
          return {
            item,
            allowed: !!check?.data?.hasPrescription,
          };
        })
      );

      let addedCount = 0;

      results.forEach((result) => {
        if (result.status === "fulfilled") {
          const { item, allowed } = result.value;
          if (allowed) {
            dispatch(addToCart(item));
            addedCount++;
          } else {
            showToast(`${item.name} requires prescription from a doctor`, "error");
          }
        }
      });

      if (addedCount > 0) {
        showToast(`${addedCount} item(s) added to cart`, "success");
      }
    } catch (error) {
      showToast("Bulk add failed", "error");
    } finally {
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
    addBulk, 
    remove,
    update,
    clear,
    cartItemLoading,
  };
}
