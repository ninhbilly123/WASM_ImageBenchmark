# Đặc tả phép đo và điểm bàn giao — Seminar D5

Tài liệu này chốt kết quả **Việc 1** trong [kế hoạch seminar](./ke-hoach-seminar-d5.md). Ba thành viên dựa vào các hợp đồng dưới đây để triển khai song song **Việc 2** (Duy — codec Wasm), **Việc 3** (Khoa — bộ ảnh & `npm run measure`) và **Việc 4** (Ninh — server & tích hợp giao diện) mà không lệch định dạng ghép nối.

---

## 1. Hợp đồng Pipeline Wasm dùng chung (Bàn giao: Duy)

### 1.1. Codec và cấu hình cố định

- **Thư viện:** `@jsquash/jpeg` (MozJPEG biên dịch sang WebAssembly), ghim cố định cùng một phiên bản trong `package.json`.
- **Đồng nhất hai môi trường:** Cả trình duyệt và máy chủ Node.js đều dùng **cùng bản build `.wasm`** và **cùng đường xử lý `decode → encode`** của `@jsquash/jpeg` (không dùng bộ giải mã JPEG riêng của trình duyệt như `createImageBitmap` hay `<canvas>`) để đầu ra tương đương giữa hai luồng.
- **Tham số nén cố định:** `quality: 75` (các tham số còn lại giữ mặc định của `@jsquash/jpeg` và ghi rõ phiên bản cùng tài liệu chính thức vào `REPORT.md`).
- **Mức song song:** Tuần tự từng ảnh một (`concurrency = 1`) theo đúng thứ tự danh sách từ ảnh `01` đến ảnh `10` ở cả hai luồng.

### 1.2. Quy tắc khởi tạo (Pre-warm đối xứng)

- Trước khi bắt đầu bấm giờ bất kỳ lượt đo nào, cả trình duyệt và máy chủ Node.js đều gọi `initCodec()` để nạp và khởi tạo sẵn module `.wasm`.
- **Chi phí phụ (*cost*):** Ghi nhận riêng dung lượng tệp nhị phân `.wasm` (`wasmBinaryBytes`) và thời gian tải + khởi tạo lần đầu (`codecInitMs`) vào log để phân tích chi phí trong `REPORT.md`; không gộp thời gian khởi tạo này vào độ trễ gửi–nhận của các lượt đo đã pre-warm.

### 1.3. Chữ ký giao diện dùng chung (`shared/codec.js` hoặc hai wrapper tương đương)

```js
/**
 * Nạp và khởi tạo sẵn module Wasm (decode + encode).
 * Gọi 1 lần lúc khởi động server và 1 lần lúc tải trang demo.
 */
export async function initCodec() {
  // returns { codecInitMs: number, wasmBinaryBytes: number, codecVersion: string }
}

/**
 * Nén một ảnh JPEG bằng đường decode -> encode của @jsquash/jpeg.
 * @param {Uint8Array} inputBytes
 * @param {{ quality?: number }} [options] - Mặc định { quality: 75 }
 * @returns {Promise<Uint8Array>}
 */
export async function compressJpeg(inputBytes, options = { quality: 75 }) {}

/**
 * Nén tuần tự toàn bộ lô ảnh theo đúng thứ tự đầu vào (concurrency = 1).
 * @param {Array<{ name: string, bytes: Uint8Array }>} files
 * @param {{ quality?: number }} [options]
 * @returns {Promise<{
 *   outputs: Array<{ name: string, bytes: Uint8Array }>,
 *   compressMs: number
 * }>}
 */
export async function compressBatchSequential(files, options = { quality: 75 }) {}
```

### 1.4. Tiêu chí kiểm chứng ở Việc 2

- Thử trên 1 JPEG mẫu ở cả Browser và Node.js: đầu ra đều là JPEG hợp lệ, cùng kích thước pixel, cùng số byte (`outputBytes`) và khớp `sha256` (nếu có sai khác byte, ghi rõ nguyên nhân và đối chiếu kích thước/chất lượng trước khi tích hợp).

---

## 2. Hợp đồng HTTP Upload & Server Confirmation (Bàn giao: Ninh)

### 2.1. Endpoint và cách đóng gói

