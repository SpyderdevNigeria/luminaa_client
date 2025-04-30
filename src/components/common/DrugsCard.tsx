import { numberWithCommas } from "../../utils";

type DrugsCardProps = {
  med: any
    handleAddToCart: (med: any) => void
}
const DrugsCard = ({ med, handleAddToCart } : DrugsCardProps) => {


  return (
    <div className="p-4 rounded-lg border border-[#E8E8E8] flex flex-col items-start" key={med.name}>
      <div className="w-full h-28 rounded overflow-hidden mb-2">
        <img
          src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRBUDGLxFQRMqqO23P_Hsymc5AkrEIvUKflXA&s"
          alt=""
          className="w-full h-full object-cover"
        />
      </div>
      <h3 className="text-sm font-[400] mb-1">{med.name}</h3>
      <p className="text-xs text-[#ADA8A8] mb-1 space-x-4">
        <span>{med.dosage}</span> | <span>{med.packSize}</span>
      </p>
      <div className="flex flex-row items-center justify-between w-full mt-3">
        <p className="text-sm font-medium">NGN {numberWithCommas(med.price)}</p>
        <button
          onClick={() => handleAddToCart(med)}
          className="ml-auto text-white bg-primary px-3 py-1 text-sm rounded"
        >
          Add
        </button>
      </div>
    </div>
  );
};

export default DrugsCard;
