<template>
  <section class="smithing-history">
    <div v-show="loadingSentences" class="smithing-history__logo">
      <SpinnerIcon/>
    </div>
    <div v-if="!loadingSentences">
      <div class="smithing-history__header">
        <h3>Tidigare meningar</h3>
        <button
          type="button"
          class="minor"
          data-cy="sortModalBtn"
          @click="toggleModal">
          <span>Sortera</span>
          <SortIcon />
        </button>
      </div>
      <div v-if="sentences.length > 0" class="smithing-history__list">
        <div class="smithing-history__list__header">
          <div class="date">Datum</div>
          <div>Text</div>
        </div>
        <ul class="smithing-list">
          <li
            class="smithing-list__item"
            v-for="sentence in paginatedSentences"
            :key="sentence.id">
            <div class="smithing-list__item__date">{{convertDate(sentence.created)}}</div>
            <div data-cy="reversedSentence">{{sentence.reversed}}</div>
            <div>
              <input
                type="checkbox"
                :id="'sentence-' + sentence.id"
                name="sentence"
                :value="sentence.id"
                :checked="chosenSentences.indexOf(sentence.id) > -1"
                @change="handleCheckboxChange($event, sentence)">
            </div>
          </li>
        </ul>
        <Pagination
          v-if="sentences.length > pageSize"
          :pageSize="pageSize"
          :total="sentences.length"
          @onPaginate="handlePaginate" />
      </div>
      <div v-else class="smithing-history__empty">
        <h3>Inga sparade meningar!</h3>
        <p>När du gjort din första mening dyker den upp här.</p>
      </div>
      <Modal
        v-if="showModal"
        size="s"
        @onClose="toggleModal">
        <template v-slot:header>Sortera</template>
        <section class="modal-sort">
          <div>
            <div class="modal-sort__item" v-for="date in dateRadio" :key="date.id">
              <input
                type="radio"
                :id="date.id"
                name="sort"
                :data-cy="date.cy"
                :value="date.value"
                v-model="sortOption"/>
              <label :for="date.id">{{date.label}}</label>
            </div>
          </div>
          <div>
            <div class="modal-sort__item" v-for="text in textRadio" :key="text.id">
              <input
                type="radio"
                :id="text.id"
                name="sort"
                :data-cy="text.cy"
                :value="text.value"
                v-model="sortOption"/>
              <label :for="text.id">{{text.label}}</label>
            </div>
          </div>
        </section>
        <template v-slot:footer>
          <div class="modal-sort__footer">
            <button
              type="button"
              class="primary align-right"
              data-cy="closeModalBtn"
              @click="toggleModal">
              Klar
            </button>
          </div>
        </template>
      </Modal>
    </div>
  </section>
</template>

<script>
import SortIcon from '@/components/icons/SortIcon.vue'
import Modal from '@/components/Modal.vue'
import SpinnerIcon from '@/components/icons/SpinnerIcon.vue'
import { mapState, mapMutations } from 'vuex'
import Pagination from './Pagination.vue'

