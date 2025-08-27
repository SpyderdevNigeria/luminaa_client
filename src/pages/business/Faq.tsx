import FaqPage from '../../components/business/FaqPage'
import PageTitle from '../../components/business/PageTitle'

function Faq() {
    return (
        <div>     
            <PageTitle
            title="Our most frequently asked questions"
            breadcrumb={[
                { name: "Home", href: "/" },
                { name: "FAQ" },
            ]}
        />

          <FaqPage/>  
        </div>
    )
}

export default Faq