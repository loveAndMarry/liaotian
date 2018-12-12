<template>
    <div class="right">
        <div class="right_content" v-html="item.context.replace(/#[\u4E00-\u9FA5]{1,3};/gi, emotion)">
        </div>
         <div class="right_img">
            <img :src="userHead" alt="">
        </div>
    </div>
</template>
<script>
import { mapState } from 'vuex'
export default {
  props: ['item'],
  computed: {
    ...mapState({
      userHead: state => state.IM.user? state.IM.user.userHead: 'https://avatars1.githubusercontent.com/u/6126885?s=88&v=4'
    }),
  },
  methods: {
    // 将匹配结果替换表情图片
    emotion (res) {
      let word = res.replace(/#|;/gi, '')
      const list = ['微笑', '撇嘴', '色', '发呆', '得意', '流泪', '害羞', '闭嘴', '睡', '大哭', '尴尬', '发怒', '调皮', '呲牙', '惊讶', '难过', '酷', '冷汗', '抓狂', '吐', '偷笑', '可爱', '白眼', '傲慢', '饥饿', '困', '惊恐', '流汗', '憨笑', '大兵', '奋斗', '咒骂', '疑问', '嘘', '晕', '折磨', '衰', '骷髅', '敲打', '再见', '擦汗', '抠鼻', '鼓掌', '糗大了', '坏笑', '左哼哼', '右哼哼', '哈欠', '鄙视', '委屈', '快哭了', '阴险', '亲亲', '吓', '可怜', '菜刀', '西瓜', '啤酒', '篮球', '乒乓', '咖啡', '饭', '猪头', '玫瑰', '凋谢', '示爱', '爱心', '心碎', '蛋糕', '闪电', '炸弹', '刀', '足球', '瓢虫', '便便', '月亮', '太阳', '礼物', '拥抱', '强', '弱', '握手', '胜利', '抱拳', '勾引', '拳头', '差劲', '爱你', 'NO', 'OK', '爱情', '飞吻', '跳跳', '发抖', '怄火', '转圈', '磕头', '回头', '跳绳', '挥手', '激动', '街舞', '献吻', '左太极', '右太极']
      let index = list.indexOf(word)
      return `<img src="https://res.wx.qq.com/mpres/htmledition/images/icon/emotion/${index}.gif" align="middle">`
    }
  }
}
</script>

<style scoped>
.right{
  width: 100%;
  overflow: hidden;
  text-align: right;
  padding: 0 .3rem;
  box-sizing: border-box;
  -webkit-box-sizing: border-box;
}
.right .right_img{
  margin-left: .14rem;
  display: block;
  float: right;
}
.right .right_img img{
  width: 1rem;
  height: 1rem;
  display: block;
  border-radius: 50%;
  -webkit-border-radius: 50%;
}
.right .right_content{
  max-width:calc( 100% - 1.14rem);
  padding: .3rem;
  display: inline-block;
  box-sizing: border-box;
  -webkit-box-sizing: border-box;
  background-color: #fff;
  border-radius: 5px;
  -webkit-border-radius: 5px;
  font-size: .28rem
}
</style>
