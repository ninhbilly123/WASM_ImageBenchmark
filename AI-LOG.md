# Nhật ký seminar D5

Bốn mục đầu được bổ sung từ lịch sử trao đổi ngày 19/11/2026.

## 2026-11-19 — Đánh giá đề tài D5
Tool: OpenAI Codex.
Asked for: Đọc rubric và đánh giá câu hỏi so sánh nén ảnh trong trình duyệt với nén trên server.
Kept: Phạm vi một lô 10 ảnh khoảng 50 MB và ba chỉ số trong câu hỏi gốc của nhóm.
Changed: Codex đề xuất cách hỏi trung lập về độ trễ và đưa bộ nhớ thành chỉ số phụ sau khi đối chiếu rubric và tài liệu đo bộ nhớ của Chrome. README.md và REPORT.md vẫn ghi câu hỏi gốc.
Rejected: Giả định độ trễ chắc chắn giảm. Rubric công nhận cả kết quả không cải thiện.

## 2026-11-19 — Lập kế hoạch ngày đầu
Tool: OpenAI Codex.
Asked for: Xem repo mới và đề xuất các bước đến hạn nộp seminar.
Kept: Đề xuất thử một ảnh ở cả hai luồng trước, rồi mới mở rộng phép đo và thử chạy từ bản clone mới.
Changed: Đặt việc dựng khung trước các mốc triển khai và đo sau khi git status và git remote xác nhận repo chưa có commit và chưa cấu hình remote.
Rejected: Không có. Đã kiểm tra môi trường bằng node --version và npm.cmd --version.

## 2026-11-19 — Dựng khung tài liệu repo
Tool: OpenAI Codex.
Asked for: Dựng khung hồ sơ theo rubric và điền thông tin ba thành viên.
Kept: README.md, REPORT.md, TALK.md và results/README.md, gồm câu hỏi gốc, thông tin nhóm và phần chờ điền kết quả.
Changed: Nhóm tạo lại AI-LOG.md và SELF_ASSESSMENT_REPORT.md theo mẫu nhóm cung cấp. Bản khung ban đầu đã được đối chiếu về MSSV, liên kết nội bộ và sáu thang điểm trong rubric.
Rejected: Mẫu tự soạn cho hai tệp trên được thay bằng mẫu nhóm đưa vào repo.

## 2026-11-19 — Đọc lại hai mẫu của nhóm
Tool: OpenAI Codex.
Asked for: Đọc hai tệp AI-LOG và SELF_ASSESSMENT_REPORT mới để dùng đúng format ở các lần cập nhật sau.
Kept: Các trường Tool, Asked for, Kept, Changed, Rejected và cấu trúc bảng tự chấm của mẫu.
Changed: Ghi rõ rằng khi điền bảng tự chấm sẽ áp dụng sáu tiêu chí D5 theo rubric.
Rejected: Các tiêu chí và số điểm IA#1 trong ví dụ, vì đó là mẫu của bài khác. Đã đối chiếu với rubric D5.

## 2026-11-19 — Cập nhật nhật ký sử dụng AI
Tool: OpenAI Codex.
Asked for: Ghi vào AI-LOG.md mỗi lần Codex hỗ trợ một task của dự án.
Kept: Nội dung hướng dẫn và ví dụ có sẵn trong mẫu.
Changed: Thêm các mục theo từng task đã làm, dùng năm trường của mẫu và ghi rõ các mục được bổ sung từ lịch sử trao đổi.
Rejected: Không có. Đã đối chiếu mỗi mục với format và xác nhận nội dung mẫu gốc được giữ nguyên.

## 2026-11-19 — Đối chiếu hồ sơ D5 với rubric PDF
Tool: OpenAI Codex.
Asked for: Đọc kỹ rubric PDF và kiểm tra các phần còn thiếu trong repo.
Kept: Câu hỏi D5, cấu trúc hồ sơ và các mục của mẫu tự chấm nhóm cung cấp.
Changed: Khi viết quy tắc trước đó dựa trên bản TXT bị cắt, Codex bỏ sót yêu cầu mức 9–10 của AI-LOG. Đối chiếu tiêu chí 6 ở trang 7 bản PDF cho thấy phải ghi ít nhất một lỗi thật của AI và cách phát hiện. Đã bổ sung vào AGENTS.md và làm rõ cách lưu log theo tiêu chí 2 ở trang 6.
Rejected: Năm tiêu chí và điểm 82/100 của ví dụ IA#1, vì trang 6 và 8 yêu cầu tự chấm theo sáu tiêu chí seminar và có minh chứng. Khung D5 để trống điểm thực tế.

## 2026-11-19 — Thiết lập quy ước Git và nhánh hồ sơ seminar
Tool: OpenAI Codex.
Asked for: Thêm quy ước đặt tên nhánh, commit và PR, đồng bộ link GitHub rồi đưa khung repo lên qua PR.
Kept: Câu hỏi D5 và nội dung hồ sơ hiện có.
Changed: Thêm quy ước vào AGENTS.md và cập nhật README.md cùng dòng đầu REPORT.md theo repo mới. Git ls-remote cho thấy chưa có nhánh từ xa, nên tạo commit khởi tạo rỗng trên main làm đích cho nhánh docs/repo-setup.
Rejected: Hướng dẫn clone LeeTKOB_AWAD và vào thư mục con, vì nhóm đã chỉ định repo riêng. Đã đối chiếu hai link trong Markdown và kiểm tra tên nhánh bằng git check-ref-format.

