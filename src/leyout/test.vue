<template>
  <div class="index">
    <el-container>
      <el-header class="header-parent-class">
        <div class="header-div-class">
          <span>header</span>
        </div>
      </el-header>
      <el-main class="main-parent-class">
        <div>
          <span>content</span>
        </div>
      </el-main>
      <el-footer>
        <div class="footer-div">
          <span class="footer-span">&copy; Darcy</span>
        </div>
      </el-footer>
    </el-container>
  </div>
</template>
<style lang="scss" scoped>
.index {
  height: 100%;
  width: 100%;
  position: absolute;
  top: 0;
  left: 0;
}
.el-container {
  width: 100%;
  min-height: 100%;
  display: flex;
  flex-direction: column;
  justify-content:space-between;
}
.el-main {
  height: 100%;
  overflow: hidden;
}
.el-footer {
  display: flex;
  height: 7vh;
  width: 100%;
  align-items: center;
}
</style>