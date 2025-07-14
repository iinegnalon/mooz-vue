<script setup>
import { ref } from 'vue';

defineProps({
  modelValue: String,
  id: String,
  label: String,
  placeholder: String,
  icon: String,
});

const emit = defineEmits(['update:modelValue', 'iconClick', 'enter']);

const inputRef = ref(null);

function updateValue(event) {
  emit('update:modelValue', event.target?.value);
}
</script>

<template>
  <div class="base-input-wrapper">
    <label class="base-input">
      <span v-if="label" class="base-input__label">
        {{ label }}
      </span>

      <span class="base-input__container">
        <input
          :id="id"
          ref="inputRef"
          :placeholder="placeholder"
          :value="modelValue"
          class="base-input__field"
          type="text"
          v-bind="$attrs"
          @input="updateValue"
          @keydown.enter="emit('enter')"
        />

        <span
          v-if="$slots.icon"
          class="base-input__icon"
          @click="emit('iconClick')"
        >
          <slot name="icon" />
        </span>
      </span>
    </label>
  </div>
</template>

<style lang="scss" scoped>
@import '@/assets/css/variables.scss';

.base-input-wrapper {
  width: 100%;

  .base-input {
    display: flex;
    flex-direction: column;
    gap: 0.2rem;
    border: 1px solid $color-gray;
    border-radius: 5px;
    padding: 0.6rem 1rem;
    background-color: $color-white;
    cursor: text;
    transition: 0.3s ease;

    &__label {
      font-size: 14px;
      color: $color-dark-gray;
      opacity: 0.7;
    }

    &__container {
      display: flex;
      align-items: center;
      gap: 1rem;
    }

    &__field {
      flex: 1;
      border: none;
      outline: none;
      font-size: 14px;
      font-family: inherit;
      padding: 0;
      background-color: transparent;
      color: $color-dark-gray;

      &::placeholder {
        color: $color-dark-gray;
        opacity: 0.5;
      }
    }

    &:focus-within {
      border-color: $color-primary;
      box-shadow: 0 0 0 2px rgba($color-primary, 0.2);
    }

    &__icon {
      display: flex;
      width: 16px;
      height: 16px;
      cursor: pointer;
    }
  }
}
</style>
