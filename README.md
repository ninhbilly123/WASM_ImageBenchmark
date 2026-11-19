# D5 — Image and PDF processing in WebAssembly on the user's device

Seminar CSC13114 CQ2023/3. Nhóm chọn nén ảnh làm phạm vi khảo sát.

## Thành viên

| MSSV | Họ và tên |
| --- | --- |
| 23120244 | Nguyễn Nhật Duy |
| 23120285 | Huỳnh Đăng Khoa |
| 23120314 | Phạm An Ninh |

## Câu hỏi nghiên cứu

> For a fixed batch of 10 high-resolution JPEGs (~50 MB), how do upload payload (MB) and submit-to-server-confirmation latency (ms) change when the same WebAssembly compression pipeline runs in the browser before upload instead of on the Node.js server after upload, under controlled network conditions?

## Chạy từ bản clone mới

### Tải repo và mở demo

Cần Git để clone repo và một trình duyệt để mở demo. Chạy hai lệnh sau trong thư mục bạn muốn lưu dự án.

```sh
git clone https://github.com/ninhbilly123/WASM_ImageBenchmark.git
cd WASM_ImageBenchmark
```

Mở [`demo/index.html`](demo/index.html) trực tiếp trong trình duyệt. Bạn có thể chọn vị trí nén, chọn hoặc kéo thả JPEG và xóa lô ảnh. Danh sách hiển thị dung lượng tệp đầu vào.

### Chạy lại phép đo

**Đang triển khai.** Nút **Chạy phép đo** đang chờ tích hợp codec Wasm và máy chủ Node.js. Khi benchmark sẵn sàng, mục này sẽ hướng dẫn chuẩn bị bộ 10 JPEG và chạy một lệnh để in số đo, đồng thời lưu log vào [`results/`](results/).

## Hồ sơ seminar

| Tệp | Nội dung |
| --- | --- |
| [REPORT.md](REPORT.md) | Báo cáo tối đa 3 trang. |
| [results/](results/) | Lệnh đã chạy và kết quả thô của từng lượt được báo cáo. |
| `slides.pdf` | Tệp slide sẽ xuất từ bản trình bày hoàn chỉnh. Dàn ý nằm trong `TALK.md`. |
| [TALK.md](TALK.md) | Link video tối đa 8 phút và dàn ý trình bày. |
| [AI-LOG.md](AI-LOG.md) | Nhật ký sử dụng AI, phần đã sửa và bằng chứng kiểm tra. |
| [SELF_ASSESSMENT_REPORT.md](SELF_ASSESSMENT_REPORT.md) | Điểm tự chấm và minh chứng theo rubric. |

## Nộp bài

- **29/11/2026, 22:00** — Một thành viên nộp ZIP của repo, gồm cả `.git`, bằng tài khoản sinh viên `@student.hcmus.edu.vn`. Tên tệp là `23120244-23120285-23120314_<tổng_điểm_tự_chấm>.zip`.
- **29/11/2026, 22:00** — Nếu tham gia bình chọn, đăng trong nhóm AWAD FIT HCMUS. Bài đăng mở đầu bằng `#AWADSeminar23_3` và có tiêu đề, câu hỏi, một số đo chính và link video.
- **30/11/2026** — Xem phân cặp red team trên Classroom.
- **01/12/2026, 22:00** — Đóng bình chọn.
- **02/12/2026, 22:00** — Mở issue `[red-team] 23120244 23120285 23120314` trên repo đội được giao. Ghi lệnh đã chạy, đối chiếu số đo và nêu ít nhất một phát hiện có bằng chứng. Thiếu issue đúng hạn bị trừ 10 điểm seminar.

### Kiểm tra trước khi nộp ZIP

- [ ] Clone repo GitHub công khai vào thư mục mới, chỉ làm theo README và kiểm tra kết quả chạy lại nằm trong độ phân tán đã báo cáo.
- [ ] `REPORT.md` có URL GitHub ở dòng đầu, dài tối đa 3 trang và mọi số đo trong báo cáo lẫn slide đều xuất hiện trong log.
- [ ] Hoàn thành phần kiểm tra trong [TALK.md](TALK.md), gồm quyền xem video và tệp `slides.pdf` ở thư mục gốc.
- [ ] Mở ZIP để kiểm tra có `.git` và đủ hồ sơ. Tổng điểm trong tên ZIP khớp với bảng tự chấm.
