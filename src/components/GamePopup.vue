<script setup lang="ts">
import type { Status } from '@/models';
import { ref } from 'vue';

interface IProps {
  word: string;
}

const isVisible = ref(false);
const gameStatus = ref<Status | null>(null);

const open = (status: Status) => {
  gameStatus.value = status;
  isVisible.value = true;
};

const close = () => {
  isVisible.value = false;
};

defineProps<IProps>();
defineExpose({ open, close });

const emit = defineEmits<{ (e: 'restart'): void }>();
</script>

<template>
  <!-- Container for final message -->
  <div v-if="isVisible" class="popup-container">
    <div class="popup">
      <h2 v-if="gameStatus === 'win'">Поздравляю, вы победили! 😃</h2>

      <template v-else>
        <h2>Вы проиграли. 😕</h2>

        <h3>...имя: {{ word }}</h3>
      </template>

      <button @click="emit('restart')">Сыграть еще раз</button>
    </div>
  </div>
</template>
