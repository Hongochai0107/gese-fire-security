# GESE Fire & Security — Hướng dẫn cung cấp thông tin hoàn thiện dự án

> Tài liệu này liệt kê tất cả thông tin, hình ảnh và nội dung cần cung cấp để website GESE Fire & Security sẵn sàng đưa vào vận hành thực tế. Mỗi mục có checkbox — đánh dấu khi đã hoàn thành.

---

## 1. Thông tin doanh nghiệp

Thông tin hiện tại đang dùng dữ liệu mẫu trong file `src/lib/site-config.ts`.

| Mục | Giá trị hiện tại (mẫu) | Cần cung cấp |
|---|---|---|
| Tên công ty đầy đủ | GESE Fire & Security | Tên pháp lý chính xác |
| Tên viết tắt | GESE | Xác nhận hoặc thay đổi |
| Tagline | Giải pháp PCCC & An ninh toàn diện cho doanh nghiệp | Xác nhận hoặc thay đổi |
| Số điện thoại | +84 28 1234 5678 | Số thật |
| Hotline | 1900 1234 | Số thật |
| Email | contact@gesefiresecurity.vn | Email thật |
| Địa chỉ | Tầng 12, Tòa nhà GESE Tower, Quận 1, TP.HCM | Địa chỉ thật |
| Facebook | # (placeholder) | URL fanpage thật |
| LinkedIn | # (placeholder) | URL trang LinkedIn thật |
| YouTube | # (placeholder) | URL kênh YouTube thật |

- [ ] Đã cung cấp thông tin doanh nghiệp

---

## 2. Logo & Nhận diện thương hiệu

Logo hiện tại được tái tạo bằng SVG trong `src/components/icons/GeseLogo.tsx`.

- [ ] **File logo gốc** — định dạng SVG hoặc PNG nền trong suốt (tối thiểu 400px chiều rộng)
- [ ] **Favicon** — file `.ico` hoặc `.png` 32x32px và 192x192px (hiện dùng favicon mặc định Vite)
- [ ] **OG Image** — ảnh đại diện khi chia sẻ link trên Facebook/Zalo (khuyến nghị 1200x630px)
- [ ] **Màu sắc thương hiệu** — xác nhận mã màu xanh lá chính xác (hiện dùng `#16a34a` cho primary, `#1B5E3C` cho logo)

---

## 3. Hình ảnh

Website hiện dùng icon placeholder thay cho ảnh thật. Cần ảnh chất lượng cao cho các vị trí sau:

### 3.1 Dự án (Projects)

Mỗi dự án cần **1-3 ảnh** công trình thực tế (tối thiểu 800x600px, tỉ lệ 4:3 hoặc 16:9).

| Dự án | Ảnh cần |
|---|---|
| Nhà máy linh kiện điện tử Yên Phong | Ảnh nhà xưởng / hệ thống Sprinkler |
| PCCC & an ninh Riverside Plaza | Ảnh trung tâm thương mại / tủ báo cháy |
| Khu phức hợp Sky Residence | Ảnh tòa nhà / phòng kỹ thuật |
| Nhà máy chế biến thực phẩm Long An | Ảnh kho lạnh / hệ thống bọt Foam |
| Trung tâm thương mại Sunrise Đà Nẵng | Ảnh TTTM / camera giám sát |
| Khu đô thị Green Valley Hà Nội | Ảnh khu đô thị / kiểm soát ra vào |

- [ ] Đã cung cấp ảnh dự án

### 3.2 Dịch vụ (Services)

Mỗi dịch vụ cần **1 ảnh** minh họa (tối thiểu 800x600px):

1. Tư vấn & Thiết kế — ảnh kỹ sư đang khảo sát / bản vẽ kỹ thuật
2. Thi công lắp đặt — ảnh đội ngũ đang thi công
3. Báo cháy tự động — ảnh đầu báo / tủ trung tâm
4. Chữa cháy tự động — ảnh đầu phun Sprinkler / bình FM200
5. Camera & An ninh — ảnh camera / màn hình giám sát
6. Kiểm định & bảo trì — ảnh kỹ thuật viên bảo trì

- [ ] Đã cung cấp ảnh dịch vụ

### 3.3 Trang Giới thiệu (About)

- [ ] Ảnh văn phòng / trụ sở công ty
- [ ] Ảnh đội ngũ kỹ sư (team photo)
- [ ] Ảnh chứng chỉ / giấy phép (scan hoặc chụp)

