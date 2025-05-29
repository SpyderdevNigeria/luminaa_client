import { GoPlus } from "react-icons/go";
import Table, { Column } from "../../../../components/common/Table";
import routeLinks from "../../../../utils/routes";
import { Link } from "react-router-dom";
import StatusBadge from "../../../../components/common/StatusBadge";
function PatientPrescription() {
  const AllPrescription: Prescriptions[] = new Array(40)
    .fill(null)
    .map((_, i) => ({
      id: `${i + 1}`,
      medicineCategory: `Category ${(i % 5) + 1}`,
      medicine: `Medicine ${i + 1}`,
      dosage: `${(i % 3) + 1}x daily`,
      instruction: `Take after meals for ${3 + (i % 5)} days`,
      prescribedBy: `Dr. Ajayi Raymond`,
      amount: `₦${(500 + i * 10).toLocaleString()}`,
      status: i % 2 === 0 ? "paid" : "pending",
    }));


  interface Prescriptions {
    id: string;
    medicineCategory: string;
    medicine: string;
    dosage: string;
    instruction: string;
    prescribedBy: string;
    amount: string;
    status: string;
  }

  const appointmentColumns: Column<Prescriptions>[] = [
    // {
    //   key: "id",
    //   label: "ID",
    //   arrows: true,
    //   render: (item) => <h5 className="text-sm">#{item?.id}</h5>,
    // },
    {
      key: "medicineCategory",
      label: "Category",
      arrows: true,
      render: (item) => <p className="text-sm">{item?.medicineCategory}</p>,
    },
    {
      key: "medicine",
      label: "Medicine",
      arrows: true,
      render: (item) => <p className="text-sm">{item?.medicine}</p>,
    },
    {
      key: "dosage",
      label: "Dosage",
      arrows: true,
      render: (item) => <p className="text-sm">{item?.dosage}</p>,
    },
    {
      key: "instruction",
      label: "Instruction",
      arrows: true,
      render: (item) => <p className="text-sm">{item?.instruction}</p>,
    },
    {
      key: "prescribedBy",
      label: "Prescribed By",
      arrows: true,
      render: (item) => <p className="text-sm">{item?.prescribedBy}</p>,
    },
    {
      key: "amount",
      label: "Amount",
      arrows: true,
      render: (item) => <span className="text-sm">{item?.amount}</span>,
    },
    {
      key: "status",
      label: "Status",
      render: (item) => <StatusBadge status={item?.status} />,
    },
    {
      key: "action",
      label: "Action",
      render: (item) => (
        <Link
          to={`${routeLinks?.doctor?.patients}/${item?.id}`}
          className="text-primary underline text-xs"
        >
          View
        </Link>
      ),
    },
  ];

  return (
    <div>
      <div className="flex items-center justify-between">
        <h4 className="text-inactive text-base">Prescription</h4>
        <button className="p-2 rounded-sm bg-[#00BA8F] text-white text-2xl">
          <GoPlus />
        </button>
      </div>
      <div className="">
        <Table<Prescriptions>
          data={AllPrescription}
          columns={appointmentColumns}
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
}

export default PatientPrescription;
