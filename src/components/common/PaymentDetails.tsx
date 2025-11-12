import EntityPayments from './EntityPayments'
import OfflinePaymentModal from '../modal/OfflinePaymentModal'
import { useState } from 'react';

function PaymentDetails({entityType, entityId, patientId, amount}: any) {
    const [recall, setRecall] = useState(false);
      const [showOfflineModal, setShowOfflineModal] = useState(false);
  return (
    <div>
        <div className="bg-white">
            <div className="flex justify-between items-center p-4 ">
              <h1>Payment Details</h1>
              <button className='bg-primary p-2 text-white ' onClick={() => setShowOfflineModal(true)}>Add Payment</button>
            </div>
            <EntityPayments entityType="procedure" entityId={entityId} recallFunc={recall}  />
            <OfflinePaymentModal
              open={showOfflineModal}
              onClose={() => setShowOfflineModal(false)}
              entityType={entityType}
              entityId={entityId}
              patientId={patientId}
              amount={amount}
              onSuccess={() => setRecall(true)}
            />

          </div></div>
  )
}

export default PaymentDetails