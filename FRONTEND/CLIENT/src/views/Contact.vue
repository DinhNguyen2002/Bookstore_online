<template>
  <div class="container py-5">
    <div class="row justify-content-center">
      <div class="col-md-8">
        <h2 class="text-center mb-4">Liên Hệ Chúng Tôi</h2>
        <form>
          <div class="mb-3">
            <label for="fullName" class="form-label">Họ và Tên</label>
            <input type="text" class="form-control" id="fullName" name="fullName" required />
          </div>
          <div class="mb-3">
            <label for="email" class="form-label">Email</label>
            <input type="email" class="form-control" id="email" name="email" required />
          </div>
          <div class="mb-3">
            <label for="message" class="form-label">Nội Dung</label>
            <textarea class="form-control" id="message" name="message" rows="4" required></textarea>
          </div>
          <button type="submit" class="btn btn-primary">Gửi Liên Hệ</button>
        </form>

        <div class="mt-5">
          <h4>Thông Tin Liên Hệ</h4>
          <p><i class="fas fa-map-marker-alt"></i> Địa chỉ: 666 Đường 3/2, Thành phố Cần Thơ</p>
          <p><i class="fas fa-phone"></i> Điện thoại: +84 069 7898 239</p>
          <p><i class="fas fa-envelope"></i> Email: dinhb2005666@example.com</p>
        </div>

        <div class="mt-5">
          <h4>Thời Gian Làm Việc</h4>
          <p>Thứ Hai - Thứ Sáu: 8:00 AM - 6:00 PM</p>
          <p>Thứ Bảy: 9:00 AM - 1:00 PM</p>
          <p>Chủ Nhật: Nghỉ</p>
        </div>

        <div class="mt-5">
          <h4>Thông Tin Khác</h4>
          <p>
            Chúng tôi luôn đánh giá cao ý kiến và đề xuất từ phía khách hàng.
            Nếu bạn có bất kỳ câu hỏi hoặc ý kiến nào, vui lòng liên hệ chúng
            tôi bằng cách sử dụng mẫu liên hệ trên hoặc gửi email trực tiếp.
          </p>
        </div>

        <div class="mt-5">
          <h4>Đối Tác và Hợp Tác</h4>
          <p>
            Chúng tôi luôn mở rộng cơ hội đối tác và hợp tác với các doanh
            nghiệp có tầm nhìn và giá trị tương tự. Nếu bạn quan tâm đến việc
            hợp tác, vui lòng liên hệ với chúng tôi để biết thêm chi tiết.
          </p>
        </div>

        <div class="mt-5">
          <h4>Câu Hỏi Thường Gặp (FAQs)</h4>
          <p>
            Dưới đây là một số câu hỏi thường gặp mà chúng tôi thường nhận được:
          </p>
          <ul>
            <li><strong>Câu hỏi 1:</strong> Mua hàng online có được đổi trả không?</li>
            <li><strong>Câu hỏi 2:</strong> Đơn hàng bao nhiêu thì được miễn phí vận chuyển?</li>
            <li><strong>Câu hỏi 3:</strong> Mua trực tiếp tại cửa hàng có được tính giá giống như trên webiste hay không?</li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<style>
  /* Add some styling to the form */
  form {
    max-width: 500px;
    margin: auto;
  }

  /* Style the contact information */
  .mt-5 p {
    margin-bottom: 5px;
  }

  /* Style the FAQ list */
  .mt-5 ul {
    list-style-type: none;
    padding: 0;
  }

  .mt-5 li {
    margin-bottom: 10px;
  }
</style>
