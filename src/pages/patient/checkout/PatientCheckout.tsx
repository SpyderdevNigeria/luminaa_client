import { useState } from "react";
import useCart from "../../../hooks/useCart";
import { PiPillDuotone } from "react-icons/pi";
import routeLinks from "../../../utils/routes";
import { Link } from "react-router-dom";
import PatientApi from "../../../api/PatientApi";
import { numberWithCommas } from "../../../utils/dashboardUtils";
import { useToaster } from "../../../components/common/ToasterContext";
import CheckoutModal from "../../../components/modal/CheckoutModal";
const orderTypes = ["pickup", "delivery"];
const paymentMethods = ["cash", "card"];

const OrderForm = () => {
  const [orderType, setOrderType] = useState("pickup");
  const [paymentMethod, setPaymentMethod] = useState("cash");
  const [notes, setNotes] = useState("");
  const [errors, setError] = useState<string[]>([]);
  const [warnings, setWarnings] = useState<string[]>([]);
  const [modalOpen, setModalOpen] = useState(false);
  const { showToast } = useToaster();
  const [loading, setLoading] = useState(false);
  const { items: cartItems, update, subtotal, clear } = useCart();

  const handleSubmit = async (e: { preventDefault: () => void }) => {
    e.preventDefault();
    setWarnings([]);
    setError([])
    setLoading(true);
    const items = cartItems.map((item) => ({
      medicationId: item?.id,
      quantity: item.quantity,
    }));

    const orderData = {
      items,
      orderType,
      paymentMethod,
      notes,
    };

    try {
      const response = await PatientApi?.createPrescriptionOrderValidate(
        orderData
      );
      const data = response?.data;
      if (data?.isValid) {
        const finalResponse = await PatientApi?.createPrescriptionOrder(
          orderData
        );
        if (finalResponse) {
          showToast("Order created successfully", "success");
          clear()
          setModalOpen(true);
        }
      } else {
        const errorMessages: string[] = [];
        const warningMessages: string[] = data?.warnings || [];

        data?.itemValidations?.forEach((item: any) => {
          if (!item.isValid && item.errors) {
            item.errors.forEach((err: string) => {
              errorMessages.push(`${item.medicationName}: ${err}`);
            });
          }
        });

        setError(errorMessages);
        setWarnings(warningMessages);
        showToast("Order validation failed", "error");
      }
   } catch (error: any) {
  setLoading(false);
  const responseErrors = error?.response?.data?.errors;

  if (Array.isArray(responseErrors) && responseErrors.length > 0) {
    const formattedErrors = responseErrors.map((msg: string) => {
      const match = msg.match(/Medication ([\w-]+): (.+)/); // Extract ID and message
      const id = match?.[1];
      const restMessage = match?.[2] || msg;
      const item = cartItems.find((i) => i.id === id);
      const name = item?.name || id;
      return `${name}: ${restMessage}`;
    });

    setError(formattedErrors);
    showToast("Order validation failed", "error");
  } else {
    showToast("Order creating failed", "error");
  }

  console.log(error);
}
 finally {
      setLoading(false);
    }
  };
  const handleQuantityChange = (id: string, delta: number) => {
    const item = cartItems.find((i) => i.id === id);
    if (item) {
      const newQuantity = item.quantity + delta;
      update(id, newQuantity);
    }
  };

  if (cartItems?.length === 0)
    return (
      <div className="h-[500px] flex flex-col items-center justify-center gap-4 container-bd">
        <h5>You currently dont have any medication in your cart </h5>
        <Link
          to={routeLinks?.patient?.pharmacy}
          className="bg-primary text-white p-3 rounded-md"
        >
          Shop for Medication
        </Link>
      </div>
    );

  return (
    <div className="grid md:grid-cols-5 gap-6">
      {/* Left: Order Form */}
      <form
        className="space-y-4 md:col-span-3 container-bd"
        onSubmit={handleSubmit}
      >
        <h3 className="text-lg font-semibold mb-2">Checkout Details</h3>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Order Type
          </label>
          <select
            value={orderType}
            onChange={(e) => setOrderType(e.target.value)}
            className="form-input focus:outline-primary"
            required
          >
            {orderTypes.map((type) => (
              <option key={type}>{type}</option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Payment Method
          </label>
          <select
            value={paymentMethod}
            onChange={(e) => setPaymentMethod(e.target.value)}
            className="form-input focus:outline-primary"
            required
          >
            {paymentMethods.map((method) => (
              <option key={method}>{method}</option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Notes <span className="text-sm text-primary">(optional)</span>
          </label>
          <textarea
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            rows={4}
            className="form-input focus:outline-primary"
          />
        </div>

        {errors.length > 0 && (
          <div className="bg-red-100 text-red-700 p-3 rounded-md">
            <h4 className="font-semibold mb-2">Errors:</h4>
            <ul className="list-disc pl-4 space-y-1 text-sm">
              {errors.map((err, idx) => (
                <li key={idx}>{err}</li>
              ))}
            </ul>
          </div>
        )}

        {warnings.length > 0 && (
          <div className="bg-yellow-100 text-yellow-800 p-3 rounded-md">
            <h4 className="font-semibold mb-2">Warnings:</h4>
            <ul className="list-disc pl-4 space-y-1 text-sm">
              {warnings.map((warn, idx) => (
                <li key={idx}>{warn}</li>
              ))}
            </ul>
          </div>
        )}

        <div className="flex justify-end">
          <button
            type="submit"
            disabled={loading}
            className="mt-4 bg-primary px-4 text-white py-2 rounded-md hover:bg-primary/90 transition"
          >
            {loading ? "Processing..." : "Place Order"}
          </button>
        </div>
      </form>

      {/* Right: Order Summary */}
      <div className="space-y-4 container-bd md:col-span-2 flex flex-col justify-between">
        <div className="">
          <h3 className="text-lg font-semibold mb-2">Order Summary</h3>
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
                  <button onClick={() => handleQuantityChange(item.id, -1)}>
                    −
                  </button>
                  <span>{item.quantity}</span>
                  <button onClick={() => handleQuantityChange(item.id, 1)}>
                    +
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="flex justify-between font-medium border-t border-gray-300 pt-4">
          <span>Total</span>
          <span>₦{subtotal}</span>
        </div>
      </div>

      {/* Order Success Modal */}
      <CheckoutModal open={modalOpen} onClose={() => setModalOpen(false)} />
    </div>
  );
};

export default OrderForm;
