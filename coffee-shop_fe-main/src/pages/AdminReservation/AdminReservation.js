import { Container, Col, Row, Form, Input, Button } from "reactstrap";
import { FiSearch, FiFilter, FiDownload } from "react-icons/fi";
import { MdPhone, MdEmail, MdLocationOn, MdCalendarToday, MdAccessTime, MdPeople } from "react-icons/md";
import classNames from "classnames/bind";
import styles from "./AdminReservation.module.css";
import { useState, useMemo } from "react";

const cx = classNames.bind(styles);

// FAKE DATA - 25 khách hàng đặt bàn
const FAKE_RESERVATIONS = [
  {
    id: 1,
    name: "Nguyễn Văn An",
    phone: "0912345678",
    email: "nguyenvanan@gmail.com",
    date: "2025-11-25",
    time: "19:00",
    people: 4,
    message: "Bàn gần cửa sổ, trang trí hoa hồng cho sinh nhật",
    deposit: 500000,
    status: "Confirmed",
    specialRequests: "Bàn với tầm nhìn ra sân vườn, có nến trên bàn"
  },
  {
    id: 2,
    name: "Trần Thị Bích",
    phone: "0987654321",
    email: "tranthbich@yahoo.com",
    date: "2025-11-26",
    time: "18:30",
    people: 2,
    message: "Cặp đôi lần đầu đến",
    deposit: 300000,
    status: "Pending",
    specialRequests: "Gợi ý menu đặc biệt cho ngày Valentine sớm"
  },
  {
    id: 3,
    name: "Phạm Minh Quân",
    phone: "0901234567",
    email: "phamminhquan@hotmail.com",
    date: "2025-11-27",
    time: "20:00",
    people: 8,
    message: "Họp mặt bạn bè, cần phòng riêng",
    deposit: 1200000,
    status: "Confirmed",
    specialRequests: "Phòng VIP, có máy chiếu, không ồn ào"
  },
  {
    id: 4,
    name: "Lê Hương Giang",
    phone: "0923456789",
    email: "lehuonggiang@gmail.com",
    date: "2025-11-28",
    time: "17:00",
    people: 3,
    message: "Ăn trưa với gia đình",
    deposit: 400000,
    status: "Confirmed",
    specialRequests: "Có chỗ cao cho em bé, đặt ghế ăn em bé"
  },
  {
    id: 5,
    name: "Đỗ Thanh Hùng",
    phone: "0934567890",
    email: "dothanhhung@outlook.com",
    date: "2025-11-29",
    time: "19:30",
    people: 6,
    message: "Tổ chức tiệc công ty tổng kết năm",
    deposit: 2000000,
    status: "Confirmed",
    specialRequests: "Sân khấu nhỏ cho phát biểu, âm thanh tốt"
  },
  {
    id: 6,
    name: "Vũ Hồng Nhân",
    phone: "0945678901",
    email: "vuhongnhan@gmail.com",
    date: "2025-11-30",
    time: "18:00",
    people: 2,
    message: "Hẹn hò lần đầu",
    deposit: 300000,
    status: "Pending",
    specialRequests: "Nhạc nhẹ, ánh sáng dịu, bàn góc yên tĩnh"
  },
  {
    id: 7,
    name: "Cao Thế Quý",
    phone: "0956789012",
    email: "caothequy@hotmail.com",
    date: "2025-12-01",
    time: "12:00",
    people: 5,
    message: "Lunch meeting khách hàng quốc tế",
    deposit: 800000,
    status: "Confirmed",
    specialRequests: "Bàn tròn, wifi mạnh, menu có tiếng Anh"
  },
  {
    id: 8,
    name: "Bùi Như Linh",
    phone: "0967890123",
    email: "buinhulinh@gmail.com",
    date: "2025-12-02",
    time: "19:00",
    people: 4,
    message: "Kỷ niệm ngày cưới 10 năm",
    deposit: 1000000,
    status: "Confirmed",
    specialRequests: "Trang trí lãng mạn, rượu vang, tặng hoa"
  },
  {
    id: 9,
    name: "Hoàng Quốc Tuấn",
    phone: "0978901234",
    email: "hoangquoctuan@yahoo.com",
    date: "2025-12-03",
    time: "20:30",
    people: 10,
    message: "Tiệc kỷ niệm 5 năm thành lập công ty",
    deposit: 3000000,
    status: "Confirmed",
    specialRequests: "Sàn khiêu vũ, DJ, Bar đầy đủ"
  },
  {
    id: 10,
    name: "Trần Hương Ly",
    phone: "0989012345",
    email: "tranhuongly@gmail.com",
    date: "2025-12-04",
    time: "16:00",
    people: 3,
    message: "Tiệc sinh nhật con gái",
    deposit: 600000,
    status: "Pending",
    specialRequests: "Phòng đầy sắc màu, có bánh sinh nhật, không bóng bay"
  },
  {
    id: 11,
    name: "Nguyễn Đức Mạnh",
    phone: "0990123456",
    email: "nguyenducmanh@hotmail.com",
    date: "2025-12-05",
    time: "18:45",
    people: 7,
    message: "Tụ họp gia đình mỗi tháng một lần",
    deposit: 900000,
    status: "Confirmed",
    specialRequests: "Bàn dài, giá ưu đãi gia đình, món riêng"
  },
  {
    id: 12,
    name: "Phan Thị Tuyết",
    phone: "0901234568",
    email: "phanthituyet@gmail.com",
    date: "2025-12-06",
    time: "19:15",
    people: 2,
    message: "Cuối tuần cùng bạn gái",
    deposit: 350000,
    status: "Confirmed",
    specialRequests: "Bàn ngoài trời, nhìn ra vườn, lãng mạn"
  },
  {
    id: 13,
    name: "Lý Hữu Phong",
    phone: "0912345679",
    email: "lyhuuphong@outlook.com",
    date: "2025-12-07",
    time: "12:30",
    people: 6,
    message: "Họp báo giới thiệu sản phẩm mới",
    deposit: 1500000,
    status: "Confirmed",
    specialRequests: "Có sàn khía, máy chiếu 4K, giá treo backdrop"
  },
  {
    id: 14,
    name: "Võ Thị Hạnh",
    phone: "0923456780",
    email: "vothihanh@gmail.com",
    date: "2025-12-08",
    time: "17:30",
    people: 4,
    message: "Team building công ty công nghệ",
    deposit: 1100000,
    status: "Pending",
    specialRequests: "Không rượu, snack nhẹ, có game team building"
  },
  {
    id: 15,
    name: "Đặng Trần Sơn",
    phone: "0934567891",
    email: "dangtranson@hotmail.com",
    date: "2025-12-09",
    time: "20:00",
    people: 9,
    message: "Tiệc tất niên bộ phận sales",
    deposit: 2200000,
    status: "Confirmed",
    specialRequests: "Karaoke riêng, không ồn ào quá, đủ chỗ nhảy"
  },
  {
    id: 16,
    name: "Tô Thanh Huyền",
    phone: "0945678902",
    email: "tothanhhuyenn@gmail.com",
    date: "2025-12-10",
    time: "18:00",
    people: 2,
    message: "Ăn cơm riêng tư",
    deposit: 280000,
    status: "Confirmed",
    specialRequests: "Bàn góc, im lặng, không quách qang"
  },
  {
    id: 17,
    name: "Đinh Quang Hải",
    phone: "0956789013",
    email: "dinhquanghai@yahoo.com",
    date: "2025-12-11",
    time: "19:45",
    people: 5,
    message: "Nhận bằng cao học gia đình",
    deposit: 700000,
    status: "Confirmed",
    specialRequests: "Trang trí ăn mừng, có bánh, pháo giấy"
  },
  {
    id: 18,
    name: "Ứng Hữu Long",
    phone: "0967890124",
    email: "unghuurlong@hotmail.com",
    date: "2025-12-12",
    time: "12:00",
    people: 8,
    message: "Lunch business partners nước ngoài",
    deposit: 1300000,
    status: "Pending",
    specialRequests: "Menu cao cấp, wine list, translator"
  },
  {
    id: 19,
    name: "Nông Thị Thanh",
    phone: "0978901235",
    email: "nongthithanh@gmail.com",
    date: "2025-12-13",
    time: "19:00",
    people: 6,
    message: "Đám cưới nhỏ 50 người",
    deposit: 5000000,
    status: "Confirmed",
    specialRequests: "Trang trí đám cưới, bánh cưới, champagne sâm banh"
  },
  {
    id: 20,
    name: "Mương Văn Kiên",
    phone: "0989012346",
    email: "muongvankien@outlook.com",
    date: "2025-12-14",
    time: "20:00",
    people: 4,
    message: "Tiệc Valentine sớm",
    deposit: 800000,
    status: "Confirmed",
    specialRequests: "Nến, hoa hồng, nhạc lãng mạn, tặng dessert"
  },
  {
    id: 21,
    name: "Cao Xuân Tú",
    phone: "0990123457",
    email: "caoxuantu@gmail.com",
    date: "2025-12-15",
    time: "18:30",
    people: 3,
    message: "Ăn mừng hoàn thành dự án",
    deposit: 500000,
    status: "Confirmed",
    specialRequests: "Cocktail đặc biệt, không ô mai, có nhạc sống"
  },
  {
    id: 22,
    name: "Bế Thái Hân",
    phone: "0901234569",
    email: "bethaihannn@hotmail.com",
    date: "2025-12-16",
    time: "19:30",
    people: 2,
    message: "Gặp gỡ gia đình bạn",
    deposit: 350000,
    status: "Pending",
    specialRequests: "Bàn riêng, thoải mái trò chuyện, ánh sáng vừa"
  },
  {
    id: 23,
    name: "Hồ Trung Đức",
    phone: "0912345680",
    email: "hotrungduc@gmail.com",
    date: "2025-12-17",
    time: "17:00",
    people: 5,
    message: "Họp mặt lớp cũ sau 10 năm",
    deposit: 750000,
    status: "Confirmed",
    specialRequests: "Phòng riêng, nhạc lúc xưa, photo props"
  },
  {
    id: 24,
    name: "Lâm Hồng Phúc",
    phone: "0923456781",
    email: "lamhongphuc@outlook.com",
    date: "2025-12-18",
    time: "20:30",
    people: 7,
    message: "Tiệc chia tay công ty sau 5 năm",
    deposit: 1400000,
    status: "Confirmed",
    specialRequests: "DJ, sân khấu, có tặng đồng chí, rượu vang"
  },
  {
    id: 25,
    name: "Đỗ Hương Giang",
    phone: "0934567892",
    email: "dohuonggiang@gmail.com",
    date: "2025-12-19",
    time: "18:00",
    people: 4,
    message: "Tiệc tổng kết năm nhân viên nhà quản lý",
    deposit: 900000,
    status: "Confirmed",
    specialRequests: "Phòng VIP, buffet cao cấp, rượu premium"
  }
];

