import { AiOutlineEye } from "react-icons/ai";
import { BiWallet } from "react-icons/bi";
import WalletImage from "../../../assets/images/patient/wallet.png";
import HeaderTab from "../../../components/common/HeaderTab";
import Table, { Column } from "../../../components/common/Table";
import OrderDetailsModal from "../../../components/modal/OrderDetailsModal";
import { useState } from "react";

const Order = () => {
  const allOrders = new Array(50).fill(null).map((_, i) => ({
    id: `#12${500 + i}`,
    price: 50000.0,
    status: "Paid",
  }));

  const pageSize = 6;
  const [currentPage, setCurrentPage] = useState(1);
  const [isModalOpen, setModalOpen] = useState(false)
  const [data, setData] = useState('');

  const startIndex = (currentPage - 1) * pageSize;
  const paginatedOrders = allOrders.slice(startIndex, startIndex + pageSize);

  const pagination = {
    hasPrevPage: currentPage > 1,
    hasNextPage: currentPage < Math.ceil(allOrders.length / pageSize),
    totalPages: Math.ceil(allOrders.length / pageSize),
  };

  const orderColumns: Column<Order>[] = [
    { key: "id", label: "Order ID",  arrows:true, },
    {
      key: "price",
      label: "Price",
      render: (order) =>
        `NGN ${order.price.toLocaleString(undefined, {
          minimumFractionDigits: 2,
        })}`,
        arrows:true,
    },
    {
      key: "status",
      label: "Status",
      render: (order) => (
        <button className="flex items-center space-x-2 bg-green-50 py-1 px-2 rounded-full">
          <span className="w-2 h-2 rounded-full bg-green-400"></span>
          <h4 className="text-xs font-[300] text-green-400">{order.status}</h4>
        </button>
      ),
      arrows:true,
    },
    {
      key: "action",
      label: "Action",
      arrows:false,
      render: (order) => (
        <button  className="text-primary underline text-xs"
        onClick={()=>{
          setData(order)
          setModalOpen(true)
        }}
        >
          View Details
        </button>
      ),
    },
  ];

  return (
    <div className="mt-5">
      {/* Wallet Balance */}
      <div className="bg-white  rounded-xl flex items-center justify-between mb-6 relative">
        <div className="p-6">
          <p className=" text-sm mb-2">
            Wallet Balance <AiOutlineEye className="inline w-4 h-4 ml-2" />
          </p>
          <h2 className="text-xl md:text-5xl font-[500] my-8">
            ₦ 1004.<span className="text-2xl">89</span>
          </h2>
          <button className="mt-4 bg-primary text-white px-4 py-3 rounded flex items-center gap-2">
            <BiWallet /> <span className="text-sm">Fund wallet</span>
          </button>
        </div>

        <img
          src={WalletImage}
          alt="wallet"
          className="w-34 md:w-48 h-auto  absolute right-4 md:right-10 bottom-0"
        />
      </div>

      <HeaderTab title={"All Orders"} />
      <OrderDetailsModal isModalOpen={isModalOpen} setModalOpen={setModalOpen} data={data}/>
      <div className="">
        {/* Table */}
        <Table
          data={paginatedOrders}
          columns={orderColumns}
          pagination={pagination}
          currentPage={currentPage}
          onPageChange={setCurrentPage}
        />
      </div>
    </div>
  );
};


export default Order;


