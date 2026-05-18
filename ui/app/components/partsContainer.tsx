import { FC, useEffect, useState } from 'react';

interface Part {
    id: string;
    parentId?: string | null;
    description: string;
    quantityPerParent: number;
    materialCost: number;
    manufacturingCost: number;
    directCost: number;
    subTreeCost: number;
}

export const PartsContainer: FC = () => {
    const [pageNumber, setPageNumber] = useState(1);
    const [pageSize, setPageSize] = useState(20);
    const [data, setData] = useState<Part[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [isError, setIsError] = useState(false);

    const fetchParts = async (pageNumber: number, pageSize: number) => {
        const response = await fetch(
            `/api/parts?pageNumber=${pageNumber}&pageSize=${pageSize}`
        );
        if (!response.ok) {
            throw new Error('Failed to fetch parts');
        }
        const data = await response.json();
        return data.data;
    };

    useEffect(() => {
        let isMounted = true;
        const loadParts = async () => {
            if (!isMounted) return;
            setIsLoading(true);
            setIsError(false);
            try {
                const data = await fetchParts(pageNumber, pageSize);
                if (isMounted) {
                    setData(data);
                    setIsLoading(false);
                }
            } catch (error) {
                console.error('Error fetching parts:', error);
                if (isMounted) {
                    setIsError(true);
                    setIsLoading(false);
                }
            }
        };
        loadParts();
        return () => {
            isMounted = false;
        };
    }, [pageNumber, pageSize]);

    return (
        <div>
            <h2>Parts List</h2>
            <div style={{ marginBottom: 16 }}>
                <label>
                    Page Size:
                    <input
                        type="number"
                        min={1}
                        value={pageSize}
                        onChange={(e) => setPageSize(Number(e.target.value))}
                        style={{ width: 60, marginLeft: 8 }}
                    />
                </label>
                <button
                    onClick={() => setPageNumber((p) => Math.max(1, p - 1))}
                    disabled={pageNumber === 1}
                    style={{ marginLeft: 16 }}
                >
                    Previous
                </button>
                <span style={{ margin: '0 8px' }}>Page {pageNumber}</span>
                <button
                    onClick={() => setPageNumber((p) => p + 1)}
                    style={{ marginLeft: 8 }}
                >
                    Next
                </button>
            </div>
            {isLoading && <div>Loading...</div>}
            {isError && <div>Error loading parts.</div>}
            {data && (
                <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Parent ID</th>
                            <th>Description</th>
                            <th>QuantityPerParent</th>
                            <th>Material Cost</th>
                            <th>Manufacturing Cost</th>
                            <th>Direct Cost</th>
                            <th>SubTree Cost</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data.map((part) => (
                            <tr key={part.id}>
                                <td>{part.id}</td>
                                <td>{part.parentId ?? '-'}</td>
                                <td>{part.description ?? '-'}</td>
                                <td>{part.quantityPerParent ?? '-'}</td>
                                <td>{part.materialCost ?? '-'}</td>
                                <td>{part.manufacturingCost ?? '-'}</td>
                                <td>{part.directCost ?? '-'}</td>
                                <td>{part.subTreeCost ?? '-'}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </div>
    );
};
