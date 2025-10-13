const Section = ({ title, children }: { title: string; children: React.ReactNode }) => (
  <div className="mb-4 bg-white p-4">
    <h3 className="text-md md:text-2xl  font-semibold text-gray-700 mb-3">{title}</h3>
    {children}
  </div>
);

export default Section;