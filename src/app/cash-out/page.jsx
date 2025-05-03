import TransactionPage from '@/pages/SendMoneyPage';
import React from 'react';

const page = () => {
    const type = 'cash-out'
    return (
        <div>
                        <TransactionPage type={type}/>
        </div>
    );
};

export default page;