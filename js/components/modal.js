Vue.component('modal', {
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
          <span @click="closeModal" class="close-modal-btn">close</span>
        </div>
      </div>
    </div>
  `,
  props: ["info", "message", "open"],
  methods: {
    closeModal() {
      this.$emit('close');
    }
  }
});
