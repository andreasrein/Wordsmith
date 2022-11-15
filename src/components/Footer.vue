<template>
  <footer class="footer">
    <button type="button" class="minor minor--green" @click="toggleModal">
      Beställ meningar
    </button>
    <button type="button" class="minor minor--green" @click="handleLogout">
      Logga ut
    </button>
    <Modal
      v-if="showModal"
      size="m"
      @onClose="toggleModal"
      class="footer__modal"
    >
      <template v-slot:header v-if="modalStep !== 3">Beställ</template>
      <section v-if="modalStep === 0">
        <p>
          Här beställer du hem meningar till din dörr. De meningar du valt i
          historiklistan kommer listas här.
        </p>
        <p v-if="selectedList.length === 0">
          Du har inte valt några meningar ännu!
        </p>
        <ul class="footer__modal__list">
          <li v-for="sentence in selectedList" :key="sentence">
            {{ sentence.reversed }}
          </li>
        </ul>
      </section>
      <section v-if="modalStep === 1">
        <p>Ange din adress du vill att vi skickar paketet till.</p>
        <form class="footer__modal__form">
          <div class="form-item" v-for="item in formItems" :key="item.id">
            <label :for="item.id">{{ item.label }}</label>
            <input
              :type="item.type"
              :id="item.id"
              :class="{ invalid: isInvalid[item.id] }"
              :name="item.name"
              :ref="item.id"
              :placeholder="item.placeholder"
            />
          </div>
        </form>
      </section>
      <section v-if="modalStep === 3">
        <h3 class="align-center">Beställning lagd!</h3>
        <Checkmark />
      </section>
      <template v-slot:footer v-if="modalStep !== 3">
        <div class="footer__modal__footer">
          <button type="button" class="minor minor--black" @click="toggleModal">
            Stäng
          </button>
          <button
            v-if="modalStep === 0"
            type="button"
            class="primary"
            :disabled="selectedList.length === 0"
            @click="handleContinue"
          >
            Gå vidare
          </button>
          <button v-else type="button" class="primary" @click="handleOrder">
            Beställ
          </button>
        </div>
      </template>
    </Modal>
  </footer>
</template>

<script>
import Modal from "@/components/Modal.vue"
import Checkmark from '@/components/icons/Checkmark.vue'
import { mapState, mapGetters } from "vuex"

export default {
  name: "Footer",
  components: {
    Modal,
    Checkmark
  },
  data() {
    return {
      showModal: false,
      modalStep: 0,
      formItems: [
        { id: "orderName", type: "text", name: "name", placeholder: "Kalle Kula", label: "Namn" },
        { id: "orderStreet", type: "text", name: "street", placeholder: "Gatan 2", label: "Gata" },
        { id: "orderPostCode", type: "text", name: "postal-code", placeholder: "12345", label: "Postnummer" },
        { id: "orderCity", type: "text", name: "city", placeholder: "Staden", label: "Stad" },
      ],
      isInvalid: {
        orderName: false,
        orderStreet: false,
        orderPostCode: false,
        orderCity: false,
      },
    };
  },
  computed: {
    ...mapState({
      selectedSentences: (state) => state.sentence.selectedSentences,
    }),
    ...mapGetters({
      selectedList: "sentence/getSelectedList",
    }),
  },
  methods: {
    handleOrder() {
      let hasAnyError = false;
      for (const key in this.isInvalid) {
        if (Object.hasOwnProperty.call(this.isInvalid, key)) {
          if (this.$refs[key][0].value === "") {
            this.isInvalid[key] = true;
            hasAnyError = true;
          } else {
            this.isInvalid[key] = false;
          }
        }
      }
      if (!hasAnyError) {
        this.modalStep = 3;
        console.log("can order");
      }
    },
    handleContinue() {
      this.modalStep = 1;
    },
    toggleModal() {
      this.showModal = !this.showModal;
    },
    handleLogout() {
      this.$store.commit("auth/LOGOUT");
    },
  },
};
</script>

<style lang="scss">
.footer {
  padding: $gutter-xl;
  display: flex;
  gap: $gutter-xl;
  width: 100%;
  justify-content: center;
  align-items: center;
  &__modal {
    &__form {
      .form-item {
        display: flex;
        flex-direction: column;
        margin-bottom: $gutter-xl;
      }
    }
    &__list {
      margin-top: $gutter-xl 0;
    }
    &__footer {
      display: flex;
      flex-direction: row;
      justify-content: flex-end;
      gap: $gutter-xl;
      width: 100%;
    }
  }
}
</style>