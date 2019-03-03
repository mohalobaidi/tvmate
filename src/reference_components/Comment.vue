<template lang="pug">
.Comment
  .header
    .name(v-if='user.name') {{user.name}}
    .username @{{user.username}}
  .content {{comment}}
  .footer
    .date
      span created at
      | {{(new Date(created_at)).toDateString()}}
</template>

<script>
export default {
  name: 'Comment',
  props: ['comment', 'user', 'created_at', 'likes']
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="sass" scoped>
.Comment
  width: 100% 
  margin-bottom: 16px 
  border-bottom: 1px solid rgba(255, 255, 255, .1)
  .Icon
    color: rgba(255, 255, 255, .7)
    font-size: 12px 
    line-height: inherit
  .header
    font-size: 12px 
    padding: 4px 0
    display: grid
    grid-template-columns: auto auto auto
    justify-content: flex-start
    grid-column-gap: 8px
    .username
      color: rgba(255, 255, 255, .7)
  .content
    font-size: 14px 
    text-align: justify
    padding: 4px 16px
  .footer
    font-size: 10px 
    padding: 8px 0 8px
    display: grid
    grid-template-columns: auto auto auto
    justify-content: flex-start
    grid-column-gap: 24px
    span
      color: rgba(255, 255, 255, .7)
      margin-inline-end: 8px
</style>

<!--
comment:"this according to duckietv aired at 9:00 pm 07/24/2018. according to you it aired at 5:00pm 07/24/2018. in actually it airs some time today 07/25/2018. might want to do some research and correct the information you have. thanks"
created_at:"2018-07-25T14:31:18.000Z"
id:184524
likes:0
parent_id:0
replies:3
review:false
spoiler:false
updated_at:"2018-07-25T14:31:18.000Z"
user:Object
  ids:Object
    slug:"2635599"
  name:"2635599"
  private:false
  username:"2635599"
vip:false
vip_ep:false
user_rating:
-->