# Kế hoạch seminar D5 · 20/11–02/12/2026

**Hạn nộp chính thức: 22:00 ngày 29/11/2026. Mục tiêu nội bộ: chốt hồ sơ trong ngày 28/11.** Các mốc dùng giờ Việt Nam. Phân công dưới đây là đề xuất để nhóm thống nhất theo lịch và thế mạnh của từng người.

Repo đã có khung hồ sơ trên `main` và [giao diện demo trong PR #2](https://github.com/ninhbilly123/WASM_ImageBenchmark/pull/2) trên nhánh `feat/benchmark-demo`. Giao diện đã có chọn/kéo thả JPEG, hai chế độ nén và chỗ hiển thị kết quả. Nút chạy sẽ được bật khi nối codec và server. [Câu hỏi hiện hành](../README.md#câu-hỏi-nghiên-cứu) · [Rubric seminar](./seminar_rubric.md)

## Phân công

| Người phụ trách | Phần chính | Phần hồ sơ và trình bày |
| --- | --- | --- |
| **Nguyễn Nhật Duy · 23120244** | Pipeline nén Wasm dùng chung, lựa chọn codec và kiểm tra đầu ra giữa hai môi trường. | Viết phương pháp và nguồn trong `REPORT.md`. Trình bày baseline, thay đổi và các yếu tố giữ cố định. |
| **Huỳnh Đăng Khoa · 23120285** | Bộ ảnh, lệnh đo tự động, kiểm soát mạng và lưu log. | Viết phần kết quả, chuẩn bị bảng hoặc biểu đồ và quay đoạn minh họa chạy phép đo. |
| **Phạm An Ninh · 23120314** | Tích hợp hai luồng web, server nhận ảnh và các mốc đo. | Ghép báo cáo, hoàn thiện slide, dựng video và điều phối nộp bài. Trình bày câu hỏi, giới hạn và khuyến nghị. |

## Việc cần làm theo thứ tự

| Việc | Chủ trì | Hạn nội bộ | Đầu ra và tiêu chí hoàn thành |
| --- | --- | --- | --- |
| **1. Chốt cách đo và điểm bàn giao** | Ninh, cả nhóm duyệt | **Cuối ngày 20/11** | Dùng giao diện hiện có để thống nhất đầu vào/đầu ra của pipeline, cách gửi lô ảnh, nội dung xác nhận từ server và dữ liệu lệnh đo sẽ đọc. Chốt quy tắc khởi tạo codec đối xứng ở cả hai luồng (ưu tiên pre-warm sẵn Wasm ở browser lẫn server trước khi bấm giờ, tách riêng dung lượng và thời gian tải/khởi tạo `.wasm` làm chi phí phụ) và thống nhất cơ chế tự động hóa trình duyệt cùng giới hạn mạng trong lệnh đo. |
| **2. Thử cùng pipeline trên một JPEG** | Duy | **21/11** | Thử codec song song với việc 1. Dùng cùng bản build Wasm, đường giải mã–mã hóa và cấu hình ở browser lẫn Node.js. Kiểm tra đầu ra hợp lệ và cùng kích thước/định dạng. So checksum nếu đầu ra xác định theo từng byte. Bàn giao cách gọi pipeline, phiên bản và nguồn chính thức cho Ninh. |
| **3. Chuẩn bị lô ảnh và khung lệnh đo** | Khoa | **21/11** | Cố định 10 JPEG độ phân giải cao, tổng khoảng 50 MB. Ghi nguồn hoặc quyền phân phối, kích thước pixel, số byte và checksum từng ảnh. Chuẩn bị lệnh dự kiến `npm run measure` tự bật server, điều khiển trình duyệt tự động và áp dụng giới hạn mạng bằng code; lưu log mỗi lần chạy vào tệp riêng (theo timestamp/mã lượt) để không ghi đè log chính thức. Việc này có thể tiến hành song song với việc 2. |
| **4. Nối giao diện với hai luồng và lệnh đo** | Ninh tích hợp, Duy và Khoa bàn giao | **22/11** | Nối nút chạy với codec và server. Bấm chạy một JPEG ở cả hai chế độ, kiểm tra chung mốc xác nhận đã lưu ảnh, rồi chạy đủ 10 ảnh. Hiển thị payload do server đếm và độ trễ đo từ trình duyệt. Khoa nối lệnh đo vào cùng hai luồng, cập nhật README và chạy thử từ bản clone mới để xác nhận log có đủ hai chỉ số. |
| **5. Chạy thử, đo chính thức và chốt kết quả** | Khoa, Ninh hỗ trợ | **23–25/11** | Kiểm tra giới hạn upload bằng tệp có số byte biết trước. Chạy thử cả hai luồng, rồi đo ít nhất 5 cặp cho mỗi cấu hình mạng báo cáo. Lưu lệnh, điều kiện đo, log thô từng lượt và số tổng hợp trong `results/` (tách riêng bộ log chính thức để lệnh chạy lại không ghi đè). Chốt log và commit dùng trong báo cáo vào **25/11**. |
| **6. Chạy lại độc lập và hoàn thiện báo cáo** | Duy chạy lại, Khoa đối chiếu, Ninh duyệt | **26–27/11** | Duy clone repo công khai vào thư mục mới, chỉ làm theo README và đối chiếu độ phân tán đã báo cáo. Nếu kết quả lệch (ví dụ do khác CPU), kiểm tra nguyên nhân và ghi vào giới hạn thực tế. Hoàn thiện `REPORT.md` tối đa 3 trang: mọi số đo khớp log; nêu rõ chi phí đánh đổi, khi nào nên dùng và khi nào nên tránh; kiểm chứng lại mọi thông tin phiên bản, ngày phát hành, API, trạng thái công cụ (codec, Node.js, trình duyệt, công cụ đo) theo tài liệu chính thức kèm ngày truy cập. |
| **7. Quay video và soát hồ sơ** | Ninh điều phối, cả ba trình bày | **28/11** | Xuất `slides.pdf`, ghi hình tối đa 8 phút và điền `TALK.md`. Mở đầu bằng câu hỏi, có cảnh chạy đo hoặc log, trình bày số chính kèm đơn vị và độ phân tán, kết thúc bằng khuyến nghị. Thử mở link video khi chưa đăng nhập. Cùng điền `SELF_ASSESSMENT_REPORT.md` với minh chứng cụ thể cho cả 6 tiêu chí (mục trong `REPORT.md`, tệp log trong `results/`, mốc `mm:ss` trong video), điền đủ mục *What I did not manage* và *What I would do differently*, tự chấm phần trình bày dựa trên video. |

## Quy ước để chốt ở việc 1

- **Dung lượng tải lên.** Đếm số byte trong HTTP request body ở server, dùng cùng cách đóng gói cho hai luồng. Ghi byte gốc trong log và quy đổi `1 MB = 1.000.000 byte`.
- **Độ trễ.** Đo ở trình duyệt từ lúc bấm nút gửi đến khi nhận xác nhận server đã lưu đủ 10 ảnh. Luồng B bắt đầu tính giờ trước bước nén để bao gồm thời gian nén trước upload.
- **Điều kiện đo.** Giữ nguyên lô ảnh, thứ tự, codec, cấu hình đầu ra, trạng thái khởi tạo Wasm (pre-warm đối xứng ở cả hai luồng), mức song song, máy và mức tải trong mỗi cặp. Chạy xen kẽ A → B và B → A. Thiết lập giới hạn mạng bằng code ngay trong `npm run measure` để tái lập được từ bản clone mới; chạy ổn định một cấu hình mạng trước rồi mới thêm cấu hình thứ hai.
- **Báo cáo.** Ghi trung vị, min–max và quy ước dấu khi tính chênh lệch. Đối chiếu từng số trong báo cáo và slide với log. Nêu rõ chi phí đánh đổi (dung lượng `.wasm`, CPU/RAM trên thiết bị người dùng, độ phức tạp và độ phủ trình duyệt), khi nào nên dùng và khi nào nên tránh nén ở trình duyệt dựa trên bằng chứng đo được, cùng các giới hạn có thể làm đổi kết quả. Trích dẫn tài liệu chính thức hoặc release notes kèm ngày truy cập cho mọi thông tin kỹ thuật. Dùng `AI-LOG.md` cho các task chính có AI hỗ trợ và ghi phép kiểm tra thực tế theo [quy tắc repo](../AGENTS.md).

**Mốc quyết định ngày 21/11, khi Duy bàn giao kết quả thử một JPEG.** Nếu codec chưa chạy được ở cả hai môi trường, Duy và Ninh ưu tiên thử phương án dùng chung khác trước khi tích hợp cả lô ảnh. Ninh có thể chuẩn bị phần nhận ảnh và xác nhận của server song song để kịp mốc tích hợp 22/11. Nếu chậm tiến độ, giữ một cấu hình mạng và ưu tiên lệnh đo chạy lại được, bằng chứng và hồ sơ nộp.

## Nộp bài và red team

- **29/11 trước 20:00 nội bộ.** Đề xuất Ninh nộp bằng tài khoản sinh viên. Duy mở ZIP để kiểm tra `.git` và đủ hồ sơ, Khoa đối chiếu log với slide và báo cáo. Tên ZIP theo `23120244-23120285-23120314_<tổng_điểm>.zip`. Hạn chính thức **22:00**. Nếu nhóm tham gia bình chọn, Ninh đăng bài có `#AWADSeminar23_3` trước cùng hạn.
- **30/11–02/12.** Ninh xem phân cặp trên Classroom. Khoa clone và chạy lệnh của đội được giao, Duy kiểm tra ít nhất một phát hiện có bằng chứng, Ninh tổng hợp và mở issue `[red-team] 23120244 23120285 23120314` trước **22:00 ngày 02/12**. Issue có lệnh đã chạy, số đo nhóm chạy lại đặt cạnh số đội kia báo cáo và minh chứng cho phát hiện.
