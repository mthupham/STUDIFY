# Studify Frontend

Frontend của Studify được xây theo hướng feature-first: mỗi domain tách riêng thành một thư mục trong `src/features`, còn các phần dùng chung như layout, route, store hoặc component tái sử dụng được đặt ở tầng cao hơn để tránh chồng chéo logic.

## Code Stack

- React 19
- TypeScript cho entry và hạ tầng chính, hiện tại codebase vẫn có một số file `.jsx` trong giai đoạn chuyển đổi
- Vite làm dev server và build tool
- React Router 7 cho điều hướng
- ESLint cho kiểm tra chất lượng code
- Tailwind CSS 4 đã có trong dependency, nhưng hiện UI vẫn chủ yếu đang đi theo hướng component + inline style/CSS theo từng màn hình

## Cách Frontend Dev Triển Khai Code

Nguyên tắc chung là viết theo feature, không dồn logic vào một file lớn.

1. Mỗi tính năng mới nên có một folder riêng trong `src/features/<feature-name>`.
2. Component chỉ nên giữ phần UI và tương tác gần nhất với màn hình.
3. Logic gọi API, xử lý dữ liệu hoặc state dùng chung nên tách ra `services`, `store`, `hooks`.
4. Khi có màn hình mới, ưu tiên nối qua router trước, sau đó mới gắn vào layout chung.
5. Nếu đang làm UI chưa có backend, dùng mock data hoặc local state để hoàn thiện flow trước.

### Cấu trúc đang dùng

- `src/App.tsx`: entry điều phối route chính
- `src/layouts`: shell dùng chung như sidebar, header, wrapper
- `src/features/auth`: màn login/register và auth store
- `src/features/learning`: dashboard, roadmap và các màn học tập
- `src/features/onboarding`: luồng onboarding và placement test
- `src/components`: component dùng lại ở nhiều feature

## Quy Trình Làm Việc Hằng Ngày

Khi dev frontend làm việc trên repo này, luồng chuẩn nên là:

1. Chọn feature cần sửa hoặc thêm.
2. Tạo hoặc cập nhật component trong đúng folder feature.
3. Nếu cần điều hướng, thêm route vào `src/App.tsx`.
4. Nếu cần dùng chung UI khung, đặt vào `src/layouts` hoặc `src/components`.
5. Chạy lint và build để kiểm tra lỗi sớm.

## Quick Tutorial

### 1. Cài dependency

```bash
npm install
```

### 2. Chạy môi trường dev

```bash
npm run dev
```

Sau đó mở địa chỉ Vite in ra trong terminal, thường là `http://localhost:5173`.

### 3. Kiểm tra code trước khi commit

```bash
npm run lint
```

### 4. Build kiểm tra production

```bash
npm run build
```

### 5. Xem bản build gần nhất

```bash
npm run preview
```

## Gợi Ý Khi Viết Code Mới

- Ưu tiên viết file mới bằng TypeScript hoặc TSX nếu đang tạo màn hình hay logic mới.
- Giữ component nhỏ, một file chỉ nên làm một việc chính.
- Nếu feature chưa có API, hãy mock dữ liệu ngay trong feature đó để giữ phạm vi thay đổi nhỏ.
- Khi hoàn thiện một màn hình mới, nhớ kiểm tra nó có đi đúng route và đúng layout chung hay không.

## Trạng Thái Hiện Tại

Repo frontend đang ở giai đoạn phát triển dần từ prototype UI sang cấu trúc feature rõ hơn. Một số màn vẫn dùng JSX cũ, nhưng hướng triển khai chung là: tách theo feature, giữ route tập trung, và đưa logic dùng chung ra ngoài component hiển thị.
