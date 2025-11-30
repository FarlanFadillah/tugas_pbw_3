Vue.component('modal-confirm', {
  template: `
    <div class="modal" v-show="open">
      <div class="modal-content">
        <div class="modal-header">
          <h3>{{ info }}</h3>
        </div>
        <div class="modal-body">
          <p>{{ message }}</p>
        </div>
        <div class="modal-footer">
          <span @click="confirm(true)" class="btn btn-blue">Yes</span>
          <span @click="confirm(false)" class="btn">No</span>
        </div>
      </div>
    </div>
  `,
  props: ["info", "message", "open"],
  methods: {
    confirm(ans){
        this.$emit('confirm', ans);
    }
  }
});
