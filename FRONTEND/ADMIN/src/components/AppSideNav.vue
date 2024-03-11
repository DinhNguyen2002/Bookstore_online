<template>
  <div id="layoutSidenav_nav">
    <nav class="sb-sidenav accordion sb-sidenav-dark" id="sidenavAccordion">
      <div class="sb-sidenav-menu">
        <div class="nav">
          <div class="sb-sidenav-menu-heading">HOME</div>

          <router-link :to="{ name: 'adminpage' }" class="nav-link ">
            Trang chủ
          </router-link>

          <div class="sb-sidenav-menu-heading">MANAGER</div>
          <a
            class="nav-link collapsed"
            href="##"
            data-bs-toggle="collapse"
            data-bs-target="#pagesCollapseAuth"
            aria-expanded="false"
            aria-controls="pagesCollapseAuth"
          >
            Quản lý sản phẩm
            <div class="sb-sidenav-collapse-arrow">
              <i class="fas fa-angle-down"></i>
            </div>
          </a>
          <div
            class="collapse"
            id="pagesCollapseAuth"
            aria-labelledby="headingOne"
            data-bs-parent="#sidenavAccordionPages"
          >
            <nav class="sb-sidenav-menu-nested nav">
              <router-link :to="{ name: 'popular' }" class="nav-link active">
                Sản phẩm bán chạy
              </router-link>

              <router-link :to="{ name: 'product.add' }" class="nav-link">
                Thêm sản phẩm
              </router-link>
            </nav>
          </div>
          <a
            class="nav-link collapsed"
            href="##"
            data-bs-toggle="collapse"
            data-bs-target="#pagesCollapseError"
            aria-expanded="false"
            aria-controls="pagesCollapseError"
          >
            Quản lý khách hàng
            <div class="sb-sidenav-collapse-arrow">
              <i class="fas fa-angle-down"></i>
            </div>
          </a>
          <div
            class="collapse"
            id="pagesCollapseError"
            aria-labelledby="headingOne"
            data-bs-parent="#sidenavAccordionPages"
          >
            <nav class="sb-sidenav-menu-nested nav">
              <router-link :to="{ name: 'user.loyal' }" class="nav-link ">
                Khách hàng thân thiết</router-link
              >
              <router-link :to="{ name: 'user.vip' }" class="nav-link ">
                Khách hàng VIP</router-link
              >

              <router-link :to="{ name: 'user.list' }" class="nav-link ">
                Danh sách khách hàng
              </router-link>
            </nav>
          </div>

          <a
            class="nav-link collapsed"
            href="##"
            data-bs-toggle="collapse"
            data-bs-target="#DonHang"
            aria-expanded="false"
            aria-controls="DonHang"
          >
            Quản lý đơn hàng
            <div class="sb-sidenav-collapse-arrow">
              <i class="fas fa-angle-down"></i>
            </div>
          </a>
          <div
            class="collapse"
            id="DonHang"
            aria-labelledby="headingOne"
            data-bs-parent="#sidenavAccordionPages"
          >
            <nav class="sb-sidenav-menu-nested nav">
              <router-link :to="{ name: 'order.new' }" class="nav-link ">
                Đơn hàng mới
              </router-link>

              <router-link :to="{ name: 'order.checked' }" class="nav-link ">
                Đơn đã duyệt
              </router-link>
              <router-link :to="{ name: 'order.done' }" class="nav-link ">
                Đơn đã giao
              </router-link>
            </nav>
          </div>
          <router-link :to="{ name: 'sumary' }" class="nav-link">
            Thống kê doanh số
          </router-link>
        </div>
      </div>
    </nav>
  </div>
</template>
