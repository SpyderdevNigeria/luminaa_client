import { useEffect, useState } from "react";
import Table, { Column } from "../../../components/common/Table";
import AdminApi from "../../../api/adminApi";
import Dropdown from "../../../components/dropdown/dropdown";
import AdminNavigate from "../../../components/common/AdminNavigate";
import { FiEye } from "react-icons/fi";
import { BsMicrosoftTeams } from "react-icons/bs";
import { HiOutlineDotsVertical } from "react-icons/hi";
import AssignPartnerModal from "../../../components/modal/AssignPartnerModal";

interface PartnerPatientsProps {
    partnerId: string;
}

export default function PartnerPatients({
    partnerId,
}: PartnerPatientsProps) {
    const [patients, setPatients] = useState<any[]>([]);
    const [patientsLoading, setPatientsLoading] = useState(false);
    const [patientsPage, setPatientsPage] = useState(1);
    const [patientsLimit] = useState(10);
    const [patientsTotal, setPatientsTotal] = useState(0);
    const [modalOpen, setModalOpen] = useState(false);
    const [modalType, setModalType] = useState<"assign" | "unassign">("assign");
    const [selectedPatientId, setSelectedPatientId] = useState<string | null>(null);
    const fetchPartnerPatients = async () => {
        if (!partnerId) return;

        setPatientsLoading(true);
        try {
            const response = await AdminApi.getPartnerPatientsById(partnerId, {
                page: patientsPage,
                limit: patientsLimit,
            });

            if (response?.data?.data.length > 0) {
                setPatients(response.data.data);
                setPatientsTotal(response.data.total || 0);
            }
        } catch (error) {
            console.error("Error fetching partner patients:", error);
        } finally {
            setPatientsLoading(false);
        }
    };

    const openUnassignModal = (id: any) => {
        setSelectedPatientId(id);
        setModalType("unassign");
        setModalOpen(true);
    };

    useEffect(() => {
        fetchPartnerPatients();
    }, [partnerId, patientsPage]);

    const columns: Column<any>[] = [
        {
            key: "first name",
            label: "First Name",
            render: (patient) => (
                <span>
                    {patient?.firstName
                        ? `${patient?.firstName}`
                        : "N/A"}
                </span>
            ),
        },
        {
            key: "last name",
            label: "Last Name",
            render: (patient) => (
                <span>
                    {patient?.lastName
                        ? `${patient?.lastName}`
                        : "N/A"}
                </span>
            ),
        },
        {
            key: "email",
            label: "Email",
            render: (patient) => <span>{patient?.email || "N/A"}</span>,
        },

        {
            key: "actions",
            label: "Actions",
            render: (patient) => (
                <Dropdown showArrow={false} triggerLabel="" triggerIcon={<HiOutlineDotsVertical />}>
                    <ul className="space-y-2 text-sm">
                        <AdminNavigate role={"patient"} id={patient?.id} type="true">
                            <FiEye /> View
                        </AdminNavigate>
                        <li
                            onClick={() => {

                                openUnassignModal(patient?.id);

                            }}
                            className="cursor-pointer hover:bg-gray-100 p-1 rounded flex items-center gap-2"
                        >
                            <BsMicrosoftTeams /> {"Unassign Partner"}
                        </li>


                    </ul>
                </Dropdown>
            ),
        },


    ];

    return (
        <div>
            {patientsLoading ? (
                <p>Loading...</p>
            ) : (
                <Table
                    data={patients}
                    columns={columns}
                    page={patientsPage}
                    total={patientsTotal}
                    limit={patientsLimit}
                    setPage={setPatientsPage}
                />
            )}

            <AssignPartnerModal
                open={modalOpen}
                onClose={() => setModalOpen(false)}
                type={modalType}
                patientId={selectedPatientId || ""}
                onSuccess={fetchPartnerPatients}
            />
        </div>
    );
}