- **Endpoint:** `POST /api/benchmark`
- **Content-Type:** `multipart/form-data` — gửi **toàn bộ 10 ảnh trong 1 HTTP request duy nhất** ở cả hai luồng.
- **Các trường trong `FormData`:**
  - `mode`: `"server"` (Baseline) hoặc `"browser"` (Thay đổi).
  - `runId`: chuỗi định danh lượt chạy (tùy chọn, dùng để đặt thư mục lưu tạm và đối chiếu log).
  - `files`: lặp lại 10 lần theo đúng thứ tự lô ảnh (`01.jpg` → `10.jpg`).

### 2.2. Quy tắc đếm dung lượng tải lên

- Server đếm **tổng số byte thực tế của HTTP request body** (`uploadPayloadBytes`) ngay trên stream request nhận được (bao gồm cả phần boundary của `multipart/form-data`, giống nhau về cách đóng gói ở hai luồng).
- Lưu nguyên giá trị `uploadPayloadBytes` (số nguyên) trong response và log; quy đổi hiển thị theo hệ thập phân:

```js
uploadPayloadMB = Number((uploadPayloadBytes / 1_000_000).toFixed(2));
```

### 2.3. Xử lý trên máy chủ trước khi trả xác nhận

- **`mode === "server"` (Baseline):**
  1. Nhận đủ HTTP request body và đếm `uploadPayloadBytes`.
  2. Tách đủ 10 tệp JPEG gốc theo đúng thứ tự.
  3. Gọi `compressBatchSequential(files, { quality: 75 })` bằng cùng pipeline Wasm đã pre-warm.
  4. Ghi đủ 10 tệp JPEG đã nén xuống thư mục tạm (ví dụ `tmp/uploads/<runId>/`).
  5. Tính `sha256` từng tệp đầu ra (có thể bật cờ hoặc tính ngay sau nén để xác minh) và trả HTTP `200 OK` JSON.
- **`mode === "browser"` (Thay đổi):**
  1. Nhận đủ HTTP request body (10 ảnh đã được nén Wasm ở trình duyệt) và đếm `uploadPayloadBytes`.
  2. Tách đủ 10 tệp JPEG đã nén theo đúng thứ tự.
  3. Ghi đủ 10 tệp xuống thư mục tạm (`tmp/uploads/<runId>/`).
  4. Trả HTTP `200 OK` JSON.

> **Lưu ý dọn dẹp:** Server xóa hoặc ghi đè thư mục tạm giữa các lượt chạy để không làm đầy ổ đĩa và không commit tệp tạm vào Git (thêm `tmp/` vào `.gitignore`).

### 2.4. Schema JSON xác nhận từ máy chủ (`HTTP 200 OK`)

```json
{
  "ok": true,
  "mode": "server",
  "runId": "pair-1-server",
  "fileCount": 10,
  "uploadPayloadBytes": 50241890,
  "uploadPayloadMB": 50.24,
  "outputTotalBytes": 11842310,
  "serverCompressMs": 1480.42,
  "serverWriteMs": 28.15,
  "serverTotalMs": 1562.10,
  "savedFiles": [
    {
      "name": "01.jpg",
      "receivedBytes": 5021400,
      "savedBytes": 1182040,
      "sha256": "..."
    }
  ]
}
```

---

## 3. Hợp đồng Mốc đo Độ trễ & DOM Hooks (`demo/`) (Bàn giao: Ninh ↔ Khoa)

### 3.1. Mốc bấm giờ độ trễ đầu-cuối (`endToEndLatencyMs`)

Đo hoàn toàn ở phía trình duyệt bằng `performance.now()` sau khi codec đã pre-warm:

- **Luồng `server` (Baseline):**
  - `t0 = performance.now()` ngay khi bắt đầu xử lý nút **Chạy phép đo**.
  - Đóng gói 10 ảnh gốc vào `FormData` → `fetch('/api/benchmark', { method: 'POST', body: formData })` → `const data = await response.json()` (xác nhận `response.ok && data.ok === true`).
  - `t1 = performance.now()`.
- **Luồng `browser` (Thay đổi):**
  - `t0 = performance.now()` ngay khi bắt đầu xử lý nút **Chạy phép đo** (trước bước đọc và nén ảnh).
  - Đọc `ArrayBuffer` và gọi `compressBatchSequential(files, { quality: 75 })` → ghi nhận thêm `browserCompressMs` → đóng gói 10 ảnh đã nén vào `FormData` → `fetch('/api/benchmark', { method: 'POST', body: formData })` → `const data = await response.json()` (xác nhận `response.ok && data.ok === true`).
  - `t1 = performance.now()`.
