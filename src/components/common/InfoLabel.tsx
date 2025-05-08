interface InfoLabelProps {
    label: string;
    info: string;
    style?: string;
  }
  
  const InfoLabel = ({ label, info, style = "" }: InfoLabelProps) => {
    return (
      <div>
        <span className={`text-sm 2xl:text-base ${style}`}>{label}</span>
        <h3 className="text-xs 2xl:text-sm text-inactive mt-3">{info}</h3>
      </div>
    );
  };
  
  export default InfoLabel;