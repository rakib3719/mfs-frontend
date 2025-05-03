
import TransactionPage from '@/pages/SendMoneyPage';

import React from 'react';

const page = () => {
    const type = 'send-money'
    return (
        <div>
            <TransactionPage type={type}/>
        </div>
    );
};

export default page;