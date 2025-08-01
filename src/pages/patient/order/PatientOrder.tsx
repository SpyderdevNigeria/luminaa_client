import { useEffect, } from "react";
import { AiOutlineEye } from "react-icons/ai";
import { BiWallet } from "react-icons/bi";
import WalletImage from "../../../assets/images/patient/wallet.png";
// import HeaderTab from "../../../components/common/HeaderTab";
import Table, { Column } from "../../../components/common/Table";
import StatusBadge from "../../../components/common/StatusBadge";
import usePrescriptionOrders from "../../../hooks/usePrescriptionOrders";
import PatientApi from "../../../api/PatientApi";
import routeLinks from "../../../utils/routes";
import { Link } from "react-router-dom";

const PatientOrder = () => {
  const {
    orders,
    loadingOrders,
    page,
    total,
    totalPages,
    limit,
    // setFilter,
    handleSetPage,
    getPrescriptionOrders,
  } = usePrescriptionOrders(PatientApi);
  console.log(orders)
  useEffect(() => {
    getPrescriptionOrders();
  }, [page]);


const orderColumns: Column<any>[] = [
  { key: "orderNo", label: "Order No", arrows: true },

  {
    key: "totalAmount",
    label: "Amount",
    arrows: true,
    render: (order) =>
      `₦ ${Number(order.totalAmount).toLocaleString(undefined, {
        minimumFractionDigits: 2,
      })}`,
  },

  {
    key: "paymentMethod",
    label: "Payment Method",
    arrows: true,
    render: (order) => order.paymentMethod || "-",
  },

  {
    key: "paymentStatus",
    label: "Payment Status",
    arrows: true,
    render: (order) => (
      <span className="capitalize">{order.paymentStatus || "N/A"}</span>
    ),
  },

  {
    key: "orderType",
    label: "Order Type",
    arrows: true,
    render: (order) => <span className="capitalize">{order.orderType}</span>,
  },

  {
    key: "status",
    label: "Status",
    render: (order) => <StatusBadge status={order.status} />,
    arrows: true,
  },

    {
    key: "date",
    label: "Date",
    render: (order) => <span>{new Date(order.createdAt).toLocaleDateString()}</span>,
    arrows: true,
  },

  {
    key: "action",
    label: "Action",
    arrows: false,
    render: (row) => (
      <Link
        to={`${routeLinks?.patient?.orders}/${row?.id}`}
        className="text-primary underline text-xs"
      >
        View Details
      </Link>
    ),
  },
];


  return (
    <div className="mt-5">
      {/* Wallet Balance */}
      <div className="bg-white rounded-xl flex items-center justify-between mb-6 relative">
        <div className="p-6">
          <p className="text-sm mb-2">
            Wallet Balance <AiOutlineEye className="inline w-4 h-4 ml-2" />
          </p>
          <h2 className="text-xl md:text-5xl my-8">
            ₦ 1004.<span className="text-2xl">89</span>
          </h2>
          <button className="mt-4 bg-primary text-white px-4 py-3 rounded flex items-center gap-2">
            <BiWallet /> <span className="text-sm">Fund wallet</span>
          </button>
        </div>
        <img
          src={WalletImage}
          alt="wallet"
          className="w-34 md:w-48 h-auto absolute right-4 md:right-10 bottom-0"
        />
      </div>
    <div className="container-bd">
      {/* Header Filter */}
      {/* <HeaderTab
        title=""
        onSearchChange={(value) => {
          setFilter({ search: value, page: 1 });
          getPrescriptionOrders();
        }}
        dropdowns={[
          {
            label: "Status",
            options: ["pending", "completed", "cancelled"],
            value: "",
            onChange: (val) => {
              setFilter({ status: val, page: 1 });
              getPrescriptionOrders();
            },
          },
          {
            label: "Payment Method",
            options: ["cash", "card"],
            value: "",
            onChange: (val) => {
              setFilter({ paymentMethod: val, page: 1 });
              getPrescriptionOrders();
            },
          },
          {
            label: "Payment Status",
            options: ["pending", "paid"],
            value: "",
            onChange: (val) => {
              setFilter({ paymentStatus: val, page: 1 });
              getPrescriptionOrders();
            },
          },
          {
            label: "Order Type",
            options: ["pickup", "delivery"],
            value: "",
            onChange: (val) => {
              setFilter({ orderType: val, page: 1 });
              getPrescriptionOrders();
            },
          },
        ]}
        dateFrom=""
        onDateFromChange={(val) => {
          setFilter({ dateFrom: val, page: 1 });
          getPrescriptionOrders();
        }}
        dateTo=""
        onDateToChange={(val) => {
          setFilter({ dateTo: val, page: 1 });
          getPrescriptionOrders();
        }}
      /> */}

      {/* Order Details Modal */}
      {loadingOrders ? <div>
        loading Orders ...
        </div> : orders.length === 0 ?  <div className="h-[500px] flex flex-col items-center justify-center">
          you don't have any order 
        </div> : 
            <Table
          data={orders}
          columns={orderColumns}
          page={page}
          total={total}
          limit={limit}
          totalPages={totalPages}
          setPage={(p) => {
            handleSetPage(p);
            getPrescriptionOrders();
          }}
        />}
        </div>
      {/* Table */}
    </div>
  );
};

export default PatientOrder;
