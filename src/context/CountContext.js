import React, { createContext, useContext, useState } from 'react';

// Context'i oluşturun
const CountContext = createContext();

// Context'i kullanmak için bir özel Hook oluşturun
export function useCount() {
    return useContext(CountContext);
}

// Context sağlayıcısı bileşeni
export function CountProvider({ children }) {
    const [count, setCount] = useState(0);

    // Count'u artırma işlevi
    const setCountFunc = (c) => {
        setCount(c);
    };

    // Count'u azaltma işlevi


    return (
        <CountContext.Provider value={{ count, setCountFunc }}>
            {children}
        </CountContext.Provider>
    );
}