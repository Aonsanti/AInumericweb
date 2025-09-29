import { useState, useEffect } from 'react';

export default function History() {
    const [data, setData] = useState({
        bisection: [],
        false_position: [],
        graphical: [],
        newton_raphson: [],
        one_point: [],
        secant: [],
    });
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const endpoints = [
                    'bisection',
                    'false_position',
                    'graphical',
                    'newton_raphson',
                    'one_point',
                    'secant',
                ];

                const fetchPromises = endpoints.map(endpoint =>
                    fetch(`${import.meta.env.VITE_API_URL}/${endpoint}`).then(res => {
                        if (!res.ok) throw new Error(`Failed to fetch ${endpoint}`);
                        return res.json();
                    })
                );

                const results = await Promise.all(fetchPromises);

                const newData = {};
                endpoints.forEach((endpoint, index) => {
                    newData[endpoint] = Array.isArray(results[index]) ? results[index] : [];
                });

                setData(prevData => ({ ...prevData, ...newData }));

                setLoading(false);
            } catch (err) {
                console.error('Fetch error:', err);
                setError(err.message);
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    if (loading) {
        return <div>กำลังโหลด...</div>;
    }

    if (error) {
        return <div>เกิดข้อผิดพลาด: {error}</div>;
    }

    // ฟังก์ชันแปลงวันที่
    const formatDate = (dateString) => {
        if (!dateString) return 'N/A';
        const date = new Date(dateString);
        return date.toLocaleString('th-TH', {
            year: 'numeric',
            month: '2-digit',
            day: '2-digit',
            hour: '2-digit',
            minute: '2-digit',
            hour12: false
        }).replace(/,/, ''); 
    };

    return (
        <div>
            <h1>ประวัติการคำนวณ</h1>
            {Object.entries(data).map(([tableName, tableData]) => (
                <div key={tableName} style={{ marginBottom: '40px' }}>
                    <h2>{tableName.charAt(0).toUpperCase() + tableName.slice(1).replace('_', ' ')}</h2>
                    {tableData.length === 0 ? (<div>ไม่มีข้อมูลใน {tableName}</div>) : (
                        <table style={{ width: '100%', borderCollapse: 'collapse', marginTop: '20px' }}>
                            <thead>
                                <tr style={{ backgroundColor: '#f2f2f2' }}>
                                    <th style={{ border: '1px solid #ddd', padding: '8px' }}>ID</th>
                                    <th style={{ border: '1px solid #ddd', padding: '8px' }}>สมการ</th>
                                    {['bisection', 'false_position', 'graphical'].includes(tableName) && (
                                        <>
                                            <th style={{ border: '1px solid #ddd', padding: '8px' }}>Lower Bound</th>
                                            <th style={{ border: '1px solid #ddd', padding: '8px' }}>Upper Bound</th>
                                        </>
                                    )}
                                    {['newton_raphson', 'one_point'].includes(tableName) && (
                                        <th style={{ border: '1px solid #ddd', padding: '8px' }}>Initial Value</th>
                                    )}
                                    {tableName === 'secant' && (
                                        <>
                                            <th style={{ border: '1px solid #ddd', padding: '8px' }}>X0</th>
                                            <th style={{ border: '1px solid #ddd', padding: '8px' }}>X1</th>
                                        </>
                                    )}
                                    <th style={{ border: '1px solid #ddd', padding: '8px' }}>ผลลัพธ์</th>
                                    <th style={{ border: '1px solid #ddd', padding: '8px' }}>วันที่สร้าง</th>
                                </tr>
                            </thead>
                            <tbody>
                                {tableData.map((item) => (
                                    <tr key={item.id} style={{ border: '1px solid #ddd' }}>
                                        <td style={{ border: '1px solid #ddd', padding: '8px' }}>{item.id}</td>
                                        <td style={{ border: '1px solid #ddd', padding: '8px' }}>{item.function_text || 'N/A'}</td>
                                        {['bisection', 'false_position', 'graphical'].includes(tableName) && (
                                            <>
                                                <td style={{ border: '1px solid #ddd', padding: '8px' }}>{item.lower_bound || 'N/A'}</td>
                                                <td style={{ border: '1px solid #ddd', padding: '8px' }}>{item.upper_bound || 'N/A'}</td>
                                            </>
                                        )}
                                        {['newton_raphson', 'one_point'].includes(tableName) && (
                                            <td style={{ border: '1px solid #ddd', padding: '8px' }}>{item.initial_value || 'N/A'}</td>
                                        )}
                                        {tableName === 'secant' && (
                                            <>
                                                <td style={{ border: '1px solid #ddd', padding: '8px' }}>{item.x0 || 'N/A'}</td>
                                                <td style={{ border: '1px solid #ddd', padding: '8px' }}>{item.x1 || 'N/A'}</td>
                                            </>
                                        )}
                                        <td style={{ border: '1px solid #ddd', padding: '8px' }}>{item.result || 'N/A'}</td>
                                        <td style={{ border: '1px solid #ddd', padding: '8px' }}>{formatDate(item.created_at)}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    )}
                </div>
            ))}
        </div>
    );
}