### 3.4 Blog

Mỗi bài viết cần **1 ảnh đại diện** (thumbnail, tối thiểu 800x450px, tỉ lệ 16:9):

- [ ] Đã cung cấp ảnh blog (hoặc xác nhận dùng ảnh stock)

---

## 4. Nội dung dự án thực tế

Dữ liệu dự án hiện tại trong `src/data/projects.ts` dùng nội dung mẫu. Cần xác nhận hoặc thay thế:

Mỗi dự án cần cung cấp:

```
- Tên dự án
- Hạng mục (Nhà máy / TTTM / Khu dân cư / Khác)
- Năm thực hiện
- Địa điểm
- Mô tả ngắn (1-2 câu)
- Phạm vi công việc (danh sách 3-5 hạng mục)
- Tên chủ đầu tư
- Thời gian thực hiện
- Quy mô công trình
```

- [ ] Đã xác nhận / cập nhật dữ liệu dự án
- [ ] Cần thêm dự án mới? (liệt kê số lượng: ___)

---

## 5. Nội dung trang Giới thiệu

File dữ liệu: `src/data/about.ts`

### 5.1 Câu chuyện công ty
- [ ] Xác nhận năm thành lập (hiện ghi: 2015)
- [ ] Xác nhận nơi thành lập (hiện ghi: TP.HCM)
- [ ] Mô tả câu chuyện công ty (3 đoạn văn) — xác nhận hoặc viết lại

### 5.2 Cột mốc phát triển (Timeline)

| Năm (mẫu) | Sự kiện (mẫu) | Cần xác nhận |
|---|---|---|
| 2015 | Thành lập GESE | Năm & chi tiết chính xác |
| 2018 | Đạt ISO 9001 & ISO 45001 | Năm & chi tiết chính xác |
| 2020 | Mở rộng toàn quốc | Năm & chi tiết chính xác |
| 2022 | 100+ dự án | Năm & chi tiết chính xác |
| 2024 | Năng lực hạng I | Năm & chi tiết chính xác |

- [ ] Đã xác nhận / cập nhật timeline

### 5.3 Con số thống kê

| Thống kê (mẫu) | Cần xác nhận |
|---|---|
| 9+ năm kinh nghiệm | Số thật |
| 100+ dự án hoàn thành | Số thật |
| 50+ kỹ sư & kỹ thuật viên | Số thật |
| 98% khách hàng hài lòng | Số thật |

- [ ] Đã xác nhận số liệu thống kê

### 5.4 Giá trị cốt lõi
- [ ] Xác nhận 4 giá trị hiện tại (Sứ mệnh, Tầm nhìn, An toàn, Tận tâm) hoặc thay đổi

---

## 6. Chứng chỉ & Năng lực

File dữ liệu: `src/data/certificates.ts`

Hiện tại ghi nhận 4 chứng chỉ:

1. Giấy chứng nhận đủ điều kiện kinh doanh dịch vụ PCCC
2. ISO 9001:2015
3. ISO 45001:2018
4. Chứng chỉ năng lực HĐXD hạng I

- [ ] Xác nhận danh sách chứng chỉ chính xác
- [ ] Cần thêm / bớt chứng chỉ nào?
- [ ] Ảnh scan chứng chỉ (nếu muốn hiển thị trên web)

---

## 7. Đánh giá khách hàng (Testimonials)

File dữ liệu: `src/data/testimonials.ts`

Mỗi đánh giá cần:

```
- Tên khách hàng
- Chức vụ
- Tên công ty
- Nội dung đánh giá (2-3 câu)
- Ảnh đại diện (tùy chọn)
```

- [ ] Xác nhận / cập nhật testimonials hiện tại
- [ ] Cung cấp testimonials thật từ khách hàng

---

## 8. Blog / Bài viết

File dữ liệu: `src/data/blog.ts`

Hiện có 6 bài viết mẫu. Để blog hoạt động đầy đủ cần:

- [ ] Xác nhận tiêu đề & mô tả ngắn 6 bài viết mẫu
- [ ] Cung cấp **nội dung đầy đủ** cho mỗi bài viết (sẽ dùng cho trang `/blog/:slug`)
- [ ] Cung cấp bài viết mới (nếu có)

Mỗi bài viết đầy đủ cần:

```
- Tiêu đề
- Danh mục (Kiến thức PCCC / Quy định pháp luật / Tin công ty)
- Ngày đăng
- Thời gian đọc ước tính
- Mô tả ngắn (excerpt)
- Nội dung đầy đủ (markdown hoặc text)
- Ảnh đại diện
```