- **Kết quả:** `endToEndLatencyMs = Number((t1 - t0).toFixed(2))`.

### 3.2. Cập nhật DOM & JS Hooks trên `demo/index.html` và `demo/demo.js`

Để script Playwright (`npm run measure`) thao tác và đọc số liệu ổn định mà không phụ thuộc chuỗi văn bản hiển thị:

- **State danh sách tệp (`demo/demo.js`):** Lưu danh sách JPEG hợp lệ vào biến state dùng chung (ví dụ `selectedFiles`) cập nhật từ cả `fileInput` (`change`), kéo-thả (`drop`) và nút xóa (`#clear-files`).
- **Trạng thái trang:** Gắn thuộc tính `data-benchmark-state` trên `#main` với các giá trị:
  - `"initializing"`: đang tải và pre-warm Wasm codec.
  - `"ready"`: codec đã sẵn sàng (nút `#run-benchmark` bật khi có ít nhất 1 ảnh hợp lệ).
  - `"running"`: đang thực thi một lượt đo.
  - `"done"`: lượt đo hoàn tất và đã cập nhật kết quả.
  - `"error"`: có lỗi khi nén hoặc gọi server.
- **ID phần tử kết quả (`demo/index.html`):**
  - `#metric-payload`: phần tử `<span>` hiển thị giá trị `uploadPayloadMB`.
  - `#metric-latency`: phần tử `<span>` hiển thị giá trị `endToEndLatencyMs`.
- **Biến đọc kết quả cho Playwright:** Khi `data-benchmark-state` chuyển sang `"done"`, gán object đầy đủ vào `window.__lastBenchmarkResult`:

```js
window.__lastBenchmarkResult = {
  mode: "browser", // "server" | "browser"
  fileCount: 10,
  inputTotalBytes: 50230000,
  uploadPayloadBytes: 11845120,
  uploadPayloadMB: 11.85,
  endToEndLatencyMs: 6420.5,
  browserCompressMs: 1520.3,
  serverCompressMs: 0,
  serverWriteMs: 21.4,
  serverTotalMs: 42.1,
  outputTotalBytes: 11842310,
  codecInitMs: 85.2,
  wasmBinaryBytes: 215000,
  savedFiles: [/* từ server response */]
};
```

---

## 4. Hợp đồng Lệnh đo `npm run measure` & Kiểm soát mạng (Bàn giao: Khoa)

### 4.1. Bộ ảnh cố định (`dataset/`)

- Gồm đúng **10 tệp JPEG độ phân giải cao**, tổng dung lượng khoảng **50 MB**, đặt tên cố định `01.jpg` → `10.jpg` (hoặc liệt kê theo thứ tự cố định trong `dataset/manifest.json`).
- Lưu `dataset/manifest.json` gồm: nguồn gốc, giấy phép/quyền phân phối, kích thước pixel (`width`, `height`), số byte gốc (`bytes`) và `sha256` từng ảnh.

### 4.2. Trình tự thực thi của `npm run measure`

1. Khởi chạy server Node.js local và chờ endpoint kiểm tra sẵn sàng (`GET /api/health` trả `ok: true` sau khi server đã pre-warm Wasm).
2. Mở Chromium headless bằng Playwright, truy cập trang `demo/` do server phục vụ và chờ `#main[data-benchmark-state="ready"]`.
3. Tạo CDP session (`client = await page.context().newCDPSession(page)`) và áp dụng cấu hình mạng bằng `Network.emulateNetworkConditions`:
   - **Cấu hình chính (bắt buộc) — `controlled-20mbps`:**
     - `offline: false`
     - `uploadThroughput: 2500000` (20 Mbps = 2.500.000 byte/giây)
     - `downloadThroughput: 2500000` (20 Mbps = 2.500.000 byte/giây)
     - `latency: 40` (RTT 40 ms)
   - **Cấu hình mở rộng (tùy chọn sau khi cấu hình chính ổn định) — ví dụ `fast-100mbps`:**
     - `uploadThroughput: 12500000` (100 Mbps), `downloadThroughput: 12500000`, `latency: 5` (RTT 5 ms) — nhằm minh họa ngưỡng mạng nhanh nơi nén ở trình duyệt có thể không giảm hoặc làm tăng độ trễ.
