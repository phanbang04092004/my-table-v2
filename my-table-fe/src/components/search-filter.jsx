import React, { useEffect, useState } from "react";
import {
    Grid,
    FormControl,
    InputLabel,
    MenuItem,
    Select,
    TextField,
} from "@mui/material";
import axios from "axios";

export function SearchComponent({ filters, setFilters }) {
    const [regions, setRegions] = useState([]);
    const [areas, setAreas] = useState([]);
    const [distributors, setDistributors] = useState([]);
    const [routes, setRoutes] = useState([]);

    const handleChange = (field, value) => {
        setFilters({ ...filters, [field]: value });
    };

    useEffect(() => {
        axios.get("http://localhost:3000/api/regions")
            .then(res => setRegions(res.data.data || []))
            .catch(err => console.error("Error fetching regions:", err));
    }, []);


    useEffect(() => {
        if (filters.vung) {
            axios.get(`http://localhost:3000/api/areas?region_id=${filters.vung}`)
                .then(res => {
                    setAreas(res.data);
                    setDistributors([]);
                    setRoutes([]);
                    handleChange("khuVuc", "Khu vực Hà Nội");
                    handleChange("npp", "HCC Thanh Trì");
                    handleChange("route", "Tuyến HNRM 01");
                })
                .catch(err => console.error("Error fetching areas:", err));
        }
    }, [filters.vung]);

    useEffect(() => {
        if (filters.khuVuc) {
            axios.get(`http://localhost:3000/api/distributors?area_id=${filters.khuVuc}`)
                .then(res => {
                    setDistributors(res.data);
                    setRoutes([]);
                    handleChange("npp", "");
                    handleChange("route", "");
                })
                .catch(err => console.error("Error fetching distributors:", err));
        }
    }, [filters.khuVuc]);

    useEffect(() => {
        if (filters.npp) {
            axios.get(`http://localhost:3000/api/sales-routes?distributor_id=${filters.npp}`)
                .then(res => setRoutes(res.data))
                .catch(err => console.error("Error fetching routes:", err));
        }
    }, [filters.npp]);

    return (
        <Grid container spacing={2} alignItems="center" justifyContent="center" mb={3}>
            <Grid item sx={{ minWidth: 160 }}>
                <FormControl fullWidth size="small">
                    <InputLabel id="vung-label">Vùng</InputLabel>
                    <Select
                        labelId="vung-label"
                        value={filters.vung}
                        onChange={(e) => handleChange("vung", e.target.value)}
                        label="Vùng"
                    >
                        {regions.map((r) => (
                            <MenuItem key={r.region_id} value={r.region_id}>
                                {r.region_name}
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>
            </Grid>


            <Grid item sx={{ minWidth: 160 }}>
                <FormControl fullWidth size="small">
                    <InputLabel id="khuvuc-label">Khu vực</InputLabel>
                    <Select
                        labelId="khuvuc-label"
                        value={filters.khuVuc}
                        onChange={(e) => handleChange("khuVuc", e.target.value)}
                        label="Khu vực"
                    >
                        {areas.map((a) => (
                            <MenuItem key={a.area_id} value={a.area_id}>
                                {a.area_name}
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>
            </Grid>

            <Grid item sx={{ minWidth: 160 }}>
                <FormControl fullWidth size="small">
                    <InputLabel id="npp-label">Nhà Phân Phối</InputLabel>
                    <Select
                        labelId="npp-label"
                        value={filters.npp}
                        onChange={(e) => handleChange("npp", e.target.value)}
                        label="Nhà Phân Phối"
                    >
                        {distributors.map((d) => (
                            <MenuItem key={d.distributor_id} value={d.distributor_id}>
                                {d.distributor_name}
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>
            </Grid>

            <Grid item sx={{ minWidth: 160 }}>
                <FormControl fullWidth size="small">
                    <InputLabel id="route-label">Tuyến bán hàng</InputLabel>
                    <Select
                        labelId="route-label"
                        value={filters.route}
                        onChange={(e) => handleChange("route", e.target.value)}
                        label="Tuyến bán hàng"
                    >
                        {routes.map((r) => (
                            <MenuItem key={r.route_id} value={r.route_id}>
                                {r.route_name}
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>
            </Grid>

            <Grid item sx={{ minWidth: 160 }}>
                <FormControl fullWidth size="small">
                    <InputLabel id="month-label">Tháng</InputLabel>
                    <Select
                        labelId="month-label"
                        value={filters.thang}
                        onChange={(e) => handleChange("thang", e.target.value)}
                        label="Tháng"
                    >
                        {[...Array(12)].map((_, i) => (
                            <MenuItem key={i + 1} value={i + 1}>
                                {i + 1}
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>
            </Grid>


            <Grid item sx={{ minWidth: 160 }}>
                <TextField
                    fullWidth
                    size="small"
                    label="Năm"
                    type="number"
                    value={filters.nam}
                    onChange={(e) => handleChange("nam", e.target.value)}
                />
            </Grid>
        </Grid>
    );
}
