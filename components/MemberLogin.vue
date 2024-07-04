<template>
<!-- <CContainer md="4">
    <CRow>
        <CCol style="background-color: red;margin:auto">
            
    <div style="margin: auto; border: 1px solid red padding: 10px">
    <CForm>
    <div class="mb-3" style="padding: 50px">
        <CFormLabel for="exampleFormControlInput1">Email address</CFormLabel>
        <CFormInput type="email" id="exampleFormControlInput1" placeholder="name@example.com"/>
    </div>
    <div class="mb-3">
        <CFormLabel for="exampleFormControlTextarea1">Example textarea</CFormLabel>
        <CFormTextarea id="exampleFormControlTextarea1" rows="3"></CFormTextarea>
    </div>
    </CForm>
    </div>
        </CCol>   
        <CCol style="background-color: black">
    <div style="margin-top: 30px; border: 1px solid black padding: 10px">
    <CForm>
    <div class="mb-3" style="padding: 50px">
        <CFormLabel for="exampleFormControlInput1">Email address</CFormLabel>
        <CFormInput type="email" id="exampleFormControlInput1" placeholder="name@example.com"/>
    </div>
    <div class="mb-3">
        <CFormLabel for="exampleFormControlTextarea1">Example textarea</CFormLabel>
        <CFormTextarea id="exampleFormControlTextarea1" rows="3"></CFormTextarea>
    </div>
    </CForm>
    </div>
        </CCol>
        

    </CRow>
</CContainer> -->
<CContainer>
  <CRow>
    <CCol sm="6" class="box1">
      1 of 3
    </CCol>
    <CCol sm="6" class="box2">
      2 of 3 (wider)
    </CCol>
    <CCol  sm="6" class="box3">
      3 of 3
    </CCol>
     <CCol  sm="6" class="box4">
      4 of 5
    </CCol>
  </CRow>
  
</CContainer>
</template>
<script>
    export default {
        name: 'MemberLogin'
    }
  
</script>
<style scoped>
.box1 {
border: 1px solid black;
background-color: red;
min-height: 250px;

}
.box2 {
border: 1px solid black;
background-color: blue;
min-height: 250px;

}
.box3 {
border: 1px solid black;
background-color: yellow;
min-height: 250px;

}
.box4 {
border: 1px solid black;
background-color: pink;
min-height: 250px;

}
</style>