import { useState, useEffect } from 'react';
import axios from 'axios';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { styled } from '@mui/material/styles';

const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
        backgroundColor: "#a89540ff",
        color: theme.palette.common.white,
        fontWeight: "bold",
    },
    [`&.${tableCellClasses.body}`]: {
        fontSize: 14,
    },
}));

export function StickyHeadTable({ routeId, month, year }) {
    const [data, setData] = useState([]);

    useEffect(() => {
        if (!routeId || !month || !year) return;

        const fetchData = async () => {
            try {
                const monthYear = `${year}-${month.toString().padStart(2, '0')}`;
                const url = `http://localhost:3000/api/v1/datas`;
                const res = await axios.get(url,{
                    params: {
                        routeId: routeId,
                        month: monthYear
                    }
                });
                console.log("Dữ liệu nhận được:", res.data);
                setData(res.data);
            } catch (err) {
                console.error('Lỗi khi tải dữ liệu KPI:', err);
            }
        };
        fetchData();
    }, [routeId, month, year]);

    const daysInMonth = Array.from(
        { length: new Date(year, month, 0).getDate() },
        (_, i) =>
            `${year}-${month.toString().padStart(2, '0')}-${(i + 1)
                .toString()
                .padStart(2, '0')}`
    );

    const getWeekday = (dateStr) => {
        const weekdays = ["CN", "T2", "T3", "T4", "T5", "T6", "T7"];
        const date = new Date(dateStr);
        return weekdays[date.getDay()];
    };


    return (
        <Paper sx={{ width: '100%' }}>
            <TableContainer sx={{ maxHeight: 2500 }}>
                <Table stickyHeader>
                    <TableHead>
                        <TableRow>
                            {daysInMonth.map((day, index) => (
                                <StyledTableCell key={day} align="center">
                                    {index + 1}
                                </StyledTableCell>
                            ))}
                        </TableRow>
                        <TableRow>
                            {daysInMonth.map((day) => (
                                <StyledTableCell key={day} align="center">
                                    {getWeekday(day)}
                                </StyledTableCell>
                            ))}
                        </TableRow>
                    </TableHead>

                    <TableBody>
                        {data.map((row) => (
                            <TableRow key={row.detailkpi_id}>
                                {daysInMonth.map((dateKey) => {
                                    const dayData = row.data.find((d) => d.date === dateKey);
                                    return (
                                        <TableCell key={dateKey} align="center">
                                            {dayData ? dayData.value : "-"}
                                        </TableCell>
                                    );
                                })}
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </Paper>
    );
}
