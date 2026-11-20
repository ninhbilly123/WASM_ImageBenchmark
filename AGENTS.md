# AGENTS.md

## Phạm vi đồ án

- Đây là nghiên cứu seminar D5 về nén một lô cố định gồm 10 ảnh JPEG độ phân giải cao, tổng khoảng 50 MB. Xem `README.md` và `REPORT.md` để lấy câu hỏi hiện hành. Khi nhóm đổi câu hỏi, đồng bộ hai tệp và các tài liệu liên quan.
- Baseline tải JPEG gốc lên rồi nén bằng WebAssembly trên máy chủ Node.js. Luồng thử nghiệm nén bằng cùng pipeline WebAssembly trong trình duyệt rồi tải kết quả lên.
- Hai chỉ số chính:
  - **Dung lượng tải lên (MB):** Đếm số byte của HTTP request body tại server, dùng cùng cách đóng gói cho hai luồng, lưu byte gốc trong log và quy đổi `1 MB = 1.000.000 byte`.
  - **Độ trễ đầu-cuối (ms):** Đo ở trình duyệt từ lúc bấm gửi đến khi nhận xác nhận server đã xử lý và lưu xong đủ 10 ảnh (luồng trình duyệt tính cả thời gian nén trước khi tải lên; luồng server tính cả thời gian nén trên server trước khi trả xác nhận).

## Làm việc trong repo

- Khi phát sinh vấn đề mới, yêu cầu chưa rõ hoặc có điểm chưa chắc chắn, phải hỏi người dùng để xác nhận trước khi thực hiện.
- Khi thiết kế pipeline, viết lệnh đo, tích hợp hai luồng hoặc chuẩn bị nộp bài và red-team, đọc `docs/ke-hoach-seminar-d5.md`. Khi đối chiếu tiêu chí chấm điểm, viết báo cáo hoặc điền bảng tự chấm, đọc `docs/seminar_rubric.md`.
- Theo dõi tiến độ task trên Google Sheets (`1-A__bxXTPCprZHu8gtZ6cNZnnPuKrfHir6LMMDVtlx0`, sheet `Trang tính1`): ngay sau khi hoàn thành một việc trong kế hoạch, dùng `gsheets` (chọn tài khoản Google đã kết nối có quyền chỉnh sửa bảng tính, không hardcode email cá nhân trong repo) đọc bảng hiện tại rồi cập nhật dòng tương ứng kèm cột `Bằng chứng` (PR, commit, tệp hoặc ảnh) bằng `gsheets mutate batch` (chỉ ghi phạm vi ô hẹp cần sửa, không ghi đè cột `J` `% Tiến độ`).
- Cập nhật `README.md` khi các bước cài đặt, dữ liệu hoặc lệnh đo thay đổi. Ghi lệnh thực sự tồn tại và đã được kiểm tra.
- Dùng ảnh có quyền phân phối, ghi nguồn và cách lấy đúng bộ ảnh. Giữ thông tin đăng nhập, khóa API và dữ liệu riêng tư ngoài repo, log và prompt. Chạy benchmark trên hệ thống nhóm kiểm soát.

## Nhánh, commit và pull request

- Trước khi bắt đầu mỗi task, kiểm tra nhánh hiện tại và checkout sang đúng nhánh dành cho task đó (hoặc tạo nhánh mới từ `main` mới nhất nếu chưa có); không làm lẫn nhiều task khác nhau trên cùng một nhánh cũ. Đặt tên dạng `<type>/<mo-ta-ngan>` với chữ thường, từ cách nhau bằng dấu gạch nối. Dùng `feat`, `fix`, `docs`, `test`, `refactor` hoặc `chore` tùy nội dung. Ví dụ `docs/repo-setup` và `feat/browser-compression`.
- Commit đúng ý nghĩa: mỗi commit chỉ gom các thay đổi phục vụ cùng một mục đích cụ thể (tách thành nhiều commit nếu có các nhóm thay đổi độc lập). Viết tiêu đề commit bằng tiếng Anh theo dạng `<type>(<scope>): <summary>` phản ánh chính xác thay đổi (có thể bỏ scope khi áp dụng cho toàn repo, dùng động từ mở đầu, ví dụ `docs(repo): set up seminar documentation`). Kiểm tra `git status` và `git diff --cached` trước khi commit.
- Sau khi hoàn thành mỗi task (đã cập nhật `AI-LOG.md` và Google Sheets nếu áp dụng), luôn hỏi người dùng có muốn commit và push lên remote không; chỉ commit và push sau khi người dùng xác nhận.
- Push nhánh công việc và mở PR vào `main`. Tiêu đề PR tóm tắt thay đổi theo cùng quy ước với commit. Phần mô tả nêu lý do, thay đổi chính và cách đã kiểm tra. Nếu có issue liên quan, dẫn link trong PR.
- Đưa thay đổi vào `main` qua PR. Giữ nguyên lịch sử của `main` và các nhánh dùng chung.