function AdminReservation() {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("All");
  const [sortBy, setSortBy] = useState("date");

  // Filter & Sort Logic
  const filteredReservations = useMemo(() => {
    let result = FAKE_RESERVATIONS.filter(res => {
      const matchSearch = 
        res.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        res.phone.includes(searchTerm) ||
        res.email.toLowerCase().includes(searchTerm.toLowerCase());
      
      const matchStatus = filterStatus === "All" || res.status === filterStatus;
      
      return matchSearch && matchStatus;
    });

    // Sort
    result.sort((a, b) => {
      if (sortBy === "date") return new Date(a.date) - new Date(b.date);
      if (sortBy === "name") return a.name.localeCompare(b.name);
      if (sortBy === "people") return b.people - a.people;
      return 0;
    });

    return result;
  }, [searchTerm, filterStatus, sortBy]);

  const getStatusBadge = (status) => {
    const statusClass = status === "Confirmed" ? "status-confirmed" : "status-pending";
    return <span className={cx(statusClass)}>{status}</span>;
  };

  const formatCurrency = (value) => {
    return new Intl.NumberFormat("vi-VN", { style: "currency", currency: "VND" }).format(value);
  };

  const formatDate = (dateStr) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString("vi-VN", { weekday: "short", year: "numeric", month: "2-digit", day: "2-digit" });
  };

  return (
    <section className={cx("admin-reservation")}>
      <Container>
        {/* HEADER */}
        <div className={cx("header")}>
          <h1>Quản Lý Đặt Bàn</h1>
          <p>Tổng cộng: <strong>{FAKE_RESERVATIONS.length}</strong> đơn | Đã xác nhận: <strong>{FAKE_RESERVATIONS.filter(r => r.status === "Confirmed").length}</strong> | Chờ xác nhận: <strong>{FAKE_RESERVATIONS.filter(r => r.status === "Pending").length}</strong></p>
        </div>

        {/* FILTER & SEARCH */}
        <div className={cx("controls")}>
          <div className={cx("search-box")}>
            <FiSearch className={cx("icon")} />
            <Input
              type="text"
              placeholder="Tìm kiếm theo tên, SĐT, email..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className={cx("search-input")}
            />
          </div>

          <div className={cx("filter-group")}>
            <div className={cx("filter-item")}>
              <label>Trạng thái:</label>
              <select 
                value={filterStatus} 
                onChange={(e) => setFilterStatus(e.target.value)}
                className={cx("filter-select")}
              >
                <option value="All">Tất cả</option>
                <option value="Confirmed">Đã xác nhận</option>
                <option value="Pending">Chờ xác nhận</option>
              </select>
            </div>

            <div className={cx("filter-item")}>
              <label>Sắp xếp:</label>
              <select 
                value={sortBy} 
                onChange={(e) => setSortBy(e.target.value)}
                className={cx("filter-select")}
              >
                <option value="date">Ngày đặt</option>
                <option value="name">Tên khách</option>
                <option value="people">Số người</option>
              </select>
            </div>

            <Button color="success" className={cx("export-btn")}>
              <FiDownload /> Xuất Excel
            </Button>
          </div>
        </div>

        {/* TABLE */}
        <div className={cx("table-container")}>
          <table className={cx("reservations-table")}>
            <thead>
              <tr>
                <th>ID</th>
                <th>Khách hàng</th>
                <th>Liên hệ</th>
                <th>Ngày & Giờ</th>
                <th>Số người</th>
                <th>Tiền cọc</th>
                <th>Yêu cầu đặc biệt</th>
                <th>Trạng thái</th>
              </tr>
            </thead>
            <tbody>
              {filteredReservations.map((reservation) => (
                <tr key={reservation.id} className={cx("table-row")}>
                  <td className={cx("id")}>{reservation.id}</td>
                  <td className={cx("name")}>
                    <div className={cx("name-info")}>
                      <div className={cx("name-text")}>{reservation.name}</div>
                      <small>{reservation.email}</small>
                    </div>
                  </td>
                  <td className={cx("contact")}>
                    <div className={cx("contact-item")}>
                      <MdPhone /> {reservation.phone}
                    </div>
                  </td>
                  <td className={cx("datetime")}>
                    <div className={cx("datetime-item")}>
                      <MdCalendarToday /> {formatDate(reservation.date)}
                    </div>
                    <div className={cx("datetime-item")}>
                      <MdAccessTime /> {reservation.time}
                    </div>
                  </td>
                  <td className={cx("people")}>
                    <span className={cx("people-badge")}>
                      <MdPeople /> {reservation.people} người
                    </span>
                  </td>
                  <td className={cx("deposit")}>
                    <strong>{formatCurrency(reservation.deposit)}</strong>
                  </td>
                  <td className={cx("requests")}>
                    <div className={cx("request-tooltip")}>
                      {reservation.specialRequests}
                    </div>
                  </td>
                  <td className={cx("status")}>
                    {getStatusBadge(reservation.status)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {filteredReservations.length === 0 && (
          <div className={cx("no-results")}>
            <p>Không tìm thấy đơn đặt bàn phù hợp</p>
          </div>
        )}
      </Container>
    </section>
  );
}

export default AdminReservation;
