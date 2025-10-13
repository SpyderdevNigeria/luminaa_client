const Info = ({ label, value, full }: { label: string; value?: any; full?: boolean }) => (
  <div className={full ? "col-span-2" : ""}>
    <p className="text-sm text-gray-500">{label}</p>
    <p className="text-gray-800 font-medium">{value || "—"}</p>
  </div>
);
export default Info