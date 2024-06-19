import React, { useState, useEffect } from 'react';

const DisplayData = () => {
    const [data, setData] = useState(null);

    useEffect(() => {
        const storedData = localStorage.getItem('data');
        if (storedData) {
            setData(JSON.parse(storedData));
        }
    }, []);

    if (!data) {
        return <div>Loading data...</div>;
    }

    return (
        <div>
            <h2>Data from LocalStorage</h2>
            <pre>
                {JSON.stringify(data, null, 2)}
            </pre>
        </div>
    );
};

export default DisplayData;