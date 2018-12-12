<template>
  <div>
    <div class="gift-box">
      <div class="gift-box-line">
        <div class="gift-item liwu"></div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
     
    }
  }
}
</script>
<style scoped>
  .gift-box {
    margin: 0 auto;
    width: 100%;
    height: 2.5rem;
    box-sizing: border-box;
    margin: .1rem 0;
    /* border: 1px solid #b4b4b4; */
    overflow: hidden;
    overflow-y: auto;
  }
  .gift-item {
    text-align: center;
    cursor: pointer;
    width: .7rem;
    height: .7rem;
    background-color: #ff7994;
    text-align: center;
    line-height: .7rem;
  }
  .liwu {
    background-image: url('../../../../assets/images/liwu.png');
    background-size: 75%;
    background-repeat: no-repeat;
    background-position: 50%;
    border-radius: .1rem;
    -webkit-border-radius: .1rem;
    margin-top: .2rem;
    margin-left: .15rem;
  } 
</style>
