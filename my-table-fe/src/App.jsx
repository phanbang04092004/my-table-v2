
import { useState } from 'react';
import { ReportHeader } from './components/report-header';
import { SearchComponent } from './components/search-filter';
import { Box, Container } from "@mui/material";
import { CustomizedTables } from './components/basic-table';
import { StickyHeadTable } from './components/slide-table';
import Grid from '@mui/material/Grid';
import './App.css'

export function App() {
  const [filters, setFilters] = useState({
    vung: "Hà Nội Miền Rộng",
    khuVuc: "Khu vực Hà Nội",
    npp: "HCC Thanh Trì",
    route: "1",
    thang: new Date().getMonth() + 1,
    nam: new Date().getFullYear(),
  });

  return (
    <Container disableGutters maxWidth={false} >
      <Box sx={{ width: "100%", overflowX: "auto" }}>
        <ReportHeader
          title={`TỔNG QUAN TUYẾN BÁN HÀNG NPP THÁNG ${filters.thang}.${filters.nam.toString().slice(-2)}`}
          unit="Triệu đồng"
        />

        <Grid container alignItems="flex-start">
          <Grid size={2}>
          </Grid>
          <Grid size={9}>
            <SearchComponent filters={filters} setFilters={setFilters} />
          </Grid>
          <Grid size={3}>
          </Grid>
        </Grid>


        <Grid container spacing={0} alignItems="flex-start" >
          <Grid size={6}>
            <CustomizedTables routeId={filters.route} month={filters.thang} year={filters.nam}/>
          </Grid>
          <Grid size={6}>
            <StickyHeadTable routeId={filters.route} month={filters.thang} year={filters.nam} />
          </Grid>
        </Grid>
      </Box>
    </Container>
  )
}
