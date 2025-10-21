import { useEffect, useState } from "react"

const ActionSchedule = ({
  scheduledDate,
  setScheduledDate,
  handleSchedule,
  loading,
  procedure,
  type,
}: any) => {

  const [edit, setEdit] = useState(false);
  useEffect(() => {
    if (procedure?.scheduledDate) {
      setScheduledDate(procedure.scheduledDate);
      setEdit(false);
    } else {
      setEdit(true);
    }
  }, [procedure?.scheduledDate])
  return (
    <div className="flex flex-col">
      {
        procedure?.scheduledDate && (
          <div className="flex justify-between items-center">
            <div>
              <h1>{procedure?.scheduledDate ? "Reschedule Procedure" : "Schedule Procedure"}</h1>
              <span>
                {procedure?.scheduledDate
                  ? new Date(procedure?.scheduledDate).toLocaleString()
                  : ""}
              </span>
            </div>

            {type === "admin" && (
              <button
                onClick={() => setEdit(true)}
                className="text-primary hover:underline"
              >
                Edit
              </button>
            )}

          </div>
        )
      }
      {edit && type === "admin" ?(

        <div>
          <label className="text-sm text-gray-600">Schedule Date</label>
          <input
            type="datetime-local"
            className="w-full  form-input rounded p-2 mt-1"
            value={scheduledDate}
            onChange={(e) => setScheduledDate(e.target.value)}
          />
          <button
            onClick={handleSchedule}
            className="mt-3 px-4 py-2 bg-primary text-white rounded w-full"
            disabled={loading}
          >
            {loading ? "Scheduling..." : procedure?.scheduledDate ? "Reschedule Procedure" : "Schedule Procedure"}
          </button>
        </div>
      ) : ""}
    </div>)
};


export default ActionSchedule