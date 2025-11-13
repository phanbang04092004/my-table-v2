const regionService = require('../src/services/region.service');
const models = require('../src/sequelize/models');

jest.mock('../src/sequelize/models', () => ({
    Region: {
        findAll: jest.fn(),
        findByPk: jest.fn(),
    }
}));

const Region = models.Region;

describe('Region Service', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    describe('getAllRegions', () => {
        it('Return ra các vùng đúng', async () => {
            const mockRegions = [
                { region_id: 1, region_code: 'VN-HN', region_name: 'Hà Nội' },
                { region_id: 2, region_code: 'VN-HCM', region_name: 'Hồ Chí Minh' }
            ];

            Region.findAll.mockResolvedValue(mockRegions);

            const result = await regionService.getAllRegions();

            expect(result).toEqual(mockRegions);
            expect(Region.findAll).toHaveBeenCalledWith({
                order: [['region_code', 'ASC']],
                attributes: ['region_id', 'region_code', 'region_name']
            });
        });

        it('return ra mảng rỗng nếu Vùng không tồn tại', async () => {
            Region.findAll.mockResolvedValue([]);

            const result = await regionService.getAllRegions();

            expect(result).toEqual([]);
            expect(result.length).toBe(0);
        });

        it('Database lỗi', async () => {
            Region.findAll.mockRejectedValue(new Error('Database error'));

            await expect(regionService.getAllRegions()).rejects.toThrow('Không lấy được dữ liệu Vùng.');
        });

        it('lỗi khi connect vượt thời gian cho phép', async () => {
            const timeoutError = new Error('Connection timeout');
            timeoutError.name = 'SequelizeConnectionError';
            Region.findAll.mockRejectedValue(timeoutError);

            await expect(regionService.getAllRegions()).rejects.toThrow('Không lấy được dữ liệu Vùng.');
        });
    });

    describe('getRegionById', () => {
        it('Trả về Vùng khi giá trị ID được cung cấp', async () => {
            const mockRegion = { region_id: 1, region_code: 'VN-HN', region_name: 'Hà Nội' };
            Region.findByPk.mockResolvedValue(mockRegion);

            const result = await regionService.getRegionById(1);

            expect(result).toEqual(mockRegion);
            expect(Region.findByPk).toHaveBeenCalledWith(1, {
                attributes: ['region_id', 'region_code', 'region_name']
            });
        });

        it('should throw error when ID is null', async () => {
            await expect(regionService.getRegionById(null)).rejects.toThrow('ID không hợp lệ.');
        });

        it('should throw error when ID is undefined', async () => {
            await expect(regionService.getRegionById(undefined)).rejects.toThrow('ID không hợp lệ.');
        });

        it('should throw error when ID is zero', async () => {
            await expect(regionService.getRegionById(0)).rejects.toThrow('Không tìm được vùng với ID 0.');
        });

        it('should throw error when ID is negative', async () => {
            await expect(regionService.getRegionById(-1)).rejects.toThrow('Không tìm được vùng với ID -1.');
        });

        it('should throw error when ID is not a number', async () => {
            await expect(regionService.getRegionById('abc')).rejects.toThrow('Không tìm được vùng với ID abc.');
        });

        it('should throw error when ID is float', async () => {
            await expect(regionService.getRegionById(1.5)).rejects.toThrow('Không tìm được vùng với ID 1.5.');
        });

        it('should throw error when region not found', async () => {
            Region.findByPk.mockResolvedValue(null);

            await expect(regionService.getRegionById(999)).rejects.toThrow('Không tìm được vùng với ID 999.');
        });

        it('should throw error when database error occurs', async () => {
            Region.findByPk.mockRejectedValue(new Error('Không tìm được vùng với ID 1.'));

            await expect(regionService.getRegionById(1)).rejects.toThrow('Không tìm được vùng với ID 1.');
        });
    });


});