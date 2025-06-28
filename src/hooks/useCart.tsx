import { useToaster } from "../components/common/ToasterContext";
import { addToCart, clearCart, removeFromCart, updateQuantity } from "../reducers/cartSlice";
import { useAppDispatch, useAppSelector } from "./reduxHooks";

export default function useCart() {
  const dispatch = useAppDispatch();
  const items = useAppSelector((state) => state.cart.items);
const {showToast} = useToaster()
  const totalItems = items.reduce((acc: any, item: { quantity: any; }) => acc + item.quantity, 0);
  const subtotal = items.reduce((acc: number, item: { price: number; quantity: number; }) => acc + item.price * item.quantity, 0);

  const add = (item: any) => {
    try {
      if (!item?.requiresPrescription) {
        console.log(item)
        dispatch(addToCart(item))
        showToast("Medication added to Cart", 'success')
         }else{
            showToast(`${item?.name} requires prescription from a doctor`, 'error')
         }

    } catch (error) {
            showToast("something went wrong", 'error')
    }
  };
  const remove = (id: any) => dispatch(removeFromCart(id));
  const update = (id: any, quantity: any) => dispatch(updateQuantity({ id, quantity }));
  const clear = () => dispatch(clearCart());

  return {
    items,
    totalItems,
    subtotal,
    add,
    remove,
    update,
    clear,
  };
}
