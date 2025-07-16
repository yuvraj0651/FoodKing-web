import { useState, useMemo } from "react";

export const useSort = (items, sortKey = "price", order = "asc") => {
    const [sortConfig, setSortConfig] = useState({
        key: sortKey,
        direction: order
    });

    const sortedItems = useMemo(() => {
        let sortedList = [...items];

        sortedList.sort((a, b) => {
            if (a[sortConfig.key] < b[sortConfig.key]) {
                return sortConfig.direction === "asc" ? -1 : 1;
            }
            if (a[sortConfig.key] > b[sortConfig.key]) {
                return sortConfig.direction === "asc" ? 1 : -1;
            }
            return 0;
        });
        return sortedList;
    }, [items, sortConfig])

    const handleItemSort = (key) => {
        setSortConfig((prev) => ({
            key,
            direction: prev.key === key && prev.direction === "asc" ? "desc" : "asc"
        }));
    };

    return { sortedItems, handleItemSort, sortConfig };
}