---

## 9. Trang Liên hệ

### 9.1 Google Maps
- [ ] **Tọa độ** hoặc **địa chỉ chính xác** để embed Google Maps (thay thế placeholder hiện tại)
- [ ] **Google Maps API Key** (nếu dùng Maps JavaScript API) hoặc dùng iframe embed

### 9.2 Form liên hệ
- [ ] **Email nhận form** — form sẽ gửi đến email nào?
- [ ] **Dịch vụ form** — chọn một trong các giải pháp:
  - Formspree (miễn phí đến 50 submissions/tháng)
  - EmailJS (gửi email trực tiếp từ frontend)
  - API backend riêng (nếu có)
  - Google Forms / Google Sheets integration

### 9.3 Giờ làm việc
- [ ] Xác nhận giờ làm việc (hiện ghi: Thứ 2 - Thứ 7, 08:00 - 17:30)

---

## 10. SEO & Meta

Cần cho mỗi trang:

| Trang | Title (tối đa 60 ký tự) | Meta Description (tối đa 155 ký tự) |
|---|---|---|
| Trang chủ | | |
| Dịch vụ | | |
| Dự án | | |
| Giới thiệu | | |
| Blog | | |
| Liên hệ | | |

- [ ] Đã cung cấp meta SEO
- [ ] **Google Analytics ID** (GA4) — nếu muốn theo dõi traffic
- [ ] **Google Search Console** — xác minh domain
- [ ] **Facebook Pixel ID** — nếu chạy quảng cáo Facebook

---

## 11. Domain & Hosting

- [ ] **Tên miền** — đã mua chưa? (ví dụ: gesefiresecurity.vn)
- [ ] **Hosting / Deploy** — chọn nền tảng:
  - Vercel (khuyến nghị, miễn phí cho dự án nhỏ)
  - Netlify
  - VPS riêng
  - Shared hosting
- [ ] **SSL Certificate** — hầu hết hosting hiện đại cung cấp miễn phí (Let's Encrypt)

---

## 12. Pháp lý (Tùy chọn)

- [ ] Chính sách bảo mật (Privacy Policy)
- [ ] Điều khoản sử dụng (Terms of Service)
- [ ] Mã số thuế / ĐKKD (hiển thị ở footer nếu cần)

---

## Quy trình gửi thông tin

### Bước 1: Chuẩn bị
Tạo một thư mục trên Google Drive / OneDrive với cấu trúc:

```
GESE-Website-Content/
├── 01-Logo/          ← file logo gốc (.svg, .png)
├── 02-Favicon/       ← favicon (.ico, .png)
├── 03-Projects/      ← ảnh dự án, đặt tên theo slug
│   ├── nha-may-yen-phong/
│   ├── riverside-plaza/
│   └── ...
├── 04-Services/      ← ảnh dịch vụ
├── 05-About/         ← ảnh văn phòng, đội ngũ, chứng chỉ
├── 06-Blog/          ← ảnh bài viết + nội dung (.docx hoặc .md)
└── 07-Documents/     ← file Excel/Google Sheets với thông tin chi tiết
```

### Bước 2: Điền thông tin
Tạo file Excel / Google Sheets với các sheet:
- **Thông tin công ty** (mục 1, 9.3)
- **Dự án** (mục 4)
- **Timeline & Thống kê** (mục 5)
- **Chứng chỉ** (mục 6)
- **Testimonials** (mục 7)
- **Blog** (mục 8)
- **SEO** (mục 10)

### Bước 3: Gửi & Review
Chia sẻ link thư mục → review cùng developer → cập nhật lên website → kiểm tra lần cuối → go live.

---

## Ưu tiên triển khai

Nếu muốn lên sóng nhanh, hãy ưu tiên theo thứ tự:

1. **Bắt buộc**: Thông tin doanh nghiệp (mục 1) + Logo (mục 2) + Domain (mục 11)
2. **Quan trọng**: Ảnh dự án (mục 3.1) + Dữ liệu dự án thật (mục 4) + Google Maps (mục 9.1)
3. **Nên có**: Ảnh dịch vụ (mục 3.2) + SEO meta (mục 10) + Form backend (mục 9.2)
4. **Bổ sung sau**: Blog nội dung đầy đủ (mục 8) + Ảnh About (mục 3.3) + Analytics (mục 10)