## Phép đo và kiểm chứng

- So sánh hai luồng với cùng bộ ảnh, thứ tự, bản build và cấu hình codec, trạng thái khởi tạo Wasm (pre-warm đối xứng ở cả browser và server trước khi bấm giờ; tách riêng dung lượng và thời gian tải/khởi tạo `.wasm` làm chi phí phụ), mức song song, máy, mức tải và cấu hình mạng. Chạy xen kẽ các cặp `A → B` và `B → A`. Ghi rõ điều kiện thực nghiệm và các yếu tố giữ cố định.
- Từ bản clone mới, các bước trong `README.md` phải dẫn đến một lệnh duy nhất chạy lại phép đo (ví dụ `npm run measure`). Lệnh này tự bật server, điều khiển trình duyệt tự động và áp dụng giới hạn mạng bằng code, in kết quả và lưu dữ liệu thô từng lượt vào tệp riêng (theo timestamp/mã lượt) trong `results/` để không ghi đè bộ log chính thức đã báo cáo.
- Với mỗi cấu hình mạng được báo cáo, đo ít nhất năm lượt cho mỗi luồng. Trình bày trung vị và độ phân tán. Lưu cả log thô và kết quả tổng hợp để mọi số đo trong `REPORT.md` và `slides.pdf` xuất hiện trong log và truy được về dữ liệu nguồn. Kiểm tra chạy lại từ bản clone mới trước khi nộp.
- Khi thay đổi pipeline, điều kiện mạng hoặc cách đo, kiểm tra lại cả hai luồng và xác nhận đầu ra tương đương. Khi bàn giao, ghi rõ những bước đã chạy và phần còn cần kiểm chứng.
- Trong `REPORT.md` (giữ URL GitHub ở dòng đầu, dài tối đa 3 trang), ngoài số đo và chênh lệch, nêu rõ chi phí đánh đổi, khi nào nên dùng và khi nào nên tránh, cùng giới hạn của phép đo. Với mọi thông tin về phiên bản, ngày phát hành, API hoặc trạng thái tính năng, dẫn tài liệu chính thức hoặc ghi chú phát hành và ghi ngày truy cập.
- Trong `SELF_ASSESSMENT_REPORT.md`, dẫn minh chứng cụ thể cho cả 6 tiêu chí (mục trong `REPORT.md`, tệp log cụ thể trong `results/`, mốc `mm:ss` trong video), điền đủ hai mục *What I did not manage* và *What I would do differently*, và khớp tổng điểm với tên tệp ZIP nộp bài.

## Nhật ký sử dụng AI

- **Bắt buộc tự động ghi nhật ký ngay sau khi hoàn thành mỗi task chính có AI hỗ trợ (trước khi kết thúc lượt trả lời hoặc trước khi commit)** — không chờ người dùng nhắc. Mỗi mục trong `AI-LOG.md` dùng tiêu đề `## YYYY-MM-DD — Tên công việc (<Họ và tên thành viên>)` (ví dụ `## 2026-11-20 — Hoàn thành Việc 1 (Phạm An Ninh)`, nếu chưa rõ thành viên đang thực hiện thì hỏi trước khi ghi) và đủ năm trường `Tool`, `Asked for`, `Kept`, `Changed`, `Rejected`.
- Ghi đúng những gì nhóm giữ, sửa hoặc bỏ và phép kiểm tra dẫn đến quyết định đó. Nếu một mục không phát sinh thay đổi hoặc phần bị loại, ghi kết quả kiểm tra thực tế.
- Để đáp ứng mức 9–10 của tiêu chí 6, nhật ký cần nêu ít nhất một lỗi thực tế từ AI — đặc biệt là thông tin kỹ thuật sai (phiên bản, API, trạng thái công cụ) hoặc phép đo sai bản chất (đo sai đối tượng, mốc thời gian hoặc dung lượng) — cùng cách nhóm phát hiện và minh chứng kiểm tra.
- Bỏ qua hỏi đáp nhanh, chỉnh câu chữ hoặc đồng bộ tài liệu nhỏ, và các việc người dùng yêu cầu bỏ qua. Khi chưa rõ việc có cần log, hỏi trước khi sửa `AI-LOG.md`.
