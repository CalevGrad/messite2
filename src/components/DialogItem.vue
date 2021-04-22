<template>
  <div class="dialog"
       v-bind:class="{'dialog-active': active}"
       v-on:click="$emit('click-dialog', id, username)"
  >
    <div class="dialog-username">{{ username }}</div>
    <div class="dialog-date">{{ date }}</div>
    <div class="dialog-text">
                  <span v-if="owner">Вы: </span>
      <span class="dia-text">{{ text }}</span>
    </div>
  </div>
</template>

<script>
import dateService from '@/services/date.service'

export default {
  name: "DialogItem",
  props: {
    id: {
      required: true,
      type: Number,
      default: () => -1,
    },
    owners: {
      required: true,
      type: Array,
      default: () => [],
    },
    last_message: {
      required: true,
      type: Object,
      default: () => {},
    },
    active: {
      required: true,
      type: Boolean,
      default: () => false,
    },
    user: {
      type: Object,
      required: true,
      default: () => {},
    },
  },
  computed: {
    username() {
      if (this.owners[0].id !== this.user.id)
        return this.owners[0].username
      else return this.owners[1].username
    },
    owner() {
      return this.user.id === this.last_message.owner.id;
    },
    date() {
      return dateService.matchDate(this.last_message.date_create)
    },
    text() {
      return this.last_message.text
    }
  },
}
</script>

<style scoped>
.dialog {
  display: grid;
  border-top: solid 1px #c9c9ca;
  padding: 10px;
  grid-template-areas:
    "username date"
    "text text";
  cursor: pointer;
}


.dialog:hover {
  /*background-color: #f5f5f5;*/
  background: linear-gradient(90deg, #b1d6d7, #edf1cf);
}

.dialog:active {
  /*background-color: #345255;*/
  /*  background-color: #b2c5de;*/
  /*color: white;*/
  background: linear-gradient(90deg, #96d4d6, #edf1cf);
}

.dialog:nth-child(1) {
  border: 0;
}

.dialog-username {
  grid-area: username;
  font-weight: 700;
}

.dialog-text {
  margin-top: 5px;
  grid-area: text;
}

.dialog-date {
  grid-area: date;
  text-align: right;
  color: #656565;
}

.dia-text {

}

/*.dia-who {*/
/*  color: #4f4f4f;*/
/*}*/

.dialog-active {
  color: white;
  background: #58b6b9;
}

.dialog-active:hover {
  background: #58b6b9;
}

.dialog-active .dialog-date {
  color: #d3ecee;
}
</style>