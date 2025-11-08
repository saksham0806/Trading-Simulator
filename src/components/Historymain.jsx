import React from "react";
import "./Historymain.css"
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

function Historymain() {
    const { accesstoken } = useSelector(state => state.auth);
    const [table, settable] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch("http://localhost:3000/user/getHistory", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({ "accesstoken": accesstoken })
                });
                if (!response.ok) {
                    throw new Error(response.status);
                }
                const data = await response.json();
                settable(data);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [accesstoken]);

    if (loading) {
        return <div className="historybody">Loading...</div>;
    }

    if (!table || table.length === 0) {
        return <div className="historybody">No history found</div>;
    }

    return (
        <div className="historybody">
            <div className="tablecontainer">
                <div>HISTORY</div>
                <table className="historyTable">
                    <thead>
                        <tr>
                            <th>Action</th>
                            <th>Stock</th>
                            <th>Quantity</th>
                        </tr>
                    </thead>
                    <tbody>
                        {table.map((item, index) => (
                            <tr key={index}>
                                <td>{item.action}</td>
                                <td>{item.stockname.toUpperCase()}</td>
                                <td>{item.quantity}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default Historymain;