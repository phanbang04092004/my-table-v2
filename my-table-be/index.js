const express = require('express');
const cors = require('cors');
const { connectDB } = require('./src/sequelize/config');
const salesRouteRouter = require('./src/routers/salesRoute.router');
const regionRouter = require('./src/routers/region.router');
const areaRoutes = require('./src/routers/area.router');
const distributorRoutes = require('./src/routers/distributor.router');
const detailkpiRouter = require('./src/routers/detailkpi.router');
const dataRoutes = require('./src/routers/accumulated.router');
const app = express();
const PORT = 3000;


app.use(cors({
    origin: '*',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
    optionsSuccessStatus: 204
}));

app.use(express.json());

app.get('/', (req, res) => {
    res.send('API is running...');
});

app.use('/api/sales-routes', salesRouteRouter);
app.use('/api/regions', regionRouter);
app.use('/api/areas', areaRoutes);
app.use('/api/distributors', distributorRoutes);
app.use('/api/detailkpis', detailkpiRouter);
app.use('/api/v1', dataRoutes);

const startServer = async () => {

    await connectDB();
    app.listen(PORT, () => {
        console.log(`Server is running on http://localhost:${PORT}`);
    });
};

startServer();