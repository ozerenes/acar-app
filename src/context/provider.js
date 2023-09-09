import React, { createContext, useState } from 'react';

const MyContext = createContext();

export const MyProvider = ({ children }) => {
    const [data, setData] = useState(initialData); // initialData'yi uygun şekilde tanımlayın

    return (
        <MyContext.Provider value={{ data, setData }}>
            {children}
        </MyContext.Provider>
    );
};

export default MyContext;
