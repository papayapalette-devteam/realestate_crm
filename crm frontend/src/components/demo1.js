// src/BankSelector.js

import React from 'react';
import Select from 'react-select';

const BankSelector = () => {
const bankOptions = [
    { value: 'sbi', label: 'State Bank of India', logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/cc/SBI-logo.svg/2048px-SBI-logo.svg.png' },
    { value: 'hdfc', label: 'HDFC Bank', logo: 'https://upload.wikimedia.org/wikipedia/en/7/7e/HDFC_Bank_logo.png' },
    { value: 'icici', label: 'ICICI Bank', logo: 'https://upload.wikimedia.org/wikipedia/en/5/5b/ICICI_Bank_logo.png' },
    { value: 'axis', label: 'Axis Bank', logo: 'https://upload.wikimedia.org/wikipedia/en/4/45/Axis_Bank_logo.png' },
    { value: 'punjab_national', label: 'Punjab National Bank', logo: 'https://upload.wikimedia.org/wikipedia/en/c/c6/Punjab_National_Bank_Logo.png' },
    { value: 'bank_of_baroda', label: 'Bank of Baroda', logo: 'https://upload.wikimedia.org/wikipedia/en/3/39/Bank_of_Baroda_logo.png' },
    { value: 'union_bank', label: 'Union Bank of India', logo: 'https://upload.wikimedia.org/wikipedia/en/c/cf/Union_Bank_of_India_Logo.png' },
    { value: 'kotak', label: 'Kotak Mahindra Bank', logo: 'https://upload.wikimedia.org/wikipedia/en/4/4b/Kotak_Mahindra_Bank_logo.png' },
];

const customStyles = {
    option: (provided) => ({
        ...provided,
        display: 'flex',
        alignItems: 'center',
    }),
    multiValue: (provided) => ({
        ...provided,
        display: 'flex',
        alignItems: 'center',
    }),
};

const formatOptionLabel = ({ label, logo }) => (
    <div style={{ display: 'flex', alignItems: 'center' }}>
        <img src={logo} alt={label} style={{ width: 30, height: 30, marginRight: 8 }} />
        <span>{label}</span>
    </div>
);


    const handleChange = (selectedOptions) => {
        console.log('Selected banks:', selectedOptions);
    };

    return (
        <Select
            options={bankOptions}
            isMulti
            onChange={handleChange}
            styles={customStyles}
            formatOptionLabel={formatOptionLabel}
            placeholder="Select banks..."
        />
    );
};

export default BankSelector;
