<template>
  <div>
    <header class="header">
      <div>
        <p>HEADER - Now page is {{ $route.name }}</p>
        <ul>
          <li><NuxtLink to="/">Home</NuxtLink></li>
          <li><NuxtLink to="/detail">Detail Page</NuxtLink></li>
          <li><NuxtLink to="/board/1">board page</NuxtLink></li>
        </ul>
      </div>
      <div>
        <NuxtLink to="/">
          <button class="logout">Logout</button>
        </NuxtLink>
      </div>
    </header>
    <Nuxt />
  </div>
</template>

<script>
export default {}
</script>

<style scoped>
.header {
  display: flex;
  justify-content: space-between;
  width: 100vw;
  height: 100px;
  padding: 0 20px;
  background-color: tan;
}
.logout {
  background-color: skyblue;
  padding: 10px;
}
</style>

<!--
  /detail 접근시 : layouts > pages(detail.vue) > components 순으로 구조화 된 것임

  layouts
  : 페이지 레벨
  : 주소가 바껴도 이 부분은 고정적으로 나옴 (헤더처럼), app.vue처럼 페이지 레벨보다 위에 단계의 컴포넌트
  : 커스텀 레이아웃을 만들어서, page 컴포넌트 안에 다른 레이아웃으로 갈아껴줄 수 있음
  : 에러 페이지도 여기에 - 공통 컴포넌트 개념이여서 페이지 레벨로 봄 (??)
  : <Nuxt/> - vue.js에서의 <router-view> 개념임. 라우터에 따라 달리 보여질 컴포넌트 등록하는 곳
  : <NuxtLink/> - vue.js에서의 <router-link> , <a>태그와 동일한 개념

  pages
  : 컴포넌트 레벨
  : 주소가 바뀜에 따라 컴포넌트가 바뀌어 보여진다.

  components
  : 각 pages 컴포넌트에서 사용되는 컴포넌트 모음집

-->

<!-- 폴더 구조
  .nuxt : 빌드 후 나오는 폴더, 컴포넌트 내용 수정시 이 폴더가 자동으로 수정되서 자동 빌드됨
  components : 페이지 안에서 사용할 컴포넌트 모음집
  layouts : ?
  pages : 페이지 레벨 컴포넌트
  static : public폴더와 같은 꼴
  store: vuex 관련


-->

<!-- 주니하랑 : https://junyharang.tistory.com/290 -->