export default {
  name: 'SmithingList',
  data () {
    return {
      showModal: false,
      sortOption: 'created_desc',
      page: 0,
      pageSize: 4,
      chosenSentences: [],
      dateRadio: [
        {id: 'dateDesc', cy: 'sortCreatedDescRadio', value: 'created_desc', label: 'Datum (9-0)'},
        {id: 'dateAsc', cy: 'sortCreatedAscRadio', value: 'created_asc', label: 'Datum (0-9)'}
      ],
      textRadio: [
        {id: 'textAsc', cy: 'sortTextAscRadio', value: 'reversed_asc', label: 'Text (A-Ö)'},
        {id: 'textDesc', cy: 'sortTextDescRadio', value: 'reversed_desc', label: 'Text (Ö-A)'}
      ]
    }
  },
  components: {
    SortIcon,
    Modal,
    SpinnerIcon,
    Pagination
  },
  mounted () {
    this.getSentencesList()
  },
  computed: {
    ...mapState({
      sentences: state => state.sentence.storedSentences,
      loadingSentences: state => state.sentence.loadingSentences
    }),
    paginatedSentences () {
      if (this.sentences.length > 0) {
        const start = this.page * this.pageSize
        const sorting = this.sortOption.split('_')
        const sortedAndCropped = this.sortArr(this.sentences, sorting[1], sorting[0]).slice(start, (start + this.pageSize))
        return sortedAndCropped
      }
      return []
    }
  },
  methods: {
    ...mapMutations({
      setSentences: 'sentence/SET_SELECTED_SENTENCES',
    }),
    handleCheckboxChange (e) {
      const { value, checked } = e.target
      if (checked) {
        this.chosenSentences.push(value)
      } else {
        const index = this.chosenSentences.findIndex(id => id === value)
        if (index > -1) {
          this.chosenSentences.splice(index, 1)
        }
      }
      this.setSentences(this.chosenSentences)
    },
    sortArr (arr, dir, key) {
      const compare = (a, b) => {
        const aTarget = key === 'created' ? new Date(a.created).getTime() : a[key]
        const bTarget = key === 'created' ? new Date(b.created).getTime() : b[key]
        if (aTarget < bTarget) { return dir === 'asc' ? -1 : 1 }
        if (aTarget > bTarget) { return dir === 'asc' ? 1 : -1 }
      }
      return arr.sort(compare)
    },
    handlePaginate (val) {
      this.page = val
    },
    getSentencesList () {
      this.$store.dispatch('sentence/getSentences')
    },
    convertDate (string) {
      return (new Date(string)).toISOString().split('T')[0]
    },
    toggleModal () {
      this.showModal = !this.showModal
    }
  }
}
</script>

<style lang="scss" scoped>
  .smithing-history {
    width: 100%;
    padding: $gutter-l;
    color: $white;
    &__logo {
      display: flex;
      align-items: center;
      justify-content: center;
      animation: rotateY 1.5s ease-out, fadeinout 1.5s linear;
    }
    &__header {
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      margin-bottom: $gutter-s;
      h3 {
        color: $white;
        font-weight: bold;
      }
      button span {
        margin-right: $gutter-s;
      }
    }
    &__empty {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      padding: $gutter-xl;
      background-color: $green-0;
    }
    &__list {
      display: flex;
      flex-direction: column;
      &__header {
        background-color: $green-0;
        padding: $gutter-xl;
        margin-bottom: $gutter-xs;
        font-weight: bold;
        flex: 1;
        display: grid;
        grid-template-columns: auto;
        column-gap: $gutter-xxl;
        border-top-left-radius: $border-radius;
        border-top-right-radius: $border-radius;
        .date {
          display: none;
        }
      }
    }
    .smithing-list {
      margin: 0 0 $gutter-xl 0;
      padding: 0;
      &__item {
        background-color: rgba($green-2, 0.2);
        margin-bottom: $gutter-xs;
        padding: $gutter-xl;
        display: grid;
        grid-template-columns: auto 24px;
        column-gap: $gutter-xxl;
        &__date {
          display: none;
          align-items: center;
          font-weight: bold;
        }
      }
    }
  }
  .modal-sort {
    display: grid;
    grid-template-columns: 1fr;
    &__item {
      display: flex;
      align-items: center;
      margin-bottom: $gutter-l;
      font-weight: bold;
      label {
        margin-left: $gutter-s;
      }
    }
    &__footer {
      button {
        width: 100%;
        text-align: center;
      }
    }
  }
  @media all and (min-width: 500px) {
    .smithing-history {
      &__list__header {
        grid-template-columns: 85px auto;
        column-gap: calc($gutter-xxl * 2);
        .date {
          display: block;
        }
      }
      .smithing-list__item {
        column-gap: calc($gutter-xxl * 2);
        grid-template-columns: 85px auto 24px;
        &__date {
          display: flex;
        }
      }
    }
    .modal-sort {
      grid-template-columns: 1fr 1fr;
      &__footer {
        text-align: right;
        button {
          width: auto;
        }
      }
    }
  }
</style>