import { AiOutlineEye } from "react-icons/ai";
import { BiWallet } from "react-icons/bi";
import WalletImage from "../../../assets/images/patient/wallet.png";
import HeaderTab from "../../../components/common/HeaderTab";
import Table, { Column } from "../../../components/common/Table";
import OrderDetailsModal from "../../../components/modal/OrderDetailsModal";
import StatusBadge from "../../../components/common/StatusBadge";
import  { useState } from "react";

const Order = () => {
  const [isModalOpen, setModalOpen] = useState(false);
  const [data, setData] = useState<any>(null);

  const allOrders = new Array(50).fill(null).map((_, i) => ({
    id: `#12${500 + i}`,
    price: 50000.0,
    status: "paid",
  }));



  interface OrderType {
    id: string;
    price: number;
    status: string;
  }

  const orderColumns: Column<OrderType>[] = [
    { key: "id", label: "Order ID", arrows: true },
    {
      key: "price",
      label: "Price",
      render: (order) =>
        `NGN ${order.price.toLocaleString(undefined, {
          minimumFractionDigits: 2,
        })}`,
      arrows: true,
    },
    {
      key: "status",
      label: "Status",
      render: (order) => <StatusBadge status={order.status} />,
      arrows: true,
    },
    {
      key: "action",
      label: "Action",
      arrows: false,
      render: (data) => (
        <button
          className="text-primary underline text-xs"
          onClick={()=>{
            setData(data)
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
          <h2 className="text-xl md:text-5xl  my-8">
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
      <OrderDetailsModal
        isModalOpen={isModalOpen}
        setModalOpen={setModalOpen}
        data={data}
      />
      <div className="">
        {/* Table */}
        <Table<OrderType>
          data={allOrders}
          columns={orderColumns}
          page={1}
          total={10}
          limit={10}
          totalPages={10}
          setPage={(e) => {
            console.log(e);
          }}
          showPaginate={false}
        />
      </div>
    </div>
  );
};

export default Order;
