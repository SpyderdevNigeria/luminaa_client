import website from '../../utils/website'

function SheetHeader() {
  return (
  <div
  style={{
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    flexWrap: "wrap",
    gap: "1rem",
  }}
>
  {/* Left: Logo */}
  <div style={{ flexShrink: 0 }}>
    <img
      src={website?.logo}
      alt="Logo"
      style={{ width: "200px", height: "auto", objectFit: "contain" }}
    />
  </div>

  {/* Right: Website Info */}
  <div style={{ textAlign: "right" }}>
    <h2 style={{ marginBottom: "0.5rem", fontWeight: "bold" }}>{website?.name}</h2>
    {website?.address && <p style={{ margin: 0 }}>{website.address}</p>}
    {website?.contact?.email && <p style={{ margin: 0 }}>Email: {website?.contact?.email}</p>}
    {website?.contact?.phone1 && <p style={{ margin: 0 }}>Phone: {website?.contact?.phone1}</p>}
    
  </div>
</div>

  )
}

export default SheetHeader