## 2026-11-19 — Dựng giao diện demo benchmark D5
Tool: OpenAI Codex.
Asked for: Dựng trang HTML demo dễ dùng, có trình bày chuyên nghiệp và cập nhật kế hoạch tích hợp.
Kept: Demo HTML/CSS/JS có hai vị trí nén, bộ chọn/kéo thả JPEG và hai ô chỉ số chờ phép đo thực tế.
Changed: Giữ nút chạy ở trạng thái chờ codec và server, rồi cập nhật đầu việc tích hợp trong kế hoạch. Sửa lỗi tải favicon phát hiện trong lần mở preview đầu tiên. Đã kiểm tra chọn JPEG, bỏ qua tệp sai loại, kéo thả, xóa lô và đổi chế độ trong trình duyệt.
Rejected: Phép kiểm tra tràn ngang dựa trên innerWidth báo sai ở 320 px vì thanh cuộn dọc. Đối chiếu lại với clientWidth cho thấy không có phần tử tràn, rồi kiểm tra ở 320, 390 và 1366 px.

## 2026-11-19 — Commit, push và mở PR cho demo
Tool: OpenAI Codex.
Asked for: Commit trang demo, checkout main, push nhánh feat/benchmark-demo và mở PR.
Kept: Commit 1bc31c6 chứa giao diện demo, hướng dẫn mở trang và mục nhật ký phát triển giao diện.
Changed: Codex đã mở PR #2 vào main nhưng bỏ sót mục nhật ký riêng cho bước Git. Nhóm nhắc bổ sung, rồi Codex đối chiếu commit và trạng thái PR để ghi lại bước này.
Rejected: Không đưa file kế hoạch trong research vào commit vì file nằm ngoài repo Git. Đã kiểm tra danh sách tệp được stage và git diff --cached --check.

## 2026-11-20 — Rà soát rubric, cập nhật kế hoạch và quy tắc repo
Tool: Antigravity (Gemini).
Asked for: Đánh giá hiện trạng project, đối chiếu `docs/ke-hoach-seminar-d5.md` và `AGENTS.md` với `docs/seminar_rubric.md`, sau đó commit và push lên nhánh `docs/fresh-clone-guide`.
Kept: Cấu trúc 7 đầu việc, phân công 3 thành viên và 5 nhóm quy ước trong `AGENTS.md`.
Changed: Bổ sung quy ước pre-warm Wasm đối xứng, tự động hóa trình duyệt và giới hạn mạng bằng code trong `npm run measure`, tách log chạy lại trong `results/` để không ghi đè log chính thức, nêu rõ chi phí đánh đổi và trường hợp nên tránh trong `REPORT.md`, kiểm chứng nguồn chính thức kèm ngày truy cập, và thêm context pointers cùng quy tắc cập nhật Google Sheets vào `AGENTS.md`. Đã commit `5c6c0bc` và push lên `origin/docs/fresh-clone-guide`.
Rejected: Câu hướng dẫn chung chung (no-op) ở mục `Làm việc trong repo` của `AGENTS.md` sau khi đối chiếu `.agents/skills/writing-for-agents/SKILL.md`. Đã kiểm tra lại bằng `git diff --cached --check` và đối chiếu từng tiêu chí của rubric.

## 2026-11-20 — Hoàn thành Việc 1 (đặc tả phép đo) và cập nhật Google Sheets
Tool: Antigravity (Gemini) và CLI `gsheets`.
Asked for: Lập kế hoạch và tạo đặc tả kỹ thuật cho Việc 1 (`docs/benchmark-spec.md`), đồng thời thêm cột `Bằng chứng` và cập nhật task `D5-04` trên Google Sheets.
Kept: Năm hợp đồng bàn giao cho Việc 2–4 gồm `@jsquash/jpeg` (`quality: 75`, tuần tự, pre-warm đối xứng), 1 HTTP POST `multipart/form-data` lên `/api/benchmark`, DOM hooks trên `demo/`, Playwright + CDP (`20 Mbps / 40 ms RTT`) và schema log trong `results/`.
Changed: Tạo `docs/benchmark-spec.md`, dẫn link từ `docs/ke-hoach-seminar-d5.md`, thêm cột `Bằng chứng` (cột `L`) và dòng `D5-04` trên Google Sheets (`Trang tính1`). Khi ghi bảng tính, AI ban đầu gọi `gsheets mutate write` sai dấu phân tách cột (`|` thay vì `,`) và thiếu escape dấu phẩy nên lệnh báo lỗi; sau đó chuyển sang `gsheets mutate batch` với mảng JSON 2 chiều và đọc lại dải `B13:L18` để xác nhận. Ngoài ra AI bỏ sót bước tự ghi `AI-LOG.md` sau khi hoàn thành task cho đến khi nhóm nhắc, nên đã siết lại quy tắc bắt buộc tự động ghi `AI-LOG.md` trong `AGENTS.md`.
Rejected: Lệnh `gsheets mutate write` dạng chuỗi inline dễ lỗi khi ô có dấu phẩy; không ghi đè cột `J` (`% Tiến độ`) để giữ nguyên công thức sẵn có trên Google Sheets.
