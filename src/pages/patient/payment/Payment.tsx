import { useState } from 'react';
import { FaEye, FaWallet, FaArrowUp, FaArrowDown } from 'react-icons/fa';

const Payment = () => {
  const [isAmountVisible, setIsAmountVisible] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const toggleAmountVisibility = () => setIsAmountVisible(!isAmountVisible);
  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const orders = [
    { orderId: '123', price: '$200', status: 'Completed', id: 1 },
    { orderId: '124', price: '$150', status: 'Pending', id: 2 },
    { orderId: '125', price: '$300', status: 'Cancelled', id: 3 },
  ];

  return (
    <div className="max-w-4xl mx-auto p-6">
      {/* Wallet Balance Container */}
      <div className="flex items-center justify-between bg-white p-4 rounded-lg shadow-md mb-6">
        <div>
          <h3 className="text-xl font-semibold">Wallet Balance</h3>
          <div className="flex items-center space-x-2">
            <span className="text-2xl font-bold">
              {isAmountVisible ? '$500' : '*****'}
            </span>
            <FaEye
              className="cursor-pointer text-gray-500"
              onClick={toggleAmountVisibility}
            />
          </div>
        </div>
        <button className="flex items-center space-x-2 bg-blue-500 text-white py-2 px-4 rounded-lg">
          <FaWallet />
          <span>Fund Wallet</span>
        </button>
      </div>

      {/* Right Image */}
      <div className="mb-6 flex justify-end">
        <img
          src="https://via.placeholder.com/150"
          alt="Wallet"
          className="w-32 h-32 object-cover rounded-full"
        />
      </div>

      {/* Table */}
      <table className="min-w-full table-auto bg-white shadow-md rounded-lg">
        <thead className="bg-gray-200">
          <tr>
            <th className="px-4 py-2 text-left">Order ID <FaArrowUp /></th>
            <th className="px-4 py-2 text-left">Price <FaArrowDown /></th>
            <th className="px-4 py-2 text-left">Status <FaArrowUp /></th>
            <th className="px-4 py-2 text-left">Action</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((order) => (
            <tr key={order.id} className="border-b">
              <td className="px-4 py-2">{order.orderId}</td>
              <td className="px-4 py-2">{order.price}</td>
              <td className="px-4 py-2">{order.status}</td>
              <td className="px-4 py-2">
                <button
                  className="text-blue-500 underline"
                  onClick={openModal}
                >
                  View Details
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-gray-500 bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-96">
            <h3 className="text-xl font-semibold mb-4">Order Details</h3>
            <p className="mb-4">Here are the details of the selected order.</p>
            <button
              className="bg-blue-500 text-white py-2 px-4 rounded-lg"
              onClick={closeModal}
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Payment;
