<template>
  <footer class="bg-dark text-light">
    <div class="container py-4">
      <div class="row">
        <div class="col-md-4">
          <h3><i class="fas fa-book"></i> Bookstore</h3>
          <p>Cùng đồng hành trên con đường tri thức.</p>
        </div>
        <div class="col-md-4">
          <h5>Support</h5>
          <ul class="list-unstyled">
            <li><a href="#">Help</a></li>
            <li><a href="#">About Us</a></li>
            <li><a href="#">FAQs</a></li>
            <li><a href="#">Contact Us</a></li>
          </ul>
        </div>
        <div class="col-md-4">
          <h5>Contact Info</h5>
          <address>
            <p><i class="fas fa-map-marker-alt"></i> 666 đường 3/2, Ninh Kiều, Cần Thơ</p>
            <p><i class="fas fa-envelope"></i> Email: dinhb2005666@gmail.com</p>
            <p><i class="fas fa-phone"></i> Phone: (+84) 0961970526</p>
          </address>
        </div>
      </div>
    </div>
  </footer>
</template>


<style scoped>
footer {
  padding-top: 1rem;
  padding-bottom: 1rem;
}

footer h3, footer h5 {
  color: #ffc107; /* Bootstrap's yellow color */
}

footer p, footer ul {
  color: #b0b0b0; /* Light gray text color */
}

footer a {
  color: #fff;
}

footer a:hover {
  text-decoration: none;
  color: #ffc107;
}
</style>