4. Nạp đủ 10 tệp từ `dataset/` vào `#files` qua `page.setInputFiles('#files', filePaths)`.
5. Chạy **5 cặp lượt đo xen kẽ** cho mỗi cấu hình mạng:
   - Cặp 1, 3, 5: `server` trước → `browser` sau.
   - Cặp 2, 4: `browser` trước → `server` sau.
6. Với mỗi lượt: chọn radio `input[name="mode"][value="<mode>"]`, bấm `#run-benchmark`, chờ `#main[data-benchmark-state="done"]`, đọc `window.__lastBenchmarkResult` và lưu vào mảng kết quả thô.
7. Đóng trình duyệt và tắt server Node.js gọn gàng; tính thống kê, in bảng kết quả ra terminal và ghi tệp log vào `results/`.

---

## 5. Hợp đồng Cấu trúc Log trong `results/` & Công thức thống kê

### 5.1. Quy tắc đặt tên tệp (không ghi đè log chính thức)

- Mỗi lần chạy `npm run measure` mặc định ghi ra tệp mới: `results/runs/run-<YYYYMMDD-HHmmss>.json`.
- Bộ log chính thức dùng để trích dẫn vào `REPORT.md` và `slides.pdf` được chốt ở Việc 5 và lưu cố định tại `results/reported-benchmark.json` (có thể tạo bằng cờ `npm run measure -- --save-reported` hoặc sao chép có kiểm soát). Người chấm chạy lại `npm run measure` sẽ chỉ tạo tệp mới trong `results/runs/` và không ghi đè `results/reported-benchmark.json`.

### 5.2. Công thức thống kê và quy ước dấu

Với tối thiểu 5 lượt chạy của mỗi luồng trong từng cấu hình mạng:

- **Trung vị (`median`):** Giá trị chính giữa sau khi sắp xếp tăng dần (với 5 lượt là phần tử thứ 3).
- **Độ phân tán (`spread`):** Báo cáo cả khoảng `[min, max]` và biên độ `range = max - min`.
- **Chênh lệch (`delta`):** Lấy **Thay đổi (`browser`) trừ Baseline (`server`)**:
  - `delta = browserMedian - serverMedian`
  - `deltaPercent = ((browserMedian - serverMedian) / serverMedian) * 100`
  - Quy ước dấu: số âm (`-`) nghĩa là luồng trình duyệt **giảm** dung lượng tải lên hoặc **giảm** độ trễ so với baseline máy chủ; số dương (`+`) nghĩa là **tăng**.

### 5.3. Schema tệp log JSON (`results/runs/*.json` và `results/reported-benchmark.json`)

```json
{
  "command": "npm run measure",
  "timestamp": "2026-11-24T14:30:00.000Z",
  "environment": {
    "os": "Windows 11",
    "cpu": "...",
    "nodeVersion": "v22.x.x",
    "browserVersion": "Chromium ...",
    "codecPackage": "@jsquash/jpeg@...",
    "jpegQuality": 75,
    "concurrency": 1,
    "prewarm": true
  },
  "dataset": {
    "fileCount": 10,
    "inputTotalBytes": 50230000,
    "inputTotalMB": 50.23
  },
  "profiles": [
    {
      "name": "controlled-20mbps",
      "network": {
        "uploadBytesPerSec": 2500000,
        "downloadBytesPerSec": 2500000,
        "latencyMs": 40
      },
      "pairs": 5,
      "runs": [
        {
          "pair": 1,
          "orderInPair": 1,
          "mode": "server",
          "uploadPayloadBytes": 50241890,
          "uploadPayloadMB": 50.24,
          "endToEndLatencyMs": 22510.4,
          "browserCompressMs": 0,
          "serverCompressMs": 1480.42,
          "serverWriteMs": 28.15,
          "outputTotalBytes": 11842310
        }
      ],
      "summary": {
        "uploadPayloadMB": {
          "server": { "median": 50.24, "min": 50.24, "max": 50.24, "range": 0 },
          "browser": { "median": 11.85, "min": 11.85, "max": 11.85, "range": 0 },
          "delta": -38.39,
          "deltaPercent": -76.41
        },
        "endToEndLatencyMs": {
          "server": { "median": 22510.4, "min": 22100.0, "max": 23050.2, "range": 950.2 },
          "browser": { "median": 6420.5, "min": 6210.1, "max": 6680.0, "range": 469.9 },
          "delta": -16089.9,
          "deltaPercent": -71.48
        }
      }
    }
  ]
}
```
