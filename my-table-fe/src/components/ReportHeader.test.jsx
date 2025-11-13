// src/components/ReportHeader.test.jsx
import { render, screen } from "@testing-library/react";
import { ReportHeader } from "./ReportHeader";

describe("ReportHeader component", () => {
    test("hiển thị đúng tiêu đề và đơn vị tính", () => {
        render(<ReportHeader title="Báo cáo doanh thu" unit="VNĐ" />);

        // Kiểm tra tiêu đề
        expect(screen.getByText("Báo cáo doanh thu")).toBeInTheDocument();

        // Kiểm tra dòng đơn vị tính
        expect(screen.getByText("ĐVT: VNĐ")).toBeInTheDocument();
    });

    test("vẫn render nếu không có đơn vị tính", () => {
        render(<ReportHeader title="Báo cáo tồn kho" />);

        expect(screen.getByText("Báo cáo tồn kho")).toBeInTheDocument();
        // Kiểm tra có chứa "ĐVT" nhưng không có giá trị
        expect(screen.getByText(/ĐVT:/i)).toBeInTheDocument();
    });

});

