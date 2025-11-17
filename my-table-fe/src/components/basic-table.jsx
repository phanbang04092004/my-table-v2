import { useState, useEffect } from 'react';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import axios from 'axios';

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: "#5a3b00",
    color: theme.palette.common.white,
    fontWeight: "bold",
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': { backgroundColor: theme.palette.action.hover },
  '&:last-child td, &:last-child th': { border: 0 },
}));

const groupSections = (rows) => {
  const result = [];
  let i = 0;
  while (i < rows.length) {
    const section = rows[i].content;
    let count = 1;
    while (i + count < rows.length && rows[i + count].content === section) count++;
    result.push({ section, startIndex: i, rowSpan: count });
    i += count;
  }
  return result;
};

const groupKpis = (rows) => {
  const result = [];
  let i = 0;
  while (i < rows.length) {
    const section = rows[i].content;
    const kpi = rows[i].kpi;
    let count = 1;
    while (
      i + count < rows.length &&
      rows[i + count].content === section &&
      rows[i + count].kpi === kpi
    ) {
      count++;
    }
    result.push({ section, kpi, startIndex: i, rowSpan: count });
    i += count;
  }
  return result;
};

export function CustomizedTables({ routeId, month, year }) {
  const [rows, setRows] = useState([]);
// Lấy danh sách detailskpi để cố định cấu trúc bảng
  useEffect(() => {
    const fetchDetailKpis = async () => {
      try {
        const res = await fetch("http://localhost:3000/api/detailkpis");
        const json = await res.json();
        setRows(json);
      } catch (error) {
        console.error("Lỗi khi tải dữ liệu detailkpis:", error);
      }
    };
    fetchDetailKpis();
  }, []);

  useEffect(() => {
    if (!routeId || !month || !year) return;

    const fetchAccumulated = async () => {
      try {
        const monthYear = `${month}-${year}`;

        // Sử dụng query parameters
        const res = await axios.get(`http://localhost:3000/api/v1/accumulated`, {
          params: {
            routeId: routeId,
            month: monthYear
          }
        });

        if (res.data.success && res.data.data) {
          setRows(prevRows => {
            return prevRows.map(row => {
              const accumulatedData = res.data.data.find(
                item => item.detailkpi_id === row.detailkpi_id
              );
              return {
                ...row,
                accumulatedValue: accumulatedData ? accumulatedData.accumulatedValue : null
              };
            });
          });
        }
      } catch (error) {
        console.error("Lỗi khi tải dữ liệu accumulated:", error);
      }
    };

    fetchAccumulated();
  }, [routeId, month, year]);

  const sectionGroups = groupSections(rows);
  const kpiGroups = groupKpis(rows);

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 700 }} aria-label="customized table">
        <TableHead>
          <TableRow sx={{ height: 113 }}>
            <StyledTableCell>Nội dung</StyledTableCell>
            <StyledTableCell align="center">KPI</StyledTableCell>
            <StyledTableCell align="center">Hạng mục chi tiết</StyledTableCell>
            <StyledTableCell align="center">Lũy kế tháng</StyledTableCell>
          </TableRow>
        </TableHead>

        <TableBody>
          {rows.map((row, index) => {
            const sectionGroup = sectionGroups.find((g) => g.startIndex === index);
            const kpiGroup = kpiGroups.find((g) => g.startIndex === index);

            return (
              <StyledTableRow key={index} sx={{ border: "1px solid #434242", height: 50 }}>
                {sectionGroup && (
                  <StyledTableCell
                    rowSpan={sectionGroup.rowSpan}
                    sx={{
                      verticalAlign: "middle",
                      fontWeight: "bold",
                      backgroundColor: "#f9f9f9",
                      border: "1px solid #434242",
                      width: "20%",
                    }}
                  >
                    {row.content}
                  </StyledTableCell>
                )}
                {kpiGroup && (
                  <StyledTableCell
                    rowSpan={kpiGroup.rowSpan}
                    align="center"
                    sx={{
                      verticalAlign: "middle",
                      fontWeight: 500,
                      backgroundColor: "#fafafa",
                      border: "1px solid #434242",
                      width: "20%",
                    }}
                  >
                    {row.kpi}
                  </StyledTableCell>
                )}
                <StyledTableCell align="center" sx={{ border: "1px solid #434242" }}>
                  {row.detailItem}
                </StyledTableCell>
                <StyledTableCell align="center" sx={{ border: "1px solid #434242" }}>
                  {row.accumulatedValue !== null && row.accumulatedValue !== undefined
                    ? row.accumulatedValue
                    : 0}
                </StyledTableCell>
              </StyledTableRow>
            );
          })}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
