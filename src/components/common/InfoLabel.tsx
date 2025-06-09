interface InfoLabelProps {
    label?: string;
    info: string;
    style?: string;
  }
  
  const InfoLabel = ({ label, info, style = "" }: InfoLabelProps) => {
    return (
      <div>
        <h3 className="text-xs 2xl:text-sm text-inactive">{info}</h3>
        <span className={`text-sm 2xl:text-base ${style}  mt-3`}>{label}</span>
      </div>
    );
  };
  
  export default InfoLabel;