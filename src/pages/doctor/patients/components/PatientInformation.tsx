import InfoLabel from "../../../../components/common/InfoLabel"

function PatientInformation() {
  return (
    <div>
      <h4 className="text-inactive text-base">An on overview of the Patient's information</h4>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 py-4 ">
            <InfoLabel label={"Chukwuemeka"} info={"First Name"}  />
            <InfoLabel label={"Last Name"} info={"Last Name"} />
            <InfoLabel label={"Gender"} info={"Male"} />
            <InfoLabel label={"Location"} info={"86 niyi onilari street"} />
            <InfoLabel label={"09012345678"} info={"Phone Number"} />
            <InfoLabel label={"ajayiraymond@lumina.com"} info={"Email"}  />
            <InfoLabel label={"10-05-2002"} info={"Date Of Birth"}  />
          </div>
    </div>
  )
}

export default PatientInformation